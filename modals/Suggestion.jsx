import mongoose from "mongoose";

const SuggestionSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    district: { type: String, default: "", required: true },
    name: { type: String, default: "", required: true, unique: true },
    coordinates: { type: [], required: true, unique: true },
    NH: { type: Number },
    juridiction: { type: String },
    reason: { type: String },
    intervention: { type: String },
  },
  {
    timestamps: true,
  }
);

const Suggestion =
  mongoose.models.Suggestion || mongoose.model("Suggestion", SuggestionSchema);
export default Suggestion;
