const resend = require("../../config/resend");

async function notifyAdminSmm({ service, name, quantity, amount, category, refill, average_time, link, serviceName }) {
  return await resend.emails.send({
    from: "Now APP <no-reply@nowshowing.ng>",
    to: ["ikennaexcel2@gmail.com"],
    subject: `New ${serviceName} Request`,
    html: `
      <h2>Details</h2>
      <p>User Profile: ${link}</p>
      <p>Service: ${service}</p>
      <p>Name: ${name}</p>
      <p>Category: ${category}</p>
      <p>Refil: ${refill}</p>
      <p>Avg time: ${average_time}</p>
      <p>Quantity: ${quantity}</p>
      <p>Amount: ${amount}</p>
    `,
  });
}

module.exports =  notifyAdminSmm;