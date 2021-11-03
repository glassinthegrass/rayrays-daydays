const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const pool = req.app.get("pool");
  const secret = req.app.get("secret");
  const { name, email, adminSecret, password } = req.body;
  if (secret === adminSecret) {
    try {
      const [registered] = await pool.query(
        `SELECT email FROM users WHERE email=$1`,
        [email]
      );
      if (registered) {
        return res.status(409).send("Email is already registered.");
      } else {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(password, salt);
        const [query] = await pool.query(
          `INSERT INTO users (name,email,hash) VALUES($1,$2,$3) returning *`,
          [name, email, hash]
        );
        console.log(query);
        const [user] = query.rows;
        console.log(user);
        if (user) {
          delete user.hash;
          user.loggedIn = true;
          req.session.user = user;
          return res.status(200).send(req.session.user);
        }
      }
    } catch (err) {
      res.status(404).send({ error: "register", message: "cannot register" });
    }
  }
};

const login = async (req, res) => {
  const pool = req.app.get("pool");
  const { email, password } = req.body.user;
  try {
    let [user] = await pool.query(`SELECT * FROM users WHERE email =$1`, [
      email,
    ]);
    if (!user) {
      return res.status(403).send({
        error: "login",
        message:
          "You aren't registered, please contact Jared for login information.",
      });
    } else {
      const passAuth = bcrypt.compareSync(password, user.hash);
      if (!passAuth) {
        return res.status(403).send({
          error: "password",
          message: "Password is incorrect, try again!",
        });
      } else {
        delete user.hash;
        user.loggedIn = true;
        req.session.user = user;
        return res.status(200).send(req.session.user);
      }
    }
  } catch (err) {
    return res.status(404).send("something went wrong");
  }
};

module.exports = {
  register,
  login,
};
