import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import MiniCart from "./miniCart";

const Header = () => {
  return (
    <header className="w-full border-b p-4">
      <div className="flex justify-between items-center">
        <div className="flex-start">
          <div className="text-2xl font-bold">Mini Madison</div>
        </div>
        <div className="space-x-2 flex items-center">
          <Button asChild variant='ghost'>
            <Link to="/">
              Products
            </Link>
          </Button>
          <MiniCart />
        </div>
      </div>
    </header>
  )
}

export default Header
