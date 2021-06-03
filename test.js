const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGOURL, {
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