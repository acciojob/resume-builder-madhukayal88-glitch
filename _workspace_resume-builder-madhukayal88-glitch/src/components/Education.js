import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addEducation,
  updateEducation,
  deleteEducation,
} from "../store/resumeSlice";

const EMPTY = {
  courseName: "",
  completionYear: "",
  college: "",
  percentage: "",
};

const Education = () => {
  const education = useSelector((s) => s.resume.education);
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
      dispatch(updateEducation({ id: editId, ...form }));
      setEditId(null);
    } else {
      dispatch(addEducation({ ...form }));
    }
    setForm(EMPTY);
  };

  /* Single DELETE button:
     - if there are saved qualifications it removes the last one
     - otherwise it clears the current form fields            */
  const handleDelete = () => {
    if (education.length > 0) {
      dispatch(deleteEducation(education[education.length - 1].id));
    } else {
      setForm(EMPTY);
    }
  };

  const handleEdit = (item) => {
    setForm({
      courseName: item.courseName,
      completionYear: item.completionYear,
      college: item.college,
      percentage: item.percentage,
    });
    setEditId(item.id);
  };

  return (
    <div className="section education-section">
      <h2 className="section-title">Add your Education Details</h2>

      <div className="grid-2">
        <div className="form-group">
          <label htmlFor="courseName">Course Name *</label>
          <input
            id="courseName"
            type="text"
            name="courseName"
            value={form.courseName}
            onChange={handleChange}
            placeholder="Course Name *"
          />
        </div>

        <div className="form-group">
          <label htmlFor="completionYear">Completion Year *</label>
          <input
            id="completionYear"
            type="text"
            name="completionYear"
            value={form.completionYear}
            onChange={handleChange}
            placeholder="Completion Year *"
          />
        </div>

        <div className="form-group">
          <label htmlFor="college">College / School *</label>
          <input
            id="college"
            type="text"
            name="college"
            value={form.college}
            onChange={handleChange}
            placeholder="College / School *"
          />
        </div>

        <div className="form-group">
          <label htmlFor="percentage">Percentage *</label>
          <input
            id="percentage"
            type="text"
            name="percentage"
            value={form.percentage}
            onChange={handleChange}
            placeholder="Percentage *"
          />
        </div>
      </div>

      <div className="action-row">
        <button id="delete" className="btn btn-delete" onClick={handleDelete} type="button">
          DELETE
        </button>
        <button
          id="add_education"
          className="btn btn-add"
          onClick={handleAdd}
          type="button"
        >
          {editId != null ? "UPDATE EDUCATION" : "ADD EDUCATION"}
        </button>
      </div>

      {education.length > 0 && (
        <ul className="entry-list education-list">
          {education.map((item) => (
            <li className="entry-item" key={item.id}>
              <div className="entry-text">
                <strong>{item.courseName}</strong> — {item.college} (
                {item.completionYear}) {item.percentage}%
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

export default Education;
