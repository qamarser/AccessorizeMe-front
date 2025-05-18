// import React, { useEffect, useState } from "react";
// import GenericTable from "../../../components/GenericTable";
// import {
//   fetchAllProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from "../../../api/productApi";
// import {
//   fetchAllProductColors,
//   createProductColor,
//   updateProductColor,
//   deleteProductColor,
//   fetchAllVariants,
//   createVariant,
//   updateVariant,
//   deleteVariant,
// } from "../../../api/productApiExtended";
// import AdminLayout from "../AdminLayout";

// const AdminProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [colors, setColors] = useState([]);
//   const [variants, setVariants] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Form state for add/edit
//   const [productForm, setProductForm] = useState(null);
//   const [colorForm, setColorForm] = useState(null);
//   const [variantForm, setVariantForm] = useState(null);

//   // Fetch all data
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const productData = await fetchAllProducts();
//       setProducts(productData.formatted || productData);

//       const colorData = await fetchAllProductColors();
//       setColors(colorData);

//       const variantData = await fetchAllVariants();
//       setVariants(variantData);
//     } catch (error) {
//       console.error("Failed to fetch data", error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Handlers for Products CRUD
//   const handleAddProduct = () => {
//     setProductForm({ id: null, name: "", price: "", description: "", stock: "", category_name: "", variants: [] });
//   };

//   const handleEditProduct = (product) => {
//     setProductForm({ ...product });
//   };

//   const handleDeleteProduct = async (product) => {
//     if (window.confirm(`Delete product ${product.name}?`)) {
//       try {
//         await deleteProduct(product.id);
//         fetchData();
//       } catch (error) {
//         console.error("Failed to delete product", error);
//       }
//     }
//   };

//   const handleProductFormChange = (e) => {
//     const { name, value } = e.target;
//     setProductForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleProductFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (productForm.id) {
//         await updateProduct(productForm.id, productForm);
//       } else {
//         // For create, formData needed for images and variants - simplified here
//         await createProduct(productForm);
//       }
//       setProductForm(null);
//       fetchData();
//     } catch (error) {
//       console.error("Failed to save product", error);
//     }
//   };

//   // Handlers for Colors CRUD
//   const handleAddColor = () => {
//     setColorForm({ id: null, color_name: "", color_code: "#000000", product_id: "" });
//   };

//   const handleEditColor = (color) => {
//     setColorForm({ ...color });
//   };

//   const handleDeleteColor = async (color) => {
//     if (window.confirm(`Delete color ${color.color_name}?`)) {
//       try {
//         await deleteProductColor(color.id);
//         fetchData();
//       } catch (error) {
//         console.error("Failed to delete color", error);
//       }
//     }
//   };

//   const handleColorFormChange = (e) => {
//     const { name, value } = e.target;
//     setColorForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleColorFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (colorForm.id) {
//         await updateProductColor(colorForm.id, colorForm);
//       } else {
//         await createProductColor(colorForm);
//       }
//       setColorForm(null);
//       fetchData();
//     } catch (error) {
//       console.error("Failed to save color", error);
//     }
//   };

//   // Handlers for Variants CRUD
//   const handleAddVariant = () => {
//     setVariantForm({ id: null, variant_name: "", variant_value: "", product_id: "", product_color_id: "", stock: 0, additional_price: 0 });
//   };

//   const handleEditVariant = (variant) => {
//     setVariantForm({ ...variant });
//   };

//   const handleDeleteVariant = async (variant) => {
//     if (window.confirm(`Delete variant ${variant.variant_name}?`)) {
//       try {
//         await deleteVariant(variant.id);
//         fetchData();
//       } catch (error) {
//         console.error("Failed to delete variant", error);
//       }
//     }
//   };

//   const handleVariantFormChange = (e) => {
//     const { name, value } = e.target;
//     setVariantForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleVariantFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (variantForm.id) {
//         await updateVariant(variantForm.id, variantForm);
//       } else {
//         await createVariant(variantForm);
//       }
//       setVariantForm(null);
//       fetchData();
//     } catch (error) {
//       console.error("Failed to save variant", error);
//     }
//   };

//   // Columns for tables
//   const productColumns = [
//     { header: "ID", accessor: "id" },
//     { header: "Name", accessor: "name" },
//     { header: "Price", accessor: "price" },
//   ];

//   const colorColumns = [
//     { header: "ID", accessor: "id" },
//     { header: "Color Name", accessor: "color_name" },
//     { header: "Color Code", accessor: "color_code" },
//     { header: "Product ID", accessor: "product_id" },
//   ];

