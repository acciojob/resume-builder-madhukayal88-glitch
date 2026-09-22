import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as types from "../redux/actionTypes";

const ResumeBuilder = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { step, profile, education, skills, projects, socialMedia } = state;

  const handleChange = (type, id, name, value) => {
    if (type === "profile") {
      dispatch({ type: types.UPDATE_PROFILE, payload: { name, value } });
    } else {
      dispatch({ type: `UPDATE_${type.toUpperCase()}`, payload: { id, name, value } });
    }
  };

  const handleSave = () => {
    // Implement database persistence / API calls here
    alert("Resume configuration pushed to database successfully!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Resume Builder - Step {step} of 6</h2>

      {/* STEP 1: PROFILE */}
      {step === 1 && (
        <div>
          <h3>Profile Details</h3>
          <input type="text" name="fname" placeholder="First Name" value={profile.fname} onChange={(e) => handleChange("profile", null, "fname", e.target.value)} />
          <input type="text" name="lname" placeholder="Last Name" value={profile.lname} onChange={(e) => handleChange("profile", null, "lname", e.target.value)} />
          <input type="text" name="phone" placeholder="Phone" value={profile.phone} onChange={(e) => handleChange("profile", null, "phone", e.target.value)} />
          <input type="text" name="address" placeholder="Address" value={profile.address} onChange={(e) => handleChange("profile", null, "address", e.target.value)} />
          <input type="text" name="url" placeholder="Profile Image URL" value={profile.url} onChange={(e) => handleChange("profile", null, "url", e.target.value)} />
        </div>
      )}

      {/* STEP 2: EDUCATION */}
      {step === 2 && (
        <div>
          <h3>Education</h3>
          {education.map((edu) => (
            <div key={edu.id} style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px", marginBottom: "10px" }}>
              <input type="text" name="courseName" placeholder="Course Name" value={edu.courseName} onChange={(e) => handleChange("education", edu.id, "courseName", e.target.value)} />
              <input type="text" name="completionYear" placeholder="Completion Year" value={edu.completionYear} onChange={(e) => handleChange("education", edu.id, "completionYear", e.target.value)} />
              <input type="text" name="college" placeholder="College" value={edu.college} onChange={(e) => handleChange("education", edu.id, "college", e.target.value)} />
              <input type="text" name="percentage" placeholder="Percentage/CGPA" value={edu.percentage} onChange={(e) => handleChange("education", edu.id, "percentage", e.target.value)} />
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
              <input type="text" name="skill" placeholder="Skill" value={sk.skill} onChange={(e) => handleChange("skills", sk.id, "skill", e.target.value)} />
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
            <div key={proj.id} style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px", marginBottom: "10px" }}>
              <input type="text" name="projectName" placeholder="Project Name" value={proj.projectName} onChange={(e) => handleChange("projects", proj.id, "projectName", e.target.value)} />
              <input type="text" name="techStack" placeholder="Tech Stack" value={proj.techStack} onChange={(e) => handleChange("projects", proj.id, "techStack", e.target.value)} />
              <textarea name="description" placeholder="Description" value={proj.description} onChange={(e) => handleChange("projects", proj.id, "description", e.target.value)} />
              <button id="delete" onClick={() => dispatch({ type: types.DELETE_PROJECT, payload: proj.id })}>Delete</button>
            </div>
          ))}
          <button id="add_project" onClick={() => dispatch({ type: types.ADD_PROJECT })}>Add Project</button>
        </div>
      )}

      {/* STEP 5: SOCIAL MEDIA */}
      {step === 5 && (
        <div>
          <h3>Social Media Links</h3>
          {socialMedia.map((soc) => (
            <div key={soc.id}>
              <input type="text" name="Social" placeholder="Social Link" value={soc.Social} onChange={(e) => handleChange("socialMedia", soc.id, "Social", e.target.value)} />
              <button id="delete" onClick={() => dispatch({ type: types.DELETE_SOCIAL, payload: soc.id })}>Delete</button>
            </div>
          ))}
          <button id="add_social" onClick={() => dispatch({ type: types.ADD_SOCIAL })}>Add Social Link</button>
        </div>
      )}

      {/* STEP 6: FINAL OUTPUT */}
      {step === 6 && (
        <div>
          <h3>Final Resume Output</h3>
          <div style={{ border: "1px solid #000", padding: "20px" }}>
            <h1>{profile.fname} {profile.lname}</h1>
            <p>{profile.phone} | {profile.address}</p>
            {profile.url && <img src={profile.url} alt="Profile" style={{ width: "100px" }} />}
            
            <h4>Education</h4>
            {education.map((edu, i) => <p key={i}>{edu.courseName} - {edu.college} ({edu.completionYear}) : {edu.percentage}%</p>)}
            
            <h4>Skills</h4>
            <p>{skills.map(s => s.skill).join(", ")}</p>
            
            <h4>Projects</h4>
            {projects.map((p, i) => <div key={i}><h5>{p.projectName} ({p.techStack})</h5><p>{p.description}</p></div>)}
            
            <h4>Social Links</h4>
            {socialMedia.map((s, i) => <p key={i}>{s.Social}</p>)}
          </div>
        </div>
      )}

      {/* NAVIGATION CONTROLS */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        {step > 1 && <button id="back" onClick={() => dispatch({ type: types.BACK_STEP })}>Back</button>}
        {step < 6 && <button id="next" onClick={() => dispatch({ type: types.NEXT_STEP })}>Next</button>}
        {step === 6 && <button id="save_continue" onClick={handleSave}>Save & Continue</button>}
      </div>
    </div>
  );
};

export default ResumeBuilder;
