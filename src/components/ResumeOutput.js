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
    <div id="final-resume-output" className="section resume-output">
      <h2 className="ready-title">
        All steps completed - your resume is ready!!
      </h2>

      <div className="output-actions">
        <button
          id="reset"
          className="link-btn reset-btn"
          onClick={handleReset}
          type="button"
        >
          RESET
        </button>
        <button
          id="edit"
          className="link-btn edit-btn"
          onClick={handleEdit}
          type="button"
        >
          EDIT
        </button>
        <button
          id="download"
          className="btn btn-download download-btn"
          onClick={handleDownload}
          type="button"
        >
          DOWNLOAD / PREVIEW
        </button>
      </div>

      <div id="resume-preview" className="resume-card resume-grid-layout">
        {/* Left Column: Profile Photo + Skills */}
        <div className="resume-left-col">
          <img
            className="resume-photo"
            src={
              profile.url ||
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' fill='%23ccc' viewBox='0 0 16 16'%3E%3Cpath d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'/%3E%3C/svg%3E"
            }
            alt="profile"
          />

          <div className="resume-section-block">
            <h3 className="resume-section-title">Skills</h3>
            <hr className="resume-divider" />
            <ul className="resume-skills-list">
              {skills.map((s) => (
                <li key={s.id}>{s.skill}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Name, Contact, Education, Mini Projects, Social Links */}
        <div className="resume-right-col">
          <div className="resume-profile-header">
            <h2 className="resume-name">
              {profile.fname} {profile.lname}
            </h2>
            <p className="resume-line">Address : {profile.address}</p>
            <p className="resume-line">Phone Number: {profile.phone}</p>
          </div>

          <div className="resume-section-block">
            <h3 className="resume-section-title">Education</h3>
            <hr className="resume-divider" />
            {education.map((e) => (
              <div className="resume-item education-item" key={e.id}>
                <h4 className="resume-item-title">{e.college}</h4>
                <p className="resume-item-sub">
                  Graduation Year : {e.completionYear}
                </p>
                <p className="resume-item-sub">{e.courseName}</p>
                <p className="resume-item-sub">Percentage : {e.percentage}%</p>
              </div>
            ))}
          </div>

          <div className="resume-section-block">
            <h3 className="resume-section-title">Mini Projects</h3>
            <hr className="resume-divider" />
            {projects.map((p) => (
              <div className="resume-item project-item" key={p.id}>
                <h4 className="resume-item-title">{p.projectName}</h4>
                <p className="resume-item-sub">{p.description}</p>
                <p className="resume-item-sub">Tech Stack : {p.techStack}</p>
              </div>
            ))}
          </div>

          <div className="resume-section-block">
            <h3 className="resume-section-title">Social Links</h3>
            <hr className="resume-divider" />
            <ul className="resume-social-list">
              {social.map((s) => (
                <li key={s.id} className="social-item">
                  <a href={s.Social} target="_blank" rel="noreferrer">
                    {s.Social || "Social"}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeOutput;
