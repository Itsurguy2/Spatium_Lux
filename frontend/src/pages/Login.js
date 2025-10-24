import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaHome } from 'react-icons/fa';
import { MdLogin } from 'react-icons/md';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <FaHome />
              <span>Spatium Lux</span>
            </Link>
            <h1>Welcome Back</h1>
            <p>Sign in to continue designing your dream home</p>
          </div>

          {error && (
            <div className="auth-error">
              <strong>Error:</strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Enter your password"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-large auth-submit"
              disabled={loading}
            >
              {loading ? (
                'Signing in...'
              ) : (
                <>
                  <MdLogin /> Sign In
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">Create one now</Link>
            </p>
          </div>
        </div>

        <div className="auth-visual">
          <div className="visual-content">
            <h2>Design Your Perfect Home</h2>
            <p>Join thousands of homeowners creating their dream spaces</p>
            <div className="visual-features">
              <div className="visual-feature">
                <div className="feature-check">✓</div>
                <span>Real-time 3D preview</span>
              </div>
              <div className="visual-feature">
                <div className="feature-check">✓</div>
                <span>Instant price calculations</span>
              </div>
              <div className="visual-feature">
                <div className="feature-check">✓</div>
                <span>Smart design validation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;