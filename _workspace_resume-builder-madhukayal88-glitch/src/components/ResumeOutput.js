import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, gotoPage } from "../store/resumeSlice";

const ResumeOutput = () => {
  const dispatch = useDispatch();
  const { profile, education, skills, projects, social } = useSelector(
    (s) => s.resume
  );

  const handleReset = () => {
    try {
      window.localStorage.removeItem("resumeBuilderData");
    } catch (e) {
      /* ignore */
    }
    dispatch(reset());
  };

  const handleEdit = () => dispatch(gotoPage(1));

  const handleDownload = () => {
    const lines = [];
    lines.push(`${profile.fname} ${profile.lname}`.trim());
    lines.push(`Address : ${profile.address}`);
    lines.push(`Phone Number: ${profile.phone}`);
    lines.push("");
    lines.push("Skills");
    skills.forEach((s) => lines.push(`• ${s.skill}`));
    lines.push("");
    lines.push("Education");
    education.forEach((e) => {
      lines.push(`${e.college}`);
      lines.push(`Graduation Year : ${e.completionYear}`);
      lines.push(`${e.courseName}`);
      lines.push(`Percentage : ${e.percentage}%`);
      lines.push("");
    });
    lines.push("Mini Projects");
    projects.forEach((p) => {
      lines.push(`${p.projectName}`);
      lines.push(`${p.description}`);
      lines.push(`Tech Stack : ${p.techStack}`);
      lines.push("");
    });
    lines.push("Social Links");
    social.forEach((s) => lines.push(`• ${s.Social}`));

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="section resume-output">
      <h2 className="ready-title">
        All steps completed - your resume is ready!!
      </h2>

      <div className="output-actions">
        <button className="link-btn" onClick={handleReset} type="button">
          RESET
        </button>
        <button className="link-btn" onClick={handleEdit} type="button">
          EDIT
        </button>
        <button
          className="btn btn-download"
          onClick={handleDownload}
          type="button"
        >
          DOWNLOAD / PREVIEW
        </button>
      </div>

      <div className="resume-card">
        <div className="resume-head">
          {profile.url && (
            <img
              className="resume-photo"
              src={profile.url}
              alt="profile"
              width="90"
              height="90"
            />
          )}
          <h3 className="resume-name">
            {profile.fname} {profile.lname}
          </h3>
          <p className="resume-line">Address : {profile.address}</p>
          <p className="resume-line">Phone Number: {profile.phone}</p>
        </div>

        <hr />

        <div className="resume-columns">
          <div className="resume-col">
            <h4>Skills</h4>
            <ul>
              {skills.map((s) => (
                <li key={s.id}>{s.skill}</li>
              ))}
            </ul>
          </div>

          <div className="resume-col">
            <h4>Education</h4>
            {education.map((e) => (
              <div className="resume-edu" key={e.id}>
                <strong>{e.college}</strong>
                <p>Graduation Year : {e.completionYear}</p>
                <p>{e.courseName}</p>
                <p>Percentage : {e.percentage}%</p>
              </div>
            ))}
          </div>
        </div>

        <hr />

        <h4>Mini Projects</h4>
        {projects.map((p) => (
          <div className="resume-project" key={p.id}>
            <strong>{p.projectName}</strong>
            <p>{p.description}</p>
            <p>Tech Stack : {p.techStack}</p>
          </div>
        ))}

        <hr />

        <h4>Social Links</h4>
        <ul>
          {social.map((s) => (
            <li key={s.id}>
              <a href={s.Social} target="_blank" rel="noreferrer">
                {s.Social}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumeOutput;
