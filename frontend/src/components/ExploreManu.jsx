import React, { useContext } from "react";
import { Food_category } from "../assets/asset";
import { StoreContext } from "../context/ShoreContext";

const ExploreManu = () => {
  const { category, setCategory } = useContext(StoreContext);

  return (
    <section className="w-full py-8 md:py-12">

      {/* Heading Section */}
      <div className="text-center px-4">

        <span className="inline-block bg-red-50 text-red-600 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide">
          🍽️ DISCOVER OUR MENU
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          <span className="text-gray-900">
            Explore Our
          </span>
          <br />

          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
            Food Categories
          </span>
        </h1>

        <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-orange-400 rounded-full mx-auto mt-4"></div>

        <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto mt-5">
          Discover a world of delicious flavors, freshly prepared meals
          and premium quality ingredients. Find your favorite food
          and enjoy every bite with us.
        </p>

      </div>

      {/* Feature Tags */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 px-3">

        {[
          "🥬 Fresh Ingredients",
          "🚀 Fast Delivery",
          "🍽️ Hygienic Food",
          "⭐ Premium Quality",
        ].map((tag, index) => (
          <span
            key={index}
            className="bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-red-200 text-gray-600 text-[10px] sm:text-xs md:text-sm px-3 sm:px-4 py-2 rounded-full transition-all duration-300"
          >
            {tag}
          </span>
        ))}

      </div>

      {/* Category Section */}
      <div className="mt-9 sm:mt-12 px-3 sm:px-5">

        <div className="flex items-center justify-between mb-5 max-w-7xl mx-auto">

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Browse Categories
            </h2>

            <p className="text-gray-400 text-[10px] sm:text-xs mt-1">
              Choose your favorite food category
            </p>
          </div>

          <span className="text-red-500 text-xs sm:text-sm font-semibold">
            {Food_category.length} Categories
          </span>

        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-4 max-w-7xl mx-auto">

          {Food_category.map((item, index) => {

            const isActive = category === item.CategoryName;

            return (
              <div
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.CategoryName
                      ? "All"
                      : item.CategoryName
                  )
                }
                key={index}
                className="flex flex-col items-center group cursor-pointer"
              >

                {/* Category Image */}
                <div
                  className={`relative w-full aspect-square max-w-[100px] rounded-2xl sm:rounded-3xl p-1 overflow-hidden transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-br from-red-500 to-orange-400 shadow-lg shadow-red-200 scale-105"
                      : "bg-white border border-gray-100 shadow-sm group-hover:shadow-lg group-hover:border-red-200"
                  }`}
                >

                  <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden">

                    <img
                      src={item.categoryImage}
                      alt={item.CategoryName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute top-1.5 right-1.5 bg-white text-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow">
                      ✓
                    </div>
                  )}

                </div>

                {/* Category Name */}
                <p
                  className={`mt-2 sm:mt-3 text-[10px] sm:text-xs md:text-sm font-semibold text-center transition-colors duration-300 line-clamp-1
                  ${
                    isActive
                      ? "text-red-600"
                      : "text-gray-600 group-hover:text-red-500"
                  }`}
                >
                  {item.CategoryName}
                </p>

                {/* Active Underline */}
                <div
                  className={`h-0.5 rounded-full mt-1 transition-all duration-300
                  ${
                    isActive
                      ? "w-8 bg-red-500"
                      : "w-0 bg-red-500 group-hover:w-5"
                  }`}
                />

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default ExploreManu;