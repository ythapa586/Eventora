const User = require('../models/User');
const OTP = require('../models/OTP');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOtpEmail } = require('../utils/emailService');

const generateToken = (id, role) => {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// REGISTER USER
exports.registerUser = async (req, res) => {
    try {
        console.log("REGISTER BODY =", req.body);
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                error: 'User already exists'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user',
            isverified: false
        });

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        console.log(`OTP for ${email}: ${otp}`);

        const savedOtp = await OTP.create({
            email,
            otp,
            action: 'account_verification'
        });
        console.log("SAVED OTP =", savedOtp);


        //await sendOtpEmail(email, otp,'account_verification' );

        res.status(201).json({
            message: 'User registered successfully. Please verify your email.',
            email: user.email
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
};
// LOGIN USER
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("LOGIN EMAIL =", email);

        const user = await User.findOne({ email });

        console.log("FOUND USER =", user ? user.email : "NOT FOUND");

        if (!user) {
            return res.status(400).json({
                error: 'Invalid credentials. Please sign up first.'
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        console.log("PASSWORD MATCH =", isMatch);

        if (!isMatch) {
            return res.status(400).json({
                error: 'Invalid credentials'
            });
        }

        if (!isMatch) {
            return res.status(400).json({
                error: 'Invalid credentials'
            });
        }

        if (!user.isverified && user.role === 'user') {

    const otp = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    console.log(`OTP for ${email}: ${otp}`);

    await OTP.deleteMany({
        email,
        action: 'account_verification'
    });

    await OTP.create({
        email,
        otp,
        action: 'account_verification'
    });

    await sendOtpEmail(
        email,
        otp,
        'account_verification'
    );

    return res.status(400).json({
        error: 'Email not verified. OTP sent to your email.'
    });
}

        res.json({
            message: 'Login successful',
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(
                user._id,
                user.role
            )
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
};

// VERIFY OTP
exports.verifyOtp = async (req, res) => {
    
    try {
        const { email, otp } = req.body;

        const otpRecord = await OTP.findOne({
            email,
            otp,
            action: 'account_verification'
        });

        if (!otpRecord) {
            return res.status(400).json({
                error: 'Invalid or expired OTP'
            });
        }

        const user = await User.findOneAndUpdate(
            { email },
            { isverified: true },
            { new: true }
        );

        await OTP.deleteMany({
            email,
            action: 'account_verification'
        });

        res.json({
            message: 'Email verified successfully. You can now log in.',
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(
                user._id,
                user.role
            )
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
};