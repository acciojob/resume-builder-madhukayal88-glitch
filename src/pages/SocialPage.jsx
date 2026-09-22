import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSocial, updateSocial, deleteSocial } from '../features/social/socialSlice';
import ProgressBar from '../components/ProgressBar';

export default function SocialPage() {
  const { social } = useSelector((s) => s.social);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div style={pageStyle}>
      <Header />
      <ProgressBar current={5} />
      <div style={cardStyle}>
        <h3 style={{ textAlign: 'center' }}>Add Your Social Links</h3>
        {social.map((s) => (
          <div key={s.id} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <input name="Social" placeholder="Social Media URL" value={s.Social} onChange={(e) => dispatch(updateSocial({ id: s.id, value: e.target.value }))} style={inputStyle} />
            <button id="delete_social" onClick={() => dispatch(deleteSocial(s.id))} style={whiteBtn}>DELETE</button>
          </div>
        ))}
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button id="add_social" onClick={() => dispatch(addSocial())} style={purpleBtn}>ADD SOCIAL</button>
        </div>
        <div style={btnRow}>
          <button id="back" onClick={() => navigate('/projects')} style={whiteBtn}>BACK</button>
          <button id="save_continue" onClick={() => navigate('/resume')} style={pinkBtn}>SAVE AND CONTINUE</button>
        </div>
      </div>
    </div>
  );
}

const pageStyle = { minHeight: '100vh', background: '#f5f5f5' };
const cardStyle = { background: '#fff', padding: 30, maxWidth: 800, margin: '20px auto', borderRadius: 8 };
const inputStyle = { flex: 1, padding: 12, border: '1px solid #ccc', borderRadius: 4 };
const btnRow = { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 };
const pinkBtn = { background: '#e91e63', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 4, fontWeight: 'bold', cursor: 'pointer' };
const whiteBtn = { background: '#fff', color: '#333', border: '1px solid #ccc', padding: '12px 28px', borderRadius: 4, fontWeight: 'bold', cursor: 'pointer' };
const purpleBtn = { background: '#3b5bdb', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 4, fontWeight: 'bold', cursor: 'pointer' };

function Header() {
  return <div style={{ background: '#e91e63', color: '#fff', padding: 20, textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>RESUME GENERATOR</div>;
}
