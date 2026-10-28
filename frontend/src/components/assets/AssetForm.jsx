import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createAsset, updateAsset } from "../../api/assets";

const AssetForm = ({ initialAsset, mode }) => {
  const navigate = useNavigate();

  const [asset, setAsset] = useState(
    initialAsset || {
      asset_code: "",
      asset_name: "",
      category: "",
      brand: "",
      model: "",
      serial_number: "",
      purchase_date: "",
      purchase_cost: "",
    }
  );

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAsset({
      ...asset,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !asset.asset_code.trim() ||
      !asset.asset_name.trim() ||
      !asset.category.trim() ||
      !asset.brand.trim() ||
      !asset.model.trim() ||
      !asset.serial_number.trim() ||
      !asset.purchase_date ||
      !asset.purchase_cost
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      if (mode === "edit") {
        await updateAsset(asset.id, {
          asset_name: asset.asset_name,
          category: asset.category,
          brand: asset.brand,
          model: asset.model,
          purchase_date: asset.purchase_date,
          purchase_cost: Number(asset.purchase_cost),
        });

        alert("Asset updated successfully!");
      } else {
        await createAsset({
          asset_code: asset.asset_code,
          asset_name: asset.asset_name,
          category: asset.category,
          brand: asset.brand,
          model: asset.model,
          serial_number: asset.serial_number,
          purchase_date: asset.purchase_date,
          purchase_cost: Number(asset.purchase_cost),
        });

        alert("Asset added successfully!");
      }

      navigate("/assets");

    } catch (error) {
      console.error("Failed to save asset:", error);

      setError(
        error.message || "Failed to save asset"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">

      <h2 className="text-2xl font-bold mb-6">
        {mode === "edit"
          ? "Edit Asset"
          : "Add New Asset"}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >

        {/* Asset Code */}
        <input
          type="text"
          name="asset_code"
          placeholder="Asset Code"
          className="border rounded-lg p-3"
          value={asset.asset_code}
          onChange={handleChange}
          disabled={mode === "edit"}
        />

        {/* Asset Name */}
        <input
          type="text"
          name="asset_name"
          placeholder="Asset Name"
          className="border rounded-lg p-3"
          value={asset.asset_name}
          onChange={handleChange}
        />

        {/* Category */}
        <select
          name="category"
          className="border rounded-lg p-3"
          value={asset.category}
          onChange={handleChange}
        >
          <option value="">
            Select Category
          </option>

          <option value="Laptop">
            Laptop
          </option>

          <option value="Desktop">
            Desktop
          </option>

          <option value="Monitor">
            Monitor
          </option>

          <option value="Keyboard">
            Keyboard
          </option>

          <option value="Mouse">
            Mouse
          </option>

          <option value="Printer">
            Printer
          </option>
        </select>

        {/* Brand */}
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          className="border rounded-lg p-3"
          value={asset.brand}
          onChange={handleChange}
        />

        {/* Model */}
        <input
          type="text"
          name="model"
          placeholder="Model"
          className="border rounded-lg p-3"
          value={asset.model}
          onChange={handleChange}
        />

        {/* Serial Number */}
        <input
          type="text"
          name="serial_number"
          placeholder="Serial Number"
          className="border rounded-lg p-3"
          value={asset.serial_number}
          onChange={handleChange}
        />

        {/* Purchase Date */}
        <input
          type="date"
          name="purchase_date"
          className="border rounded-lg p-3"
          value={asset.purchase_date}
          onChange={handleChange}
        />

        {/* Purchase Cost */}
        <input
          type="number"
          name="purchase_cost"
          placeholder="Purchase Cost"
          className="border rounded-lg p-3"
          value={asset.purchase_cost}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-lg font-semibold"
        >
          {loading
            ? "Saving..."
            : mode === "edit"
            ? "Update Asset"
            : "Save Asset"}
        </button>

      </form>
    </div>
  );
};

export default AssetForm;