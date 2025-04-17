import mongoose from "mongoose"

const DEFAULT_DATA = {
    "type": "doc",
    "content": [
        {
            "type": "paragraph",
            "attrs": {
                "textAlign": null,
                "level": 1
            },
            "content": [
                {
                    "type": "text",
                    "text": ""
                }
            ]
        }
    ]
}

const PageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: Object, default: DEFAULT_DATA },
  icon: { type: String, default: "none" },
  cover: { type: String, default: "none" },
  favorite: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });


export default mongoose.model("Page", PageSchema);
