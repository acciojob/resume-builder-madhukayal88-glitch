import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSocial, removeSocial } from '../redux/actions';

function SocialMedia() {
  const dispatch = useDispatch();
  const socialList = useSelector(state => state.social);
  const [social, setSocial] = useState('');

  const handleAdd = () => {
    if (!social.trim()) {
      alert('Please enter a social media link');
      return;
    }
    dispatch(addSocial(social.trim()));
    setSocial('');
  };

  const handleDelete = (index) => {
    dispatch(removeSocial(index));
  };

  return (
    <div className="page-content">
      <h2>🔗 Social Media</h2>
      
      <div className="add-skill-container">
        <input
          type="url"
          name="Social"
          value={social}
          onChange={(e) => setSocial(e.target.value)}
          placeholder="Enter social media URL (e.g., https://linkedin.com/in/username)"
          className="skill-input"
        />
        <button id="add_social" className="btn btn-add" onClick={handleAdd}>
          ➕ Add Social Link
        </button>
      </div>

      <div className="entries-list">
        <h3>Your Social Links</h3>
        {socialList.length === 0 ? (
          <p className="empty-message">No social links added yet</p>
        ) : (
          socialList.map((link, index) => (
            <div key={index} className="entry-item">
              <div className="entry-details">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  🔗 {link}
                </a>
              </div>
              <button className="btn btn-delete" onClick={() => handleDelete(index)}>
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SocialMedia;
