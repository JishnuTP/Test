const express= require("express")
const router= express.Router();
const authMiddleware = require("../middleware/AuthMiddleware");
const UserController=require("../controllers/UserController");

router.get('/getTest',UserController.getTest)
router.get('/getTest/:id',UserController.getTestbyId)
router.post('/submitAnswer',UserController.submit)



module.exports= router; 