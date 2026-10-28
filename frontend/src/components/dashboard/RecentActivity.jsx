  const RecentActivity = ({ activities }) => {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">
          Recent Activity
        </h2>

        {activities.length === 0 ? (
          <p className="text-gray-500">
            No recent activity.
          </p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="border-b pb-3 last:border-none"
              >
                <p className="font-medium">
                  {activity.action} asset{" "}
                  <span className="text-blue-600">
                    {activity.assetName}
                  </span>
                </p>

                <p className="text-sm text-gray-500">
                  {activity.time}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default RecentActivity;