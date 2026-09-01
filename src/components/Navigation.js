import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, saveResume } from '../actions/resumeActions';

const Navigation = ({ totalPages }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.resume.currentPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleSaveContinue = () => {
    if (currentPage < totalPages - 1) {
      dispatch(saveResume());
      dispatch(setCurrentPage(currentPage + 1));
    } else {
      dispatch(saveResume());
    }
  };

  return (
    <div className="navigation-container">
      <button 
        id="back" 
        className="nav-btn back-btn" 
        onClick={handleBack}
        disabled={currentPage === 0}
      >
        Back
      </button>
      <button 
        id="save_continue" 
        className="nav-btn save-continue-btn" 
        onClick={handleSaveContinue}
      >
        {currentPage === totalPages - 1 ? 'Save Resume' : 'Save & Continue'}
      </button>
      <button 
        id="next" 
        className="nav-btn next-btn" 
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Navigation;
