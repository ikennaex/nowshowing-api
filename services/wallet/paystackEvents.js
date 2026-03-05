const crypto = require('crypto');
const virtualAccountModel = require('../../models/virtualAccounts');

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

const processPaystackEvent = async (req, res) => {
  const hash = req.headers['x-paystack-signature'];
  const payload = JSON.stringify(req.body);

  // Verify signature came from Paystack
  const computedHash = crypto.createHmac('sha512', PAYSTACK_SECRET)
                             .update(payload)
                             .digest('hex');

  if (hash !== computedHash) {
    return res.status(400).send('Invalid signature');
  }

  const event = req.body;

  // Handle dedicated account creation success
  if (event.event === 'dedicatedaccount.assign.success') {
    console.log('DVA created:', event.data);
    const data = event.data;
    try {
      await virtualAccountModel.create({
        user: event.data.metadata.userId,
        customer: data.customer,
        dedicatedAccount: dedicated_account
      });
      console.log('DVA stored in DB successfully');
    } catch (err) {
      console.error('Error storing DVA in DB:', err);
    }
  }

  // Handle dedicated account creation failure
  else if (event.event === 'dedicatedaccount.assign.failed') {
    console.log('DVA creation failed:', event.data);
    // Optionally, store failed attempt in DB
  }

  // Handle other/unexpected events
  else {
    console.log('Unhandled event:', event.event);
  }

  res.sendStatus(200);
};

module.exports = { processPaystackEvent };