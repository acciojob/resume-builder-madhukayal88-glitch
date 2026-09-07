import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateProfile,
  addEducation,
  updateEducation,
  deleteEducation,
  addSkill,
  updateSkill,
  deleteSkill,
  addProject,
  updateProject,
  deleteProject,
  addSocial,
  updateSocial,
  deleteSocial
} from './redux/resumeSlice';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, 6));
  const handleBack = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Resume Builder</h1>

      {/* Navigation Controls */}
      <div style={{ marginBottom: '20px' }}>
        <button id="back" onClick={handleBack} disabled={currentPage === 1}>
          Back
        </button>
        <button id="next" onClick={handleNext} disabled={currentPage === 6}>
          Next
        </button>
        <button id="save_continue" onClick={handleNext}>
          Save & Continue
        </button>
      </div>

      {/* Page 1: Profile */}
      {currentPage === 1 && (
        <section id="profile-section">
          <h2>Profile</h2>
          <input
            type="text"
            name="fname"
            placeholder="First Name"
            value={resume.profile.fname}
            onChange={(e) => dispatch(updateProfile({ fname: e.target.value }))}
          />
          <input
            type="text"
            name="lname"
            placeholder="Last Name"
            value={resume.profile.lname}
            onChange={(e) => dispatch(updateProfile({ lname: e.target.value }))}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={resume.profile.phone}
            onChange={(e) => dispatch(updateProfile({ phone: e.target.value }))}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={resume.profile.address}
            onChange={(e) => dispatch(updateProfile({ address: e.target.value }))}
          />
          <input
            type="text"
            name="url"
            placeholder="Image URL"
            value={resume.profile.url}
            onChange={(e) => dispatch(updateProfile({ url: e.target.value }))}
          />
        </section>
      )}

      {/* Page 2: Education */}
      {currentPage === 2 && (
        <section id="education-section">
          <h2>Education</h2>
          {resume.education.map((item) => (
            <div key={item.id} className="education-item" style={{ marginBottom: '10px' }}>
              <input
                type="text"
                name="courseName"
                placeholder="Course Name"
                value={item.courseName}
                onChange={(e) =>
                  dispatch(updateEducation({ id: item.id, field: 'courseName', value: e.target.value }))
                }
              />
              <input
                type="text"
                name="completionYear"
                placeholder="Completion Year"
                value={item.completionYear}
                onChange={(e) =>
                  dispatch(updateEducation({ id: item.id, field: 'completionYear', value: e.target.value }))
                }
              />
              <input
                type="text"
                name="college"
                placeholder="College Name"
                value={item.college}
                onChange={(e) =>
                  dispatch(updateEducation({ id: item.id, field: 'college', value: e.target.value }))
                }
              />
              <input
                type="text"
                name="percentage"
                placeholder="Percentage"
                value={item.percentage}
                onChange={(e) =>
                  dispatch(updateEducation({ id: item.id, field: 'percentage', value: e.target.value }))
                }
              />
              <button id="delete" onClick={() => dispatch(deleteEducation(item.id))}>
                Delete
              </button>
            </div>
          ))}
          <button id="add_education" onClick={() => dispatch(addEducation())}>
            Add Education
          </button>
        </section>
      )}

      {/* Page 3: Skills */}
      {currentPage === 3 && (
        <section id="skills-section">
          <h2>Skills</h2>
          {resume.skills.map((item) => (
            <div key={item.id} className="skill-item" style={{ marginBottom: '10px' }}>
              <input
                type="text"
                name="skill"
                placeholder="Skill"
                value={item.skill}
                onChange={(e) => dispatch(updateSkill({ id: item.id, value: e.target.value }))}
              />
              <button id="delete_skill" onClick={() => dispatch(deleteSkill(item.id))}>
                Delete Skill
              </button>
            </div>
          ))}
          <button id="add_skill" onClick={() => dispatch(addSkill())}>
            Add Skill
          </button>
        </section>
      )}

      {/* Page 4: Projects */}
      {currentPage === 4 && (
        <section id="projects-section">
          <h2>Projects</h2>
          {resume.projects.map((item) => (
            <div key={item.id} className="project-item" style={{ marginBottom: '10px' }}>
              <input
                type="text"
                name="projectName"
                placeholder="Project Name"
                value={item.projectName}
                onChange={(e) =>
                  dispatch(updateProject({ id: item.id, field: 'projectName', value: e.target.value }))
                }
              />
              <input
                type="text"
                name="techStack"
                placeholder="Tech Stack"
                value={item.techStack}
                onChange={(e) =>
                  dispatch(updateProject({ id: item.id, field: 'techStack', value: e.target.value }))
                }
              />
              <textarea
                name="description"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  dispatch(updateProject({ id: item.id, field: 'description', value: e.target.value }))
                }
              />
              <button id="delete" onClick={() => dispatch(deleteProject(item.id))}>
                Delete
              </button>
            </div>
          ))}
          <button id="add_project" onClick={() => dispatch(addProject())}>
            Add Project
          </button>
        </section>
      )}

      {/* Page 5: Social Media */}
      {currentPage === 5 && (
        <section id="social-section">
          <h2>Social Media</h2>
          {resume.social.map((item) => (
            <div key={item.id} className="social-item" style={{ marginBottom: '10px' }}>
              <input
                type="text"
                name="Social"
                placeholder="Social Media Link"
                value={item.Social}
                onChange={(e) => dispatch(updateSocial({ id: item.id, value: e.target.value }))}
              />
              <button id="delete_social" onClick={() => dispatch(deleteSocial(item.id))}>
                Delete Link
              </button>
            </div>
          ))}
          <button id="add_social" onClick={() => dispatch(addSocial())}>
            Add Social
          </button>
        </section>
      )}

      {/* Page 6: Final Resume Output */}
      {currentPage === 6 && (
        <section id="final-resume-output">
          <h2>Final Resume Output</h2>
          <div id="resume-preview">
            <h3>
              {resume.profile.fname} {resume.profile.lname}
            </h3>
            <p>Phone: {resume.profile.phone}</p>
            <p>Address: {resume.profile.address}</p>

            <h4>Education</h4>
            {resume.education.map((e) => (
              <p key={e.id}>
                {e.courseName} from {e.college} ({e.completionYear}) - {e.percentage}%
              </p>
            ))}

            <h4>Skills</h4>
            <ul>
              {resume.skills.map((s) => (
                <li key={s.id}>{s.skill}</li>
              ))}
            </ul>

            <h4>Projects</h4>
            {resume.projects.map((p) => (
              <div key={p.id}>
                <strong>{p.projectName}</strong> [{p.techStack}]
                <p>{p.description}</p>
              </div>
            ))}

            <h4>Social Links</h4>
            <ul>
              {resume.social.map((s) => (
                <li key={s.id}>{s.Social}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}