const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    check("name", "name is reqired")
      .not()
      .isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password should be of minimum 8 characters").isLength({
      min: 8
    })
  ],
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("this is the user route");
  }
);

module.exports = router;
