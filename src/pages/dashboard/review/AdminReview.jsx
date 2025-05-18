// import React, { useEffect, useState } from "react";
// import AdminLayout from "../AdminLayout";
// import { fetchAllReviews, deleteReview } from "../../../api/review";
// import GenericTable from "../../../components/GenericTable";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AdminReview = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const fetchReviews = async () => {
//     try {
//       // Flatten nested User and Product fields for GenericTable
//       const flattened = data.map((review) => ({
//         id: review.id,
//         userName: review.User ? review.User.name : "",
//         userEmail: review.User ? review.User.email : "",
//         productName: review.Product ? review.Product.name : "",
        
//         rating: review.rating,
//         comment: review.comment,
//       } ) );
//       setReviews( flattened );
//       console.log("Fetched reviews:", flattened);

//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch reviews", error);
//     } finally {
//       setLoading(false);
//     }
//     };

//   const handleDeleteReview = async (review) => {
//     try {
//       await deleteReview(review.id);
//       setReviews((prev) => prev.filter((r) => r.id !== review.id));
//       toast.success("Review deleted successfully");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete review");
//     }
//   };

//   const columns = [
//     { header: "User Name", accessor: "User.name" },
//     { header: "User Email", accessor: "User.email" },
//     { header: "Product Name", accessor: "Product.name" },
//     { header: "Rating", accessor: "rating" },
//     { header: "Comment", accessor: "comment" },
//   ];

//   if (loading) return <p>Loading reviews...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <AdminLayout>
//       <h1>Admin Reviews</h1>
//       <GenericTable
//         columns={columns}
//         data={reviews}
//         onDelete={handleDeleteReview}
//         deletable
//       />
//       <ToastContainer />
//     </AdminLayout>
//   );
// };

// export default AdminReview;


import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { fetchAllReviews, deleteReview } from "../../../api/review";
import GenericTable from "../../../components/GenericTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await fetchAllReviews();
      // Flatten nested User and Product fields for GenericTable
      const flattened = data.map((review) => ({
        id: review.id,
        userName: review.User ? review.User.name : "",
        userEmail: review.User ? review.User.email : "",
        productName: review.Product ? review.Product.name : "",
        rating: review.rating,
        comment: review.comment,
      }));
      setReviews(flattened);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (review) => {
    try {
      await deleteReview(review.id);
      setReviews((prev) => prev.filter((r) => r.id !== review.id));
      toast.success("Review deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete review");
    }
  };

  const columns = [
    { header: "User Name", accessor: "userName" },
    { header: "User Email", accessor: "userEmail" },
    { header: "Product Name", accessor: "productName" },
    { header: "Rating", accessor: "rating" },
    { header: "Comment", accessor: "comment" },
  ];

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <AdminLayout>
      <h1>Admin Reviews</h1>
      <GenericTable
        columns={columns}
        data={reviews}
        onDelete={handleDeleteReview}
        deletable
      />
      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminReview;
