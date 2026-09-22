import React from 'react';

const steps = ['Profile', 'Education', 'Skills', 'Mini Project', 'Social'];

export default function ProgressBar({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '20px 0' }}>
      {steps.map((label, i) => {
        const active = i + 1 === current;
        const done = i + 1 < current;
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div
              style={{
                width: 32, height: 32, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: active || done ? '#3b5bdb' : '#ccc',
                color: '#fff', fontWeight: 'bold', marginRight: 8,
              }}
            >
              {i + 1}
            </div>
            <span style={{ color: active ? '#3b5bdb' : '#666', fontWeight: active ? 'bold' : 'normal' }}>
              {label}
            </span>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: '#ccc', margin: '0 10px' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
