import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../features/profile/profileSlice';
import ProgressBar from '../components/ProgressBar';

export default function ProfilePage() {
  const profile = useSelector((s) => s.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handle = (e) => dispatch(updateProfile({ [e.target.name]: e.target.value }));

  return (
    <div style={pageStyle}>
      <Header />
      <ProgressBar current={1} />
      <div style={cardStyle}>
        <h3 style={{ textAlign: 'center' }}>Add Your Profile</h3>
        <div style={rowStyle}>
          <input name="fname" placeholder="First Name" value={profile.fname} onChange={handle} style={inputStyle} />
          <input name="lname" placeholder="Last Name" value={profile.lname} onChange={handle} style={inputStyle} />
        </div>
        <div style={rowStyle}>
          <input name="phone" placeholder="Phone" value={profile.phone} onChange={handle} style={inputStyle} />
          <input name="address" placeholder="Address" value={profile.address} onChange={handle} style={inputStyle} />
        </div>
        <input name="url" placeholder="Image URL" value={profile.url} onChange={handle} style={{ ...inputStyle, width: '100%' }} />
        <div style={btnRow}>
          <button id="next" style={pinkBtn} onClick={() => navigate('/education')}>NEXT</button>
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

function Header() {
  return <div style={{ background: '#e91e63', color: '#fff', padding: 20, textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>RESUME GENERATOR</div>;
}
