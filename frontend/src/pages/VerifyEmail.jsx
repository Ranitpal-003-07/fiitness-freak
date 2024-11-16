import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState({ loading: true, message: "", success: false });

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/api/users/verify-email/${token}`);
        setStatus({ loading: false, message: response.data.message, success: true });
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
        setStatus({ loading: false, message: errorMessage, success: false });
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      {status.loading ? (
        <h1 className="text-3xl font-semibold text-blue-500">Verifying Email...</h1>
      ) : (
        <div
          className={`p-6 rounded-lg shadow-lg ${
            status.success ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"
          }`}
        >
          <h1
            className={`text-4xl font-bold ${
              status.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.message}
          </h1>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
