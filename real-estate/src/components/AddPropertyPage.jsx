// src/pages/AddPropertyPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPropertyPage() {
  const [property, setProperty] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    images: [],
    type: 'sale'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({
      ...property,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setProperty({
      ...property,
      images: imageUrls
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://real-estate-backend-dvfg.onrender.com/api/properties', property);
      navigate('/');
    } catch (error) {
      console.error('Error adding property:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Add New Property</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={property.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={property.price}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            value={property.description}
            onChange={handleChange}
            className="form-control"
            rows="4"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={property.location}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="images" className="form-label">Images</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}
            className="form-control"
            multiple
          />
          {property.images.length > 0 && (
            <div className="mt-2">
              <h5>Preview:</h5>
              <div className="row">
                {property.images.map((image, index) => (
                  <div key={index} className="col-md-3 mb-2">
                    <img src={image} alt={`Preview ${index + 1}`} className="img-thumbnail" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <select
            id="type"
            name="type"
            value={property.type}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPropertyPage;
