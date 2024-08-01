// src/pages/PropertyPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://real-estate-backend-dvfg.onrender.com/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <div className="text-center my-4">Loading...</div>;
  }

  if (!property) {
    return <div className="text-center my-4">Property not found.</div>;
  }

  return (
    <div id="property"className="container my-4 text-center">
      <div className="row">
        <div className="col-md-6 mt-5" id='image'>
          {property.images.length > 0 && (
            <img
              src={property.images[0]}
              alt={property.title}
              className="img-fluid mb-3"
            />
          )}
        </div>
        <div className="col-md-6">
          <h1 className="mb-3">{property.title}</h1>
          <p className="lead">{property.description}</p>
          <p className="h4"><strong>Price:</strong> ${property.price}</p>
          <p className="h5"><strong>Location:</strong> {property.location}</p>
          <div className="mt-4" style={{objectFit:"cover"}}>
            {property.images.length > 1 && (
              <div>
                <h3>More Images</h3>
                <div className="row">
                  {property.images.slice(1).map((image, index) => (
                    <div key={index} className="col-md-4 mb-3">
                      <img
                        src={image}
                        alt={`Property Image ${index + 2}`}
                        className="img-fluid"
                        style={{objectFit:"cover"}}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Link to={"/home"}>
      <button className='btn btn-success btn-lg col-4 my-4 mx-auto'>Back</button>
      </Link>
    </div>
  );
}

export default PropertyPage;
