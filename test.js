const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://yasar:JxkkMwIcnHRmS7MW@denemedb.bazro.mongodb.net/PCAT?ssl=true&authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PhotoSchema = new Schema({
    title: String,
    description: String,
  })

  const Photo = mongoose.model('Photo', PhotoSchema);

  Photo.create({
    title: 'Photo Title 1',
    description: 'Photo description 1 lorem ipsum',
  });