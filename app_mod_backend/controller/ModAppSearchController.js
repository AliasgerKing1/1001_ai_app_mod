const routes = require("express").Router();
const ModApp = require("../models/ModApp");

routes.get("/:query", async (req,res)=> {
  let query = req.params.query;
  let regex = new RegExp(query, 'i'); // 'i' makes it case insensitive
  try {
      let result = await ModApp.find({app_name : regex});
      // let array = ["entry1", "entry2", "entry3", "entry4", "entry5", "entry6", "entry7", "entry8", "entry9", "entry10"];
      if(result.length > 0 ) {
        res.send({status : 200, resultedData : result})
      } else {
        res.send({status : 204, error : 'no-data'})
      }
  } catch(err) {
      console.error(err);
      res.status(500).send({error: 'An error occurred while querying the database'});
  }
})

module.exports = routes;