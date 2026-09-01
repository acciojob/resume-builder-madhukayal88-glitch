import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, editProject, deleteProject } from '../actions/resumeActions';

const Projects = () => {
  const dispatch = useDispatch();
  const projectsList = useSelector(state => state.resume.projects);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    projectName: '',
    techStack: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(editProject(editingId, formData));
      setEditingId(null);
    } else {
      dispatch(addProject(formData));
    }
    setFormData({
      projectName: '',
      techStack: '',
      description: ''
    });
  };

  const handleEdit = (id) => {
    const project = projectsList.find(proj => proj.id === id);
    if (project) {
      setFormData(project);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id));
    }
  };

  return (
    <div className="section-container projects-section">
      <h2>Projects</h2>
      
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label>Project Name</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Enter project name"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Tech Stack</label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="Enter technologies used"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the project"
            className="form-control"
            rows="3"
            required
          />
        </div>
        <button type="submit" id="add_project" className="add-btn">
          {editingId ? 'Update Project' : 'Add Project'}
        </button>
      </form>

      <div className="projects-list">
        {projectsList.map((project) => (
          <div key={project.id} className="project-item">
            <div className="project-info">
              <h4>{project.projectName}</h4>
              <p><strong>Tech Stack:</strong> {project.techStack}</p>
              <p>{project.description}</p>
            </div>
            <div className="project-actions">
              <button 
                onClick={() => handleEdit(project.id)} 
                className="edit-btn"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(project.id)} 
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

export default Projects;
