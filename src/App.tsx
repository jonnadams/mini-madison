import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsList from "./pages/productsList";
import Cart from "./pages/cart";
import Header from "@/components/header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container mx-auto py-4">
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
