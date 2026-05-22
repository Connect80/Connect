const express = require('express');
const app = express();
const twilio = require('twilio');

app.use(express.json());

const accountSid = 'ACe295bf1d213e91330c0921d79067f009';
const authToken = '9499831323a3bf98f82255e8dd3fddb4';
const client = new twilio(accountSid, authToken);

app.post('/send-otp', (req, res) => {
    const { phoneNumber, otp } = req.body;
    
    client.messages.create({
        body: `आपका OTP कोड है: ${otp}`,
        from: '+18787325922',
        to: phoneNumber
    })
    .then(message => res.json({ success: true, message: "Sent!" }))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

app.listen(3000, () => console.log('Server is running'));