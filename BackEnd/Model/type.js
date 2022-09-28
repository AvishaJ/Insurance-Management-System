const mongoose = require("mongoose");

const TypeSchema = mongoose.Schema(
  {
    insuranceType: { type: String },
    image: {
      type: Buffer,
    },
    insuranceScheme: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "scheme",
    },
    isActive: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const TypeModel = new mongoose.model(
  "type",
  TypeSchema
);
module.exports = TypeModel;
