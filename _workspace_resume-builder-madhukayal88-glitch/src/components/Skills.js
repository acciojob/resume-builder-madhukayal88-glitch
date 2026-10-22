import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSkill, updateSkill, deleteSkill } from "../store/resumeSlice";

const Skills = () => {
  const skills = useSelector((s) => s.resume.skills);
  const dispatch = useDispatch();

  const [skill, setSkill] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (!skill.trim()) return;
    if (editId != null) {
      dispatch(updateSkill({ id: editId, skill }));
      setEditId(null);
    } else {
      dispatch(addSkill(skill));
    }
    setSkill("");
  };

  /* Single DELETE SKILL button: removes the last skill, or clears the input. */
  const handleDelete = () => {
    if (skills.length > 0) {
      dispatch(deleteSkill(skills[skills.length - 1].id));
    } else {
      setSkill("");
    }
  };

  const handleEdit = (item) => {
    setSkill(item.skill);
    setEditId(item.id);
  };

  return (
    <div className="section skills-section">
      <h2 className="section-title">Add your Skills</h2>

      <div className="form-group">
        <label htmlFor="skill">Skill *</label>
        <input
          id="skill"
          type="text"
          name="skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="Skill *"
        />
      </div>

      <div className="action-row">
        <button
          id="delete_skill"
          className="btn btn-delete"
          onClick={handleDelete}
          type="button"
        >
          DELETE SKILL
        </button>
        <button
          id="add_skill"
          className="btn btn-add"
          onClick={handleAdd}
          type="button"
        >
          {editId != null ? "UPDATE SKILL" : "ADD SKILL"}
        </button>
      </div>

      {skills.length > 0 && (
        <ul className="entry-list skills-list">
          {skills.map((item) => (
            <li className="entry-item" key={item.id}>
              <div className="entry-text">{item.skill}</div>
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

export default Skills;
