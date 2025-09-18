import express from 'express';
import mongoose from 'mongoose';
import NonConformity from '../models/NonConformity.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure storage for uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|doc|docx|pdf|xls|xlsx|ppt|pptx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) return cb(null, true);
    cb(new Error('File type not allowed'));
  }
});

// CREATE new NonConformity
router.post('/', upload.array('attachments'), async (req, res) => {
  try {
    if (req.body.responsibleperson && typeof req.body.responsibleperson === 'string') {
      req.body.responsibleperson = JSON.parse(req.body.responsibleperson);
    }

    const { userId, userRole, ...restBody } = req.body;

    const requiredFields = [
      'auditId', 'ncDescription', 'ncClauseNo', 'ncType', 'dueDate', 'department',
      'responsibleperson', 'nclocation',
      'ncRootCause', 'ncstatus'
    ];
    const missing = requiredFields.filter(field => !(restBody[field] || (field === 'responsibleperson' && restBody.responsibleperson && restBody.responsibleperson.name && restBody.responsibleperson.email)));

    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
    }
    if (!userId || !userRole) {
      return res.status(400).json({ error: 'User info missing' });
    }

    let attachments = [];
    if (req.files && req.files.length > 0) {
      attachments = req.files.map(file => ({
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path
      }));
    }

    const nc = new NonConformity({
      ...restBody,
      attachments
    });

    await nc.save();
    res.status(201).json({ message: 'NonConformity saved', ncId: nc.ncId });
  } catch (err) {
    console.error('NonConformity save error:', err);
    res.status(500).json({ error: 'Error saving NonConformity', details: err.message });
  }
});

// UPDATE a NonConformity by ID
router.put('/:id', upload.array('attachments'), async (req, res) => {
  try {
    if (req.body.responsibleperson && typeof req.body.responsibleperson === 'string') {
      req.body.responsibleperson = JSON.parse(req.body.responsibleperson);
    }

    const { userId, userRole, userEmail, ...restBody } = req.body;

    if (!userId || !userRole) {
      return res.status(400).json({ message: 'User info missing' });
    }

    const nc = await NonConformity.findById(req.params.id);
    if (!nc) {
      return res.status(404).json({ message: 'NonConformity not found' });
    }

    if (userRole !== 'admin' && userRole !== 'auditor' && userRole !== 'superadmin') {
      if (nc.responsibleperson.email !== userEmail) {
        return res.status(403).json({ message: 'Forbidden: not authorized to update this NonConformity' });
      }
    }

    if (
      !restBody.responsibleperson ||
      typeof restBody.responsibleperson !== 'object' ||
      !restBody.responsibleperson.name ||
      !restBody.responsibleperson.email
    ) {
      return res.status(400).json({ message: 'Responsible person must have name and email.' });
    }

    let attachments = [];
    if (req.files && req.files.length > 0) {
      attachments = req.files.map(file => ({
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path
      }));
    }

    const updateData = {
      ...restBody,
    };

    if (attachments.length > 0) {
      updateData.attachments = attachments;
    }

    const updatedNC = await NonConformity.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedNC) {
      return res.status(404).json({ message: 'NonConformity not found' });
    }
    res.json(updatedNC);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all NonConformities with optional filtering
router.get('/', async (req, res) => {
  try {
    const { username, role } = req.query;
    if (
      typeof role !== 'string' ||
      (role !== 'admin' && role !== 'auditor' && role !== 'superadmin' && typeof username !== 'string')
    ) {
      return res.status(400).json({ message: 'Invalid or missing role/username query parameters' });
    }
    let filter = {};

    if (role !== 'admin' && role !== 'auditor' && role !== 'superadmin' && username) {
      filter = { 'responsibleperson.name': username };
    }

    const nonConformities = await NonConformity.find(filter);
    res.json(nonConformities);
  } catch (err) {
    console.error("GET /api/Nonconformity error:", err);
    res.status(500).json({ message: err.message });
  }
});

// GET single NonConformity by ID
router.get('/:id', async (req, res) => {
  try {
    const nc = await NonConformity.findById(req.params.id);
    if (!nc) {
      return res.status(404).json({ message: 'NonConformity not found' });
    }
    res.json(nc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE single NonConformity by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const userRole = req.headers['x-user-role']; // Get from headers or use auth middleware
    const userId = req.headers['x-user-id'];

    if (!userRole || !userId) {
      return res.status(400).json({ message: 'User info missing' });
    }

    if (userRole !== 'admin' && userRole !== 'auditor' && userRole !== 'superadmin') {
      return res.status(403).json({ message: 'Forbidden: only admin or auditor can delete nonconformities' });
    }

    const deleted = await NonConformity.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'NonConformity not found' });
    }

    res.status(200).json({ message: 'Deleted successfully' });

  } catch (err) {
    console.log('Received headers:', req.headers);
    console.log('Received x-user-role:', req.headers['x-user-role']);
    console.log('Received x-user-id:', req.headers['x-user-id']);

    res.status(500).json({ message: 'Error deleting nonconformity', error: err });
  }
});

export default router;
