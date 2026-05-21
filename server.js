const express = require('express');
const app = express();
app.use(express.json());

const accountSid = 'ACe295bf1d213e913'; 
const authToken = '9499831323a3bf98f8';   
const client = require('twilio')(accountSid, authToken);

app.post('/send-otp', (req, res) => {
    const { phoneNumber, otp } = req.body;
    client.messages.create({
        body: `आपका OTP कोड है: ${otp}`,
        from: '+18787325922', 
        to: phoneNumber
    })
    .then(message => res.json({ success: true, sid: message.sid }))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

app.listen(3000, () => console.log('सर्वर 3000 पोर्ट पर चालू है'));