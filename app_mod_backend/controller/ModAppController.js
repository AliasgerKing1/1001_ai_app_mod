const routes = require("express").Router();
const ModApp = require("../models/ModApp");
const jwt = require("jsonwebtoken")
const str = require('random-string')
const path = require('path')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'assets', 'banners')); // Define the destination folder
    },
    filename: (req, file, cb) => {
      const random_string = str({ length: 100 });
      const original_name = file.originalname;
      const array = original_name.split(".");
      const extension = array[array.length - 1];
      const new_name = random_string + "." + extension;
      cb(null, new_name);
    }
  });
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'assets', 'modImages')); // Define the destination folder
    },
    filename: (req, file, cb) => {
      const random_string = str({ length: 100 });
      const original_name = file.originalname;
      const array = original_name.split(".");
      const extension = array[array.length - 1];
      const new_name = random_string + "." + extension;
      cb(null, new_name);
    }
  });
  
  const upload = multer({ storage: storage });
  const upload2 = multer({ storage: storage2 });

  routes.post("/", upload.single('image'), async (req,res)=> {
        let newName = str({length  : 100});
        let data = JSON.parse(req.body.data);
        data.cloudName = newName;
        let new_name = req.file.filename
        data.banner_image = `http://localhost:4011/banners/${new_name}`;
        // console.log(data)
        let result = await ModApp.create(data);
        res.send({status : 200, data  : result});
      })
      
routes.get("/", async (req,res)=> {
        let result = await ModApp.find({})
        res.send(result)
})
routes.delete("/:id", async (req,res)=> {
    let id = req.params.id;
        let result = await ModApp.findOneAndDelete({_id : id})
        res.send({status : 200, success : true, deletedData : result})
})
// routes.delete("/", async (req,res)=> {
//         await ModApp.deleteMany()
//         res.send({status : 200 })
// })
routes.get("/:id", async (req,res)=> {
    let id = req.params.id;
        let result = await ModApp.find({_id : id})
        res.send(result)
})


routes.put('/:id', upload.single('image'), async (req,res) => {
  let id = req.params.id;
  let data = JSON.parse(req.body.data);
  // Check if file is uploaded
  if (req.file) {
      let new_name = req.file.filename;
      data.banner_image = `http://localhost:4011/banners/${new_name}`;
  } else {
    delete data.banner_image;
  }

  await ModApp.updateMany({_id : id}, data);
  // Fetch the updated documents
  let result = await ModApp.find({ _id: id });

  res.send({status : 200, success : true, updatedData : result});
});

routes.use('/search', require('./ModAppSearchController'))
module.exports = routes;