import mongoose, { Document, Schema } from "mongoose";
export interface IBid {
  bidderName: string;
  bidAmount: number;
  bidTime?: Date;
}
export interface IProduct extends Document {
  name: string;
  description: string;
  startingBid: number;
  minBidAmount: number;
  imageUrl?: string;
  userEmail?: string;
  bidHistory: IBid[];
  createdAt?: Date;
  updatedAt?: Date;
}
const bidSchema = new Schema<IBid>({
  bidderName: {
    type: String,
    required: true,
  },
  bidAmount: {
    type: Number,
    required: true,
  },
  bidTime: {
    type: Date,
    default: Date.now,
  },
});
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
    },
    startingBid: {
      type: Number,
      required: [true, "Please provide starting bid amount"],
    },
    minBidAmount: {
      type: Number,
      required: [true, "Please provide minimum bid amount"],
    },
    imageUrl: {
      type: String,
      default: null,
    },
    userEmail: {
      type: String,
      default: null,
    },
    bidHistory: {
      type: [bidSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IProduct>("Product", productSchema);