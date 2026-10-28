import React from "react";
import { useNavigate } from "react-router-dom";

const ReturnAssetForm = ({ asset }) => {
  const navigate = useNavigate();

  const handleReturn = () => {
    const assets =
      JSON.parse(localStorage.getItem("assets")) || [];

    const updatedAssets = assets.map((item) => {
      if (item.id === asset.id) {
        return {
          ...item,
          status: "Available",

          assignedEmployeeId: "",
          assignedEmployeeName: "",
          assignedDepartment: "",
          assignedDesignation: "",
          assignedDate: "",

          returnDate: new Date()
            .toISOString()
            .split("T")[0],
        };
      }

      return item;
    });

    localStorage.setItem(
      "assets",
      JSON.stringify(updatedAssets)
    );

    alert("Asset returned successfully!");

    navigate("/assets");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Return Asset
      </h2>

      <div className="space-y-3 mb-6">
        <p>
          <strong>Asset ID:</strong> {asset.id}
        </p>

        <p>
          <strong>Asset Name:</strong> {asset.name}
        </p>

        <p>
          <strong>Assigned To:</strong>{" "}
          {asset.assignedEmployeeName}
        </p>

        <p>
          <strong>Department:</strong>{" "}
          {asset.assignedDepartment}
        </p>

        <p>
          <strong>Assigned Date:</strong>{" "}
          {asset.assignedDate}
        </p>
      </div>

      <div className="flex gap-4">

        <button
          onClick={handleReturn}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Confirm Return
        </button>

        <button
          onClick={() => navigate("/assets")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
        >
          Cancel
        </button>

      </div>

    </div>
  );
};

export default ReturnAssetForm;