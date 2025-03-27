import mongoose from "mongoose"

const DEFAULT_DATA = {
  "a3fb1765-432b-4d85-8f42-e59039385674": {
      "id": "a3fb1765-432b-4d85-8f42-e59039385674",
      "type": "Paragraph",
      "value": [
          {
              "id": "c74d491e-4d07-4135-95b9-92392bac520a",
              "type": "paragraph",
              "children": [
                  {
                      "text": ""
                  }
              ]
          }
      ],
      "meta": {
          "align": "left",
          "depth": 0,
          "order": 0
      }
  }
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
