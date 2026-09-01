import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEducation, deleteEducation, editEducation } from '../actions/resumeActions';

const Education = () => {
  const dispatch = useDispatch();
  const educationList = useSelector(state => state.resume.education);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    courseName: '',
    completionYear: '',
    college: '',
    percentage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(editEducation(editingId, formData));
      setEditingId(null);
    } else {
      dispatch(addEducation(formData));
    }
    setFormData({
      courseName: '',
      completionYear: '',
      college: '',
      percentage: ''
    });
  };

  const handleEdit = (id) => {
    const education = educationList.find(edu => edu.id === id);
    if (education) {
      setFormData(education);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      dispatch(deleteEducation(id));
    }
  };

  return (
    <div className="section-container education-section">
      <h2>Education Details</h2>
      
      <form onSubmit={handleSubmit} className="education-form">
        <div className="form-row">
          <div className="form-group">
            <label>Course Name</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              placeholder="Enter course name"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Completion Year</label>
            <input
              type="text"
              name="completionYear"
              value={formData.completionYear}
              onChange={handleChange}
              placeholder="YYYY"
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>College/University</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="Enter college name"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Percentage</label>
            <input
              type="text"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              placeholder="Enter percentage"
              className="form-control"
              required
            />
          </div>
        </div>
        <button type="submit" id="add_education" className="add-btn">
          {editingId ? 'Update Education' : 'Add Education'}
        </button>
      </form>

      <div className="education-list">
        {educationList.map((edu) => (
          <div key={edu.id} className="education-item">
            <div className="education-info">
              <h4>{edu.courseName}</h4>
              <p><strong>College:</strong> {edu.college}</p>
              <p><strong>Year:</strong> {edu.completionYear}</p>
              <p><strong>Percentage:</strong> {edu.percentage}%</p>
            </div>
            <div className="education-actions">
              <button 
                onClick={() => handleEdit(edu.id)} 
                className="edit-btn"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(edu.id)} 
                id="delete" 
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
