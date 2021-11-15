const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const pool = req.app.get("pool");
  const secret = req.app.get("secret");
  const { name, email, password, adminSecret } = req.body;
  if (secret === adminSecret) {
    try {
      const [exists] = await pool
        .query(`SELECT * FROM users WHERE email = $1;`, [email])
        .then((res) => res.rows);
      if (exists) {
        return res.status(409).send({
          error: "register",
          message: "Already registered, please sign in!",
        });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [user] = await pool
          .query(
            `INSERT INTO users (name,email,hash) VALUES($1,$2,$3) returning *;`,
            [name, email, hash]
          )
          .then((res) => res.rows);

        if (user) {
          delete user.hash;
          user.isLoggedIn = true;
          req.session.user = user;

          return res.status(200).send(req.session.user);
        }
      }
    } catch (err) {
      return res
        .status(404)
        .send({ error: "register", message: "cannot register" });
    }
  }
};

const login = async (req, res) => {
  const pool = req.app.get("pool");
  const { email, password } = req.body;
  try {
    let [user] = await pool
      .query(`SELECT * FROM users WHERE email =$1;`, [email])
      .then((res) => res.rows);

    if (!user) {
      return res.status(403).send({
        error: "login",
        message:
          "You aren't registered, please contact Jared for login information.",
      });
    } else {
      const passAuth = bcrypt.compareSync(password, user.hash);
      if (!passAuth) {
        console.log("no");
        return res.status(404).send({
          error: "login",
          message: "Password is incorrect, try again!",
        });
      } else {
        delete user.hash;
        user.isLoggedIn = true;
        req.session.user = user;
        return res.status(200).send(req.session.user);
      }
    }
  } catch (err) {
    return res
      .status(404)
      .send({ error: "login", message: "something went wrong" });
  }
};

const logout = (req, res) => {
  req.session.destroy();
};

module.exports = {
  register,
  login,
  logout,
};
