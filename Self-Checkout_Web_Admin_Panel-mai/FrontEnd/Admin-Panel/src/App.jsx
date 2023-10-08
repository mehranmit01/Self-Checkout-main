import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import SidePanel from "./Components/SidePanel/SidePanel";
//import "./index.css";
//import "./custom.css";
import AddProduct from "./pages/AddProduct/AddProduct";
import Customers from "./pages/Customers/Customers";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Order from "./pages/Orders/Order";
import Product from "./pages/Products/Product";
import UpdateProduct from "./pages/UpdateProduct/updateProduct";
// import updateProduct from "./pages/UpdateProduct/updateProduct";

const MainContent = () => {
  const location = useLocation();
  const showHeader = [
    "/dashboard",
    "/addproduct",
    "/customer",
    "/product",
    "/order",
    // "/updateProduct",
  ].includes(location.pathname);

  return (
    <>
      {showHeader && <SidePanel />}
      <main>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/customer" element={<Customers />} />
          <Route path="/product" element={<Product />} />
          <Route path="/order" element={<Order />} />
          <Route path="/updateProduct/:Id" element={<UpdateProduct />} />
          {/* <Route path="/updateProduct" element={<updateProduct/>} /> */}
        </Routes>
      </main>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
};

export default App;
