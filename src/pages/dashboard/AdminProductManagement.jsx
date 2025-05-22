import React, { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable";
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productApi";
import {
  fetchAllProductColors,
  createProductColor,
  updateProductColor,
  deleteProductColor,
  fetchAllVariants,
  createVariant,
  updateVariant,
  deleteVariant,
} from "../../api/productApiExtended";

import { BASE_URL } from "../../api/axiosInstance";

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form state for add/edit
  const [productForm, setProductForm] = useState(null);
  const [colorForm, setColorForm] = useState(null);
  const [variantForm, setVariantForm] = useState(null);

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    try {
      const productData = await fetchAllProducts();
      setProducts(productData.formatted || productData);

      const colorData = await fetchAllProductColors();
      setColors(colorData);

      const variantData = await fetchAllVariants();
      setVariants(variantData);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers for Products CRUD
  const handleAddProduct = () => {
    setProductForm({
      id: null,
      name: "",
      price: "",
      description: "",
      stock: "",
      category_name: "",
      variants: [],
    });
  };

  const handleEditProduct = (product) => {
    setProductForm({
      id: product.id || "",
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      stock: product.stock || "",
      category_name: product.category_name || "",
      variants: product.variants || [],
    });
  };

  const handleDeleteProduct = async (product) => {
    if (window.confirm(`Delete product ${product.name}?`)) {
      try {
        await deleteProduct(product.id);
        fetchData();
      } catch (error) {
        console.error("Failed to delete product", error);
      }
    }
  };

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productForm.id) {
        await updateProduct(productForm.id, productForm);
      } else {
        // For create, formData needed for images and variants - simplified here
        await createProduct(productForm);
      }
      setProductForm(null);
      fetchData();
    } catch (error) {
      console.error("Failed to save product", error);
    }
  };

  // Handlers for Colors CRUD
  const handleAddColor = () => {
    setColorForm({
      id: null,
      color_name: "",
      color_code: "#000000",
      product_id: "",
    });
  };

  const handleEditColor = (color) => {
    setColorForm({
      id: color.id || "",
      color_name: color.color_name || "",
      color_code: color.color_code || "#000000",
      product_id: color.product_id || "",
    });
  };

  const handleDeleteColor = async (color) => {
    if (window.confirm(`Delete color ${color.color_name}?`)) {
      try {
        await deleteProductColor(color.id);
        fetchData();
      } catch (error) {
        console.error("Failed to delete color", error);
      }
    }
  };

  const handleColorFormChange = (e) => {
    const { name, value } = e.target;
    setColorForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (colorForm.id) {
        await updateProductColor(colorForm.id, colorForm);
      } else {
        await createProductColor(colorForm);
      }
      setColorForm(null);
      fetchData();
    } catch (error) {
      console.error("Failed to save color", error);
    }
  };

  // Handlers for Variants CRUD
  const handleAddVariant = () => {
    setVariantForm({
      id: null,
      variant_name: "",
      variant_value: "",
      product_id: "",
      product_color_id: "",
      stock: 0,
      additional_price: 0,
    });
  };

  const handleEditVariant = (variant) => {
    setVariantForm({
      id: variant.id || "",
      variant_name: variant.variant_name || "",
      variant_value: variant.variant_value || "",
      product_id: variant.product_id || "",
      product_color_id: variant.product_color_id || "",
      stock: variant.stock || 0,
      additional_price: variant.additional_price || 0,
    });
  };

  const handleDeleteVariant = async (variant) => {
    if (window.confirm(`Delete variant ${variant.variant_name}?`)) {
      try {
        await deleteVariant(variant.id);
        fetchData();
      } catch (error) {
        console.error("Failed to delete variant", error);
      }
    }
  };

  const handleVariantFormChange = (e) => {
    const { name, value } = e.target;
    setVariantForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariantFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (variantForm.id) {
        await updateVariant(variantForm.id, variantForm);
      } else {
        await createVariant(variantForm);
      }
      setVariantForm(null);
      fetchData();
    } catch (error) {
      console.error("Failed to save variant", error);
    }
  };

  // Columns for tables
  const productColumns = [
    {
      header: "Image",
      accessor: "image",
      render: (product) => {
        const imageUrl =
          product.image_url ||
          (product.Images && product.Images.length > 0 && product.Images[0].image_url) ||
          "";
        const altText =
          product.alt_text ||
          (product.Images && product.Images.length > 0 && product.Images[0].alt_text) ||
          product.name;

        const getImageUrl = (url) => {
          if (!url) return "";
          if (url.startsWith("http") || url.startsWith("https")) {
            return url;
          }
          return `${BASE_URL}${url}`;
        };

        if (!imageUrl) return null;

        return (
          <img
            src={getImageUrl(imageUrl)}
            alt={altText}
            style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
          />
        );
      },
    },
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
  ];

  const colorColumns = [
    { header: "ID", accessor: "id" },
    { header: "Color Name", accessor: "color_name" },
    { header: "Color Code", accessor: "color_code" },
    { header: "Product ID", accessor: "product_id" },
  ];

  const variantColumns = [
    { header: "ID", accessor: "id" },
    { header: "Variant Name", accessor: "variant_name" },
    { header: "Variant Value", accessor: "variant_value" },
    { header: "Product ID", accessor: "product_id" },
    { header: "Color ID", accessor: "product_color_id" },
    { header: "Stock", accessor: "stock" },
    { header: "Additional Price", accessor: "additional_price" },
  ];

  return (
    <div>
      <h2>Products</h2>
      <GenericTable
        columns={productColumns}
        data={products}
        onAdd={handleAddProduct}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
      {productForm && (
        <form onSubmit={handleProductFormSubmit}>
          <h3>{productForm.id ? "Edit Product" : "Add Product"}</h3>
          <input
            name="name"
            value={productForm.name || ""}
            onChange={handleProductFormChange}
            placeholder="Name"
            required
          />
          <input
            name="price"
            type="number"
            value={productForm.price || ""}
            onChange={handleProductFormChange}
            placeholder="Price"
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setProductForm(null)}>
            Cancel
          </button>
        </form>
      )}

      <h2>Product Colors</h2>
      <GenericTable
        columns={colorColumns}
        data={colors}
        onAdd={handleAddColor}
        onEdit={handleEditColor}
        onDelete={handleDeleteColor}
      />
      {colorForm && (
        <form onSubmit={handleColorFormSubmit}>
          <h3>{colorForm.id ? "Edit Color" : "Add Color"}</h3>
          <input
            name="color_name"
            value={colorForm.color_name || ""}
            onChange={handleColorFormChange}
            placeholder="Color Name"
            required
          />
          <input
            name="color_code"
            type="color"
            value={colorForm.color_code || "#000000"}
            onChange={handleColorFormChange}
            placeholder="Color Code"
            required
          />
          <input
            name="product_id"
            type="number"
            value={colorForm.product_id || ""}
            onChange={handleColorFormChange}
            placeholder="Product ID"
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setColorForm(null)}>
            Cancel
          </button>
        </form>
      )}

      <h2>Product Variants</h2>
      <GenericTable
        columns={variantColumns}
        data={variants}
        onAdd={handleAddVariant}
        onEdit={handleEditVariant}
        onDelete={handleDeleteVariant}
      />
      {variantForm && (
        <form onSubmit={handleVariantFormSubmit}>
          <h3>{variantForm.id ? "Edit Variant" : "Add Variant"}</h3>
          <input
            name="variant_name"
            value={variantForm.variant_name || ""}
            onChange={handleVariantFormChange}
            placeholder="Variant Name"
            required
          />
          <input
            name="variant_value"
            value={variantForm.variant_value || ""}
            onChange={handleVariantFormChange}
            placeholder="Variant Value"
            required
          />
          <input
            name="product_id"
            type="number"
            value={variantForm.product_id || ""}
            onChange={handleVariantFormChange}
            placeholder="Product ID"
            required
          />
          <input
            name="product_color_id"
            type="number"
            value={variantForm.product_color_id || ""}
            onChange={handleVariantFormChange}
            placeholder="Product Color ID"
          />
          <input
            name="stock"
            type="number"
            value={variantForm.stock || 0}
            onChange={handleVariantFormChange}
            placeholder="Stock"
          />
          <input
            name="additional_price"
            type="number"
            step="0.01"
            value={variantForm.additional_price || 0}
            onChange={handleVariantFormChange}
            placeholder="Additional Price"
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setVariantForm(null)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminProductManagement;
