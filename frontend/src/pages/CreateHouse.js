import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { housesAPI } from '../services/api';
import HouseForm from '../components/HouseForm';
import ThemedPageWrapper from '../components/ThemedPageWrapper';
import './CreateHouse.css';

function CreateHouse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});

  const handleSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await housesAPI.create(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create house');
      console.error('Create error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Track form data changes to pass to theme wrapper
  const handleFormChange = (data) => {
    setFormData(data);
  };

  return (
    <ThemedPageWrapper location={formData.location} style={formData.style}>
      <div className="create-house-page">
        <div className="page-header">
          <h1>✨ Design Your Dream Home</h1>
          <p>Customize every detail to create your perfect space</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <HouseForm 
          onSubmit={handleSubmit} 
          onFormChange={handleFormChange}
          loading={loading} 
          submitText={loading ? 'Creating...' : 'Create House'} 
        />
      </div>
    </ThemedPageWrapper>
  );
}

export default CreateHouse;