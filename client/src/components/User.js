import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    profile: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'profile') {
      const file = e.target.files[0];
      if (file && file.size > 5 * 1024 * 1024) {
        setMessage('File size must be under 5MB');
        return;
      }
      setFormData({ ...formData, profile: file });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profile) {
      setMessage('Please upload a profile image');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('age', formData.age);
    data.append('email', formData.email);
    data.append('profile', formData.profile);

    try {
      const res = await axios.post('http://localhost:4000/person/create', data);
      setMessage( <p style={{color: 'blue'}}>{'User created successfully'}</p>);
      setFormData({ name: '', age: '', email: '', profile: null });
    } catch (err) {
      setMessage(err.response?.data?.message || <p style={{color: "red"}}>{"Something went wrong"}</p>);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Create User</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Age:</label><br />
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Profile (Max 5MB):</label><br />
          <input type="file" name="profile" onChange={handleChange} accept="image/*" required />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;