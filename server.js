const express = require('express');
const app = express();
const twilio = require('twilio');

app.use(express.json());

// आपकी Twilio डिटेल्स
const accountSid = 'ACe295bf1d213e91330c0921d79067f009';
const authToken = '3d5313ebfc53a224a1f20dfc03fba045';
const serviceSid = 'VAdca74f35326707c404bd5214dbbfd84e';

// फिक्स किया हुआ डेटा
const myVerifiedNumber = '+918690347348'; // जिस पर OTP आएगा
const twilioNumber = '+18787325922';      // जो आपको Twilio से मिला है

const client = new twilio(accountSid, authToken);

app.post('/send-otp', (req, res) => {
    // यहाँ 'from' के तौर पर आपका Twilio नंबर इस्तेमाल हो रहा है
    client.verify.v2.services(serviceSid)
        .verifications
        .create({ 
            to: myVerifiedNumber, 
            channel: 'sms',
            from: twilioNumber 
        })
        .then(verification => {
            res.status(200).json({ success: true, sid: verification.sid });
        })
        .catch(err => {
            console.error("Twilio Error:", err.message);
            res.status(500).json({ success: false, error: err.message });
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});