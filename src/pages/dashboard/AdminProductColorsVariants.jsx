import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { fetchAllProductColors, createProductColor, updateProductColor, deleteProductColor, fetchAllVariants, createVariant, updateVariant, deleteVariant } from "../../api/productApiExtended";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProductColorsVariants = () => {
  const [colors, setColors] = useState([]);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newColorName, setNewColorName] = useState("");
  const [newColorCode, setNewColorCode] = useState("");
  const [newVariantName, setNewVariantName] = useState("");
  const [newVariantValue, setNewVariantValue] = useState("");
  const [newVariantStock, setNewVariantStock] = useState(0);
  const [newVariantPrice, setNewVariantPrice] = useState(0);
  const [selectedProductName, setSelectedProductName] = useState(""); // Changed from ID to name
  const [selectedColorName, setSelectedColorName] = useState(""); // For variant color name

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const colorsData = await fetchAllProductColors();
      setColors(colorsData);
      // Fetch variants for all products or specific product if selectedProductName is set
      const variantsData = await fetchAllVariants(selectedProductName); // Adjust if needed to filter by product name
      setVariants(variantsData);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newColorName.trim() || !newVariantName.trim() || !newVariantValue.trim() || !selectedProductName) {
      toast.error("Please fill all required fields and select a product");
      return;
    }
    try {
      // Create color first with product name
      const colorData = {
        color_name: newColorName,
        color_code: newColorCode,
        product_name: selectedProductName,
      };
      const createdColor = await createProductColor(colorData);

      // Create variant linked to the created color by names
      const variantData = new FormData();
      variantData.append("product_name", selectedProductName);
      variantData.append("variant_name", newVariantName);
      variantData.append("variant_value", newVariantValue);
      variantData.append("product_color_name", newColorName);
      variantData.append("stock", newVariantStock);
      variantData.append("additional_price", newVariantPrice);

      await createVariant(variantData);

      toast.success("Color and variant added successfully");
      setNewColorName("");
      setNewColorCode("");
      setNewVariantName("");
      setNewVariantValue("");
      setNewVariantStock(0);
      setNewVariantPrice(0);
      loadData();
    } catch (error) {
      toast.error("Failed to add color and variant");
    }
  };

  const columns = [
    { key: "id", name: "ID", width: 50 },
    { key: "color_name", name: "Color Name", editable: true },
    { key: "color_code", name: "Color Code", editable: true },
  ];

  const variantColumns = [
    { key: "id", name: "ID", width: 50 },
    { key: "variant_name", name: "Variant Name", editable: true },
    { key: "variant_value", name: "Variant Value", editable: true },
    { key: "stock", name: "Stock", editable: true },
    { key: "additional_price", name: "Additional Price", editable: true },
  ];

  const onColorsRowsChange = async (rows) => {
    // Update colors on edit
    for (const row of rows) {
      try {
        await updateProductColor(row.id, {
          color_name: row.color_name,
          color_code: row.color_code,
        });
      } catch {
        toast.error("Failed to update color");
      }
    }
    loadData();
  };

  const onVariantsRowsChange = async (rows) => {
    // Update variants on edit
    for (const row of rows) {
      try {
        await updateVariant(row.id, {
          variant_name: row.variant_name,
          variant_value: row.variant_value,
          stock: row.stock,
          additional_price: row.additional_price,
        });
      } catch {
        toast.error("Failed to update variant");
      }
    }
    loadData();
  };

  const handleDeleteColor = async (id) => {
    try {
      await deleteProductColor(id);
      toast.success("Color deleted");
      loadData();
    } catch {
      toast.error("Failed to delete color");
    }
  };

  const handleDeleteVariant = async (id) => {
    try {
      await deleteVariant(id);
      toast.success("Variant deleted");
      loadData();
    } catch {
      toast.error("Failed to delete variant");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <AdminLayout>
      <h1>Manage Product Colors and Variants</h1>

      <div style={{ marginBottom: "1rem" }}>
        <h2>Add New Color and Variant</h2>
        <div>
          <input
            type="text"
            placeholder="Color Name"
            value={newColorName}
            onChange={(e) => setNewColorName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Color Code"
            value={newColorCode}
            onChange={(e) => setNewColorCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Variant Name"
            value={newVariantName}
            onChange={(e) => setNewVariantName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Variant Value"
            value={newVariantValue}
            onChange={(e) => setNewVariantValue(e.target.value)}
          />
          <input
            type="number"
            placeholder="Stock"
            value={newVariantStock}
            onChange={(e) => setNewVariantStock(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Additional Price"
            value={newVariantPrice}
            onChange={(e) => setNewVariantPrice(Number(e.target.value))}
          />
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>

      <h2>Product Colors</h2>
      <DataGrid
        columns={columns}
        rows={colors}
        onRowsChange={onColorsRowsChange}
        rowKeyGetter={(row) => row.id}
      />
      <button onClick={() => handleDeleteColor(colors[colors.length - 1]?.id)}>Delete Last Color</button>

      <h2>Product Variants</h2>
      <DataGrid
        columns={variantColumns}
        rows={variants}
        onRowsChange={onVariantsRowsChange}
        rowKeyGetter={(row) => row.id}
      />
      <button onClick={() => handleDeleteVariant(variants[variants.length - 1]?.id)}>Delete Last Variant</button>

      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminProductColorsVariants;
