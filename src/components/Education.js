import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEducation, removeEducation } from '../redux/actions';

function Education() {
  const dispatch = useDispatch();
  const educationList = useSelector(state => state.education);
  const [formData, setFormData] = useState({
    courseName: '',
    completionYear: '',
    college: '',
    percentage: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!formData.courseName || !formData.college) {
      alert('Please fill in Course Name and College');
      return;
    }
    dispatch(addEducation(formData));
    setFormData({ courseName: '', completionYear: '', college: '', percentage: '' });
  };

  const handleDelete = (index) => {
    dispatch(removeEducation(index));
  };

  return (
    <div className="page-content">
      <h2>🎓 Education</h2>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            placeholder="Enter course name"
          />
        </div>
        <div className="form-group">
          <label>Completion Year</label>
          <input
            type="text"
            name="completionYear"
            value={formData.completionYear}
            onChange={handleChange}
            placeholder="e.g., 2024"
          />
        </div>
        <div className="form-group">
          <label>College</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="Enter college name"
          />
        </div>
        <div className="form-group">
          <label>Percentage/CGPA</label>
          <input
            type="text"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            placeholder="e.g., 85%"
          />
        </div>
      </div>
      
      <button id="add_education" className="btn btn-add" onClick={handleAdd}>
        ➕ Add Education
      </button>

      <div className="entries-list">
        <h3>Added Education</h3>
        {educationList.length === 0 ? (
          <p className="empty-message">No education added yet</p>
        ) : (
          educationList.map((edu, index) => (
            <div key={index} className="entry-item">
              <div className="entry-details">
                <strong>{edu.courseName}</strong> - {edu.college} ({edu.completionYear})
                <span className="entry-percentage">{edu.percentage}</span>
              </div>
              <button id="delete" className="btn btn-delete" onClick={() => handleDelete(index)}>
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Education;
