// components/AuditPlan/ParentButton.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuditTable from "./AuditPlanTable";
import DeleteAuditButton from "./DeleteAuditPlanButton"; 
import axios from "axios";

export default function ParentButton() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [audits, setAudits] = useState([]);
  const [search, setSearch] = useState(""); // 🔍 search state

  const handleDeleteSelected = async (ids = selectedIds) => {
    if (!Array.isArray(ids)) {
      ids = selectedIds;
    }

    const selectedAudits = audits.filter(audit => ids.includes(audit._id));
    const nonPlanned = selectedAudits.filter(
      audit =>
        typeof audit.status === "string" &&
        audit.status.trim().toLowerCase() !== "planned"
    );

    if (nonPlanned.length > 0) {
      alert("Audits with status 'executed' & 'completed' can't be deleted.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      const response = await axios.delete("http://localhost:5000/audits", {
        data: { ids }
      });

      const deletedIds =
        response.data.deletedIds && response.data.deletedIds.length > 0
          ? response.data.deletedIds
          : ids;

      setAudits(prevAudits =>
        prevAudits.filter(a => !deletedIds.includes(a._id))
      );
      setSelectedIds(prevIds =>
        prevIds.filter(id => !deletedIds.includes(id))
      );

      alert(response.data.message || "Deleted successfully.");
    } catch (error) {
      console.error("Error deleting audits:", error);
      alert("Error deleting audits");
    }
  };
  

  const fetchAudits = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/AuditPlan");
      setAudits(response.data);
    } catch (error) {
      console.error("Error fetching audits:", error.message);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  // 🔍 Filter audits by search (checks all fields)
  const filteredAudits = audits.filter((audit) => {
    const searchLower = search.toLowerCase();

    // Convert audit object into a searchable string
    const auditString = Object.values(audit)
      .map((val) => {
        if (!val) return "";
        if (typeof val === "string") return val.toLowerCase();
        if (typeof val === "number") return val.toString();
        if (val instanceof Date) return val.toLocaleDateString().toLowerCase();
        if (Array.isArray(val)) {
          return val
            .map((item) =>
              typeof item === "object"
                ? JSON.stringify(item).toLowerCase()
                : String(item).toLowerCase()
            )
            .join(" ");
        }
        if (typeof val === "object") {
          return JSON.stringify(val).toLowerCase();
        }
        return "";
      })
      .join(" ");

    return auditString.includes(searchLower);
  });

  return (
    <div className="p-4">
      <h1 className="mb-8 font-bold text-xl ml-2">Audit Records</h1>

      {/* 🔍 Search + Buttons Row */}
      <div className="flex justify-between items-center mb-2">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search audits..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-1/3"
        />

        {/* Buttons */}
        <div className="flex gap-x-2">
          <Link to="/xyz">
            <button className="bg-red-500 hover:bg-orange-600 text-white font-bold text-xs py-2 px-7 rounded-lg">
              Add
            </button>
          </Link>

          <DeleteAuditButton
            onDelete={() => handleDeleteSelected()}
            disabled={selectedIds.length === 0}
          />
        </div>
      </div>

      {/* Table */}
      <AuditTable
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        audits={filteredAudits} 
        setAudits={setAudits}
      />
    </div>
  );
}
