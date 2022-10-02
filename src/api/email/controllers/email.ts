/**
 * A set of functions called "actions" for `email`
 */
import axios from "axios";

const SENDINBLUE_URL = "https://api.sendinblue.com/v3/smtp/email";

export default {
  send: async (ctx) => {
    try {
      const { senderEmail, senderName, senderMessage } = ctx.request.body;
      if (!senderEmail || !senderName || !senderMessage) {
        return ctx.badRequest("Parameters missing", {
          senderEmail,
          senderName,
          senderMessage,
        });
      }
      const config = {
        headers: {
          accept: "application/json",
          "api-key": process.env.SEND_IN_BLUE_KEY,
          "content-type": "application/json",
        },
      };
      await new Promise((resolve, reject) => {
        axios
          .post(
            process.env.SEND_IN_BLUE_URL,
            {
              sender: {
                email: process.env.SEND_IN_BLUE_FROM_EMAIL,
              },
              to: [
                {
                  email: process.env.SEND_IN_BLUE_TO_EMAIL,
                },
              ],
              subject: "Nouveau message depuis le site web",
              htmlContent: `<html>
                <head>
                </head>
                <body>
                  <p>Message de: ${senderName} ${senderEmail}</p>
                  <p>${senderMessage}</p>
                </body>
              </html>`,
            },
            config
          )
          .then(() => {
            resolve("ok");
          })
          .catch(() => {
            reject("Could not sent email");
          });
        ctx.body = "ok";
      });
    } catch (err) {
      ctx.body = err;
      ctx.internalServerError(err);
    }
  },
};
