
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAsset } from "../../api/assets";

const API_URL = "http://localhost:8000";

const AssignAssetForm = ({ asset: initialAsset }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [asset, setAsset] = useState(initialAsset || null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [assignedDate, setAssignedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [loading, setLoading] = useState(!initialAsset);
  const [employeesLoading, setEmployeesLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch asset details
  useEffect(() => {
    if (initialAsset) {
      setAsset(initialAsset);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchAsset = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAsset(id);

        if (!cancelled) {
          setAsset(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Failed to load asset details."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchAsset();

    return () => {
      cancelled = true;
    };
  }, [id, initialAsset]);

  // Fetch employees from the backend, not localStorage
  useEffect(() => {
    let cancelled = false;

    const fetchEmployees = async () => {
      try {
        setEmployeesLoading(true);

        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Please log in again. Access token not found.");
        }

        const response = await fetch(`${API_URL}/employees/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const result = await response.json().catch(() => ({}));

          throw new Error(
            result.detail || `Failed to load employees (${response.status}).`
          );
        }

        const data = await response.json();

        if (!cancelled) {
          setEmployees(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load employees.");
        }
      } finally {
        if (!cancelled) {
          setEmployeesLoading(false);
        }
      }
    };

    fetchEmployees();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!asset) {
      setError("Asset details are not available.");
      return;
    }

    if (!selectedEmployeeId) {
      setError("Please select an employee.");
      return;
    }

    if (asset.status !== "Available") {
      setError("This asset is not available for assignment.");
      return;
    }

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please log in again. Access token not found.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(`${API_URL}/assignments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          asset_id: Number(asset.id),
          employee_id: selectedEmployeeId,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const detail = result.detail;

        const message = Array.isArray(detail)
          ? detail.map((item) => item.msg).join(", ")
          : detail || `Assignment failed (${response.status}).`;

        throw new Error(message);
      }

      setSuccess("Asset assigned successfully!");

      // Keep the local asset list consistent if it is used elsewhere.
      try {
        const savedAssets = JSON.parse(
          localStorage.getItem("assets") || "[]"
        );

        const updatedAssets = savedAssets.map((item) =>
          String(item.id) === String(asset.id)
            ? { ...item, status: "Assigned" }
            : item
        );

        localStorage.setItem("assets", JSON.stringify(updatedAssets));
      } catch {
        // The backend assignment succeeded; local cache updates are optional.
      }

      setTimeout(() => {
        navigate("/assets");
      }, 1000);
    } catch (err) {
      setError(err.message || "Something went wrong while assigning the asset.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading asset details...</p>;
  }

  if (!asset) {
    return (
      <div className="p-6">
        <p className="text-red-600">
          {error || "Asset not found."}
        </p>

        <button
          type="button"
          onClick={() => navigate("/assets")}
          className="mt-4 rounded bg-gray-700 px-4 py-2 text-white"
        >
          Back to Assets
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Assign Asset
        </h1>

        {/* Asset details */}
        <div className="mb-6 rounded-md bg-gray-50 p-4">
          <h2 className="mb-3 text-lg font-semibold text-gray-700">
            Asset Details
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <p>
              <span className="font-medium">Asset Code:</span>{" "}
              {asset.asset_code || "-"}
            </p>

            <p>
              <span className="font-medium">Asset Name:</span>{" "}
              {asset.asset_name || "-"}
            </p>

            <p>
              <span className="font-medium">Category:</span>{" "}
              {asset.category || "-"}
            </p>

            <p>
              <span className="font-medium">Brand:</span>{" "}
              {asset.brand || "-"}
            </p>

            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={
                  asset.status === "Available"
                    ? "font-semibold text-green-600"
                    : "font-semibold text-red-600"
                }
              >
                {asset.status || "-"}
              </span>
            </p>
          </div>
        </div>

        {/* Error and success messages */}
        {error && (
          <div
            role="alert"
            className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700"
          >
            {success}
          </div>
        )}

        {/* Assignment form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="employee"
              className="mb-2 block font-medium text-gray-700"
            >
              Select Employee
            </label>

            <select
              id="employee"
              value={selectedEmployeeId}
              onChange={(event) =>
                setSelectedEmployeeId(event.target.value)
              }
              disabled={employeesLoading || submitting}
              required
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            >
              <option value="">
                {employeesLoading
                  ? "Loading employees..."
                  : "Choose an employee"}
              </option>

              {employees
                .filter((employee) => employee.status === "Active")
                .map((employee) => (
                  <option
                    key={employee.id}
                    value={employee.id}
                  >
                    {employee.employee_code} - {employee.name}
                  </option>
                ))}
            </select>

            {!employeesLoading && employees.length === 0 && (
              <p className="mt-2 text-sm text-gray-500">
                No employees were returned by the API.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="assignedDate"
              className="mb-2 block font-medium text-gray-700"
            >
              Assignment Date
            </label>

            <input
              id="assignedDate"
              type="date"
              value={assignedDate}
              onChange={(event) => setAssignedDate(event.target.value)}
              required
              disabled={submitting}
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={
                submitting ||
                employeesLoading ||
                !selectedEmployeeId ||
                asset.status !== "Available"
              }
              className="rounded-md bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Assigning..." : "Assign Asset"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/assets")}
              disabled={submitting}
              className="rounded-md border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignAssetForm;
