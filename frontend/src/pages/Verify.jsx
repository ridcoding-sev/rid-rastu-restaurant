import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/ShoreContext";

const Verify = () => {
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { backendUrl } = useContext(StoreContext);

  const token = localStorage.getItem("token"); // ✅ FIX

  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/verify",
        {
          success,
          orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      navigate("/cart");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h2>Verifying payment, please wait...</h2>
    </div>
  );
};

export default Verify;