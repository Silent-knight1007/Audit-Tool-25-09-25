import React, { useState, useEffect } from "react";
import axios from "axios";
 
function AdminPanel() {
  const API_URL = "http://localhost:5000/api/auth"; // backend base URL
 
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user",
    password: "Default@123",
  });
  const [showDialog, setShowDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);
 
  const [page, setPage] = useState(1);
  const usersPerPage = 50;
 
  const [selectedIds, setSelectedIds] = useState([]);
 
  const currentUser = JSON.parse(localStorage.getItem("user"));
 
  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };
 
  useEffect(() => {
    fetchUsers();
  }, []);
 
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editUser) setEditUser((prev) => ({ ...prev, [name]: value }));
    else setForm((prev) => ({ ...prev, [name]: value }));
  };
 
  // Allowed roles based on current user
  const allowedRoles = () => {
    if (currentUser.role === "superadmin") return ["user", "admin", "auditor"];
    if (currentUser.role === "admin") return ["user", "auditor"];
    return ["user"];
  };
 
  // Create new user
  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    try {
      const res = await axios.post(`${API_URL}/signup`, {
        ...form,
        creatorRole: currentUser?.role,
      });
      setUsers([...users, res.data]);
      setForm({ name: "", email: "", role: "user", password: "Default@123" });
      setShowDialog(false);
    } catch (err) {
      alert(err.response?.data?.message || "Error creating user");
    }
  };
 
  // Update existing user
  const handleUpdate = async () => {
    if (!editUser.name || !editUser.email) return;
 
    if (
      currentUser.role === "admin" &&
      (editUser.role === "admin" || editUser.role === "superadmin")
    ) {
      return alert("Admins cannot edit Admins or Superadmin");
    }
 
    try {
      const res = await axios.put(`${API_URL}/users/${editUser._id}`, {
        ...editUser,
        updaterRole: currentUser?.role,
      });
      setUsers(users.map((u) => (u._id === editUser._id ? res.data : u)));
      setEditUser(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user");
    }
  };
 
  // Bulk delete selected users
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return alert("No users selected");
 
    if (!window.confirm(`Delete ${selectedIds.length} selected user(s)?`)) return;
 
    try {
      await axios.post(`${API_URL}/users/delete`, {
        ids: selectedIds,
        deleterRole: currentUser?.role,
      });
 
      setUsers(users.filter((u) => !selectedIds.includes(u._id)));
      setSelectedIds([]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete users");
    }
  };
 
  // Checkbox toggle
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };
 
  const toggleSelectAll = () => {
    const pageUserIds = selectedUsers.map((u) => u._id);
    if (pageUserIds.every((id) => selectedIds.includes(id))) {
      setSelectedIds((prev) => prev.filter((id) => !pageUserIds.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...pageUserIds])]);
    }
  };
 
  const startIndex = (page - 1) * usersPerPage;
  const selectedUsers = users.slice(startIndex, startIndex + usersPerPage);
  const totalPages = Math.ceil(users.length / usersPerPage);
 
  return (
    <>
      <div className="bg-red-600 text-white text-3xl p-4 flex justify-center">
        User Management
      </div>
 
      <div className="flex justify-between p-4">
        <button
          onClick={() => setShowDialog(true)}
          className="bg-red-600 hover:bg-orange-600 text-white font-bold text-xs py-2 px-4 rounded-lg"
        >
          Add User
        </button>
 
        {selectedIds.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="bg-red-600 hover:bg-orange-600 text-white font-bold text-xs py-2 px-4 rounded-lg"
          >
            Delete 
          </button>
        )}
      </div>
 
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          {/* Add User Modal */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Name"
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="border p-2 rounded w-full mb-2"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border p-2 rounded w-full mb-4"
            >
              {allowedRoles().map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
 
      {editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          {/* Edit User Modal */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              type="text"
              name="name"
              value={editUser.name}
              onChange={handleChange}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="email"
              name="email"
              value={editUser.email}
              onChange={handleChange}
              className="border p-2 rounded w-full mb-2"
            />
            <select
              name="role"
              value={editUser.role}
              onChange={handleChange}
              className="border p-2 rounded w-full mb-4"
              disabled={
                currentUser.role === "admin" &&
                (editUser.role === "admin" || editUser.role === "superadmin")
              }
            >
              {allowedRoles().map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditUser(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
 
      <div className="p-5">
        {users.length > 0 && (
          <>
            <table className="min-w-full border">
              <thead>
                <tr className="bg-red-500">
                  <th className="border p-2 text-white">
                    <input
                      type="checkbox"
                      checked={
                        selectedUsers.length > 0 &&
                        selectedUsers.every((u) => selectedIds.includes(u._id))
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="border p-2 text-white">Name</th>
                  <th className="border p-2 text-white">Email</th>
                  <th className="border p-2 text-white">Role</th>
                  <th className="border p-2 text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(user._id)}
                        onChange={() => toggleSelect(user._id)}
                      />
                    </td>
                    <td className="border p-2">{user.name}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2 capitalize">{user.role}</td>
                    <td className="border p-2 flex gap-2 justify-center">
                      <button
                        onClick={() => setEditUser(user)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                        disabled={
                          currentUser.role === "admin" &&
                          (user.role === "admin" || user.role === "superadmin")
                        }
                      >
                        Edit
                      </button>
                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
 
            <div className="flex justify-center mt-4 gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 bg-gray-400 text-white rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-3 py-1">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 bg-gray-400 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
 
export default AdminPanel;
 
 