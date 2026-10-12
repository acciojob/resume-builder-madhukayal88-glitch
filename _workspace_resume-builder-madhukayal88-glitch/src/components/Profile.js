import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../store/resumeSlice";

const Profile = () => {
  const profile = useSelector((s) => s.resume.profile);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setProfile({ [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      dispatch(setProfile({ url: URL.createObjectURL(file) }));
    }
  };

  return (
    <div className="section profile-section">
      <h2 className="section-title">Add your profile details</h2>

      <div className="grid-2">
        <div className="form-group">
          <label htmlFor="fname">First Name</label>
          <input
            id="fname"
            type="text"
            name="fname"
            value={profile.fname}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lname">Last Name</label>
          <input
            id="lname"
            type="text"
            name="lname"
            value={profile.lname}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>
      </div>

      <div className="form-group profile-image">
        <label htmlFor="url">Profile Image</label>
        <input
          id="url"
          type="text"
          name="url"
          value={profile.url}
          onChange={handleChange}
          placeholder="Paste an image URL"
        />
        <input
          id="imageFile"
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleFile}
          className="file-input"
        />
      </div>

      {profile.url && (
        <div className="profile-preview">
          <img src={profile.url} alt="profile" width="90" height="90" />
        </div>
      )}
    </div>
  );
};

export default Profile;
