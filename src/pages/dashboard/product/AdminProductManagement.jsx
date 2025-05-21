import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { fetchAllProducts } from "../../../api/productApi";
import {
  fetchAllProductColors,
  createProductColor,
} from "../../../api/productApiExtended";
import { DataGrid } from "react-data-grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-data-grid/lib/styles.css";
import "./AdminProductManagement.css";

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Form state for adding color
  const [newColorName, setNewColorName] = useState("");
  const [newColorCode, setNewColorCode] = useState("#000000");

  // Filter state
  const [filterName, setFilterName] = useState("");

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
    if (expandedRow === productId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(productId);
      // Reset form fields
      setNewColorName("");
      setNewColorCode("#000000");
    }
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
    { key: "count", name: "#", formatter: ({ row }) => row.count, resizable: true },
    { key: "name", name: "Product Name", resizable: true },
    { key: "price", name: "Price", resizable: true },
    {
      key: "image",
      name: "Image",
      resizable: true,
      formatter: ({ row }) => (
        <img
          src={
            row.image_url || "https://via.placeholder.com/50x50?text=No+Image"
          }
          alt={row.name}
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            border: "1px solid #ccc",
          }}
        />
      ),
    },
    // { key: "stock", name: "Stock", resizable: true },
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
                  border:
                    color.color_code.toLowerCase() === "#ffffff" ||
                    color.color_code.toLowerCase() === "white"
                      ? "none"
                      : "1px solid #ccc",
                  boxShadow: "none",
                }}
              />
            ))}
            <button onClick={() => handleAddClick(row.id)} title="Add Color">
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
              columns={columns}
              rows={currentRows.map((row, index) => ({
                ...row,
                count: (currentPage - 1) * pageSize + index + 1,
              }))}
              rowKeyGetter={(row) => row.id}
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
          {expandedRow && (
            <div
              style={{ marginTop: 16, padding: 16, border: "1px solid #ccc" }}
            >
              <h3>Add Color for Product ID: {expandedRow}</h3>
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
