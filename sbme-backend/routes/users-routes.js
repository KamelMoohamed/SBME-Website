const { Router } = require("express");
const usersControllers = require("../controllers/user-controllers");

const router = Router();

router.post("/login", usersControllers.login);

module.exports = router;
