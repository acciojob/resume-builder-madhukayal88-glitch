import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as types from "../redux/actionTypes";

const ResumeBuilder = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { step, profile, education, skills, projects, socialMedia } = state;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Resume Builder - Step {step} of 6</h2>

      {/* STEP 1: PROFILE */}
      {step === 1 && (
        <div>
          <h3>Profile Details</h3>
          <input type="text" name="fname" placeholder="First Name" value={profile.fname} onChange={(e) => dispatch({ type: types.UPDATE_PROFILE, payload: { name: "fname", value: e.target.value } })} />
          <input type="text" name="lname" placeholder="Last Name" value={profile.lname} onChange={(e) => dispatch({ type: types.UPDATE_PROFILE, payload: { name: "lname", value: e.target.value } })} />
          <input type="text" name="phone" placeholder="Phone" value={profile.phone} onChange={(e) => dispatch({ type: types.UPDATE_PROFILE, payload: { name: "phone", value: e.target.value } })} />
          <input type="text" name="address" placeholder="Address" value={profile.address} onChange={(e) => dispatch({ type: types.UPDATE_PROFILE, payload: { name: "address", value: e.target.value } })} />
          <input type="text" name="url" placeholder="Profile Image URL" value={profile.url} onChange={(e) => dispatch({ type: types.UPDATE_PROFILE, payload: { name: "url", value: e.target.value } })} />
        </div>
      )}

      {/* STEP 2: EDUCATION */}
      {step === 2 && (
        <div>
          <h3>Education</h3>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "10px" }}>
              <input type="text" name="courseName" placeholder="Course" value={edu.courseName} onChange={(e) => dispatch({ type: types.UPDATE_EDUCATION, payload: { id: edu.id, name: "courseName", value: e.target.value } })} />
              <input type="text" name="completionYear" placeholder="Year" value={edu.completionYear} onChange={(e) => dispatch({ type: types.UPDATE_EDUCATION, payload: { id: edu.id, name: "completionYear", value: e.target.value } })} />
              <input type="text" name="college" placeholder="College" value={edu.college} onChange={(e) => dispatch({ type: types.UPDATE_EDUCATION, payload: { id: edu.id, name: "college", value: e.target.value } })} />
              <input type="text" name="percentage" placeholder="Percentage" value={edu.percentage} onChange={(e) => dispatch({ type: types.UPDATE_EDUCATION, payload: { id: edu.id, name: "percentage", value: e.target.value } })} />
              <button id="delete" onClick={() => dispatch({ type: types.DELETE_EDUCATION, payload: edu.id })}>Delete</button>
            </div>
          ))}
          <button id="add_education" onClick={() => dispatch({ type: types.ADD_EDUCATION })}>Add Education</button>
        </div>
      )}

      {/* STEP 3: SKILLS */}
      {step === 3 && (
        <div>
          <h3>Skills</h3>
          {skills.map((sk) => (
            <div key={sk.id}>
              <input type="text" name="skill" placeholder="Skill" value={sk.skill} onChange={(e) => dispatch({ type: types.UPDATE_SKILL, payload: { id: sk.id, name: "skill", value: e.target.value } })} />
              <button id="delete_skill" onClick={() => dispatch({ type: types.DELETE_SKILL, payload: sk.id })}>Delete</button>
            </div>
          ))}
          <button id="add_skill" onClick={() => dispatch({ type: types.ADD_SKILL })}>Add Skill</button>
        </div>
      )}

      {/* STEP 4: PROJECTS */}
      {step === 4 && (
        <div>
          <h3>Projects</h3>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: "10px" }}>
              <input type="text" name="projectName" placeholder="Project Name" value={proj.projectName} onChange={(e) => dispatch({ type: types.UPDATE_PROJECT, payload: { id: proj.id, name: "projectName", value: e.target.value } })} />
              <input type="text" name="techStack" placeholder="Tech Stack" value={proj.techStack} onChange={(e) => dispatch({ type: types.UPDATE_PROJECT, payload: { id: proj.id, name: "techStack", value: e.target.value } })} />
              <textarea name="description" placeholder="Description" value={proj.description} onChange={(e) => dispatch({ type: types.UPDATE_PROJECT, payload: { id: proj.id, name: "description", value: e.target.value } })} />
              <button id="delete" onClick={() => dispatch({ type: types.DELETE_PROJECT, payload: proj.id })}>Delete</button>
            </div>
          ))}
          <button id="add_project" onClick={() => dispatch({ type: types.ADD_PROJECT })}>Add Project</button>
        </div>
      )}

      {/* STEP 5: SOCIAL MEDIA */}
      {step === 5 && (
        <div>
          <h3>Social Media</h3>
          {socialMedia.map((soc) => (
            <div key={soc.id}>
              <input type="text" name="Social" placeholder="Social Link" value={soc.Social} onChange={(e) => dispatch({ type: types.UPDATE_SOCIAL, payload: { id: soc.id, name: "Social", value: e.target.value } })} />
              <button id="delete" onClick={() => dispatch({ type: types.DELETE_SOCIAL, payload: soc.id })}>Delete</button>
            </div>
          ))}
          <button id="add_social" onClick={() => dispatch({ type: types.ADD_SOCIAL })}>Add Social</button>
        </div>
      )}

      {/* STEP 6: RESUME PREVIEW */}
      {step === 6 && (
        <div>
          <h3>Final Resume Output</h3>
          <div>
            <h1>{profile.fname} {profile.lname}</h1>
            <p>{profile.phone} | {profile.address}</p>
            {education.map((edu, i) => <p key={i}>{edu.courseName} from {edu.college}</p>)}
            <p>Skills: {skills.map(s => s.skill).join(", ")}</p>
          </div>
        </div>
      )}

      {/* STEP NAVIGATION CONTROLS */}
      <div style={{ marginTop: "20px" }}>
        {step > 1 && <button id="back" onClick={() => dispatch({ type: types.BACK_STEP })}>Back</button>}
        {step < 5 && <button id="next" onClick={() => dispatch({ type: types.NEXT_STEP })}>Next</button>}
        {step === 5 && <button id="save_continue" onClick={() => dispatch({ type: types.NEXT_STEP })}>Save & Continue</button>}
      </div>
    </div>
  );
};

export default ResumeBuilder;
