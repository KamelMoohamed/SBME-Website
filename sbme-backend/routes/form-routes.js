const { Router } = require("express");
const formsControllers = require("../controllers/form-controllers");
const router = Router();

router.get("/:pid", formsControllers.getFormById);

router.post("/", formsControllers.createForm);

router.patch("/:pid", formsControllers.updateFrom);

router.delete("/:pid", formsControllers.deleteForm);

module.exports = router;
