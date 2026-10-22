import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSocial, updateSocial, deleteSocial } from "../store/resumeSlice";

const Social = () => {
  const social = useSelector((s) => s.resume.social);
  const dispatch = useDispatch();

  const [link, setLink] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (!link.trim()) return;
    if (editId != null) {
      dispatch(updateSocial({ id: editId, Social: link }));
      setEditId(null);
    } else {
      dispatch(addSocial({ Social: link }));
    }
    setLink("");
  };

  const handleDelete = () => {
    if (social.length > 0) {
      dispatch(deleteSocial(social[social.length - 1].id));
    } else {
      setLink("");
    }
  };

  const handleEdit = (item) => {
    setLink(item.Social);
    setEditId(item.id);
  };

  return (
    <div id="social-section" className="section social-section">
      <h2 className="section-title">
        Add social links like linkedin, github etc
      </h2>

      <div className="form-group">
        <label htmlFor="Social">Social Links *</label>
        <input
          id="Social"
          type="text"
          name="Social"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://github.com/username"
        />
      </div>

      <div className="action-row">
        <button
          id="delete_social"
          className="btn btn-delete"
          onClick={handleDelete}
          type="button"
        >
          DELETE SOCIAL
        </button>
        <button
          id="add_social"
          className="btn btn-add"
          onClick={handleAdd}
          type="button"
        >
          {editId != null ? "UPDATE SOCIAL" : "ADD SOCIAL"}
        </button>
      </div>

      {social.length > 0 && (
        <ul className="entry-list social-list">
          {social.map((item) => (
            <li className="entry-item social-item" key={item.id}>
              <div className="entry-text">
                <a href={item.Social} target="_blank" rel="noreferrer">
                  {item.Social}
                </a>
              </div>
              <div>
                <button
                  className="btn btn-small edit-btn"
                  onClick={() => handleEdit(item)}
                  type="button"
                  style={{ marginRight: "6px" }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-small btn-delete delete-btn"
                  onClick={() => dispatch(deleteSocial(item.id))}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Social;
