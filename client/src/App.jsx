import React, { useState } from "react";
import "./App.css";


function App() {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    bloodGroup: "",
    location: "",
    contactNumber: "",
  });

  const [donors, setDonors] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.age < 18) {
      alert("Donor must be at least 18 years old!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/register-donor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          age: parseInt(form.age, 10),
          bloodGroup: form.bloodGroup,
          location: form.location,
          contactNumber: form.contactNumber,
        }),
      });
      const data = await response.text();
      setMessage(data);
      setDonors([...donors, form]);
      setForm({
        fullName: "",
        age: "",
        bloodGroup: "",
        location: "",
        contactNumber: "",
      });
    } catch (error) {
      setMessage("Error connecting to backend ❌");
    }
  };

  return (
    <div className="container">
      <h1>🩸 Blood Donor Registration</h1>


      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />

        <select
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>O+</option>
          <option>O-</option>
          <option>AB+</option>
          <option>AB-</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={form.contactNumber}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}

      <h2>Registered Donors</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Blood Group</th>
            <th>Location</th>
            <th>Contact</th>
          </tr>
        </thead>

        <tbody>
          {donors.map((d, index) => (
            <tr key={index}>
              <td>{d.fullName}</td>
              <td>{d.age}</td>
              <td>{d.bloodGroup}</td>
              <td>{d.location}</td>
              <td>{d.contactNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;