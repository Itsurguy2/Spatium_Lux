import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { housesAPI } from '../services/api';
import HouseForm from '../components/HouseForm';
import './HouseFormPage.css';

function EditHouse() {
  const [house, setHouse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

 useEffect(() => {
  const fetchHouse = async () => {
    try {
      const response = await housesAPI.getOne(id);
      setHouse(response.data.house);
    } catch (err) {
      setError('Failed to load house');
      console.error(err);
    } finally {
      setFetchLoading(false);
    }
  };
  
  fetchHouse();
}, [id]);  // ✅ Now only id is needed
  const fetchHouse = async () => {
    try {
      const response = await housesAPI.getOne(id);
      setHouse(response.data.house);
    } catch (err) {
      setError('Failed to load house');
      console.error(err);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);

    try {
      await housesAPI.update(id, formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update house');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <div className="loading">Loading house details...</div>;
  }

  if (!house) {
    return (
      <div className="container">
        <div className="error-message">House not found</div>
      </div>
    );
  }

  return (
    <div className="house-form-page container">
      <div className="page-header">
        <h1>Edit House</h1>
        <p>Update your custom home design</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <HouseForm 
        initialData={house}
        onSubmit={handleSubmit} 
        loading={loading}
        submitText="Update House"
      />
    </div>
  );
}

export default EditHouse;
