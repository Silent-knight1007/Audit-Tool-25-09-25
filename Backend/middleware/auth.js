// middleware/auth.js
export const isSuperAdmin = (req, res, next) => {
  const user = req.user; // assuming user info is added by your auth middleware
  if (!user || user.role !== "superadmin") {
    return res.status(403).json({ message: "Forbidden: Superadmin only" });
  }
  next();
};
