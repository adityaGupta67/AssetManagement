export const logActivity = (action, assetName) => {
  const activities =
    JSON.parse(localStorage.getItem("activities")) || [];

  const newActivity = {
    id: Date.now(),
    action,
    assetName,
    time: new Date().toLocaleString(),
  };

  activities.unshift(newActivity);

  // Keep only the latest 10 activities
  localStorage.setItem(
    "activities",
    JSON.stringify(activities.slice(0, 10))
  );
};