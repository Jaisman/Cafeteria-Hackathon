import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/Cart/CartContext";
import Navbarr from "./components/NavBar/Navbarr";
import Home from "./components/Home/home";
import Footer from "./components/Footer/footer";
import MenuPage from "./components/Menu/menu";
import Login from "./components/Login/login.jsx";
import SignUp from "./components/SignUp/signup.jsx";
import UserProfile from "./components/Profile/user.jsx";
import AddItem from "./components/Items/Form.jsx";
import ShoppingCart from "./components/Cart/ShoppingCart.jsx";
import ErrorPage from "./components/Error/error";
import AdminDashboard from "./components/Admin/AdminPage";
import AboutUs from "./components/About-Us/aboutpage";
import Info from "./components/Nut_N_Rev/Info";
import OtpVerify from "./components/Otp_verify/Otp_verify.jsx";
import axios from "axios";

const serverURL = "https://cafeteria-hackathon-gqvh.vercel.app";

function App() {
  const [Items, setItems] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsResponse, ordersResponse] = await Promise.all([
          axios.get(`${serverURL}/api/add-new/items`),
          axios.get(`${serverURL}/api/orders`),
        ]);

        setItems(itemsResponse.data);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CartProvider>
      <Router>
        <div className="main-body">
          <Navbarr />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add-items" element={<AddItem />} />
            <Route path="/about-us" element={<AboutUs />} />

            {/* Dynamic routes for items */}
            {Items.length > 0 &&
              Items.map((item) => (
                <Route
                  key={item._id}
                  path={`/info/${item._id}`}
                  element={<Info item={item} />}
                />
              ))}

            {/* Dynamic routes for orders */}
            {Orders.length > 0 &&
              Orders.map((order) => (
                <Route
                  key={order._id}
                  path={`/verify_otp/${order._id}`}
                  element={<OtpVerify order={order} />}
                />
              ))}

            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
