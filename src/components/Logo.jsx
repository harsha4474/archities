const Logo = ({ className = "h-10", color = "current" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-10 h-10">
        {/* Circle border */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke={color === "white" ? "#ffffff" : "#002D62"}
            strokeWidth="3"
          />
        </svg>
        {/* A icon in the center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-6 h-6">
            {/* Red part of A */}
            <path
              d="M 30 70 L 50 20 L 60 45 Z"
              fill="#C8102E"
            />
            {/* Blue part of A */}
            <path
              d="M 60 45 L 70 70 L 50 70 L 45 55 Z"
              fill="#002D62"
            />
          </svg>
        </div>
      </div>
      <span className={`text-xl font-bold tracking-tight ${color === "white" ? "text-white" : "text-deep-blue"}`}>
        ARCHITIES
      </span>
    </div>
  );
};

export default Logo;
