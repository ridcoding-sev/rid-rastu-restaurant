import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccess("");
      setError("");

      const response = await axios.post(
        "http://localhost:4000/api/form/submit",
        formData
      );

      if (response.data.success) {
        setSuccess("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setError("Failed to send message!");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-20">

      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-800">
          Contact Us
        </h1>

        <p className="text-gray-600 mt-4">
          We are always here to help you. Send us a message anytime.
        </p>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

        {/* LEFT INFO */}
        <div className="space-y-8">

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold text-orange-500">📍 Address</h2>
            <p className="text-gray-600 mt-2">Dhaka, Bangladesh</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold text-orange-500">📞 Phone</h2>
            <p className="text-gray-600 mt-2">+880 1XXX-XXXXXX</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold text-orange-500">📧 Email</h2>
            <p className="text-gray-600 mt-2">support@foodapp.com</p>
          </div>

          <div className="bg-orange-500 text-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold">24/7 Support</h2>
            <p className="mt-2">We are always ready to help you</p>
          </div>

        </div>

        {/* FORM */}
        <div className="bg-white p-10 rounded-3xl shadow-2xl">

          <h2 className="text-3xl font-bold mb-8">
            Send Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-4 border rounded-xl focus:outline-orange-500"
              required
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-4 border rounded-xl focus:outline-orange-500"
              required
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-4 border rounded-xl focus:outline-orange-500"
            />

            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full p-4 border rounded-xl focus:outline-orange-500"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full p-4 border rounded-xl focus:outline-orange-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p className="text-green-600 text-center mt-3">
                {success}
              </p>
            )}

            {error && (
              <p className="text-red-500 text-center mt-3">
                {error}
              </p>
            )}

          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;