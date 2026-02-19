import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),

  // ⭐ Fetch by category (PUBLIC)
  fetchProductsByCategory: async (category) => {
    try {
      set({ loading: true, error: null });

      const response = await axiosInstance.get(
        `/products/category/${category}`
      );

      set({
        products: response.data.products,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({
        error: "Failed to fetch products",
        loading: false,
      });
    }
  },

  // ⭐ Featured products (PUBLIC)
  fetchFeaturedProducts: async () => {
    try {
      set({ loading: true, error: null });

      const response = await axiosInstance.get("/products/featured");

      set({
        products: response.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: "Failed to fetch products",
        loading: false,
      });
    }
  },
}));
