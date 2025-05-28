import React, { useEffect, useState } from "react";
import axios from 'axios';

const Person = () => {
  const [person, setPerson] = useState([]);

  const fetchPeople = async () => {
    try {
      const response = await axios.get("http://localhost:4000/person/view");
      setPerson(response.data);
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:4000/person/delete/${id}`);
      setPerson(person.filter(p => p._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <table border={1}>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {person.map((p, index) => (
            <tr key={p._id}>
              <td>{index + 1}</td>
              <td>
                <img src={`http://localhost:4000/${p.profile}`} width={150} height={150} alt="profile" />
              </td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.email}</td>
              <td>
                <button onClick={() => handleDelete(p._id)} style={{ color: 'red' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Person;
