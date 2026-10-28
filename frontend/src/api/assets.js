import { apiRequest } from "./client";

export function getAssets() {
  return apiRequest("/assets/");
}

export function getAsset(id) {
  return apiRequest(`/assets/${id}`);
}

export function createAsset(asset) {
  return apiRequest("/assets/", {
    method: "POST",
    body: JSON.stringify(asset),
  });
}

export function updateAsset(id, asset) {
  return apiRequest(`/assets/${id}`, {
    method: "PUT",
    body: JSON.stringify(asset),
  });
}

export function deleteAsset(id) {
  return apiRequest(`/assets/${id}`, {
    method: "DELETE",
  });
}

export function assignAsset(id, employeeId, assignedDate) {
  return apiRequest(`/assets/${id}/assign`, {
    method: "POST",
    body: JSON.stringify({
      employee_id: Number(employeeId),
      assigned_date: assignedDate,
    }),
  });
}