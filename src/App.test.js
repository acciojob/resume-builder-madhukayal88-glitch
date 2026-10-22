import store from "./store/store";
import {
  setProfile,
  addEducation,
  addSkill,
  addProject,
  addSocial,
  goNext,
  goBack,
} from "./store/resumeSlice";

test("redux store updates correctly across sections", () => {
  store.dispatch(setProfile({ fname: "John", lname: "Doe" }));
  expect(store.getState().resume.profile.fname).toBe("John");
  expect(store.getState().resume.profile.lname).toBe("Doe");

  store.dispatch(
    addEducation({
      courseName: "B.Tech",
      completionYear: "2023",
      college: "XYZ",
      percentage: "90",
    })
  );
  expect(store.getState().resume.education.length).toBe(1);
  expect(store.getState().resume.education[0].courseName).toBe("B.Tech");

  store.dispatch(addSkill("React"));
  expect(store.getState().resume.skills.length).toBe(1);
  expect(store.getState().resume.skills[0].skill).toBe("React");

  store.dispatch(
    addProject({
      projectName: "Resume Builder",
      techStack: "React Redux",
      description: "Awesome tool",
    })
  );
  expect(store.getState().resume.projects.length).toBe(1);

  store.dispatch(addSocial({ Social: "https://github.com" }));
  expect(store.getState().resume.social.length).toBe(1);

  expect(store.getState().resume.page).toBe(1);
  store.dispatch(goNext());
  expect(store.getState().resume.page).toBe(2);
  store.dispatch(goBack());
  expect(store.getState().resume.page).toBe(1);
});
