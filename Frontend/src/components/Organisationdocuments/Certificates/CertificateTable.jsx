import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../Context/AuthContext';

const CertificateTable = () => {
  const [certificates, setCertificates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();
  const [modalUrl, setModalUrl] = useState(null);
  const { user } = useContext(AuthContext);
  const userRole = user?.role || 'user';

  const openViewer = (certificate) => {
    if (certificate.attachments && certificate.attachments.length > 0) {
      const file = certificate.attachments[0];
      const ext = file.name.split('.').pop().toLowerCase();
      const inlineViewable = ['pdf', 'png', 'jpg', 'jpeg'];
      const url = `http://localhost:5000/api/certificates/${certificate._id}/attachments/${file._id}`;

      if (inlineViewable.includes(ext)) {
        setModalUrl(url);
      } else {
        window.location.href = url;
      }
    }
  };

  const closeViewer = () => setModalUrl(null);

  const fetchCertificates = async (query = '') => {
    try {
      const params = {};
      if (query) params.q = query;
      const response = await axios.get('http://localhost:5000/api/certificates', { params });
      setCertificates(response.data);
      setSelectedIds([]); // reset selection after fetch
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    fetchCertificates(val);
  };

  const handleCreateNew = () => {
    if (userRole === 'admin') {
      navigate('/organisationdocuments/certificates/new');
    }
  };

  const handleEditSelected = () => {
    if (selectedIds.length === 1 && userRole === 'admin') {
      navigate(`/organisationdocuments/certificates/${selectedIds[0]}`);
    } else if (selectedIds.length !== 1) {
      alert('Please select exactly one certificate to edit.');
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === certificates.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(certificates.map((c) => c._id));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0 || userRole !== 'admin') return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected certificate(s)?`)) return;

    try {
      const response = await axios.delete('http://localhost:5000/api/certificates', {
        data: {
          ids: selectedIds,
          role: userRole,
        },
      });
      const deletedIds = response.data.deletedIds || selectedIds;
      setCertificates((prev) => prev.filter((c) => !deletedIds.includes(c._id)));
      setSelectedIds([]);
      alert(response.data.message || 'Deleted successfully.');
    } catch (error) {
      console.error('Error deleting certificates:', error);
      alert('Failed to delete selected certificates');
    }
  };

  const formatDate = (date) => {
    if (!date) return '—';
    const d = new Date(date);
    return isNaN(d) ? '—' : d.toLocaleDateString();
  };

  return (
    <div className="p-2 max-w-full">
      <h2 className="text-xl font-bold mr-10 mt-5 mb-5">Certificates</h2>

      <div className="flex gap-x-2 justify-left items-center mb-2">
        {userRole === 'admin' && (
          <button
            onClick={handleCreateNew}
            className="bg-red-600 hover:bg-blue-dark text-white font-bold text-xs py-2 px-4 rounded-lg mt-5 mb-5 hover:bg-orange-600 transition ease-in-out duration-300"
          >
            Add
          </button>
        )}

        {userRole === 'admin' && (
          <button
            onClick={handleEditSelected}
            disabled={selectedIds.length !== 1}
            className={`px-4 py-2 rounded-lg font-bold text-white text-xs ${
              selectedIds.length !== 1 ? 'bg-red-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500'
            } transition`}
          >
            Edit
          </button>
        )}

        {userRole === 'admin' && (
          <button
            onClick={handleDeleteSelected}
            title={userRole !== 'admin' ? 'You do not have permission to delete Certificate' : ''}
            disabled={selectedIds.length === 0}
            className={`px-4 py-2 rounded-lg font-bold text-white text-xs ${
              selectedIds.length === 0 ? 'bg-red-600 cursor-not-allowed' : 'hover:bg-orange-600'
            } transition`}
          >
            Delete
          </button>
        )}

        <input
          type="text"
          placeholder="Search certificates..."
          className="border p-2 rounded text-xs mb-5 mt-5"
          style={{ width: '220px', height: '30px' }}
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <button
          onClick={() => fetchCertificates(searchQuery)}
          className="bg-red-600 hover:bg-orange-600 text-white mb-5 font-bold text-xs py-2 px-3 mt-5 rounded-lg"
        >
          Search
        </button>
      </div>

      <table className="min-w-full border border-red-600 rounded text-sm">
        <thead className="bg-red-600">
          <tr>
            {userRole === 'admin' && (
              <th className="border p-2">
                <input
                  type="checkbox"
                  checked={certificates.length > 0 && selectedIds.length === certificates.length}
                  onChange={toggleSelectAll}
                />
              </th>
            )}
            <th className="border p-2 text-xs text-white">Document ID</th>
            <th className="border p-2 text-xs text-white">Document Name</th>
            <th className="border p-2 text-xs text-white">Description</th>
            <th className="border p-2 text-xs text-white">Version Number</th>
            <th className="border p-2 text-xs text-white">Issue Date</th>
            <th className="border p-2 text-xs text-white">Valid Through</th>
          </tr>
        </thead>
        <tbody>
          {certificates.length === 0 ? (
            <tr>
              <td colSpan={userRole === 'admin' ? 8 : 7} className="p-4 text-center font-bold text-red-700">
                No Certificates Found.
              </td>
            </tr>
          ) : (
            certificates.map((certificate) => (
              <tr key={certificate._id} className="hover:bg-red-50">
                {userRole === 'admin' && (
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(certificate._id)}
                      onChange={() => toggleSelect(certificate._id)}
                    />
                  </td>
                )}
                <td className="border p-2">{certificate.documentId || '—'}</td>
                <td className="border p-2">
                  {certificate.attachments && certificate.attachments.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => openViewer(certificate)}
                      className="text-blue-700 underline cursor-pointer bg-transparent border-0 p-0"
                    >
                      {certificate.documentName}
                    </button>
                  ) : (
                    certificate.documentName || '—'
                  )}
                </td>
                <td className="border p-2 max-w-xs truncate" title={certificate.description}>
                  {certificate.description || '—'}
                </td>
                <td className="border p-2">{certificate.versionNumber || '—'}</td>
                <td className="border p-2">{formatDate(certificate.issueDate)}</td>
                <td className="border p-2">{formatDate(certificate.validThrough)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {modalUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] relative p-4">
            <button
              className="absolute top-2 right-3 text-2xl font-bold text-gray-700 hover:text-gray-900"
              onClick={closeViewer}
              aria-label="Close modal"
            >
              &times;
            </button>
            <iframe src={modalUrl} title="Document Viewer" className="w-full h-[80vh] border-none" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateTable;








