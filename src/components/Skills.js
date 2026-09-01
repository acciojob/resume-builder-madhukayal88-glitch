import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSkill, deleteSkill } from '../actions/resumeActions';

const Skills = () => {
  const dispatch = useDispatch();
  const skillsList = useSelector(state => state.resume.skills);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      dispatch(addSkill({ name: newSkill.trim() }));
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  };

  return (
    <div className="section-container skills-section">
      <h2>Skills</h2>
      
      <form onSubmit={handleAddSkill} className="add-skill-form">
        <div className="form-group">
          <input
            type="text"
            name="skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter a skill"
            className="form-control"
          />
        </div>
        <button type="submit" id="add_skill" className="add-btn">
          Add Skill
        </button>
      </form>

      <div className="skills-container">
        {skillsList.map((skill) => (
          <div key={skill.id} className="skill-tag">
            <span className="skill-name">{skill.name}</span>
            <button 
              onClick={() => handleDeleteSkill(skill.id)} 
              id="delete_skill" 
              className="delete-skill-btn"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
