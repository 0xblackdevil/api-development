const router = require('express').Router();

router.get("/",async(req,res)=>{
    res.json({
        "message":"Welcome to blackdevil api auth api"
    });
});

module.exports = router;