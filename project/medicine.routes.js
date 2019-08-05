module.exports = (app) => {
    const medicines = require('./medicines.controller.js');

    // Create a new medicine
    app.post('/medicines', medicines.create);

    // Retrieve all medicines
    app.get('/medicines', medicines.findAll);

    // Retrieve a single medicine with medicineId
    app.get('/medicines/:medicineId', medicines.findOne);

    // Update a Note with medicineId
    app.put('/medicines/:medicineId', medicines.update);

    // Delete a Note with medicineId
    app.delete('/medicines/:medicineId', medicines.delete);
}