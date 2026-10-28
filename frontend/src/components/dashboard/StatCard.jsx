const StatCard = ({
  title,
  value,
  icon,
  color = "bg-white",
}) => {
  return (
    <div
      className={`
        ${color}
        rounded-xl
        shadow-md
        p-6
        hover:shadow-xl
        hover:scale-105
        transition-all
        duration-300
      `}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-white">
            {title}
          </h3>

          <p className="text-3xl font-bold text-white mt-2">
            {value}
          </p>
        </div>

        <div className="bg-white/20 p-3 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;