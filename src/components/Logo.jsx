const Logo = ({ className = "h-10", color = "current" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <h1 className={`text-2xl font-bold tracking-wide ${color === "white" ? "text-white" : "text-deep-blue"}`}>
        <span className={color === "white" ? "text-white" : "text-premium-red"}>ARCHI</span>
        <span className={color === "white" ? "text-white" : "text-deep-blue"}>TIES</span>
      </h1>
    </div>
  );
};

export default Logo;
