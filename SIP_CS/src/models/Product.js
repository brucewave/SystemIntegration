import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: String,
    price: {
      type: Number,
      default: 0,
    },
    userId: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: false
		},
    imgURL: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Product", productSchema);
