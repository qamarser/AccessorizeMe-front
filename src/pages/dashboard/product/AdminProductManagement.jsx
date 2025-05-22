import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import {
  fetchAllProducts,
  deleteProduct,
  updateProduct,
} from "../../../api/productApi";
import {
  fetchAllProductColors,
  createProductColor,
} from "../../../api/productApiExtended";
import { DataGrid } from "react-data-grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-data-grid/lib/styles.css";
import "./AdminProductManagement.css";

const ActionsFormatter = ({ row, onEdit, onDelete }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
      <button
        onClick={() => onEdit(row.id)}
        title="Edit Product"
        aria-label="Edit Product"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#007bff",
          padding: 4,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="#007bff"
        >
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
        </svg>
      </button>
      <button
        onClick={() => onDelete(row.id)}
        title="Delete Product"
        aria-label="Delete Product"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "red",
          padding: 4,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="red"
        >
          <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1z" />
        </svg>
      </button>
    </div>
  );
};

const AdminProductManagement = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Form state for adding color
  const [newColorName, setNewColorName] = useState("");
  const [newColorCode, setNewColorCode] = useState("#000000");

  // Filter state
  const [filterName, setFilterName] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Products and colors state
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);

  // Expanded row for adding color
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

const fetchData = async () => {
  setLoading(true);
  try {
    const productData = await fetchAllProducts();
    console.log("Fetched product data:", productData);
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
    setExpandedRow((prev) => (prev === productId ? null : productId));
    setNewColorName("");
    setNewColorCode("#000000");
  };

  const handleSave = async (productId) => {
    if (!newColorName.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      // Find product name by productId
      const product = products.find((p) => p.id === productId);
      if (!product) {
        toast.error("Product not found");
        return;
      }
      // Create color with product_name as expected by backend
      const colorData = {
        color_name: newColorName,
        color_code: newColorCode,
        product_name: product.name,
      };
      await createProductColor(colorData);

      toast.success("Color added successfully");
      setExpandedRow(null);
      fetchData();
    } catch (error) {
      console.error("Failed to add color", error);
      toast.error("Failed to add color");
    }
  };

  const columns = [
    {
      key: "count",
      name: "#",
      formatter: ({ row }) => row.count,
      resizable: true,
    },
    { key: "name", name: "Product Name", resizable: true, editable: true },
    { key: "price", name: "Price", resizable: true },
{
  key: "image",
  name: "Image",
  resizable: true,
  renderCell: ({ row }) => {
    // Use first image from Images array if available, else fallback to row.image_url
    const imageUrl =
      (row.Images && row.Images.length > 0 && row.Images[0].image_url) ||
      row.image_url ||
      "https://via.placeholder.com/50x50?text=No+Image";
    return (
      <img
        src={imageUrl}
        alt={row.name}
        style={{
          width: 50,
          height: 50,
          objectFit: "cover",
          border: "1px solid #ccc",
        }}
      />
    );
  },
},
    // { key: "stock", name: "Stock", resizable: true },
    {
      key: "colors",
      name: "Colors",
      resizable: true,
      renderCell: ({ row }) => {
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
                  border:
                    color.color_code.toLowerCase() === "#ffffff" ||
                    color.color_code.toLowerCase() === "white"
                      ? "none"
                      : "1px solid #ccc",
                  boxShadow: "none",
                }}
              />
            ))}
            <button onClick={() => handleAddClick(row.id)} title="Add Color" aria-label="Add Color">
              +
            </button>
            {expandedRow === row.id && (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="Color name"
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  style={{ padding: "4px", width: 100 }}
                />
                <input
                  type="color"
                  value={newColorCode}
                  onChange={(e) => setNewColorCode(e.target.value)}
                />
                <button onClick={() => handleSave(row.id)}>Save</button>
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "actions",
      name: "Actions",
      width: 100,
      resizable: false,
      
      renderCell: (props) => (
        <ActionsFormatter
          row={props.row}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        toast.success("Product deleted successfully");
        fetchData();
      } catch (error) {
        console.error("Failed to delete product", error);
        toast.error("Failed to delete product");
      }
    }
  };

  const handleEdit = (productId) => {
    // Placeholder for edit functionality
    toast.info(
      `Edit functionality for product ID ${productId} is not implemented yet.`
    );
  };

  // Filter products by product name
  const filteredRows = products.filter((product) =>
    product.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRows.length / pageSize);

  const currentRows = filteredRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <AdminLayout>
      <h1>Manage Products and Colors</h1>
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
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="pageSize">Show entries: </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="data-grid-container" style={{ width: "100%" }}>
            <DataGrid
              className="rdg-light"
              columns={columns}
              rows={currentRows.map((row, index) => ({
                ...row,
                count: (currentPage - 1) * pageSize + index + 1,
              }))}
              rowKeyGetter={(row) => row.id}
              editMode="row"
              onRowsChange={async (rows, data) => {
                const updatedRow = rows[data.index];
                try {
                  await updateProduct(updatedRow.id, updatedRow);
                  toast.success(`Product ${updatedRow.name} updated`);
                  setProducts(rows);
                } catch (error) {
                  toast.error("Failed to update product");
                }
              }}
            />
          </div>
          <div
            style={{
              marginTop: 12,
              display: "flex",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminProductManagement;
