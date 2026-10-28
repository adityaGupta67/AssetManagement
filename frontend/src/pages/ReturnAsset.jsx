import React from "react";
import { useParams } from "react-router-dom";
import ReturnAssetForm from "../components/assets/ReturnAssetForm";

const ReturnAsset = () => {
  const { id } = useParams();

  const assets =
    JSON.parse(localStorage.getItem("assets")) || [];

  const asset = assets.find((asset) => asset.id === id);

  if (!asset) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Asset Not Found
        </h2>
        <p className="mt-2 text-gray-600">
          The asset you are trying to return does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ReturnAssetForm asset={asset} />
    </div>
  );
};

export default ReturnAsset;