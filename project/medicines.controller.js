const Medicine = require('./medicine.model.js');

//Create new Medicine
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Medicine content can not be empty"
        });
    }

    // Create a Medicine
    const medicine = new Medicine({
        title: req.body.title || "No medicine title", 
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    });

    // Save Medicine in the database
    medicine.save()
    .then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the medicine."
        });
    });
};

// Retrieve all medicines from the database.
exports.findAll = (req, res) => {
    Medicine.find()
    .then(medicines => {
        res.send(medicines);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving medicines."
        });
    });
};

// Find a single medicine with a medicineId
exports.findOne = (req, res) => {
    Medicine.findById(req.params.medicineId)
    .then(medicine => {
        if(!medicine) {
            return res.status(404).send({
                message: "Medicine not found with id " + req.params.medicineId
            });            
        }
        res.send(medicine);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Medicine not found with id " + req.params.medicineId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving medicine with id " + req.params.medicineId
        });
    });
};

// Update a medicine
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Medicine content can not be empty"
        });
    }

    // Find and update medicine with the request body
    Medicine.findByIdAndUpdate(req.params.medicineId, {
        title: req.body.title || "No medicine title", 
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    }, {new: true})
    .then(medicine => {
        if(!medicine) {
            return res.status(404).send({
                message: "Medicine not found with id " + req.params.medicineId
            });
        }
        res.send(medicine);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Medicine not found with id " + req.params.medicineId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.medicineId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Medicine.findByIdAndRemove(req.params.medicineId)
    .then(medicine => {
        if(!medicine) {
            return res.status(404).send({
                message: "Medicine not found with id " + req.params.medicineId
            });
        }
        res.send({message: "Medicine deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Medicine not found with id " + req.params.medicineId
            });                
        }
        return res.status(500).send({
            message: "Could not delete medicine with id " + req.params.medicineId
        });
    });
};