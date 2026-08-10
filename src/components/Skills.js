import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSkill, removeSkill } from '../redux/actions';

function Skills() {
  const dispatch = useDispatch();
  const skillsList = useSelector(state => state.skills);
  const [skill, setSkill] = useState('');

  const handleAdd = () => {
    if (!skill.trim()) {
      alert('Please enter a skill');
      return;
    }
    dispatch(addSkill(skill.trim()));
    setSkill('');
  };

  const handleDelete = (index) => {
    dispatch(removeSkill(index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="page-content">
      <h2>🛠️ Skills</h2>
      
      <div className="add-skill-container">
        <input
          type="text"
          name="skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a skill (e.g., JavaScript)"
          className="skill-input"
        />
        <button id="add_skill" className="btn btn-add" onClick={handleAdd}>
          ➕ Add Skill
        </button>
      </div>

      <div className="entries-list">
        <h3>Your Skills</h3>
        {skillsList.length === 0 ? (
          <p className="empty-message">No skills added yet</p>
        ) : (
          <div className="skills-tags">
            {skillsList.map((skill, index) => (
              <div key={index} className="skill-tag">
                <span className="skill-name">{skill}</span>
                <button id="delete_skill" className="btn btn-delete-small" onClick={() => handleDelete(index)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Skills;
