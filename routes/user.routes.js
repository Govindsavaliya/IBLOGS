const router = require("express").Router();
const user = require("../middleware/ibog");

const{
    userRegistration,
    userLogin,
    userLogout,
    userUpdate,
    userViewById,
    userViewAll,
    userCount,
} = require("../controller/user.controller");

router.post("/userRegistration", userRegistration);
router.post("/userLogin", userLogin);
router.get("/userLogout", user, userLogout); 
router.patch("/userUpdate/:id", userUpdate);
router.get("/userViewById/:id", userViewById);
router.get("/userViewAll", userViewAll);
router.get("/userCount", userCount); 

module.exports = router;    