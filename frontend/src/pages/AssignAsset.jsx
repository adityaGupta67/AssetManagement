
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AssignAssetForm from "../components/assets/AssignAssetForm";

const API_URL = "http://localhost:8000";

const AssignAsset = () => {
  const { id } = useParams();

  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setLoading(true);
        setError("");

        // Get the JWT token saved during login
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Please log in first. Authentication token not found.");
        }

        const response = await fetch(
          `${API_URL}/assets/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 401) {
          throw new Error(
            "Unauthorized. Your session may have expired. Please log in again."
          );
        }

        if (response.status === 403) {
          throw new Error(
            "You do not have permission to access this asset."
          );
        }

        if (response.status === 404) {
          throw new Error("Asset not found.");
        }

        if (!response.ok) {
          throw new Error(
            `Failed to fetch asset: ${response.status}`
          );
        }

        const data = await response.json();
        setAsset(data);
      } catch (err) {
        setError(err.message || "Failed to load asset.");
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading asset...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          {error}
        </h2>
      </div>
    );
  }

  if (!asset) {
    return <div className="p-6">Asset not found.</div>;
  }

  return (
    <div className="p-6">
      <AssignAssetForm asset={asset} />
    </div>
  );
};

export default AssignAsset;
  