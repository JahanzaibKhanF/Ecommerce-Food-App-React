import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Search from "./pages/Search";
import Product from "./pages/Product";
import Profile from "./components/Profile";
import Checkout from "./components/Checkout";

function App() {
  return (
    <div className="bg-gray-50 ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="/product/:category/:id" element={<Product />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
