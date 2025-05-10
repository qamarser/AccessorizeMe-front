// import React, { useEffect, useState } from "react";
// import { useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { fetchAllProducts } from "../api/productApi";
// import { fetchAllCategories } from "../api/categoryApi";
// import { Heart, ShoppingCart } from "lucide-react";
// import { addToCart } from "../api/cart";
// import { toast } from "react-toastify";
// import { useCart } from "../context/CartContext";
// import { addToWishlist } from "../api/wishlistApi";
// import "../styling/Shop.css";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// const Shop = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { refreshCart } = useCart();
//   const lastSearchRef = useRef("");

//   // Unified filters state
//   const [filters, setFilters] = useState({
//     search: "",
//     minPrice: 0,
//     maxPrice: 1000,
//     categoryId: null,
//   });

//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(true);

//   // Debounce timer for search input
//   const [debounceTimer, setDebounceTimer] = useState(null);

//   // Fetch categories on mount
//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const data = await fetchAllCategories();
//         setCategories(data);
//       } catch (err) {
//         console.error("Failed to load categories", err);
//       }
//     };
//     loadCategories();
//   }, []);

//   // Parse URL query params to sync filters on mount and location change
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const search = params.get("search") || "";
//     const minPrice = params.get("minPrice") ? Number(params.get("minPrice")) : 0;
//     const maxPrice = params.get("maxPrice") ? Number(params.get("maxPrice")) : 1000;
//     const categoryId = params.get("category") ? Number(params.get("category")) : null;

//     // Only update filters if different to avoid infinite loop
//     setFilters((prevFilters) => {
//       if (
//         prevFilters.search !== search ||
//         prevFilters.minPrice !== minPrice ||
//         prevFilters.maxPrice !== maxPrice ||
//         prevFilters.categoryId !== categoryId
//       ) {
//         return { search, minPrice, maxPrice, categoryId };
//       }
//       return prevFilters;
//     });
//   }, [location.search]);

//   // Update URL query params when filters change
//   useEffect(() => {
//     const params = new URLSearchParams();

//     if (filters.search) params.set("search", filters.search);
//     if (filters.minPrice !== 0) params.set("minPrice", filters.minPrice.toString());
//     if (filters.maxPrice !== 1000) params.set("maxPrice", filters.maxPrice.toString());
//     if (filters.categoryId !== null) params.set("category", filters.categoryId.toString());

//     const newSearch = params.toString();

//     if (newSearch !== lastSearchRef.current) {
//       lastSearchRef.current = newSearch;
//       navigate(
//         {
//           pathname: "/shop",
//           search: newSearch,
//         },
//         { replace: true }
//       );
//     }
//   }, [filters, navigate]);

//   // Fetch products when filters change (debounced for search)
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoadingProducts(true);
//         const query = {
//           search: filters.search,
//           minPrice: filters.minPrice,
//           maxPrice: filters.maxPrice,
//         };
//         let productsData = [];
//         if (filters.categoryId) {
//           productsData = await fetchAllProducts({ ...query, category: filters.categoryId });
//         } else {
//           productsData = await fetchAllProducts(query);
//         }
//         setProducts(productsData);
//       } catch (error) {
//         console.error("Error loading products", error);
//       } finally {
//         setLoadingProducts(false);
//       }
//     };

//     if (debounceTimer) clearTimeout(debounceTimer);

//     // Debounce search input by 300ms
//     const timer = setTimeout(() => {
//       fetchProducts();
//     }, 300);

//     setDebounceTimer(timer);

//     return () => clearTimeout(timer);
//   }, [filters]);

//   const getImageUrl = (url) => {
//     if (!url) return "";
//     if (url.startsWith("http") || url.startsWith("https")) {
//       return url;
//     }
//     return `${BASE_URL}${url}`;
//   };

//   return (
//     <div className="container-shop">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <h2>Our Categories</h2>
//         <ul className="category-list">
//           {categories.map((cat) => (
//             <li
//               key={cat.id}
//               className={`category-item ${filters.categoryId === cat.id ? "selected" : ""}`}
//               onClick={() => {
//                 setFilters((prev) => ({
//                   ...prev,
//                   categoryId: prev.categoryId === cat.id ? null : cat.id,
//                 }));
//                 if (filters.categoryId === cat.id) {
//                   navigate("/shop");
//                 } else {
//                   navigate(`/shop?category=${cat.id}`);
//                 }
//               }}
//             >
//               {cat.name}
//             </li>
//           ))}
//         </ul>

//         {/* Price Range Slider */}
//         <div className="price-range">
//           <label>Min Price: {filters.minPrice}</label>
//           <input
//             type="range"
//             min="0"
//             max="1000"
//             value={filters.minPrice}
//             onChange={(e) =>
//               setFilters((prev) => ({
//                 ...prev,
//                 minPrice: Number(e.target.value),
//               }))
//             }
//           />
//           <label>Max Price: {filters.maxPrice}</label>
//           <input
//             type="range"
//             min="0"
//             max="1000"
//             value={filters.maxPrice}
//             onChange={(e) =>
//               setFilters((prev) => ({
//                 ...prev,
//                 maxPrice: Number(e.target.value),
//               }))
//             }
//           />
//         </div>
//       </aside>

//       {/* Product Grid */}
//       <main className="product-grid">
//         {loadingProducts ? (
//           <div className="loading-products">Loading products...</div>
//         ) : products.length === 0 ? (
//           <div className="no-products">
//             No products found. Try adjusting your search or filters.
//           </div>
//         ) : (
//           products.map((product) => {
//             const imageUrl =
//               product.image_url ||
//               (product.Images && product.Images.length > 0 && product.Images[0].image_url) ||
//               "";
//             const altText =
//               product.alt_text ||
//               (product.Images && product.Images.length > 0 && product.Images[0].alt_text) ||
//               product.name;

