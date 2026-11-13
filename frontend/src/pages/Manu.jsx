import React, { useState, useContext } from "react";
import { assets } from "../assets/asset";
import FoodCard from "../components/FoodCard";
import { StoreContext } from "../context/ShoreContext";

const Menu = () => {
  const [search, setSearch] = useState("");

  const { Food_item } = useContext(StoreContext);

  const isSearching = search.trim() !== "";

  const filterItems = (categoryName) => {
    return (Food_item || []).filter((item) => {
      const keyword = search.toLowerCase();

      const name = item.name?.toLowerCase() || "";
      const category = item.category?.toLowerCase() || "";
      const description = item.description?.toLowerCase() || "";

      const availability = item.isAvailable ? "available" : "not available";
      const vegStatus = item.isVeg ? "veg vegetarian" : "non veg nonveg";

      const searchableText = `
        ${name}
        ${category}
        ${description}
        ${availability}
        ${vegStatus}
      `;

      return (
        item.category === categoryName &&
        searchableText.includes(keyword)
      );
    });
  };

  // 👉 global search (when user types)
  const searchResults = (Food_item || []).filter((item) => {
    if (!isSearching) return false;

    const keyword = search.toLowerCase();

    return (
      item.name?.toLowerCase().includes(keyword) ||
      item.category?.toLowerCase().includes(keyword) ||
      item.description?.toLowerCase().includes(keyword)
    );
  });

  const categories = [
    "Biriyani",
    "Drink & Juice",
    "Fast Food",
    "Fish Item",
    "Khichuri",
    "Meat",
    "Sweet",
    "Vegetable",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Search Box */}
      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-md max-w-xl mx-auto mb-12">
        <img src={assets.SearchImage} alt="" className="w-5 h-5 ml-4" />

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 outline-none"
        />
      </div>

      {/* ================= SEARCH MODE ================= */}
      {isSearching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <FoodCard key={item._id} {...item} id={item._id} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No food found
            </p>
          )}
        </div>
      ) : (
        /* ================= NORMAL MENU ================= */
        categories.map((cat) => (
          <div key={cat}>
            <h3 className="text-2xl font-bold mb-6 border-l-4 border-orange-500 pl-3">
              {cat}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {filterItems(cat).map((item) => (
                <FoodCard key={item._id} {...item} id={item._id} />
              ))}
            </div>
          </div>
        ))
      )}

    </div>
  );
};

export default Menu;