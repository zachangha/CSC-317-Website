var express = require("express");
var router = express.Router();
var db = require("../conf/database");
var bcrypt = require("bcrypt");
var { isLoggedIn, isMyProfile } = require("../middleware/auth");
var { getPostsForUserById } = require("../middleware/posts")

const {
  isUsernameUnique,
  usernameCheck,
  isEmailUnique,
  emailCheck,
  tosCheck,
  ageCheck,
  passwordCheck,
} = require("../middleware/validation");
/* GET localhost:3000.users */

router.post(
  "/registration",
  usernameCheck,
  emailCheck,
  passwordCheck,
  tosCheck,
  ageCheck,
  isUsernameUnique,
  isEmailUnique,
  async function (req, res, next) {
    var { username, email, password } = req.body;
    try {
      var [rows, fields] = await db.execute(
        `select id from users where email=?`,
        [email]
      );
      if (rows && rows.length > 0) {
        return res.redirect("/registration");
      }

      var hashedPassword = await bcrypt.hash(password, 3);

      var [resultObject, fields] = await db.execute(
        `INSERT INTO users (username, email, password) value (?,?,?)`,
        [username, email, hashedPassword]
      );
      if (resultObject && resultObject.affectedRows == 1) {
        res.redirect("/login");
      } else {
        return res.redirect("/registration");
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login", async function (req, res, next) {
  var { username, password } = req.body;
  try {
    var [rows, fields] = await db.execute(
      `select id,username,password,email from users where username=?`,
      [username]
    );
    var user = rows[0];
    if (!user) {
      req.flash("error", `Log In Failed: Invalid username/password`);
      req.session.save(function (err) {
        return res.redirect("/login");
      });
    } else {
      var passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        req.session.user = {
          userID: user.id,
          email: user.email,
          username: user.username,
        };
        return res.redirect("/");
      } else {
        req.flash("error", `Log In Failed: Invalid username/password`);
        return res.redirect("/login");
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get("/profile/:id(\\d+)", isLoggedIn, isMyProfile, getPostsForUserById, function (req, res) {
  res.render("profile");
});

router.post("/logout", isLoggedIn, function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      next(error);
    }
    return res.redirect("/");
  });
});

router.use(function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    return res.redirect("/login");
  }
});

module.exports = router;
