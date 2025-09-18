import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../Context/AuthContext';
import axios from 'axios';
import NonConformityTable from "./NonConformityTable";
import DeleteNonConformityButton from "./DeleteNonConformityButton";

export default function ParentNCButton() {
  const [nc, setNc] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const userRole = user?.role;
  const [isDeleting, setIsDeleting] = useState(false);
  const [search, setSearch] = useState(""); // 🔍 search state

  if (loading) {
    return <div>Loading...</div>;
  }

  // Fetch nonconformity data
  const fetchNonConformities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/NonConformity", {
        params: {
          username: user?.name || user?.email,
          role: userRole
        }
      });
      setNc(response.data);
      setSelectedIds([]);
    } catch (error) {
      console.error("Error fetching NonConformity data:", error);
    }
  };

  useEffect(() => {
    fetchNonConformities();
  }, []);

  // Delete selected
  const handleDeleteSelected = async (ids = selectedIds) => {
    if (!Array.isArray(ids)) ids = selectedIds;
    if (ids.length === 0) return;

    if (!window.confirm("Are you sure you want to delete selected items?")) return;
    if (!userRole || !user?.id) {
      alert("User info missing, cannot delete.");
      return;
    }
    setIsDeleting(true);

    try {
      await Promise.all(ids.map(id =>
        axios.delete(`http://localhost:5000/api/NonConformity/${id}`, {
          headers: {
            'x-user-role': userRole,
            'x-user-id': user.id,
          }
        })
      ));

      setNc(prev => prev.filter(item => !ids.includes(item._id)));
      setSelectedIds(prev => prev.filter(id => !ids.includes(id)));
      alert("Deleted successfully.");
    } catch (error) {
      console.error("Error deleting NonConformity:", error);
      alert("Error deleting NonConformity");
    } finally {
      setIsDeleting(false);
    }
  };

  // 🔍 Filter NC records by search across all fields
  const filteredNc = nc.filter((item) => {
    const searchLower = search.toLowerCase();
    const itemString = Object.values(item)
      .map((val) => {
        if (!val) return "";
        if (typeof val === "string") return val.toLowerCase();
        if (typeof val === "number") return val.toString();
        if (val instanceof Date) return val.toLocaleDateString().toLowerCase();
        if (Array.isArray(val)) {
          return val
            .map(v =>
              typeof v === "object"
                ? JSON.stringify(v).toLowerCase()
                : String(v).toLowerCase()
            )
            .join(" ");
        }
        if (typeof val === "object") return JSON.stringify(val).toLowerCase();
        return "";
      })
      .join(" ");

    return itemString.includes(searchLower);
  });

  return (
    <div className="p-4">
      <h1 className="mb-8 font-bold text-xl ml-2">Non-Conformity Records</h1>

      {/* 🔍 Search + Buttons Row */}
      <div className="flex justify-between items-center mb-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search non-conformities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-1/3"
        />

        {/* Delete button */}
        {(userRole === 'admin' || userRole === 'auditor' || userRole === 'superadmin') && (
          <DeleteNonConformityButton
            onDelete={() => handleDeleteSelected()}
            selectedIds={selectedIds}
            userRole={userRole}
            disabled={!userRole || !user?.id || loading || isDeleting}
          />
        )}
      </div>

      {/* Table */}
      <NonConformityTable
        nc={filteredNc}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        userRole={userRole}
      />
    </div>
  );
}
