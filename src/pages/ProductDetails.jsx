import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductReviews from "../components/ProductReviews";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { fetchProductById } from "../api/productApi";
import { toast, ToastContainer } from "react-toastify";
import { useCart } from "../context/CartContext";
import { addToCart } from "../api/cart";
import { addToWishlist } from "../api/wishlistApi";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [ loading, setLoading ] = useState( true );
  const { refreshCart } = useCart();
  const [adding, setAdding] = useState(false);

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
        console.log("Fetched product:", res.name);
        setProduct(res);
        if (res.Images?.length) {
          setSelectedImage(res.Images[0].image_url);
        }
        toast.success("Product loaded successfully");
      } catch (err) {
        console.error("Error fetching product:", err);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  const handleColorSelect = (colorCode) => {
    setSelectedColor(colorCode);
  };

   const handleAddToCart = async () => {
     try {
       setAdding(true);
       await addToCart(product.id, 1);
       await refreshCart();
       toast.success("Product added");
     } catch (error) {
       console.error("Error adding to cart:", error);
     } finally {
       setAdding(false);
     }
   };
  return (
    <div className="p-6 flex gap-8">
      <ToastContainer />
      {/* Left: Thumbnails + Main Image */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {product.Images?.map((img, idx) => (
            <img
              key={idx}
              src={img.image_url}
              alt={`thumb-${idx}`}
              className="w-14 h-14 object-cover border rounded cursor-pointer"
              onClick={() => setSelectedImage(img.image_url)}
            />
          ))}
        </div>
        <img
          src={selectedImage}
          alt="main product"
          className="w-96 h-96 object-contain border rounded"
        />
      </div>

      {/* Right: Info */}
      <div>
        <h2 className="text-3xl font-semibold">{product.name}</h2>
        <div className="flex items-center gap-2 my-2">
          {product.averageRating > 0 ? (
            <>
              <div className="flex">{renderStars(product.averageRating)}</div>
              <span className="text-gray-600 text-sm">
                ({product.averageRating} / 5)
              </span>
            </>
          ) : (
            <span className="text-gray-400">No ratings yet</span>
          )}
        </div>

        <p className="text-xl font-bold text-gray-800 mb-4">${product.price}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>

        {/* Color Selector */}
        <div className="flex items-center gap-2 mb-4">
          {product.ProductVariants?.map((variant, idx) =>
            variant.ProductColor ? (
              <button
                key={idx}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === variant.ProductColor.color_code
                    ? "border-black"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: variant.ProductColor.color_code }}
                onClick={() =>
                  handleColorSelect(variant.ProductColor.color_code)
                }
              ></button>
            ) : null
          )}
        </div>

        {/* Quantity + Add to Cart */}
        <div className="flex gap-4 items-center">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={handleAddToCart}
            disabled={adding}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
          <button
            className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
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
