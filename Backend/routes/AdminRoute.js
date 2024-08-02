const express= require("express")
const router= express.Router();
const authMiddleware = require("../middleware/AuthMiddleware");
const AdminController=require("../controllers/AdminControllers");

router.get("/getUsers",authMiddleware,AdminController.getUsers)
router.post("/addTest",authMiddleware,AdminController.addTest)
router.get("/getResults",authMiddleware,AdminController.getResults)
router.delete("/deleteTest/:id",authMiddleware,AdminController.deleteTest)
router.patch("/updateStatus/:id",authMiddleware,AdminController.updateStatus)



module.exports= router; 