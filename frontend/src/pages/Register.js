import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaUser, FaHome } from 'react-icons/fa';
import { MdPersonAdd } from 'react-icons/md';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-visual">
          <div className="visual-content">
            <h2>Start Your Journey</h2>
            <p>Create an account and begin designing your dream home today</p>
            <div className="visual-features">
              <div className="visual-feature">
                <div className="feature-check">✓</div>
                <span>Free forever account</span>
              </div>
              <div className="visual-feature">
                <div className="feature-check">✓</div>
                <span>Unlimited designs</span>
              </div>
              <div className="visual-feature">
                <div className="feature-check">✓</div>
                <span>Save and share your homes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <FaHome />
              <span>Spatium Lux</span>
            </Link>
            <h1>Create Account</h1>
            <p>Join thousands of homeowners designing their perfect space</p>
          </div>

          {error && (
            <div className="auth-error">
              <strong>Error:</strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">
                <FaUser /> Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                minLength="3"
                placeholder="Choose a username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope /> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <FaLock /> Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="Create a password (min. 6 characters)"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-large auth-submit"
              disabled={loading}
            >
              {loading ? (
                'Creating account...'
              ) : (
                <>
                  <MdPersonAdd /> Create Account
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;