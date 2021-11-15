const cloudinary = require("cloudinary").v2;

const getPosts = async (req, res) => {
  const { offset } = req.query;
  const pool = req.app.get("pool");
  console.log(offset);
  try {
    let posts = await pool
      .query(
        `SELECT * FROM posts po
        order by po.post_id desc
        LIMIT 6 OFFSET $1;`,
        [offset]
      )
      .then((res) => res.rows)
      .catch((err) => res.status(404).send("something went wrong"));
    let [post] = posts;

    if (post?.post_id) {
      for (let i = 0; i < posts.length; i++) {
        let pics = await pool.query(
          `SELECT * FROM pictures pic
      join posts po on po.post_id =pic.post_id
      where po.post_id = $1
      order by pic.picture_id asc
      limit 1 offset 0;`,
          [posts[i].post_id]
        );
        const { rows } = pics,
          [row] = rows;

        if (!row) {
          pics.rows = [
            {
              public_id: "gXuieNBPv9aQ7zkmf2bUOy9d_qfsons",
              url: "https://res.cloudinary.com/glassinthegrass/image/upload/v1632291110/gXuieNBPv9aQ7zkmf2bUOy9d_qfsons.png",
            },
          ];
        }
        posts[i].pictures = pics.rows;
      }
      return res.status(200).send(posts);
    } else {
      return res.status(409).send("something went wrong");
    }
  } catch (err) {
    return res.status(404).send("something went wrong");
  }
};

const createPost = async (req, res) => {
  const pool = req.app.get("pool");
  const { city, date, occasion, details } = req.query;
  const pictures = Object.values(req.files);

  try {
    const [post] = await pool
      .query(
        `INSERT INTO posts (city, occasion,details,date) VALUES ($1,$2,$3,$4) returning *;`,
        [city, occasion, details, date]
      )
      .then((res) => res.rows);

    const picPromises = pictures.map((image) =>
      cloudinary.uploader.upload(image.path, { quality: 80, format: "jpg" })
    );

    Promise.all(picPromises).then((response) => {
      for (let i = 0; i < response.length; ++i) {
        const { public_id } = response[i];
        pool.query(
          `INSERT INTO pictures (public_id,post_id) VALUES ($1,$2) returning *`,
          [public_id, post.post_id],
          (error, result) => {
            if (error) {
              res.status(404).send({ message: "something went wrong", error });
            }
          }
        );
      }
      res.status(200).send(post);
    });
  } catch (err) {
    console.log(err);
  }
};

const getSinglePost = async (req, res) => {
  const pool = req.app.get("pool");
  const { post_id } = req.params;
  const { offset } = req.query;

  try {
    const postQuery = await pool.query(
      `SELECT * FROM posts WHERE post_id =$1`,
      [post_id]
    );
    const [post] = postQuery.rows;

    let pics = await pool.query(
      `Select * from pictures WHERE post_id = $1
  order by post_id desc
  LIMIT 9 OFFSET $2;`,
      [post.post_id, offset]
    );
    post.pictures = pics.rows;

    res.status(200).send(post);
  } catch (err) {
    console.log(err);
  }
};

const editPicture = async (req, res) => {
  const pool = req.app.get("pool");
  const { picture_id, description } = req.query;
  console.log(picture_id, description);
  try {
    const pic = await pool.query(
      `UPDATE pictures SET description = $1, picture_id = $2 WHERE picture_id = $2 returning *;`,
      [description, picture_id]
    );
    console.log(pic);
  } catch (err) {
    console.log(err);
    res.status(200).send("failure");
  }
};

module.exports = {
  createPost,
  getPosts,
  getSinglePost,
  editPicture,
};
