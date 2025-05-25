// // src/pages/UserProfile.jsx
// import React, { useEffect, useState } from "react";
// import {
//   getUserProfile,
//   updateUserProfile,
//   uploadProfileImage,
//   changePassword,
// } from "../api/userAPI";

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [editForm, setEditForm] = useState({ name: "", email: "" });
//   const [passwordForm, setPasswordForm] = useState({
//     currentPassword: "",
//     newPassword: "",
//   });
//   const [imageFile, setImageFile] = useState(null);

//   useEffect(() => {
//     getUserProfile().then((data) => {
//       setUser(data);
//       setEditForm({ name: data.name, email: data.email });
//     });
//   }, []);

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const updated = await updateUserProfile(editForm);
//       setUser(updated);
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update profile");
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!imageFile) return alert("Select a file first");
//     try {
//       const updated = await uploadProfileImage(imageFile);
//       setUser(updated);
//       alert("Profile image updated!");
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     }
//   };

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
//     try {
//       await changePassword(
//         passwordForm.currentPassword,
//         passwordForm.newPassword
//       );
//       alert("Password changed!");
//       setPasswordForm({ currentPassword: "", newPassword: "" });
//     } catch (err) {
//       console.error(err);
//       alert("Password change failed");
//     }
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="p-6 max-w-2xl mx-auto space-y-8">
//       <h2 className="text-2xl font-semibold">User Profile</h2>

//       {/* Profile Overview */}
//       <div className="flex items-center space-x-4">
//         <img
//           src={user.profileImage}
//           alt="Profile"
//           className="w-24 h-24 rounded-full border"
//         />
//         <div>
//           <p className="font-medium text-lg">{user.name}</p>
//           <p className="text-gray-600">{user.email}</p>
//         </div>
//       </div>

//       {/* Update Info Form */}
//       <form onSubmit={handleProfileUpdate} className="space-y-4">
//         <h3 className="font-semibold text-lg">Edit Info</h3>
//         <input
//           name="name"
//           value={editForm.name}
//           onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
//           className="border p-2 w-full"
//           placeholder="Name"
//         />
//         <input
//           name="email"
//           value={editForm.email}
//           onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
//           className="border p-2 w-full"
//           placeholder="Email"
//         />
//         <button className="bg-blue-600 text-white px-4 py-2 rounded">
//           Update Profile
//         </button>
//       </form>

//       {/* Profile Image Upload */}
//       <div className="space-y-2">
//         <h3 className="font-semibold text-lg">Change Profile Picture</h3>
//         <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
//         <button
//           onClick={handleImageUpload}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Upload Image
//         </button>
//       </div>

//       {/* Change Password */}
//       <form onSubmit={handlePasswordChange} className="space-y-4">
//         <h3 className="font-semibold text-lg">Change Password</h3>
//         <input
//           type="password"
//           name="currentPassword"
//           placeholder="Current password"
//           value={passwordForm.currentPassword}
//           onChange={(e) =>
//             setPasswordForm({
//               ...passwordForm,
//               currentPassword: e.target.value,
//             })
//           }
//           className="border p-2 w-full"
//         />
//         <input
//           type="password"
//           name="newPassword"
//           placeholder="New password"
//           value={passwordForm.newPassword}
//           onChange={(e) =>
//             setPasswordForm({ ...passwordForm, newPassword: e.target.value })
//           }
//           className="border p-2 w-full"
//         />
//         <button className="bg-purple-600 text-white px-4 py-2 rounded">
//           Change Password
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserProfile;

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
