import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { housesAPI } from '../services/api';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaMapMarkerAlt, 
  FaBed, 
  FaBath,
  FaRulerCombined,
  FaHome
} from 'react-icons/fa';
import { MdPool, MdGarage } from 'react-icons/md';
import './Dashboard.css';

function Dashboard() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await housesAPI.getAll();
      setHouses(response.data.houses);
    } catch (err) {
      setError('Failed to load houses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this house?')) return;

    try {
      await housesAPI.delete(id);
      setHouses(houses.filter(house => house.id !== id));
    } catch (err) {
      setError('Failed to delete house');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading">Loading your homes...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div className="header-content">
            <h1>
              <FaHome /> My Dream Homes
            </h1>
            <p>Manage and explore your custom home designs</p>
          </div>
          <Link to="/create" className="btn btn-primary">
            <FaPlus /> Create New Home
          </Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        {houses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <FaHome />
            </div>
            <h2>No homes yet</h2>
            <p>Start designing your dream home today!</p>
            <Link to="/create" className="btn btn-primary btn-large">
              <FaPlus /> Create Your First Home
            </Link>
          </div>
        ) : (
          <div className="houses-grid">
            {houses.map((house) => (
              <div key={house.id} className="house-card">
                <div className="house-card-header">
                  <div className="house-location">
                    <FaMapMarkerAlt /> {house.location}
                  </div>
                  {house.price_estimate && (
                    <div className="house-price">
                      ${Number(house.price_estimate).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="house-card-body">
                  <h3>{house.name}</h3>
                  {house.style && (
                    <div className="house-style">{house.style} Style</div>
                  )}

                  <div className="house-specs">
                    {house.bedrooms && (
                      <div className="spec">
                        <FaBed />
                        <span>{house.bedrooms} Beds</span>
                      </div>
                    )}
                    {house.bathrooms && (
                      <div className="spec">
                        <FaBath />
                        <span>{house.bathrooms} Baths</span>
                      </div>
                    )}
                    {house.square_feet && (
                      <div className="spec">
                        <FaRulerCombined />
                        <span>{Number(house.square_feet).toLocaleString()} sqft</span>
                      </div>
                    )}
                  </div>

                  {(house.has_pool || house.has_garage) && (
                    <div className="house-amenities">
                      {house.has_pool && (
                        <div className="amenity">
                          <MdPool /> Pool
                        </div>
                      )}
                      {house.has_garage && (
                        <div className="amenity">
                          <MdGarage /> Garage
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="house-card-actions">
                  <button
                    onClick={() => navigate(`/edit/${house.id}`)}
                    className="btn btn-secondary"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(house.id)}
                    className="btn btn-danger"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;