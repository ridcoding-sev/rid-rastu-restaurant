import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./page/Home";
import Add from "./page/Add";
import List from "./page/List";
import Order from "./page/Order";
import FormList from "./page/FormList";

// Payment Components
import CompletePayment from "./components/CancelOrders";
import CanclePayment from "./components/CancelOrders";

// Login Page
import Login from "./components/Login";

// Context
import { AdminContext } from "./context/AdminContext";

export const backendUrl = import.meta.env.VITE_BACKEND_URI;

const App = () => {
  const { token } = useContext(AdminContext);

  return (
    <>
      <ToastContainer />

      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="bg-gray-50 min-h-screen">
                <Navbar />

                <hr />

                <div className="flex w-full">
                  <Sidebar />

                  <div className="w-full mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                    <Routes>
                      <Route path="/" element={<Home />} />

                      <Route path="/add" element={<Add />} />

                      <Route path="/list" element={<List />} />

                      <Route path="/order" element={<Order />} />

                      <Route path="/formlist" element={<FormList />} />

                      <Route
                        path="/completeprement"
                        element={<CompletePayment />}
                      />

                      <Route
                        path="/canclepayment"
                        element={<CanclePayment />}
                      />
                    </Routes>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
