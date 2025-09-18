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

  // Show loading UI until user data is ready
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

  // Delete selected nonconformities one by one with user info in headers
  const handleDeleteSelected = async (ids = selectedIds) => {
    if (!Array.isArray(ids)) {
      ids = selectedIds;
    }
    if (ids.length === 0) return;

    if (!window.confirm("Are you sure you want to delete selected items?")) return;
    if (!userRole || !user?.id) {
      alert("User info missing, cannot delete.");
      return;
    }
    setIsDeleting(true);
    try {
      console.log('Deleting IDs:', ids);
      console.log('User role:', userRole);
      console.log('User ID:', user?.id);

      await Promise.all(ids.map(id => axios.delete(`http://localhost:5000/api/NonConformity/${id}`, {
        headers: {
          'x-user-role': userRole,
          'x-user-id': user.id,
        }
      })));

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

  return (
    <div className="p-4">
      <h1 className="mb-8 font-bold text-xl ml-2">Non-Conformity Records</h1>
      {/* Buttons Row */}
      <div className="flex gap-x-2 mb-4">
        {(userRole === 'admin' || userRole === 'auditor') && (
          <DeleteNonConformityButton
            onDelete={() => handleDeleteSelected()}
            selectedIds={selectedIds}
            userRole={userRole}
            disabled={!userRole || !user?.id || loading || isDeleting}
          />
        )}
      </div>
      {/* Table with props */}
      <NonConformityTable
        nc={nc}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        userRole={userRole}
      />
    </div>
  );
}
