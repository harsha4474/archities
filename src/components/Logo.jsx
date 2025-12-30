import logoImage from '../T sHIRT2_.png';

const Logo = ({ className = "h-10", color = "current" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoImage}
        alt="Archities - Architects & Interior Designers"
        className="h-14 sm:h-16 md:h-20 w-auto object-contain"
      />
    </div>
  );
};

export default Logo;
