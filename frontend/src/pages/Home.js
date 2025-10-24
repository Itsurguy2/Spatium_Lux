import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaHome, 
  FaArrowRight, 
  FaStar,
  FaPalette,
  FaDollarSign,
  FaShieldAlt,
  FaGlobeAmericas,
  FaBuilding,
  FaSwimmingPool
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi';
import './Home.css';

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <MdVerified /> #1 Custom Home Designer
          </div>
          <h1 className="hero-title">
            Design Your
            <span className="gradient-text"> Dream Home</span>
          </h1>
          <p className="hero-subtitle">
            Create stunning custom homes with our AI-powered design platform. 
            Choose from thousands of options and see your vision come to life in real-time.
          </p>
          <div className="hero-buttons">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-primary btn-large">
                  <span>View My Homes</span>
                  <FaArrowRight className="btn-icon" />
                </Link>
                <Link to="/create" className="btn btn-secondary btn-large">
                  <span>Create New Design</span>
                  <HiSparkles className="btn-icon" />
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-large">
                  <span>Get Started Free</span>
                  <FaArrowRight className="btn-icon" />
                </Link>
                <Link to="/login" className="btn btn-secondary btn-large">
                  Sign In
                </Link>
              </>
            )}
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Homes Designed</div>
            </div>
            <div className="stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Style Options</div>
            </div>
            <div className="stat">
              <div className="stat-number">
                <FaStar style={{ color: '#ffd700', marginRight: '4px' }} />
                4.9
              </div>
              <div className="stat-label">User Rating</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="mini-house"><FaHome /></div>
            <div className="card-text">
              <div className="card-title">Modern Villa</div>
              <div className="card-price">$2.5M</div>
            </div>
          </div>
          <div className="floating-card card-2">
            <div className="mini-house"><FaBuilding /></div>
            <div className="card-text">
              <div className="card-title">Beach House</div>
              <div className="card-price">$1.8M</div>
            </div>
          </div>
          <div className="floating-card card-3">
            <div className="mini-house"><FaHome /></div>
            <div className="card-text">
              <div className="card-title">Countryside</div>
              <div className="card-price">$950K</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Spatium Lux?</h2>
            <p>Everything you need to design your perfect home</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaPalette />
              </div>
              <h3>Real-Time Preview</h3>
              <p>See your home design update instantly as you make changes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaDollarSign />
              </div>
              <h3>Dynamic Pricing</h3>
              <p>Get accurate cost estimates that update with every selection</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3>Smart Validation</h3>
              <p>Avoid incompatible choices with intelligent recommendations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaGlobeAmericas />
              </div>
              <h3>8 Locations</h3>
              <p>From mountains to oceanfront - pick your perfect setting</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaBuilding />
              </div>
              <h3>8 Architectural Styles</h3>
              <p>Modern, traditional, Victorian, and more design options</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaSwimmingPool />
              </div>
              <h3>Premium Features</h3>
              <p>Pools, garages, custom landscaping, and luxury amenities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Build Your Dream?</h2>
          <p>Join thousands of homeowners who designed their perfect space with us</p>
          {!isAuthenticated && (
            <Link to="/register" className="btn btn-primary btn-large">
              Start Designing Now - It's Free
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;