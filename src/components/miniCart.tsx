import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { useCart } from "@/hooks/useCart"

const MiniCart = () => {
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Button asChild variant='ghost'>
      <Link to="/cart">
        <ShoppingCart /> Cart <Badge>{itemCount}</Badge>
      </Link>
    </Button>
  )
}

export default MiniCart
