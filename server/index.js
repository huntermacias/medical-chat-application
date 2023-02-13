const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.js')

const app = express(); 
const PORT = process.env.PORT || 5000;

require('dotenv').config();

const accoundSid = 'ACf7a74abd150e43b86052874aa9079307';
const authToken = '6a6bf4ed846fea88b1ae104e0b9b2afc';
const messagingServiceSid = 'ACf7a74abd150e43b86052874aa9079307'
const twilioClient = require('twilio')(accoundSid, authToken);

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true})); 

app.get('/', (req, res) => {
	res.send('hi')
})

app.post('/', (req, res) => {
	const { message, user: sender, type, members } = req.body; 

	if(type === 'message.new') {
        members
            .filter((member) => member.user_id !== sender.id)
            .forEach(({ user }) => {
                if(!user.online) {
                    twilioClient.messages.create({
                        body: `You have a new message from ${message.user.fullName} - ${message.text}`,
                        messagingServiceSid: messagingServiceSid,
                        to: user.phoneNumber
                    })
                        .then(() => console.log('Message sent!'))
                        .catch((err) => console.log(err));
                }
            })

            return res.status(200).send('Message sent!');
    }

    return res.status(200).send('Not a new message request');
});


app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`))