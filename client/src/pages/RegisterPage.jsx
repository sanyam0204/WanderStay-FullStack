import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.scss";
function RegisterPage() {
  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  //console.log(formdata);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setPasswordMatch(
      formdata.password === formdata.confirmPassword ||
        formdata.confirmPassword === ""
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("firstName", formdata.firstname);
      formData.append("lastName", formdata.lastname);
      formData.append("email", formdata.email);
      formData.append("password", formdata.password);
      formData.append("profileImage", formdata.profileImage);

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.log("registration failed", error);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstname"
            value={formdata.firstname}
            onChange={handleFormChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastname"
            value={formdata.lastname}
            onChange={handleFormChange}
            required
          />
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={formdata.email}
            onChange={handleFormChange}
            required
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={formdata.password}
            onChange={handleFormChange}
            required
          />
          <input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formdata.confirmPassword}
            onChange={handleFormChange}
            required
          />
          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}
          <input
            id="image"
            type="file"
            name="profileImage"
            onChange={handleFormChange}
            accept="image/*"
            style={{ display: "none" }}
            required
          />
          {formdata.profileImage && (
            <img
              src={URL.createObjectURL(formdata.profileImage)}
              alt="Profile Avatar"
              style={{ maxWidth: "100px" }}
            />
          )}
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="Add Profile Avatar" />
            Upload Profile Image
          </label>
          <button type="submit" disabled={!passwordMatch}>
            Register
          </button>
        </form>
        <a href="/login">Already have an account? Login</a>
      </div>
    </div>
  );
}

export default RegisterPage;
