Resume Builder (Redux)

A multi-page Resume Builder built with React + Redux Toolkit. It walks the user through five sections — Profile, Education, Skills, Projects and Social Media — and finally renders a complete, saveable resume.

AccioJob — MERN Stack assignment. Solution repo: resume-builder-madhukayal88-glitch

✨ Features

- Multi-page form with a visual stepper (Profile → Education → Skills → Mini Project → Social).

- Every section supports adding, editing and deleting entries.

- Smooth navigation with Back, Next and Save and Continue buttons.

- All application state is managed with Redux (@reduxjs/toolkit + react-redux).

- Final resume output page with Reset / Edit / Download-Preview.

- Resume is saved and loaded (persisted) so it survives a page reload.

🗂️ Project structure

.
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Stepper.js         # progress indicator
│   │   ├── Profile.js         # Page 1
│   │   ├── Education.js       # Page 2
│   │   ├── Skills.js          # Page 3
│   │   ├── Projects.js        # Page 4
│   │   ├── Social.js          # Page 5
│   │   └── ResumeOutput.js    # Final resume
│   ├── store/
│   │   ├── store.js           # configureStore
│   │   └── resumeSlice.js     # all reducers/actions
│   ├── styles/App.css
│   ├── App.js
│   └── index.js
├── server/index.js            # optional JSON "database" backend
├── tests/validate.py          # end-to-end Playwright check
├── webpack.config.js
└── package.json

🚀 Getting started

# 1. install dependencies
npm install

# 2. start the dev server (http://localhost:8080)
npm start

The app is served on http://localhost:8080.

Optional real backend ("database"):

npm run server      # http://localhost:5000  (stores data/resume.json)

🔌 Selectors used by the tests

 Section Selectors

 Navigation #next, #save_continue, #back

 Profile name="fname", name="lname", name="phone", name="address", name="url"

 Education name="courseName", name="completionYear", name="college", name="percentage", #add_education, #delete

 Skills name="skill", #add_skill, #delete_skill

 Projects name="projectName", name="techStack", name="description", #add_project, #delete

 Social name="Social", #add_social

🧠 Redux state shape

{
  resume: {
    page: 1,                       // 1..5 form pages, 6 = final resume
    profile: { fname, lname, phone, address, url },
    education: [{ id, courseName, completionYear, college, percentage }],
    skills:    [{ id, skill }],
    projects:  [{ id, projectName, techStack, description }],
    social:    [{ id, Social }],
  }
}

🧪 Validation

An end-to-end Playwright check that mirrors the required flow lives in tests/validate.py:

python3 tests/validate.py
