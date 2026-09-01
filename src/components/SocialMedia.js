import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSocial, deleteSocial } from '../actions/resumeActions';

const SocialMedia = () => {
  const dispatch = useDispatch();
  const socialList = useSelector(state => state.resume.socialMedia);
  const [formData, setFormData] = useState({
    platform: '',
    url: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.platform && formData.url) {
      dispatch(addSocial(formData));
      setFormData({
        platform: '',
        url: ''
      });
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteSocial(id));
  };

  return (
    <div className="section-container social-section">
      <h2>Social Media Links</h2>
      
      <form onSubmit={handleSubmit} className="social-form">
        <div className="form-row">
          <div className="form-group">
            <label>Platform</label>
            <input
              type="text"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              placeholder="e.g., LinkedIn"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>URL</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="Enter profile URL"
              className="form-control"
              required
            />
          </div>
        </div>
        <button type="submit" id="add_social" className="add-btn">
          Add Social Link
        </button>
      </form>

      <div className="social-list">
        {socialList.map((social) => (
          <div key={social.id} className="social-item">
            <span className="social-platform">{social.platform}</span>
            <a 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-url"
            >
              {social.url}
            </a>
            <button 
              onClick={() => handleDelete(social.id)} 
              className="delete-social-btn"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