//   const variantColumns = [
//     { header: "ID", accessor: "id" },
//     { header: "Variant Name", accessor: "variant_name" },
//     { header: "Variant Value", accessor: "variant_value" },
//     { header: "Product ID", accessor: "product_id" },
//     { header: "Color ID", accessor: "product_color_id" },
//     { header: "Stock", accessor: "stock" },
//     { header: "Additional Price", accessor: "additional_price" },
//   ];

//   return (
//     <AdminLayout>
//     <div>
//       <h2>Products</h2>
//       <GenericTable
//         columns={productColumns}
//         data={products}
//         onAdd={handleAddProduct}
//         onEdit={handleEditProduct}
//         onDelete={handleDeleteProduct}
//       />
//       {productForm && (
//         <form onSubmit={handleProductFormSubmit}>
//           <h3>{productForm.id ? "Edit Product" : "Add Product"}</h3>
//           <input
//             name="name"
//             value={productForm.name}
//             onChange={handleProductFormChange}
//             placeholder="Name"
//             required
//           />
//           <input
//             name="price"
//             type="number"
//             value={productForm.price}
//             onChange={handleProductFormChange}
//             placeholder="Price"
//             required
//           />
//           <button type="submit">Save</button>
//           <button type="button" onClick={() => setProductForm(null)}>
//             Cancel
//           </button>
//         </form>
//       )}

//       <h2>Product Colors</h2>
//       <GenericTable
//         columns={colorColumns}
//         data={colors}
//         onAdd={handleAddColor}
//         onEdit={handleEditColor}
//         onDelete={handleDeleteColor}
//       />
//       {colorForm && (
//         <form onSubmit={handleColorFormSubmit}>
//           <h3>{colorForm.id ? "Edit Color" : "Add Color"}</h3>
//           <input
//             name="color_name"
//             value={colorForm.color_name}
//             onChange={handleColorFormChange}
//             placeholder="Color Name"
//             required
//           />
//           <input
//             name="color_code"
//             type="color"
//             value={colorForm.color_code}
//             onChange={handleColorFormChange}
//             placeholder="Color Code"
//             required
//           />
//           <input
//             name="product_id"
//             type="number"
//             value={colorForm.product_id}
//             onChange={handleColorFormChange}
//             placeholder="Product ID"
//             required
//           />
//           <button type="submit">Save</button>
//           <button type="button" onClick={() => setColorForm(null)}>
//             Cancel
//           </button>
//         </form>
//       )}

//       <h2>Product Variants</h2>
//       <GenericTable
//         columns={variantColumns}
//         data={variants}
//         onAdd={handleAddVariant}
//         onEdit={handleEditVariant}
//         onDelete={handleDeleteVariant}
//       />
//       {variantForm && (
//         <form onSubmit={handleVariantFormSubmit}>
//           <h3>{variantForm.id ? "Edit Variant" : "Add Variant"}</h3>
//           <input
//             name="variant_name"
//             value={variantForm.variant_name}
//             onChange={handleVariantFormChange}
//             placeholder="Variant Name"
//             required
//           />
//           <input
//             name="variant_value"
//             value={variantForm.variant_value}
//             onChange={handleVariantFormChange}
//             placeholder="Variant Value"
//             required
//           />
//           <input
//             name="product_id"
//             type="number"
//             value={variantForm.product_id}
//             onChange={handleVariantFormChange}
//             placeholder="Product ID"
//             required
//           />
//           <input
//             name="product_color_id"
//             type="number"
//             value={variantForm.product_color_id || ""}
//             onChange={handleVariantFormChange}
//             placeholder="Product Color ID"
//           />
//           <input
//             name="stock"
//             type="number"
//             value={variantForm.stock}
//             onChange={handleVariantFormChange}
//             placeholder="Stock"
//           />
//           <input
//             name="additional_price"
//             type="number"
//             step="0.01"
//             value={variantForm.additional_price}
//             onChange={handleVariantFormChange}
//             placeholder="Additional Price"
//           />
//           <button type="submit">Save</button>
//           <button type="button" onClick={() => setVariantForm(null)}>
//             Cancel
//           </button>
//         </form>
//       )}
//       </div>
//     </AdminLayout>
//   );
// };

// export default AdminProductManagement;


