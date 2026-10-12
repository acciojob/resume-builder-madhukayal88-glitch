const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    fname: { type: String, default: "" },
    lname: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    url: { type: String, default: "" },
    image: { type: String, default: "" },
    education: { type: Array, default: [] },
    skills: { type: Array, default: [] },
    projects: { type: Array, default: [] },
    social: { type: Array, default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
