const express = require("express");
const path = require("path");
const ejs = require("ejs");
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const fs = require('fs');

mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Photo = require('./models/Photo');

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(fileUpload());

app.get("/", async (req, res) => {
  const photos = await Photo.find({})
  res.render('index', {
    photos
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/photos", async (req, res) => {
  console.log(req.files)
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name,
    });
    res.redirect('/');
  });

  /*await Photo.create(req.body)
  res.redirect('/')*/
})

app.get("/photos/:id", async (req, res) => {
  const photo = await Photo.findById(req.params.id)
  res.render('photo', {
    photo
  })
})


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
