// // import React from "react";

// // const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// // export default function ProductCard({ product }) {
// //   const imageUrl =
// //     product.Images && product.Images.length > 0
// //       ? product.Images[0].image_url.startsWith("http")
// //         ? product.Images[0].image_url
// //         : `${BASE_URL}${product.Images[0].image_url}`
// //       : "/placeholder.png";

// //   return (
// //     <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
// //       <img
// //         src={imageUrl}
// //         alt={product.name}
// //         className="w-36 h-36 object-cover rounded-md mb-2"
// //       />
// //       <h3 className="text-md font-semibold">{product.name}</h3>
// //       <p className="text-sm text-gray-500">{product.category?.name}</p>
// //           <p className="text-blue-600 font-bold mt-1">${product.price}</p>
          
// //     </div>
// //   );
// // }


// // import { useNavigate } from "react-router-dom";

// // const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// // export default function ProductCard({ product }) {
// //   let imageUrl = "/placeholder.png";

// //   // Use image_url from product if available, else fallback to Images array
// //   if (product.image_url) {
// //     imageUrl = product.image_url.startsWith("http")
// //       ? product.image_url
// //       : `${BASE_URL}${product.image_url}`;
// //   } else if (product.Images?.length > 0) {
// //     const rawUrl = product.Images[0].image_url;
// //     imageUrl = rawUrl?.startsWith("http") ? rawUrl : `${BASE_URL}${rawUrl}`;
// //   }

// //   console.log("Final image URL:", imageUrl); // DEBUG

// //   const navigate = useNavigate();

// //   return (
// //     <div
// //       className="border rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer"
// //       onClick={() => {
// //         if (product.category?.id) {
// //           navigate(`/shop/categorie/${product.category.id}/product/${product.id}`);
// //         } else {
// //           navigate(`/product/${product.id}`);
// //         }
// //       }}
// //     >
// //       <img
// //         src={imageUrl}
// //         alt={product.name}
// //         className="w-36 h-36 object-cover rounded-md mb-2"
// //       />
// //       <h3 className="text-md font-semibold">{product.name}</h3>
// //       <p className="text-sm text-gray-500">{product.category?.name}</p>
// //       <p className="text-blue-600 font-bold mt-1">${product.price}</p>
// //     </div>
// //   );
// // }


// import React from "react";
// import "../styling/ProductCard.css";

// const ProductCard = ({ product }) => {
//   return (
//     <div className="product-card">
//       <img
//         src={product?.Images?.[0]?.url || "/placeholder.jpg"}
//         alt={product.name}
//         className="product-image"
//       />
//       <div className="product-info">
//         <h4>{product.name}</h4>
//         <p>${product.price}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "react-toastify";
import { addToCart } from "../api/cart";
import { addToWishlist } from "../api/wishlistApi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styling/ProductCard.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { refreshCart } = useCart();
  const { isAuthenticated } = useAuth();

  const imageUrl =
    product.image_url ||
    (product.Images &&
      product.Images.length > 0 &&
      product.Images[0].image_url) ||
    "";
  const altText =
    product.alt_text ||
    (product.Images &&
      product.Images.length > 0 &&
      product.Images[0].alt_text) ||
    product.name;

  const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http") || url.startsWith("https")) {
      return url;
    }
    return `${BASE_URL}${url}`;
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      // Pass product_variant_id if available, else null
      const productVariantId = product.product_variant_id || product.variant_id || null;
      await addToCart(product.id, 1, productVariantId);
      refreshCart();
      toast.success("Product added to cart");
    } catch (err) {
      console.error("Failed to add product to cart", err);
      toast.error("Failed to add product to cart");
    }
  };

  const handleAddToWishlist = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      await addToWishlist(product.id);
      toast.success("Added to wishlist");
    } catch (err) {
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
      style={{ cursor: "pointer" }}
    >
      {imageUrl && (
        <img
          src={getImageUrl(imageUrl)}
          alt={altText}
          className="product-image"
        />
      )}
      <div className="hover-content">
        <div className="details">
          <h3>{product.name}</h3>
          <p>${product.price ? Number(product.price).toFixed(2) : "N/A"}</p>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={16} /> Add to cart
        </button>
        <button className="favorite-btn" onClick={handleAddToWishlist}>
          <Heart size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
