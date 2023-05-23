import mongoose from "mongoose";

const PlaceSchema = mongoose.Schema(
  {
    district: { type: String, default: "", required: true },
    name: { type: String, default: "", required: true },
    coordinates: { type: [], required: true },
    NH: { type: Number },
    juridiction: { type: String },
    reason: { type: String },
    intervention: { type: String },
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.models.Place || mongoose.model("Place", PlaceSchema);
export default Place;
