const Movies = require('../models/Movies');

module.exports={
    getAllMovies:async (req,res)=>{
        try{
            const results = await Movies.getAllMovies(req,res);
            res.status(200).send(results);
        }catch(error){
            res.status(500).send(error);
        }
    }
}