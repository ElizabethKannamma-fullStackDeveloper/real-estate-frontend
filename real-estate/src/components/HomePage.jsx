// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../App.css"

function HomePage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('https://real-estate-backend-dvfg.onrender.com/api/properties')
      .then(response => setProperties(response.data))
      .catch(error => console.error('Error fetching properties:', error));
  }, []);

  return (
    <div className="container my-4">
      <div className="text-center mb-4">
        <h1>Properties</h1>
      </div>
      <div className="row">
        {properties.map(property => (
          <div key={property._id} className="col-md-3 mb-4">
            <div className="card h-100 text-center">
              {property.images.length > 0 && (
                <img src={property.images[0]} alt={property.title} className="card-img-top" />
              )}
              <div className="card-body">
                <h5 className="card-title">{property.title}</h5>
                <p className="card-text">{property.description}</p>
                <p className="card-text"><strong>Price:</strong> ${property.price}</p>
                <p className="card-text"><strong>Location:</strong> {property.location}</p>
                <Link to={`/property/${property._id}`} className="btn btn-primary ">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to="/add-property" className="btn btn-success">Add New Property</Link>
      </div>
    </div>
  );
}

export default HomePage;
