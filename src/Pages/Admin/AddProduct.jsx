import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import Food from "../../assets/Images/food.svg";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

function AddProduct() {
  const navigate = useNavigate();

  // 🔹 STATE (logic added)
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    price: "",
    quantity: "",
    category: "veg",
    productImage: null,
  });

  // 🔹 HANDLE CHANGE (logic added)
  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "productImage") {
      setProductData({ ...productData, productImage: files[0] });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  }

  // 🔹 HANDLE SUBMIT (logic added)
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
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully");
      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to add product"
      );
    }
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="flex flex-col md:flex-row items-center justify-center px-5">
          
          {/* LEFT IMAGE */}
          <div className="md:w-2/6 mb-6 md:mb-0">
            <img src={Food} alt="Add product" />
          </div>

          {/* RIGHT FORM (LOGIC ADDED) */}
          <div className="max-w-md md:w-4/6 mx-auto bg-white p-6 rounded shadow">
            <h2 className="mb-4 text-2xl font-semibold text-center">
              Add Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <input
                type="text"
                name="productName"
                placeholder="Product name"
                className="w-full border p-2 rounded"
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="description"
                placeholder="Description"
                className="w-full border p-2 rounded"
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                className="w-full border p-2 rounded"
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="w-full border p-2 rounded"
                onChange={handleChange}
                required
              />

              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
                <option value="drinks">Drinks</option>
                <option value="sides">Sides</option>
              </select>

              <input
                type="file"
                name="productImage"
                accept=".jpg,.jpeg,.png"
                className="w-full"
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AddProduct;
