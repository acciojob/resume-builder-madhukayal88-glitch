import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hydrate, goNext, goBack } from "./store/resumeSlice";

import Stepper from "./components/Stepper";
import Profile from "./components/Profile";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Social from "./components/Social";
import ResumeOutput from "./components/ResumeOutput";

const STORAGE_KEY = "resumeBuilderData";

const App = () => {
  const dispatch = useDispatch();
  const page = useSelector((s) => s.resume.page);
  const state = useSelector((s) => s.resume);

  /* Load any previously saved resume from the "database" (API / localStorage). */
  useEffect(() => {
    const loadData = async () => {
      let loaded = false;
      try {
        const res = await fetch("/api/resume/1");
        if (res.ok) {
          const data = await res.json();
          if (data && (data.profile || data.education)) {
            dispatch(hydrate(data));
            loaded = true;
          }
        }
      } catch (err) {
        /* fallback to localStorage */
      }

      if (!loaded) {
        try {
          const raw = window.localStorage.getItem(STORAGE_KEY);
          if (raw) dispatch(hydrate(JSON.parse(raw)));
        } catch (e) {
          /* ignore corrupt data */
        }
      }
    };

    loadData();
  }, [dispatch]);

  /* Persist the whole resume to the "database" (localStorage + API). */
  const saveToDatabase = async () => {
    try {
      const { page: _page, ...persisted } = state;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));

      try {
        await fetch("/api/resume/1", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(persisted),
        });
      } catch (err) {
        /* backend offline, fallback is localStorage */
      }
    } catch (e) {
      /* ignore quota errors */
    }
  };

  const handleNext = () => dispatch(goNext());
  const handleBack = () => dispatch(goBack());
  const handleSaveContinue = () => {
    saveToDatabase();
    if (page < 6) {
      dispatch(goNext());
    }
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return <Profile />;
      case 2:
        return <Education />;
      case 3:
        return <Skills />;
      case 4:
        return <Projects />;
      case 5:
        return <Social />;
      case 6:
        return <ResumeOutput />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>RESUME GENERATOR</h1>
      </header>

      <Stepper current={page} />

      <main className="container">
        <div className="form-area">{renderPage()}</div>
      </main>

      <div className="buttons-lists" id="navigation">
        <button
          id="back"
          className={`resume-button back ${page === 1 ? "is-disabled" : ""}`}
          onClick={handleBack}
          disabled={page === 1}
          type="button"
        >
          BACK
        </button>

        <button
          id="next"
          className={`resume-button next ${page === 6 ? "is-disabled" : ""}`}
          onClick={handleNext}
          disabled={page === 6}
          type="button"
        >
          NEXT
        </button>

        <button
          id="save_continue"
          className="resume-button save"
          onClick={handleSaveContinue}
          type="button"
        >
          SAVE AND CONTINUE
        </button>
      </div>
    </div>
  );
};

export default App;
