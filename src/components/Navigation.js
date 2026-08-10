import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/actions';

function Navigation() {
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.currentPage);

  const handleNext = () => {
    if (currentPage < 6) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handleBack = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  return (
    <div className="navigation">
      <button 
        id="back" 
        className="btn btn-back" 
        onClick={handleBack}
        disabled={currentPage === 1}
      >
        ← Back
      </button>
      
      {currentPage < 6 ? (
        <button 
          id="save_continue" 
          className="btn btn-next" 
          onClick={handleNext}
        >
          Save & Continue →
        </button>
      ) : (
        <button 
          id="next" 
          className="btn btn-next" 
          onClick={() => alert('Resume completed! You can now download your resume.')}
        >
          ✅ Complete
        </button>
      )}
    </div>
  );
}

export default Navigation;
