const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendOtpEmail = async (email, otp, type) => {
  try {
  
    const mailOptions = {
      from: "onboarding@resend.dev",
      to: email,
      subject: "🔐 Your OTP for Eventora",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>

      <body style="
        margin:0;
        padding:20px;
        background:#f4f2ff;
        font-family:Arial,sans-serif;
      ">

        <table width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center">

              <table width="600" cellspacing="0" cellpadding="0"
                style="
                  background:#ffffff;
                  border-radius:20px;
                  overflow:hidden;
                  box-shadow:0 10px 30px rgba(0,0,0,0.1);
                ">

                <!-- Header -->
                <tr>
                  <td align="center"
                    style="
                      background:linear-gradient(135deg,#7F77DD,#D4537E,#EF9F27);
                      padding:40px 20px;
                    ">

                    <h1 style="
                      margin:0;
                      color:#ffffff;
                      font-size:34px;
                    ">
                      🎉 Eventora
                    </h1>

                    <p style="
                      margin-top:10px;
                      color:#ffffff;
                      font-size:16px;
                    ">
                      Secure OTP Verification
                    </p>

                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px 30px; text-align:center;">

                    <h2 style="
                      margin:0 0 15px;
                      color:#333333;
                    ">
                      Hello 👋
                    </h2>

                    <p style="
                      color:#666666;
                      font-size:16px;
                      line-height:1.7;
                    ">
                      Use the verification code below to complete your
                      <strong>${type}</strong> process.
                    </p>

                    <!-- OTP Box -->
                    <div style="
                      margin:30px auto;
                      padding:20px;
                      max-width:320px;
                      background:linear-gradient(135deg,#7F77DD,#D4537E);
                      border-radius:15px;
                      color:white;
                      font-size:40px;
                      font-weight:bold;
                      letter-spacing:12px;
                      box-shadow:0 8px 25px rgba(127,119,221,0.3);
                    ">
                      ${otp}
                    </div>

                    <p style="
                      color:#555555;
                      font-size:15px;
                    ">
                      ⏳ This OTP will expire in
                      <strong>5 minutes</strong>.
                    </p>

                    <!-- Button -->
                    <a href="http://localhost:3000/verify-otp"
                      style="
                        display:inline-block;
                        margin-top:20px;
                        padding:14px 28px;
                        background:linear-gradient(135deg,#7F77DD,#D4537E);
                        color:#ffffff;
                        text-decoration:none;
                        border-radius:10px;
                        font-weight:bold;
                        font-size:15px;
                      ">
                      Verify Account 🚀
                    </a>

                    <p style="
                      margin-top:25px;
                      color:#e74c3c;
                      font-size:14px;
                      font-weight:bold;
                    ">
                      Never share this OTP with anyone.
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center"
                    style="
                      background:#f8f8f8;
                      padding:20px;
                      color:#777777;
                      font-size:13px;
                    ">

                    © ${new Date().getFullYear()} Eventora
                    <br>
                    Making Events Memorable ✨

                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
      </html>
      `,
    };
 await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: mailOptions.subject,
      html: mailOptions.html,
    });

    console.log("✅ OTP email sent successfully");

  } catch (error) {
    console.error("RESEND ERROR =", error);
  }
};
