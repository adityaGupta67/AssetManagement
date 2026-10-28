import { useNavigate } from "react-router-dom";

const AssetTable = ({
  assets = [],
  onDelete,
}) => {

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="border-b bg-gray-100">

            <th className="text-left p-3">
              Asset Code
            </th>

            <th className="text-left p-3">
              Asset Name
            </th>

            <th className="text-left p-3">
              Category
            </th>

            <th className="text-left p-3">
              Status
            </th>

            <th className="text-left p-3">
              Assigned To
            </th>

            <th className="text-left p-3">
              Actions
            </th>

          </tr>
        </thead>

        <tbody>

          {assets.length > 0 ? (

            assets.map((asset) => (

              <tr
                key={asset.id}
                className="border-b hover:bg-gray-50"
              >

                {/* Asset Code */}
                <td className="p-3">
                  {asset.asset_code}
                </td>

                {/* Asset Name */}
                <td className="p-3">
                  {asset.asset_name}
                </td>

                {/* Category */}
                <td className="p-3">
                  {asset.category}
                </td>

                {/* Status */}
                <td className="p-3">

                  <span
                    className={`
                      px-3 py-1
                      rounded-full
                      text-sm
                      font-medium

                      ${
                        asset.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : asset.status === "Assigned"
                          ? "bg-blue-100 text-blue-700"
                          : asset.status === "Repair"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {asset.status}
                  </span>

                </td>

                {/* Assigned Employee */}
                <td className="p-3">
                  {asset.assigned_employee_name || "-"}
                </td>

                {/* Actions */}
                <td className="p-3">

                  <div className="flex flex-wrap gap-2">

                    {/* VIEW */}

                    <button
                      onClick={() =>
                        navigate(
                          `/view-asset/${asset.id}`
                        )
                      }
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg"
                    >
                      View
                    </button>


                    {/* EDIT */}

                    <button
                      onClick={() =>
                        navigate(
                          `/edit-asset/${asset.id}`
                        )
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
                    >
                      Edit
                    </button>


                    {/* ASSIGN */}

                    {asset.status === "Available" && (

                      <button
                        onClick={() =>
                          navigate(
                            `/assign-asset/${asset.id}`
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                      >
                        Assign
                      </button>

                    )}


                    {/* RETURN */}

                    {asset.status === "Assigned" && (

                      <button
                        onClick={() =>
                          navigate(
                            `/return-asset/${asset.id}`
                          )
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg"
                      >
                        Return
                      </button>

                    )}


                    {/* DELETE */}

                    <button
                      onClick={() =>
                        onDelete(asset.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="6"
                className="text-center py-6 text-gray-500"
              >
                No assets found.
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};

export default AssetTable;