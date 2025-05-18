// import React, { useEffect, useState } from 'react';
// import AdminLayout from "../AdminLayout";
// import { fetchAllCategories, createCategory, updateCategory, deleteCategory } from "../../../api/categoryApi";
// import GenericTable from "../../../components/GenericTable";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AdminCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [newCategoryImage, setNewCategoryImage] = useState(null);

//   const [editCategory, setEditCategory] = useState(null);
//   const [editCategoryName, setEditCategoryName] = useState("");
//   const [editCategoryImage, setEditCategoryImage] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);

//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const data = await fetchAllCategories();
//         setCategories(data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch categories');
//       } finally {
//         setLoading(false);
//       }
//     };
//     getCategories();
//   }, []);

//   const handleAddCategory = async () => {
//     if (!newCategoryName.trim()) {
//       toast.error("Category name cannot be empty");
//       return;
//     }
//     if (!newCategoryImage) {
//       toast.error("Category image is required");
//       return;
//     }
//     try {
//       const formData = new FormData();
//       formData.append("name", newCategoryName);
//       formData.append("image", newCategoryImage);
//       const created = await createCategory(formData);
//       setCategories((prev) => [...prev, created.data || created]);
//       setNewCategoryName("");
//       setNewCategoryImage(null);
//       setShowAddForm(false);
//       toast.success("Category added successfully");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add category");
//     }
//   };

//   const openEditModal = (category) => {
//     setEditCategory(category);
//     setEditCategoryName(category.name);
//     setEditCategoryImage(null);
//     setShowEditModal(true);
//   };

//   const handleEditCategorySave = async () => {
//     if (!editCategoryName.trim()) {
//       toast.error("Category name cannot be empty");
//       return;
//     }
//     try {
//       const formData = new FormData();
//       formData.append("name", editCategoryName);
//       if (editCategoryImage) {
//         formData.append("image", editCategoryImage);
//       }
//       const updated = await updateCategory(editCategory.id, formData);
//       setCategories((prev) =>
//         prev.map((cat) => (cat.id === updated.id ? updated : cat))
//       );
//       setShowEditModal(false);
//       toast.success("Category updated successfully");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update category");
//     }
//   };

//   const handleDeleteCategory = async (category) => {
//     try {
//       await deleteCategory(category.id);
//       setCategories((prev) => prev.filter((cat) => cat.id !== category.id));
//       toast.success("Category deleted successfully");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete category");
//     }
//   };

//   if (loading) return <p>Loading categories...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   return (
//     <AdminLayout>
//       <h1>Admin Categories</h1>
//       <button
//         onClick={() => setShowAddForm(true)}
//         style={{ marginBottom: "10px" }}
//       >
//         + Add Category
//       </button>
//       {showEditModal && (
//         <div className="modal">
//           <h2>Edit Category</h2>
//           <input
//             type="text"
//             value={editCategoryName}
//             onChange={(e) => setEditCategoryName(e.target.value)}
//             placeholder="Category Name"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setEditCategoryImage(e.target.files[0])}
//           />
//           <button onClick={handleEditCategorySave}>Save</button>
//           <button onClick={() => setShowEditModal(false)}>Cancel</button>
//         </div>
//       )}
//       {showAddForm && (
//         <div>
//           <input
//             type="text"
//             value={newCategoryName}
//             onChange={(e) => setNewCategoryName(e.target.value)}
//             placeholder="Category Name"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setNewCategoryImage(e.target.files[0])}
//           />
//           <button onClick={handleAddCategory}>Save</button>
//           <button onClick={() => setShowAddForm(false)}>Cancel</button>
//         </div>
//       )}
//       <GenericTable
//         data={categories}
//         onEdit={openEditModal}
//         onDelete={handleDeleteCategory}
//         editable
//         deletable
//         columns={[
//           { header: "Category Name", accessor: "name" },
//           {
//             header: "Image",
//             accessor: "background_image_url",
//             render: (row) =>
//               row.background_image_url ? (
//                 <img
//                   src={row.background_image_url}
//                   alt={row.name}
//                   style={{ width: 50, height: 50, objectFit: "cover" }}
//                 />
//               ) : (
//                 "No Image"
//               ),
//           },
//         ]}
//       />

//       <ToastContainer />
//     </AdminLayout>
//   );
// };

// export default AdminCategory;


import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import {
  fetchAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../api/categoryApi";
import GenericTable from "../../../components/GenericTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);

  const [editCategory, setEditCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryImage, setEditCategoryImage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchAllCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    if (!newCategoryImage) {
      toast.error("Category image is required");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", newCategoryName);
      formData.append("image", newCategoryImage);
      const created = await createCategory(formData);
      setCategories((prev) => [...prev, created.data]);
      setNewCategoryName("");
      setNewCategoryImage(null);
      setShowAddForm(false);
      toast.success("Category added successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add category");
    }
  };

  const openEditModal = (category) => {
    setEditCategory(category);
    setEditCategoryName(category.name);
    setEditCategoryImage(null);
    setShowEditModal(true);
  };

  const handleEditCategorySave = async () => {
    if (!editCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", editCategoryName);
      if (editCategoryImage) {
        formData.append("image", editCategoryImage);
      }
      const updated = await updateCategory(editCategory.id, formData);
      setCategories((prev) => {
        return prev.map((cat) => (cat.id === updated.id ? updated : cat));
      });         
      setShowEditModal(false);
      toast.success("Category updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update category");
    }
  };

  const handleDeleteCategory = async (category) => {
    try {
      await deleteCategory(category.id);
      setCategories((prev) => prev.filter((cat) => cat.id !== category.id));
      toast.success("Category deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category");
    }
  };

  const columns = [
    { header: "Category Name", accessor: "name" },
    {
      header: "Image",
      accessor: "background_image_url",
      render: (row) =>
        row.background_image_url ? (
          <img
            src={row.background_image_url}
            alt={row.name}
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        ) : (
          "No Image"
        ),
    },
  ];

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <AdminLayout>
      <h1>Admin Categories</h1>
      {showAddForm && (
        <div>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category Name"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewCategoryImage(e.target.files[0])}
          />
          <button onClick={handleAddCategory}>Save</button>
          <button onClick={() => setShowAddForm(false)}>Cancel</button>
        </div>
      )}
      {showEditModal && (
        <div className="modal">
          <h2>Edit Category</h2>
          <input
            type="text"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
            placeholder="Category Name"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setEditCategoryImage(e.target.files[0])}
          />
          <button onClick={handleEditCategorySave}>Save</button>
          <button onClick={() => setShowEditModal(false)}>Cancel</button>
        </div>
      )}
      <GenericTable
        columns={columns}
        data={categories}
        onEdit={openEditModal}
        onDelete={handleDeleteCategory}
        onAdd={() => setShowAddForm(true)}
        editable
        deletable
      />

      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminCategory;
