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

      <div id="resume-preview" className="resume-card resume-grid-layout">
        {/* Left Column: Profile Photo + Skills */}
        <div className="resume-left-col">
          {profile.url ? (
            <img
              className="resume-photo"
              src={profile.url}
              alt="profile"
            />
          ) : (
            <div className="resume-photo-placeholder" />
          )}

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
              <div className="resume-item" key={e.id}>
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
              <div className="resume-item" key={p.id}>
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
                <li key={s.id}>
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
