const resend = require("../../config/resend");

async function resetPasscodeMail({ email, otp }) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Now App <no-reply@nowshowing.ng>",
      to: [email],
      subject: `${otp} is your Reset PIN OTP`,
      html: `
        <p>Hello,</p>
        <p>Please use the following OTP to reset your PIN:</p>
        <p><strong>${otp}</strong></p>
        <p>This OTP is valid for 15 minutes.</p>
      `,
    });

    if (error) {
      console.error("Resend passcode email error:", error);
      return null;
    }

    return data;

  } catch (err) {
    console.error("Passcode email sending failed:", err);
    throw err;
  }
}

module.exports = resetPasscodeMail;