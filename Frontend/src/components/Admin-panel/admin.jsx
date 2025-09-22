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
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const usersPerPage = 50;

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
    if (editUser) {
      setEditUser((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Create new user
  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    try {
      const res = await axios.post(`${API_URL}/signup`, form);
      setUsers([...users, res.data]);
      setForm({ name: "", email: "", role: "user", password: "Default@123" });
      setShowDialog(false);
    } catch (err) {
      console.error("Create user error:", err);
      alert(err.response?.data?.message || "Error creating user");
    }
  };

  // Update existing user
  const handleUpdate = async () => {
    if (!editUser.name || !editUser.email) return;
    try {
      const res = await axios.put(`${API_URL}/users/${editUser._id}`, editUser);
      setUsers(users.map((u) => (u._id === editUser._id ? res.data : u)));
      setEditUser(null);
    } catch (err) {
      console.error("Update error:", err);
      alert(err.response?.data?.message || "Failed to update user");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete user");
    }
  };

  // Pagination
  const startIndex = (page - 1) * usersPerPage;
  const selectedUsers = users.slice(startIndex, startIndex + usersPerPage);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <>
      {/* Header */}
      <div className="bg-red-600 text-white text-3xl p-4 flex justify-center">
        User Management
      </div>

      {/* Add User Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setShowDialog(true)}
          className="bg-red-600 hover:bg-orange-600 text-white font-bold text-xs py-2 px-4 rounded-lg transition ease-in-out duration-300"
        >
          Add User
        </button>
      </div>

      {/* Add User Dialog */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
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
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="auditor">Auditor</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-orange-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View User Dialog */}
      {viewUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p><strong>Name:</strong> {viewUser.name}</p>
            <p><strong>Email:</strong> {viewUser.email}</p>
            <p><strong>Role:</strong> {viewUser.role}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setViewUser(null)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-orange-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Dialog */}
      {editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
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
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="auditor">Auditor</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditUser(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-orange-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Table */}
      <div className="p-5">
        {users.length > 0 && (
          <>
            <table className="min-w-full border">
              <thead>
                <tr className="bg-red-500">
                  <th className="border p-2 text-white">Name</th>
                  <th className="border p-2 text-white">Email</th>
                  <th className="border p-2 text-white">Role</th>
                  <th className="border p-2 text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="border p-2">{user.name}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2 capitalize">{user.role}</td>
                    <td className="border p-2 flex gap-2 justify-center">
                      <button
                        onClick={() => setEditUser(user)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
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
