import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAsset } from "../api/assets";

const View = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAsset = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAsset(id);

        setAsset(data);
      } catch (error) {
        console.error("Failed to load asset:", error);

        setError(
          error.message || "Failed to load asset"
        );
      } finally {
        setLoading(false);
      }
    };

    loadAsset();
  }, [id]);

  // -----------------------------
  // Loading
  // -----------------------------

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">
          Loading asset...
        </p>
      </div>
    );
  }

  // -----------------------------
  // Error
  // -----------------------------

  if (error || !asset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-red-500">
          Asset Not Found
        </h1>

        {error && (
          <p className="mt-2 text-gray-600">
            {error}
          </p>
        )}

        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">

        {/* Header */}

        <div className="bg-indigo-600 text-white rounded-t-xl px-8 py-5">

          <h1 className="text-3xl font-bold">
            Asset Details
          </h1>

          <p className="text-indigo-100 mt-1">
            Complete information about the selected asset
          </p>

        </div>

        {/* Details */}

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Asset ID */}

          <div>
            <p className="text-gray-500">
              Asset ID
            </p>

            <h2 className="text-lg font-semibold">
              {asset.id}
            </h2>
          </div>

          {/* Asset Code */}

          <div>
            <p className="text-gray-500">
              Asset Code
            </p>

            <h2 className="text-lg font-semibold">
              {asset.asset_code}
            </h2>
          </div>

          {/* Asset Name */}

          <div>
            <p className="text-gray-500">
              Asset Name
            </p>

            <h2 className="text-lg font-semibold">
              {asset.asset_name}
            </h2>
          </div>

          {/* Category */}

          <div>
            <p className="text-gray-500">
              Category
            </p>

            <h2 className="text-lg font-semibold">
              {asset.category}
            </h2>
          </div>

          {/* Brand */}

          <div>
            <p className="text-gray-500">
              Brand
            </p>

            <h2 className="text-lg font-semibold">
              {asset.brand}
            </h2>
          </div>

          {/* Model */}

          <div>
            <p className="text-gray-500">
              Model
            </p>

            <h2 className="text-lg font-semibold">
              {asset.model}
            </h2>
          </div>

          {/* Serial Number */}

          <div>
            <p className="text-gray-500">
              Serial Number
            </p>

            <h2 className="text-lg font-semibold">
              {asset.serial_number}
            </h2>
          </div>

          {/* Purchase Date */}

          <div>
            <p className="text-gray-500">
              Purchase Date
            </p>

            <h2 className="text-lg font-semibold">
              {asset.purchase_date}
            </h2>
          </div>

          {/* Purchase Cost */}

          <div>
            <p className="text-gray-500">
              Purchase Cost
            </p>

            <h2 className="text-lg font-semibold">
              ₹
              {Number(
                asset.purchase_cost
              ).toLocaleString("en-IN")}
            </h2>
          </div>

          {/* Status */}

          <div>
            <p className="text-gray-500">
              Status
            </p>

            <span
              className={`
                inline-block
                px-4
                py-1
                rounded-full
                text-white
                font-semibold

                ${
                  asset.status === "Available"
                    ? "bg-green-500"
                    : asset.status === "Assigned"
                    ? "bg-blue-500"
                    : asset.status === "Repair"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }
              `}
            >
              {asset.status}
            </span>
          </div>

        </div>

        {/* Buttons */}

        <div className="border-t p-6 flex justify-end gap-4">

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
          >
            Back
          </button>

          <button
            onClick={() =>
              navigate(`/edit-asset/${asset.id}`)
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
          >
            Edit Asset
          </button>

        </div>

      </div>

    </div>
  );
};

export default View;