//             return (
//               <div
//                 key={product.id}
//                 className="product-card"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => navigate(`/product/${product.id}`)}
//               >
//                 {imageUrl ? (
//                   <img src={getImageUrl(imageUrl)} alt={altText} className="product-image" />
//                 ) : null}
//                 <div className="hover-content">
//                   <div className="details">
//                     <h3>{product.name}</h3>
//                     <p>${product.price ? Number(product.price).toFixed(2) : "N/A"}</p>
//                   </div>
//                   <button
//                     className="add-to-cart-btn"
//                     onClick={async (e) => {
//                       e.stopPropagation();
//                       try {
//                         await addToCart(product.id, 1);
//                         refreshCart();
//                         toast.success("Product added to cart");
//                       } catch (err) {
//                         console.error("Failed to add product to cart", err);
//                         toast.error("Failed to add product to cart");
//                       }
//                     }}
//                   >
//                     <ShoppingCart size={16} /> Add to cart
//                   </button>
//                   <button
//                     className="favorite-btn"
//                     onClick={async (e) => {
//                       e.stopPropagation();
//                       try {
//                         await addToWishlist(product.id);
//                         toast.success("Added to wishlist");
//                       } catch (err) {
//                         toast.error("Failed to add to wishlist");
//                       }
//                     }}
//                   >
//                     <Heart size={20} />
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </main>
//     </div>
//   );
// };

// export default Shop;


import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../api/productApi";
import { fetchAllCategories } from "../api/categoryApi";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { addToCart } from "../api/cart";
import { addToWishlist } from "../api/wishlistApi";
import ProductCard from "../components/ProductCard";
import "../styling/Shop.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshCart } = useCart();
  const lastSearchRef = useRef("");

  const [filters, setFilters] = useState({
    search: "",
    minPrice: 0,
    maxPrice: 1000,
    categoryId: null,
  });

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const minPrice = params.get("minPrice")
      ? Number(params.get("minPrice"))
      : 0;
    const maxPrice = params.get("maxPrice")
      ? Number(params.get("maxPrice"))
      : 1000;
    const categoryId = params.get("category")
      ? Number(params.get("category"))
      : null;

    setFilters((prevFilters) => {
      if (
        prevFilters.search !== search ||
        prevFilters.minPrice !== minPrice ||
        prevFilters.maxPrice !== maxPrice ||
        prevFilters.categoryId !== categoryId
      ) {
        return { search, minPrice, maxPrice, categoryId };
      }
      return prevFilters;
    });
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.minPrice !== 0)
      params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== 1000)
      params.set("maxPrice", filters.maxPrice.toString());
    if (filters.categoryId !== null)
      params.set("category", filters.categoryId.toString());

    const newSearch = params.toString();
    if (newSearch !== lastSearchRef.current) {
      lastSearchRef.current = newSearch;
      navigate(
        {
          pathname: "/shop",
          search: newSearch,
        },
        { replace: true }
      );
    }
  }, [filters, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const query = {
          search: filters.search,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        };
        let productsData = filters.categoryId
          ? await fetchAllProducts({ ...query, category: filters.categoryId })
          : await fetchAllProducts(query);
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading products", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(fetchProducts, 300);
    setDebounceTimer(timer);
    return () => clearTimeout(timer);
  }, [filters]);

  const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${BASE_URL}${url}`;
  };

  const handleAddToCart = async (productId, e) => {
    e.stopPropagation();
    try {
      await addToCart(productId, 1);
      refreshCart();
      toast.success("Product added to cart");
    } catch (err) {
      console.error("Failed to add product to cart", err);
      toast.error("Failed to add product to cart");
    }
  };

  const handleAddToWishlist = async (productId, e) => {
    e.stopPropagation();
    try {
      const res = await addToWishlist(productId);
      if (res?.alreadyAdded) {
        toast.info("Already in wishlist", { theme: "colored" });
      } else {
        toast.success("Added to wishlist");
      }
    } catch (err) {
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <div className="container-shop">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Our Categories</h2>
        <ul className="category-list">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className={`category-item ${
                filters.categoryId === cat.id ? "selected" : ""
              }`}
              onClick={() => {
                setFilters((prev) => ({
                  ...prev,
                  categoryId: prev.categoryId === cat.id ? null : cat.id,
                }));
                navigate(
                  (prev) =>
                    `/shop?category=${prev.categoryId === cat.id ? "" : cat.id}`
                );
              }}
            >
              {cat.name}
            </li>
          ))}
        </ul>
        <div className="price-range">
          <label>Min Price: {filters.minPrice}</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minPrice: Number(e.target.value),
              }))
            }
          />
          <label>Max Price: {filters.maxPrice}</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                maxPrice: Number(e.target.value),
              }))
            }
          />
        </div>
      </aside>

      {/* Product Grid */}
      <main className="product-grid">
        {loadingProducts ? (
          <div className="loading-products">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="no-products">
            No products found. Try adjusting your filters.
          </div>
        ) : (
          products.map((product) => {
            const imageUrl =
              product.image_url ||
              (product.Images?.length > 0 && product.Images[0].image_url) ||
              "";
            const altText =
              product.alt_text ||
              (product.Images?.length > 0 && product.Images[0].alt_text) ||
              product.name;

            return (
              <ProductCard
                key={product.id}
                product={product}
                imageUrl={getImageUrl(imageUrl)}
                altText={altText}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            );
          })
        )}
      </main>
    </div>
  );
};

export default Shop;
