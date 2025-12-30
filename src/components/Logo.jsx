import logoImage from '../T sHIRT2_.png';

const Logo = ({ className = "h-10", color = "current" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoImage}
        alt="Archities - Architects & Interior Designers"
        className="h-20 sm:h-24 md:h-28 w-auto object-contain"
      />
    </div>
  );
};

export default Logo;
