import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import Food from "../../assets/Images/food.svg";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

function AddProduct() {
  const navigate = useNavigate();
  
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    price: "",
    quantity: "",
    category: "veg",
    productImage: null,
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "productImage") {
      setProductData({ ...productData, productImage: files[0] });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("productName", productData.productName);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("quantity", productData.quantity);
      formData.append("category", productData.category);
      formData.append("productImage", productData.productImage);

      await axiosInstance.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product added successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add product");
    }
  }

  return (
    <Layout>
      <section className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-orange-100 py-16 px-4">

        {/* Page heading */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-orange-400">
            Admin Panel
          </span>
          <h1 className="mt-2 text-4xl font-black text-gray-900 tracking-tight">
            Add New Product
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Fill in the details below to list a new item on the menu
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-5xl mx-auto">

          {/* LEFT — illustration */}
          <div className="md:w-2/5 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-200/50 rounded-full blur-3xl scale-110" />
              <img
                src={Food}
                alt="Add product"
                className="relative z-10 w-64 drop-shadow-xl md:w-80"
              />
            </div>
            {/* decorative badges */}
            <div className="flex gap-3 mt-2">
              {["🍕 Pizza", "🥤 Drinks", "🥗 Veg", "🍗 Non-Veg"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white border border-orange-100 rounded-full text-xs font-semibold text-orange-600 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — form card */}
          <div className="w-full md:w-3/5 max-w-lg">
            <div className="bg-white rounded-3xl shadow-xl shadow-orange-100/60 border border-orange-50 overflow-hidden">

              {/* Card header strip */}
              <div className="bg-linear-to-r from-orange-500 to-amber-400 px-8 py-5">
                <h2 className="text-xl font-black text-white tracking-tight">
                  Product Details
                </h2>
                <p className="text-orange-100 text-xs mt-0.5">
                  All fields marked are required
                </p>
              </div>

              <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">

                {/* Product Name */}
                <div className="group">
                  <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1.5">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    placeholder="e.g. Margherita Pizza"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white transition-all duration-200"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1.5">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Short description of the product"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white transition-all duration-200"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Price + Quantity row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1.5">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="0"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white transition-all duration-200"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1.5">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      placeholder="0"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white transition-all duration-200"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1.5">
                    Category
                  </label>
                  <select
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white transition-all duration-200 cursor-pointer"
                  >
                    <option value="veg">🥗 Vegetarian</option>
                    <option value="non-veg">🍗 Non-Vegetarian</option>
                    <option value="drinks">🥤 Drinks</option>
                    <option value="sides">🍟 Sides</option>
                  </select>
                </div>

                {/* Product Image */}
                <div>
                  <label
                    htmlFor="productImage"
                    className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1.5"
                  >
                    Product Image{" "}
                    <span className="normal-case tracking-normal font-normal text-orange-400">
                      (.jpg, .png, .jpeg)
                    </span>
                  </label>
                  <label
                    htmlFor="productImage"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 border-dashed border-orange-200 bg-orange-50/50 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 cursor-pointer group"
                  >
                    <span className="text-2xl">📷</span>
                    <span className="text-sm text-gray-400 group-hover:text-orange-500 transition-colors duration-200">
                      {productData.productImage
                        ? productData.productImage.name
                        : "Click to upload image"}
                    </span>
                  </label>
                  <input
                    type="file"
                    required
                    name="productImage"
                    id="productImage"
                    className="hidden"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleChange}
                  />
                </div>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-orange-100 to-transparent" />

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-linear-to-r from-orange-500 to-amber-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                >
                  🚀 Add Product
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}

export default AddProduct;
