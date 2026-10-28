import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import AssetTable from "../components/assets/AssetTable";
import AssetToolBar from "../components/assets/AssetToolBar";

import { getAssets, deleteAsset } from "../api/assets";

const Assets = () => {
  const [searchParams] = useSearchParams();

  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "All"
  );

  const [categoryFilter, setCategoryFilter] = useState(
    searchParams.get("category") || "All"
  );

  const [sortBy, setSortBy] = useState("name");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAssets();

        setAssets(data);
      } catch (error) {
        console.error("Failed to load assets:", error);

        setError(
          error.message || "Failed to load assets"
        );
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, []);

  // ----------------------------------
  // DELETE ASSET
  // ----------------------------------

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this asset?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError(""); 

      await deleteAsset(id);

      // Remove deleted asset from React state
      setAssets((currentAssets) =>
        currentAssets.filter(
          (asset) => asset.id !== id
        )
      );

    } catch (error) {
      console.error("Failed to delete asset:", error);

      setError(
        error.message || "Failed to delete asset"
      );
    }
  };

  const filteredAssets = assets.filter((asset) => {
    const assetName =
      asset.asset_name || "";

    const matchesSearch =
      assetName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      asset.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All" ||
      asset.category === categoryFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory
    );
  });

  const sortedAssets = [...filteredAssets].sort(
    (a, b) => {
      switch (sortBy) {
        case "name":
          return (
            (a.asset_name || "").localeCompare(
              b.asset_name || ""
            )
          );

        case "category":
          return (
            (a.category || "").localeCompare(
              b.category || ""
            )
          );

        case "purchaseCost":
          return (
            Number(a.purchase_cost || 0) -
            Number(b.purchase_cost || 0)
          );

        case "purchaseDate":
          return (
            new Date(a.purchase_date) -
            new Date(b.purchase_date)
          );

        case "status":
          return (
            (a.status || "").localeCompare(
              b.status || ""
            )
          );

        default:
          return 0;
      }
    }
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Loading assets...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4">

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      <AssetToolBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}

        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}

        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}

        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <AssetTable
        assets={sortedAssets}
        onDelete={handleDelete}
      />

    </div>
  );
};

export default Assets;