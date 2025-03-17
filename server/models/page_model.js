import mongoose from "mongoose";

const PageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  icon: { type: String, default: "none" },
  cover: { type: String, default: "none" },
  favorite: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });


export default mongoose.model("Page", PageSchema);
