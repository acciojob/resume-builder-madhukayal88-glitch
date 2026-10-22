import React from "react";
import { useDispatch } from "react-redux";
import { gotoPage } from "../store/resumeSlice";

const STEPS = [
  "Profile Section",
  "Education Section",
  "Skills Sector",
  "Mini Project",
  "Social",
];

const Stepper = ({ current }) => {
  const dispatch = useDispatch();

  return (
    <div className="stepper">
      {STEPS.map((title, index) => {
        const stepNo = index + 1;
        const active = stepNo === current;
        const done = stepNo < current;
        return (
          <div
            className="stepper-item"
            key={title}
            onClick={() => dispatch(gotoPage(stepNo))}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
          >
            <div
              className={`stepper-circle ${active ? "active" : ""} ${
                done ? "done" : ""
              }`}
            >
              {stepNo}
            </div>
            <div className={`stepper-label ${active ? "active" : ""}`}>
              {title}
            </div>
            {index < STEPS.length - 1 && <div className="stepper-line" />}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
