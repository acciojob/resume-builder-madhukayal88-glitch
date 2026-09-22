import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addEducation, updateEducation, deleteEducation } from '../features/education/educationSlice';
import ProgressBar from '../components/ProgressBar';

export default function EducationPage() {
  const { entries } = useSelector((s) => s.education);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div style={pageStyle}>
      <Header />
      <ProgressBar current={2} />
      <div style={cardStyle}>
        <h3 style={{ textAlign: 'center' }}>Add Your Education</h3>
        {entries.map((e, i) => (
          <div key={e.id} style={{ marginBottom: 20, padding: 15, border: '1px solid #eee', borderRadius: 6 }}>
            <div style={rowStyle}>
              <input name="courseName" placeholder="Course Name" value={e.courseName} onChange={(ev) => dispatch(updateEducation({ id: e.id, field: 'courseName', value: ev.target.value }))} style={inputStyle} />
              <input name="completionYear" placeholder="Completion Year" value={e.completionYear} onChange={(ev) => dispatch(updateEducation({ id: e.id, field: 'completionYear', value: ev.target.value }))} style={inputStyle} />
            </div>
            <div style={rowStyle}>
              <input name="college" placeholder="College" value={e.college} onChange={(ev) => dispatch(updateEducation({ id: e.id, field: 'college', value: ev.target.value }))} style={inputStyle} />
              <input name="percentage" placeholder="Percentage" value={e.percentage} onChange={(ev) => dispatch(updateEducation({ id: e.id, field: 'percentage', value: ev.target.value }))} style={inputStyle} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <button id="delete" onClick={() => dispatch(deleteEducation(e.id))} style={whiteBtn}>DELETE</button>
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <button id="add_education" onClick={() => dispatch(addEducation())} style={purpleBtn}>ADD EDUCATION</button>
        </div>
        <div style={btnRow}>
          <button id="back" onClick={() => navigate('/')} style={whiteBtn}>BACK</button>
          <button id="next" onClick={() => navigate('/skills')} style={pinkBtn}>NEXT</button>
          <button id="save_continue" onClick={() => navigate('/skills')} style={pinkBtn}>SAVE AND CONTINUE</button>
        </div>
      </div>
    </div>
  );
}

const pageStyle = { minHeight: '100vh', background: '#f5f5f5' };
const cardStyle = { background: '#fff', padding: 30, maxWidth: 800, margin: '20px auto', borderRadius: 8 };
const rowStyle = { display: 'flex', gap: 20, marginBottom: 15 };
const inputStyle = { flex: 1, padding: 12, border: '1px solid #ccc', borderRadius: 4 };
const btnRow = { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 };
const pinkBtn = { background: '#e91e63', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 4, fontWeight: 'bold', cursor: 'pointer' };
const whiteBtn = { background: '#fff', color: '#333', border: '1px solid #ccc', padding: '12px 28px', borderRadius: 4, fontWeight: 'bold', cursor: 'pointer' };
const purpleBtn = { background: '#3b5bdb', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 4, fontWeight: 'bold', cursor: 'pointer' };

function Header() {
  return <div style={{ background: '#e91e63', color: '#fff', padding: 20, textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>RESUME GENERATOR</div>;
}
