const Booking = require('../models/Booking');
const OTP = require('../models/OTP');
const Event = require('../models/Event');
const {sendOtpEmail, sendBookingEmail} = require('../utils/emailService');

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.sendBookingOTP = async (req, res) => {
  const otp = generateOTP();

  await OTP.findOneAndDelete({
    email: req.user.email,
    action: 'event_booking'
  });

  const savedOtp = await OTP.create({
    email: req.user.email,
    otp,
    action: 'event_booking'
  });

  console.log("BOOKING OTP SAVED =", savedOtp);

  await sendOtpEmail(
    req.user.email,
    otp,
    'event_booking'
  );

  res.json({ message: 'OTP sent to email' });
};  

exports.bookEvent = async (req, res) => {
    const  {eventId, otp} = req.body;
console.log("EMAIL =", req.user.email);
console.log("OTP =", otp);
console.log(await OTP.find({}));   
const otpRecord = await OTP.findOne({ email: req.user.email, otp, action: 'event_booking' });
    console.log("OTP RECORD =", otpRecord);
    if (!otpRecord) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    if (event.totalSeats <= 0) {
        return res.status(400).json({ message: 'No seats available' });
    }

    const existingBooking = await Booking.findOne({ user: req.user._id, eventId:eventId });
    if (existingBooking) {
        return res.status(400).json({ message: 'You have already booked this event' });
    }

    const booking = await Booking.create({
        user: req.user._id,
        eventId,                                                                                                                                                                
        status: 'pending',
        paymentStatus: 'non_paid',
        amount: event.ticketPrice
    });
    

    await OTP.deleteMany({ email: req.user.email, action: 'event_booking' });
    res.status(201).json({ message: 'Booking created, please check your mail', bookingId: booking._id });
};

    exports.confirmBooking = async (req, res) => {
        const paymentStatus = req.body.paymentStatus;
        if (!['paid', 'non_paid'].includes(paymentStatus)) {
            return res.status(400).json({ message: 'Invalid payment status' });
        }

        const booking = await Booking.findById(req.params.id).populate('user').populate('eventId');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.status === 'confirmed') {
            return res.status(400).json({ message: 'Booking is already confirmed' });
        }   

        const event = await Event.findById(booking.eventId._id);
        if (event.totalSeats <=0){
            return res.status(400).json({error: 'No seats available'});
        }  

        booking.status ='confirmed';
        if(paymentStatus){
            booking.paymentStatus= paymentStatus;
        }
        await booking.save();
        event.totalSeats -= 1;
        await event.save();

        //admin confirm booking, send email to user
        await sendBookingEmail(
            booking.user.email, 
            event.title, 
            booking._id);

        res.json({message: 'Booking confirmed'});
    };

    exports.getMyBookings = async(req, res) => {
        const bookings = await Booking.find({user: req.user._id}).populate('eventId');    
        res.json(bookings);
    };

    exports.cancelBooking = async (req, res) => {
        const booking = await Booking.findById(req.params.id);
        if(!booking) {
            return res.status(404).json({error: 'Booking not found'});  
        }

        if (booking.user.toString() !== req.user._id.toString()) {
            return  res.status(403).json({error: 'Unauthorized'});

        }    
const wasConfirmed = booking.status === 'confirmed';

booking.status = 'cancelled';
await booking.save();

if (wasConfirmed) {
    const event = await Event.findById(booking.eventId);
    event.totalSeats += 1;
    await event.save();
}

await booking.deleteOne();

res.json({
    message: 'Booking cancelled'
});

    };
    