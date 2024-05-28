import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";

const Header = () => {
  return (
    <header className="bg-cyan-700 text-white container mx-auto flex justify-between items-center py-6 px-6">
      <nav>
        <Link to="/" className="text-white inline-flex text-lg hover:underline">
          <TiHome className="mr-2 mt-1 text-lg"/>
          Home
        </Link>
      </nav>
      <h1 className="text-3xl font-bold">Transport Guide</h1>
    </header>
  );
};

export default Header;
