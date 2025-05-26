import React, { useEffect, useState } from "react";
import {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
  changePassword,
} from "../api/userAPI";
import "../styling/UserProfile.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CustomerOrders from "./CustomerOrders";
import Button from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getUserProfile();
      setUser(data);
      setFormData((prev) => ({
        ...prev,
        name: data.name || "",
        email: data.email || "",
        password: "",
        newPassword: "",
      }));
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (loadingSave) return;
    setLoadingSave(true);
    try {
      const { name, email } = formData;
      const updated = await updateUserProfile({ name, email });
      setUser(updated);
      setEditMode(false);
      toast.success("Profile updated!");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoadingSave(false);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return toast.warning("No image selected");
    if (loadingUpload) return;
    setLoadingUpload(true);
    try {
      const updated = await uploadProfileImage(imageFile);
      // Append timestamp to profileImage URL to avoid browser caching
      if (updated.profileImage) {
        updated.profileImage =
          updated.profileImage + "?t=" + new Date().getTime();
      }
      setUser(updated);
      setImageFile(null);
      toast.success("Image uploaded!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setLoadingUpload(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!formData.password || !formData.newPassword) {
      return toast.warning("Enter current and new password");
    }
    if (loadingPassword) return;
    setLoadingPassword(true);
    try {
      await changePassword(formData.password, formData.newPassword);
      toast.success("Password changed!");
      setFormData((prev) => ({ ...prev, password: "", newPassword: "" }));
    } catch (err) {
      console.error(err);
      toast.error("Password change failed");
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-profile-container">
      <ToastContainer />
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-img-wrapper">
            <img
              src={user.profileImage || "/default-avatar.png"}
              alt="Profile"
              className="profile-img"
            />
            <label className="edit-img-icon">
              <input
                type="file"
                hidden
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              🖊️
            </label>
          </div>
          <div>
            <h3 className="profile-name">{user.name}</h3>
            <p className="profile-email">{user.email}</p>
          </div>
          <button className="close-btn" onClick={() => setEditMode(!editMode)}>
            {editMode ? "✖" : "☰"}
          </button>
        </div>

        <div className="profile-body">
          <div className="profile-row">
            <span className="label">Name</span>
            <span className="value">
              {editMode ? (
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              ) : (
                user.name
              )}
            </span>
          </div>
          <div className="profile-row">
            <span className="label">Email account</span>
            <span className="value">
              {editMode ? (
                <input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              ) : (
                user.email
              )}
            </span>
          </div>

          {editMode && (
            <>
              <div className="profile-row">
                <span className="label">Current Password</span>
                <span className="value">
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Current password"
                  />
                </span>
              </div>
              <div className="profile-row">
                <span className="label">New Password</span>
                <span className="value">
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                    placeholder="New password"
                  />
                </span>
              </div>
            </>
          )}
        </div>

        {editMode && (
          <div className="profile-footer">
            <Button
              className="save-btn"
              onClick={handleSave}
              text={loadingSave ? "Saving..." : "Save Change"}
              disabled={loadingSave}
            />
            {imageFile && (
              <button
                className="upload-btn"
                onClick={handleImageUpload}
                disabled={loadingUpload}
              >
                {loadingUpload ? "Uploading..." : "Upload Image"}
              </button>
            )}
            {formData.password && formData.newPassword && (
              <button
                className="change-password-btn"
                onClick={handlePasswordChange}
                disabled={loadingPassword}
              >
                {loadingPassword ? "Changing..." : "Change Password"}
              </button>
            )}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
      <CustomerOrders />
    </div>
  );
};

export default UserProfile;
