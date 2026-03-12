const resend = require("../../config/resend");

async function resetPasscodeSuccessMail({ email }) {
  return await resend.emails.send({
    from: "Now App <no-reply@nowshowing.ng>",
    to: [email],
    subject: "PIN Reset Successful",
    html: `
      <h2>Your PIN Has Been Reset Successfully</h2>
      <p>Hello,</p>
      <p>Your PIN has been successfully reset.</p>
      <p>If you did not initiate this change, please contact support immediately.</p>
      <p>support@nowshowing.ng</p>
    `,
  });
}

module.exports =  resetPasscodeSuccessMail;