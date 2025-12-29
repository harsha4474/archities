import logoImage from '../T sHIRT2_.png';

const Logo = ({ className = "h-10", color = "current" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${color === "white" ? "bg-white/95 backdrop-blur-sm" : "bg-transparent"} rounded-lg px-3 py-2 transition-all duration-300`}>
        <img
          src={logoImage}
          alt="Archities - Architects & Interior Designers"
          className="h-10 sm:h-12 md:h-14 w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Logo;
