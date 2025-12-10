import { Link } from "react-router-dom";
import MiniCart from "./miniCart";

const Header = () => {
  return (
    <header className="w-full border-b p-4">
      <div className="flex justify-between items-center">
        <div className="flex-start">
          <Link to="/"><div className="text-2xl font-bold">Mini Madison</div></Link>
        </div>
        <div className="space-x-2 flex items-center">
          {/* Use a simple Link for navigation instead of a Button */}
          <Link className="px-4 py-2 rounded hover:bg-accent transition-colors" to="/">
            Products
          </Link>
          <MiniCart />
        </div>
      </div>
    </header>
  )
}

export default Header
