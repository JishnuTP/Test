const express= require("express")
const router= express.Router();
const authMiddleware = require("../middleware/AuthMiddleware");
const UserController=require("../controllers/UserController");

router.get('/getTest',authMiddleware,UserController.getTest)
router.get('/getTestDetail/:id',UserController.getTestbyId)
router.post('/submitAnswer',UserController.submit)
router.get('/checkCompletion',authMiddleware,UserController.checkCompletion)
router.get('/publishedResult',authMiddleware,UserController.publishedResults)

module.exports= router; 