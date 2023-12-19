const { Router } = require("express");

const protect = require("../middlewares/protect");
const { follow } = require("../controllers/user");

const router = Router();

router.use(protect);

router.put("/:userId/follow", follow);

module.exports = router;
