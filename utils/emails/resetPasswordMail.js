const resend = require("../../config/resend");

async function resetPasswordMail({ email, otp }) {

  const { data, error } = await resend.emails.send({
    from: "Now Showing <no-reply@nowshowing.ng>",
    to: [email],
    subject: `${otp} is your Reset Password OTP`,
    html: `
      <p>Hello,</p>
      <p>Please use the following OTP to reset your password:</p>
      <p><strong>${otp}</strong></p>
      <p>This OTP is valid for 15 minutes.</p>
    `,
  });

  if (error) {
    console.error("Resend email error:", error);
  }

  return { data, error };
}

module.exports = resetPasswordMail;