import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProject,
  updateProject,
  deleteProject,
} from "../store/resumeSlice";

const EMPTY = { projectName: "", techStack: "", description: "" };

const Projects = () => {
  const projects = useSelector((s) => s.resume.projects);
  const dispatch = useDispatch();

  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    const hasValue = Object.values(form).some((v) => String(v).trim() !== "");
    if (!hasValue) return;
    if (editId != null) {
      dispatch(updateProject({ id: editId, ...form }));
      setEditId(null);
    } else {
      dispatch(addProject({ ...form }));
    }
    setForm(EMPTY);
  };

  /* Single DELETE button: removes the last project, or clears the form. */
  const handleDelete = () => {
    if (projects.length > 0) {
      dispatch(deleteProject(projects[projects.length - 1].id));
    } else {
      setForm(EMPTY);
    }
  };

  const handleEdit = (item) => {
    setForm({
      projectName: item.projectName,
      techStack: item.techStack,
      description: item.description,
    });
    setEditId(item.id);
  };

  return (
    <div className="section projects-section">
      <h2 className="section-title">Add your Mini Projects</h2>

      <div className="grid-3">
        <div className="form-group">
          <label htmlFor="projectName">Project Name *</label>
          <input
            id="projectName"
            type="text"
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            placeholder="Project Name *"
          />
        </div>

        <div className="form-group">
          <label htmlFor="techStack">Tech Stack</label>
          <input
            id="techStack"
            type="text"
            name="techStack"
            value={form.techStack}
            onChange={handleChange}
            placeholder="Tech Stack"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>
      </div>

      <div className="action-row">
        <button id="delete" className="btn btn-delete" onClick={handleDelete} type="button">
          DELETE
        </button>
        <button
          id="add_project"
          className="btn btn-add"
          onClick={handleAdd}
          type="button"
        >
          {editId != null ? "UPDATE PROJECT" : "ADD PROJECT"}
        </button>
      </div>

      {projects.length > 0 && (
        <ul className="entry-list projects-list">
          {projects.map((item) => (
            <li className="entry-item" key={item.id}>
              <div className="entry-text">
                <strong>{item.projectName}</strong> — {item.techStack}
                <div className="entry-desc">{item.description}</div>
              </div>
              <button
                className="btn btn-small"
                onClick={() => handleEdit(item)}
                type="button"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Projects;
