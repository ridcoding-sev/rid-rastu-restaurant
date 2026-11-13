import React, { useContext } from "react";
import { assets } from "../assets/asset";
import { StoreContext } from "../context/ShoreContext";

const FoodCard = ({
  id,
  name,
  price,
  description,
  image,
  isVeg,
  isAvailable,
}) => {
  const { addToCart, backendUrl } = useContext(StoreContext);

  return (
    <div className="group w-full min-w-0 bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* Image Section */}
      <div className="relative overflow-hidden">

        <img
          src={
            image?.startsWith("http")
              ? image
              : backendUrl + "/images/" + image
          }
          alt={name}
          className="w-full h-28 sm:h-44 md:h-48 lg:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Available Badge */}
        <div
          className={`absolute top-1.5 left-1.5 sm:top-3 sm:left-3 text-white text-[8px] sm:text-[10px] px-2 sm:px-3 py-1 rounded-full font-semibold shadow-sm
          ${
            isAvailable
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {isAvailable ? "Available" : "Not Available"}
        </div>

        {/* Veg Badge */}
        <div
          className={`absolute top-1.5 right-1.5 sm:top-3 sm:right-3 text-white text-[8px] sm:text-[10px] px-2 sm:px-3 py-1 rounded-full font-semibold shadow-sm
          ${
            isVeg
              ? "bg-green-600"
              : "bg-orange-500"
          }`}
        >
          {isVeg ? "Veg" : "Non-Veg"}
        </div>

      </div>

      {/* Content Section */}
      <div className="p-2 sm:p-4 md:p-5 flex flex-col gap-1.5 sm:gap-2">

        {/* Name */}
        <h3 className="text-[11px] sm:text-base md:text-lg font-bold text-gray-800 text-center line-clamp-1">
          {name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-[9px] sm:text-xs md:text-sm leading-4 sm:leading-5 text-center line-clamp-2">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-center gap-0.5 sm:gap-1 mt-0.5">

          {[1, 2, 3, 4, 5].map((star) => (
            <img
              key={star}
              src={assets.StarIcon}
              alt="Star"
              className="w-2.5 h-2.5 sm:w-4 sm:h-4"
            />
          ))}

        </div>

        {/* Price + Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-2 mt-1 sm:mt-3">

          {/* Price */}
          <p className="text-orange-500 font-bold text-xs sm:text-sm md:text-base text-center sm:text-left">

            ৳ {price}

          </p>

          {/* Add To Cart */}
          <button
            onClick={() => addToCart(id)}
            className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-md sm:rounded-lg text-[9px] sm:text-sm font-semibold transition-all duration-300 w-full sm:w-auto shadow-sm hover:shadow-md"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
};

export default FoodCard;