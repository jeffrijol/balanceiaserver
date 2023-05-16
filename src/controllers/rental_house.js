const RentalHouse = require('../models/rental_house');

// Controlador para crear una nueva propiedad de alquiler
const createRentalHouse = async (req, res) => {
  try {
    const rentalHouse = await RentalHouse.create(req.body);
    res.status(201).json(rentalHouse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create rental house' });
  }
};

// Controlador para obtener todas las propiedades de alquiler
const getAllRentalHouses = async (req, res) => {
  try {
    const rentalHouses = await RentalHouse.find();
    res.json(rentalHouses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rental houses' });
  }
};



// Controlador para buscar propiedades de alquiler por el ID del usuario que las gestiona
const getRentalHousesByUser = async (req, res) => {
  try {
    const { managedByUser } = req.query;
    const rentalHouses = await RentalHouse.find({ managedByUser });
    res.json(rentalHouses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rental houses' });
  }
};


// Controlador para obtener una propiedad de alquiler por su ID
const getRentalHouseById = async (req, res) => {
  try {
    const rentalHouse = await RentalHouse.findById(req.params.id);
    if (!rentalHouse) {
      return res.status(404).json({ error: 'Rental house not found' });
    }
    res.json(rentalHouse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rental house' });
  }
};

// Controlador para actualizar una propiedad de alquiler por su ID
const updateRentalHouseById = async (req, res) => {
  try {
    const rentalHouse = await RentalHouse.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!rentalHouse) {
      return res.status(404).json({ error: 'Rental house not found' });
    }
    res.json(rentalHouse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update rental house' });
  }
};

// Controlador para eliminar una propiedad de alquiler por su ID
const deleteRentalHouseById = async (req, res) => {
  try {
    const rentalHouse = await RentalHouse.findByIdAndRemove(req.params.id);
    if (!rentalHouse) {
      return res.status(404).json({ error: 'Rental house not found' });
    }
    res.json({ message: 'Rental house deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete rental house' });
  }
};

module.exports = {
  createRentalHouse,
  getAllRentalHouses,
  getRentalHousesByUser,
  getRentalHouseById,
  updateRentalHouseById,
  deleteRentalHouseById,
};