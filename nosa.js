// Import required packages
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Enable CORS for all routes (allowing specific origin)
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin (replace with your front-end URL)
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type']
}));

// Parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true })); // Built-in body parser
app.use(express.json()); // Built-in body parser

// Nodemailer transporter setup using environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail's SMTP server
    auth: {
        user: process.env.EMAIL_USER,       // your email from environment variable
        pass: process.env.EMAIL_PASSWORD    // your app password from environment variable
    }
});

// Handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received form submission:', { name, email, message });

    const mailOptions = {
        from: process.env.EMAIL_USER,        // Sender's email
        to: process.env.EMAIL_USER,          // Recipient email (your email address)
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending message. Please try again later.');
        } else {
            console.log('Email sent:', info.response);
            res.send('Your message has been sent successfully!');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});