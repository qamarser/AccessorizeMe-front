import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductReviews from "../components/ProductReviews";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { fetchProductById } from "../api/productApi";
import { toast, ToastContainer } from "react-toastify";
import { useCart } from "../context/CartContext";
import { addToCart } from "../api/cart";
import { addToWishlist } from "../api/wishlistApi";
import "../styling/ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { refreshCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [colorImages, setColorImages] = useState([]);
  const [thumbnailImages, setThumbnailImages] = useState([]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const totalStars = 5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} style={{ color: "#facc15" }} />);
    }

    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" style={{ color: "#facc15" }} />);
    }

    const remaining = totalStars - stars.length;
    for (let i = 0; i < remaining; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} style={{ color: "#facc15" }} />);
    }

    return stars;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetchProductById(id);
        console.log("ProductColors:", res?.ProductColors);
        setProduct(res);
        if (res.ProductColors?.length) {
          setSelectedColor(res.ProductColors[0]);
          if (res.ProductColors[0].Images?.length) {
            setSelectedImage(res.ProductColors[0].Images[0].image_url);
            setColorImages(res.ProductColors[0].Images);
          }
        } else if (res.Images?.length) {
          setSelectedImage(res.Images[0].image_url);
          setColorImages([]);
        }
        // Set thumbnail images to main images initially
        setThumbnailImages(res.Images || []);
      } catch (err) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!selectedColor || !product?.Images) return;

    // Get **all** images related to the selected color
    const colorImages = product.Images.filter(
      (img) =>
        img.related_type === "productColor" &&
        img.related_id === selectedColor.id
    );
    if (colorImages.length > 0) {
      setSelectedImage(colorImages[0].image_url); // show first color-specific image
      setThumbnailImages(colorImages);
    } else if (product.Images.length > 0) {
      setSelectedImage(product.Images[0].image_url); // fallback to first image
      setThumbnailImages(product.Images);
    }
  }, [selectedColor, product]);

  const handleColorSelect = (color) => {
    console.log("Selected color object:", color);
    setSelectedColor(color);
    if (color.Images && color.Images.length > 0) {
      setThumbnailImages(color.Images);
    } else {
      setThumbnailImages(product?.Images || []);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      await addToCart(product.id, 1, selectedColor?.id || null);
      await refreshCart();
      toast.success("Product added");
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-details-container">
      <ToastContainer />
      {/* Left: Thumbnails + Main Image */}
      <div className="flex flex-col items-center gap-4">
        <div className="product-thumbnails">
          {/* {product.Images?.map((img, idx) => ( */}
        {thumbnailImages.map((img, idx) => (
          <img
            key={idx}
            src={img.image_url}
            alt={`thumb-${idx}`}
            className="product-thumbnail-img"
            // onClick={() => setSelectedImage(img.image_url)}
            // onClick={() => handleColorSelect(colorImages[idx])}
            onClick={() => setSelectedImage(img.image_url)}
          />
        ))}
        </div>
        <img
          src={selectedImage}
          alt="main product"
          className="product-main-img"
        />
      </div>

      {/* Right: Info */}
      <div className="product-info">
        <h2>{product.name}</h2>
        <div className="rating-container">
          {product.averageRating > 0 ? (
            <>
              <div className="flex">{renderStars(product.averageRating)}</div>
              <span className="rating-text">({product.averageRating} / 5)</span>
            </>
          ) : (
            <span className="no-ratings">No ratings yet</span>
          )}
        </div>

        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>

        {/* Color Selector */}
        {/* <div className="color-selector">
          {product.ProductVariants?.map((variant, idx) =>
            variant.ProductColor ? (
              <button
                key={idx}
                className={`color-button ${
                  selectedColor?.ProductColor?.color_code ===
                  variant.ProductColor.color_code
                    ? "selected"
                    : "not-selected"
                }`}
                style={{ backgroundColor: variant.ProductColor.color_code }}
                onClick={() => handleColorSelect(variant)}
                title={`Select ${variant.ProductColor.color_name}`}
                
                // alt={variant.ProductColor.color_name}
                // alert={`Select ${variant.ProductColor.color_name}`}
              ></button>
            ) : null
          )}
          
        </div> */}
        <div className="color-selector">
          {product.ProductColors?.map((color, idx) => {
            console.log("Rendering color button:", color.color_name); // Add this line here
            return (
              <button
                key={idx}
                className={`color-button ${
                  selectedColor?.id === color.id ? "selected" : "not-selected"
                }`}
                style={{ backgroundColor: color.color_code }}
                onClick={() => handleColorSelect(color)}
                title={`Select ${color.color_name}`}
              ></button>
            );
          })}
        </div>

        {/* <p className="product-stock">
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p> */}

        {/* Quantity + Add to Cart */}
        <div className="action-buttons">
          <button
            className="action-button add-to-cart"
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
          <button
            className="action-button add-to-wishlist"
            onClick={async () => {
              try {
                await addToWishlist(product.id);
                toast.success("Added to wishlist");
              } catch (err) {
                toast.error("Failed to add to wishlist");
              }
            }}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
      <ProductReviews productId={product.id} />
    </div>
  );
}
