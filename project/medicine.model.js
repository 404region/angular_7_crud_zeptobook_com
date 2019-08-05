const mongoose = require('mongoose');

const MedicineSchema = mongoose.Schema({
    name: String,
    nameLat: String,
    description: String,
    symptoms: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Medicines', MedicineSchema);