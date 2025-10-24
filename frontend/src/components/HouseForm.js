import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HouseForm.css';
import HousePreview from './HousePreview';

const LOCATIONS = ['Mountains', 'NYC', 'Oceanfront', 'Desert', 'Forest', 'Countryside', 'Lakeside', 'Suburban'];
const STYLES = ['Modern', 'Traditional', 'Contemporary', 'Ranch', 'Colonial', 'Victorian', 'Craftsman', 'Mediterranean'];
const EXTERIOR_COLORS = ['White', 'Beige', 'Gray', 'Blue', 'Green', 'Brown', 'Red', 'Yellow'];
const ROOF_TYPES = ['Gable', 'Hip', 'Flat', 'Mansard', 'Gambrel', 'Shed'];
const FLOORING_TYPES = ['Hardwood', 'Tile', 'Carpet', 'Laminate', 'Vinyl', 'Marble', 'Bamboo'];
const KITCHEN_STYLES = ['Modern', 'Traditional', 'Rustic', 'Industrial', 'Scandinavian', 'Farmhouse'];
const LANDSCAPE_TYPES = ['Minimal', 'Lush Garden', 'Desert', 'Tropical', 'Zen', 'English Garden'];

function HouseForm({ initialData = {}, onSubmit, onFormChange, loading, submitText = 'Submit' }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    location: initialData.location || '',
    style: initialData.style || '',
    bedrooms: initialData.bedrooms || '',
    bathrooms: initialData.bathrooms || '',
    square_feet: initialData.square_feet || '',
    exterior_color: initialData.exterior_color || '',
    roof_type: initialData.roof_type || '',
    flooring_type: initialData.flooring_type || '',
    kitchen_style: initialData.kitchen_style || '',
    has_pool: initialData.has_pool || false,
    has_garage: initialData.has_garage || false,
    garage_spaces: initialData.garage_spaces || '',
    has_deck: initialData.has_deck || false,
    has_fireplace: initialData.has_fireplace || false,
    landscape_type: initialData.landscape_type || '',
    price_estimate: initialData.price_estimate || '',
    image_url: initialData.image_url || '',
    notes: initialData.notes || ''  
  });

  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [pricing, setPricing] = useState(null);
  const [disabledOptions, setDisabledOptions] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
  const [validationWarnings, setValidationWarnings] = useState([]);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/houses/pricing');
        setPricing(response.data.pricing);
      } catch (error) {
        console.error('Failed to fetch pricing:', error);
      }
    };
    fetchPricing();
  }, []);

  useEffect(() => {
    const calculatePrice = async () => {
      if (!pricing) return;

      try {
        const response = await axios.post('http://localhost:5000/api/houses/calculate-price', formData);
        setEstimatedPrice(response.data.price);
      } catch (error) {
        console.error('Failed to calculate price:', error);
      }
    };

    calculatePrice();
  }, [formData, pricing]);

  useEffect(() => {
    const fetchDisabledOptions = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/houses/disabled-options', formData);
        setDisabledOptions(response.data.disabledOptions || {});
      } catch (error) {
        console.error('Failed to fetch disabled options:', error);
      }
    };

    if (formData.location || formData.style) {
      fetchDisabledOptions();
    }
  }, [formData, formData.location, formData.style]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value);
    
    const newFormData = {
      ...formData,
      [name]: newValue
    };
    
    setFormData(newFormData);
    
    // Notify parent component of form changes for theming
    if (onFormChange) {
      onFormChange(newFormData);
    }
  }; // ← ADDED MISSING CLOSING BRACE

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate before submitting
    try {
      const validationResponse = await axios.post('http://localhost:5000/api/houses/validate', formData);
      
      if (!validationResponse.data.isValid) {
        setValidationErrors(validationResponse.data.errors || []);
        setValidationWarnings(validationResponse.data.warnings || []);
        
        // Scroll to top to show errors
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      // Clear any previous errors
      setValidationErrors([]);
      setValidationWarnings([]);
      
      // Call the original onSubmit
      onSubmit(formData);
    } catch (error) {
      console.error('Validation failed:', error);
      if (error.response?.data?.validationErrors) {
        setValidationErrors(error.response.data.validationErrors);
        setValidationWarnings(error.response.data.warnings || []);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="house-form card">
      {/* ADD ERROR/WARNING DISPLAY */}
      {validationErrors.length > 0 && (
        <div className="validation-errors">
          <h3>❌ Configuration Errors</h3>
          <p>The following combinations are incompatible:</p>
          <ul>
            {validationErrors.map((error, index) => (
              <li key={index}>
                <strong>{error.field}:</strong> {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {validationWarnings.length > 0 && (
        <div className="validation-warnings">
          <h3>⚠️ Warnings</h3>
          <ul>
            {validationWarnings.map((warning, index) => (
              <li key={index}>
                <strong>{warning.field}:</strong> {warning.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <HousePreview formData={formData} />
      
      <div className="form-section">
        <h2>Basic Information</h2>
        <div className="grid grid-2">
          <div className="form-group">
            <label htmlFor="name">House Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Mountain View Estate"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option value="">Select location</option>
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="style">Architectural Style</label>
            <select
              id="style"
              name="style"
              value={formData.style}
              onChange={handleChange}
            >
              <option value="">Select style</option>
              {STYLES.map(type => (
                <option 
                  key={type} 
                  value={type}
                  disabled={disabledOptions.style?.includes(type)}
                >
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="square_feet">Square Feet</label>
            <input
              type="number"
              id="square_feet"
              name="square_feet"
              value={formData.square_feet}
              onChange={handleChange}
              placeholder="e.g., 2500"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Rooms & Spaces</h2>
        <div className="grid grid-2">
          <div className="form-group">
            <label htmlFor="bedrooms">Bedrooms</label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              min="1"
              placeholder="e.g., 3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bathrooms">Bathrooms</label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              min="1"
              placeholder="e.g., 2"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Exterior Design</h2>
        <div className="grid grid-2">
          <div className="form-group">
            <label htmlFor="exterior_color">Exterior Color</label>
            <select
              id="exterior_color"
              name="exterior_color"
              value={formData.exterior_color}
              onChange={handleChange}
            >
              <option value="">Select color</option>
              {EXTERIOR_COLORS.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="roof_type">Roof Type</label>
            <select
              id="roof_type"
              name="roof_type"
              value={formData.roof_type}
              onChange={handleChange}
            >
              <option value="">Select roof type</option>
              {ROOF_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="landscape_type">Landscaping</label>
            <select
              id="landscape_type"
              name="landscape_type"
              value={formData.landscape_type}
              onChange={handleChange}
            >
              <option value="">Select landscape type</option>
              {LANDSCAPE_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Interior Design</h2>
        <div className="grid grid-2">
          <div className="form-group">
            <label htmlFor="flooring_type">Flooring</label>
            <select
              id="flooring_type"
              name="flooring_type"
              value={formData.flooring_type}
              onChange={handleChange}
            >
              <option value="">Select flooring</option>
              {FLOORING_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="kitchen_style">Kitchen Style</label>
            <select
              id="kitchen_style"
              name="kitchen_style"
              value={formData.kitchen_style}
              onChange={handleChange}
            >
              <option value="">Select kitchen style</option>
              {KITCHEN_STYLES.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Features & Amenities</h2>
        <div className="grid grid-2">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="has_pool"
              name="has_pool"
              checked={formData.has_pool}
              onChange={handleChange}
            />
            <label htmlFor="has_pool">Swimming Pool</label>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="has_garage"
              name="has_garage"
              checked={formData.has_garage}
              onChange={handleChange}
            />
            <label htmlFor="has_garage">Garage</label>
          </div>

          {formData.has_garage && (
            <div className="form-group">
              <label htmlFor="garage_spaces">Garage Spaces</label>
              <input
                type="number"
                id="garage_spaces"
                name="garage_spaces"
                value={formData.garage_spaces}
                onChange={handleChange}
                min="1"
                placeholder="e.g., 2"
              />
            </div>
          )}

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="has_deck"
              name="has_deck"
              checked={formData.has_deck}
              onChange={handleChange}
            />
            <label htmlFor="has_deck">Deck/Patio</label>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="has_fireplace"
              name="has_fireplace"
              checked={formData.has_fireplace}
              onChange={handleChange}
            />
            <label htmlFor="has_fireplace">Fireplace</label>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Additional Information</h2>
        <div className="grid grid-2">
          <div className="form-group">
            <label htmlFor="price_estimate">Price Estimate ($)</label>
            <input
              type="number"
              id="price_estimate"
              name="price_estimate"
              value={formData.price_estimate}
              onChange={handleChange}
              placeholder="e.g., 750000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image_url">Image URL (optional)</label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any additional notes about your house design..."
          />
        </div>
      </div>

      {/* Price Display Section */}
      <div className="form-section price-section">
        <h2>💰 Estimated Price</h2>
        <div className="price-display">
          <div className="price-amount">
            ${estimatedPrice.toLocaleString('en-US')}
          </div>
          <p className="price-note">Price updates as you customize your home</p>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : submitText}
        </button>
      </div>
    </form>
  );
}

export default HouseForm;