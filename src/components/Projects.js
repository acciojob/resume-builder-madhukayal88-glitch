import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, removeProject } from '../redux/actions';

function Projects() {
  const dispatch = useDispatch();
  const projectsList = useSelector(state => state.projects);
  const [formData, setFormData] = useState({
    projectName: '',
    techStack: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!formData.projectName) {
      alert('Please enter a project name');
      return;
    }
    dispatch(addProject(formData));
    setFormData({ projectName: '', techStack: '', description: '' });
  };

  const handleDelete = (index) => {
    dispatch(removeProject(index));
  };

  return (
    <div className="page-content">
      <h2>📁 Projects</h2>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Project Name</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Enter project name"
          />
        </div>
        <div className="form-group">
          <label>Tech Stack</label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="e.g., React, Node.js"
          />
        </div>
        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your project"
            rows="3"
          />
        </div>
      </div>
      
      <button id="add_project" className="btn btn-add" onClick={handleAdd}>
        ➕ Add Project
      </button>

      <div className="entries-list">
        <h3>Added Projects</h3>
        {projectsList.length === 0 ? (
          <p className="empty-message">No projects added yet</p>
        ) : (
          projectsList.map((project, index) => (
            <div key={index} className="entry-item">
              <div className="entry-details">
                <strong>{project.projectName}</strong>
                <span className="entry-tech">{project.techStack}</span>
                <p className="entry-description">{project.description}</p>
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

export default Projects;
