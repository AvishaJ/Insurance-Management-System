const mongoose = require("mongoose");

const SchemeSchema = mongoose.Schema(
  {
    insuranceScheme: { type: String },
    image: {
      type: Buffer,
    },
    commissionNewReg: { type: Number },
    commissionInstall: { type: Number },
    insuranceNote: { type: String },
    minTermPlan: { type: Number },
    maxTermPlan: { type: Number },
    minAge: { type: Number },
    maxAge: { type: Number },
    minInvestment: { type: Number },
    maxInvestment: { type: Number },
    profitRatio: { type: Number },
    isActive: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const SchemeModel = new mongoose.model(
  "scheme",
  SchemeSchema
);
module.exports = SchemeModel;
