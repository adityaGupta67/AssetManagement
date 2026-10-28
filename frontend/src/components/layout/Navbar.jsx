import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo / Brand Name */}
        <Link to="/" className="text-xl font-bold tracking-wide hover:text-gray-300 transition-colors">
          AssetManager
        </Link>

        {/* Navigation Links with the wider spacing */}
        <div className="flex space-x-12">
          <Link to="/" className="hover:text-gray-300 transition-colors">
            Dashboard
          </Link>
          <Link to="/employees" className="hover:text-gray-300 transition-colors">
            Employees
          </Link>
          <Link to="/assets" className="hover:text-gray-300 transition-colors">
            Assets
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;