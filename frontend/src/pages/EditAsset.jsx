
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AssetForm from "../components/assets/AssetForm";
import { apiRequest } from "../api/client";

const EditAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [asset, setAsset] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAsset() {
      try {
        const data = await apiRequest(`/assets/${id}`);
        setAsset(data);
      } catch (err) {
        setError(err.message || "Failed to load asset");
      } finally {
        setLoading(false);
      }
    }

    loadAsset();
  }, [id]);

  if (loading) return <p>Loading asset...</p>;

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate("/assets")}>
          Back to Assets
        </button>
      </div>
    );
  }

  if (!asset) return <p>Asset not found.</p>;

  return <AssetForm initialAsset={asset} mode="edit" />;
};

export default EditAsset;
