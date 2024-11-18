const Item = require('../models/Item');

exports.addItem = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, description } = req.body;
    const foodCourts = JSON.parse(req.body.foodCourts);
    const imagePath = req.file.path.replace(/\\/g, '/');

    const newItem = new Item({
      title,
      description,
      foodCourts,
      image: imagePath
    });

    const savedItem = await newItem.save();
    
    res.status(201).json({
      item: {
        _id: savedItem._id,
        title: savedItem.title,
        description: savedItem.description,
        foodCourts: savedItem.foodCourts,
        image: savedItem.image
      }
    });
  } catch (error) {
    console.error('Error in addItem:', error);
    res.status(500).json({ message: 'Error adding item: ' + error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item: ' + error.message });
  }
}; 