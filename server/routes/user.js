const { Router } = require("express");

const protect = require("../middlewares/protect");
const { follow, unfollow } = require("../controllers/user");

const router = Router();

router.use(protect);

router.put("/:userId/follow", follow);
router.put("/:userId/unfollow", unfollow);

module.exports = router;
