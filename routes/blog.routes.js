const router = require("express").Router();

const {

    blogInsert,
    blogUpdate,
    blogViewAll,
    blogViewById,
    blogCount,
    blogByCategories,
    blogByAuthor,
    blogDeleteById,
    
} = require("../controller/blog.controller");

router.post("/blogInsert", blogInsert);
router.patch("/blogUpdates/:id", blogUpdate);
router.get("/blogViewAll", blogViewAll);
router.get("/blogViewById/:id", blogViewById);
router.get("/blogCount/", blogCount);
router.post("/blogByCategories/", blogByCategories);
router.post("/blogByAuthor/", blogByAuthor);
router.delete("/blogDeleteById/:id", blogDeleteById);


module.exports = router;  