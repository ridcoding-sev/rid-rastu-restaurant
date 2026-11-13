import React, { useState } from "react";
import { asserts } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const AddProduct = () => {
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    veg: false,
    available: true,
    nonVeg: true,
    nonAvailable: false,
  });

  // =========================
  // INPUT CHANGE HANDLER
  // =========================
  const onChangeHandler = (event) => {
    const name = event.target.name;

    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      // Veg / NonVeg Logic
      if (name === "veg") {
        updatedData.nonVeg = !value;
      }

      // Available / NonAvailable Logic
      if (name === "available") {
        updatedData.nonAvailable = !value;
      }

      return updatedData;
    });
  };

  // =========================
  // FORM SUBMIT
  // =========================
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);

      // ✅ FIXED (backend expects these names)
      formData.append("isVeg", data.veg);
      formData.append("isAvailable", data.available);

      formData.append("image", image);

      const response = await axios.post(backendUrl + "/api/food/add", formData);

      if (response.data.success) {
        toast.success(response.data.message);

        // Reset Form
        setData({
          name: "",
          description: "",
          price: "",
          category: "",
          veg: false,
          available: true,
          nonVeg: true,
          nonAvailable: false,
        });

        setImage(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h1>

      {/* Form Box */}
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-6 rounded-2xl shadow-lg space-y-5"
      >
        {/* Name */}
        <input
          name="name"
          value={data.name}
          onChange={onChangeHandler}
          type="text"
          placeholder="Food Name"
          required
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Description */}
        <textarea
          name="description"
          value={data.description}
          onChange={onChangeHandler}
          placeholder="Description"
          required
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Price + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Price */}
          <input
            name="price"
            value={data.price}
            onChange={onChangeHandler}
            type="number"
            placeholder="Price"
            required
            className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
          />

          {/* Category */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-center font-medium text-gray-600">
              Product Category
            </p>

            <select
              required
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              className="w-full p-3 border border-gray-300 rounded-xl bg-white outline-none cursor-pointer focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            >
              <option value="">Select Category</option>
              <option value="Biriyani">Biriyani</option>
              <option value="Drink & Juice">Drink & Juice</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Fish Item">Fish Item</option>
              <option value="Khichuri">Khichuri</option>
              <option value="Meat">Meat</option>
              <option value="Sweet">Sweet</option>
              <option value="Vegetable">Vegetable</option>
            </select>
          </div>
        </div>

        {/* Toggle Options */}
        <div className="flex gap-6 flex-wrap">
          {/* Veg */}
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              name="veg"
              checked={data.veg}
              onChange={onChangeHandler}
            />
            Veg
          </label>

          {/* Non Veg */}
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              name="nonVeg"
              checked={data.nonVeg}
              readOnly
            />
            Non Veg
          </label>

          {/* Available */}
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              name="available"
              checked={data.available}
              onChange={onChangeHandler}
            />
            Available
          </label>

          {/* Non Available */}
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              name="nonAvailable"
              checked={data.nonAvailable}
              readOnly
            />
            Non Available
          </label>
        </div>

        {/* Image Upload */}
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center cursor-pointer hover:bg-gray-50 transition flex flex-col items-center justify-center">
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <img
              className="w-16 h-16 object-contain"
              src={image ? URL.createObjectURL(image) : asserts.uploadImage}
              alt="upload"
            />

            <p className="text-gray-500 text-sm">Upload Food Image</p>
          </label>

          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
            accept="image/*"
          />
        </div>

        {/* Submit Button */}
        <button className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all cursor-pointer">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
