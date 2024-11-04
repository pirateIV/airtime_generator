const TempButtonSwitcher = () => {
  return (
    <>
      {["°F", "°C"].map((temp) => (
        <button key={temp} type="button" className="block size-7 rounded-full ">
          {temp}
        </button>
      ))}
    </>
  );
};

export default TempButtonSwitcher;
