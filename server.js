const express = require('express');
const app = express();
const twilio = require('twilio');

app.use(express.json());

const accountSid = 'ACe295bf1d213e91330c0921d79067f009';
const authToken = 'YOUR_AUTH_TOKEN';
const serviceSid = 'VAdca74f35326707c404bd5214dbbfd84e';
const twilioPhoneNumber = '+18787325922';

const client = new twilio(accountSid, authToken);

app.post('/send-otp', (req, res) => {
    const phoneNumber = '+918690347348';

    client.verify.v2.services(serviceSid)
        .verifications
        .create({ 
            to: phoneNumber, 
            channel: 'sms' 
        })
        .then(verification => {
            res.status(200).json({ 
                success: true, 
                sid: verification.sid,
                sender: twilioPhoneNumber 
            });
        })
        .catch(err => {
            res.status(500).json({ 
                success: false, 
                error: err.message 
            });
        });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});