// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { fetchAllOrders } from "../../api/orderApi";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchAllOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Admin Dashboard - All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Shipping Address</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
              <th>Order Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                {/* <td>
                  $
                  {typeof order.total_amount === "number"
                    ? order.total_amount.toFixed(2)
                    : "0.00"}
                </td> */}
                <td>${Number(order.total_amount).toFixed(2)}</td>

                <td>{order.status}</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
                <td>
                  {order.Shipping
                    ? `${order.Shipping.address}, ${order.Shipping.city}, ${order.Shipping.state}, ${order.Shipping.zip}`
                    : "N/A"}
                </td>
                <td>{order.Payment ? order.Payment.payment_method : "N/A"}</td>
                <td>{order.Payment ? order.Payment.status : "N/A"}</td>
                <td>
                  <ul>
                    {order.OrderItems && order.OrderItems.length > 0 ? (
                      order.OrderItems.map((item) => (
                        <li key={item.id}>
                          {item.Product ? item.Product.name : "Product"} - Qty:{" "}
                          {item.quantity} - Price: $
                          {Number(item.price).toFixed(2)}
                        </li>
                      ))
                    ) : (
                      <li>No items</li>
                    )}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