import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { fetchAllProducts } from "../../../api/productApi";
import {
  fetchAllProductColors,
  createProductColor,
  createVariant,
} from "../../../api/productApiExtended";
import { DataGrid } from "react-data-grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  // Form state for adding color and variant
  const [newColorName, setNewColorName] = useState("");
  const [newColorCode, setNewColorCode] = useState("#000000");
  const [newVariantName, setNewVariantName] = useState("");
  const [newVariantValue, setNewVariantValue] = useState("");
  const [newVariantStock, setNewVariantStock] = useState(0);
  const [newVariantPrice, setNewVariantPrice] = useState(0);
  const [newVariantImages, setNewVariantImages] = useState([]);

  // Filter state
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const productData = await fetchAllProducts();
      setProducts(productData.formatted || productData);

      const colorData = await fetchAllProductColors();
      setColors(colorData);
    } catch (error) {
      console.error("Failed to fetch data", error);
      toast.error("Failed to load data");
    }
    setLoading(false);
  };

  const handleAddClick = (productId) => {
    if (expandedRow === productId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(productId);
      // Reset form fields
      setNewColorName("");
      setNewColorCode("#000000");
      setNewVariantName("");
      setNewVariantValue("");
      setNewVariantStock(0);
      setNewVariantPrice(0);
      setNewVariantImages([]);
    }
  };

  const handleImageChange = (e) => {
    setNewVariantImages(Array.from(e.target.files));
  };

  const handleSave = async (productId) => {
    if (
      !newColorName.trim() ||
      !newVariantName.trim() ||
      !newVariantValue.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      // Create color
      const colorData = {
        color_name: newColorName,
        color_code: newColorCode,
        product_id: productId,
      };
      const createdColor = await createProductColor(colorData);

      // Create variant linked to color
      const variantData = new FormData();
      variantData.append("product_id", productId);
      variantData.append("variant_name", newVariantName);
      variantData.append("variant_value", newVariantValue);
      variantData.append("product_color_id", createdColor.color.id);
      variantData.append("stock", newVariantStock);
      variantData.append("additional_price", newVariantPrice);
      newVariantImages.forEach((file) => {
        variantData.append("images", file);
      });

      await createVariant(variantData);

      toast.success("Color and variant added successfully");
      setExpandedRow(null);
      fetchData();
    } catch (error) {
      console.error("Failed to add color and variant", error);
      toast.error("Failed to add color and variant");
    }
  };

  const columns = [
    { key: "id", name: "ID", width: 50 },
    { key: "name", name: "Product Name", resizable: true },
    { key: "price", name: "Price", width: 100 },
    {
      key: "image",
      name: "Image",
      width: 100,
      formatter: ({ row }) => (
        <img
          src={row.image || ""}
          alt={row.name}
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    { key: "stock", name: "Stock", width: 80 },
    {
      key: "colors",
      name: "Colors",
      resizable: true,
      formatter: ({ row }) => {
        const productColors = colors.filter((c) => c.product_id === row.id);
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {productColors.map((color) => (
              <div
                key={color.id}
                title={color.color_name}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: color.color_code,
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                }}
              />
            ))}
            <button
              onClick={() => handleAddClick(row.id)}
              title="Add Color & Variant"
            >
              +
            </button>
          </div>
        );
      },
    },
  ];

  // Filter products by product name
  const filteredRows = products.filter((product) =>
    product.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <AdminLayout>
      <h1>Manage Products, Colors, and Variants</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="filterName">Filter by Product Name: </label>
            <input
              id="filterName"
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Enter product name"
              style={{ padding: 4, width: 200 }}
            />
          </div>
          <DataGrid
            columns={columns}
            rows={filteredRows}
            rowKeyGetter={(row) => row.id}
          />
          {expandedRow && (
            <div
              style={{ marginTop: 16, padding: 16, border: "1px solid #ccc" }}
            >
              <h3>Add Color and Variant for Product ID: {expandedRow}</h3>
              <div>
                <label>
                  Color Name:
                  <input
                    type="text"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Color Code:
                  <input
                    type="color"
                    value={newColorCode}
                    onChange={(e) => setNewColorCode(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Variant Name:
                  <input
                    type="text"
                    value={newVariantName}
                    onChange={(e) => setNewVariantName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Variant Value:
                  <input
                    type="text"
                    value={newVariantValue}
                    onChange={(e) => setNewVariantValue(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Stock:
                  <input
                    type="number"
                    value={newVariantStock}
                    onChange={(e) => setNewVariantStock(Number(e.target.value))}
                  />
                </label>
              </div>
              <div>
                <label>
                  Additional Price:
                  <input
                    type="number"
                    step="0.01"
                    value={newVariantPrice}
                    onChange={(e) => setNewVariantPrice(Number(e.target.value))}
                  />
                </label>
              </div>
              <div>
                <label>
                  Variant Images:
                  <input type="file" multiple onChange={handleImageChange} />
                </label>
              </div>
              <button onClick={() => handleSave(expandedRow)}>Save</button>
              <button onClick={() => setExpandedRow(null)}>Cancel</button>
            </div>
          )}
          <ToastContainer />
        </>
      )}
    </AdminLayout>
  );
};

export default AdminProductManagement;
