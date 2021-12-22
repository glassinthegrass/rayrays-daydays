const nodemailer = require("nodemailer");
const { EMAIL, ENTRY_KEY } = process.env;

const requestLogin = async (req, res) => {
  const { name, email, relationship } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: ENTRY_KEY,
      },
    });

    let info = await transporter.sendMail(
      {
        from: `${email}`,
        to: `thejaredandersen@gmail.com`,
        envelope: {
          from: `${name} <${email}>`,
          to: `${email}, ${name},<${email}>`,
        },
        subject: "request",
        text: `${name}, would like a login. Their email is ${email}, and their relationship to reagan is ${relationship}.`,
        html: (
          `<h1>
            ${name} would like a login, their email is ${email}, and their
            relationship to reagan is ${relationship}.
          </h1>`
        ),
        attachments: [
          {
            filename: "license.txt",
            path: "https://raw.github.com/nodemailer/nodemailer/master/LICENSE",
          },
        ],
      },
      (err, response) => {
        if (err) {
                return res.status(404).send('Your request failed, try again.')
        } else {
          console.log("res", response);
          return res.status(200).send(`Your request has been sent, and will be reviewed for approval.`)
        }
      }
    );
    console.log(info);
  } catch (err) {
    console.log(err);
  }
};



module.exports = {
  requestLogin,
};
