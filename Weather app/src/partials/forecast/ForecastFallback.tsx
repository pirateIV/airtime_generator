const ForecastFallback = () => {
  return Array(7)
    .fill(null)
    .map((_, i) => (
      <div
        key={i}
        className="w-[95px] h-[108px] bg-white rounded-2xl p-3 flex flex-col justify-between"
      >
        <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-11 h-11 mx-auto bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    ));
};

export default ForecastFallback;
