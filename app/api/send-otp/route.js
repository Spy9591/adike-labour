import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, otp, portal } =
      await req.json();

    console.log("================================");
    console.log("OTP REQUEST RECEIVED");
    console.log("Email:", email);
    console.log("Portal:", portal);
    console.log(
      "EMAIL_USER:",
      process.env.EMAIL_USER
    );
    console.log("================================");

    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    const info =
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Adike ${portal} OTP`,
        html: `
          <h2>Adike Labour Platform</h2>
          <h3>${portal}</h3>
          <h1>${otp}</h1>
          <p>OTP valid for 5 minutes.</p>
        `,
      });

    console.log(
      "MESSAGE ID:",
      info.messageId
    );

    console.log(
      "OTP SENT SUCCESSFULLY"
    );

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "OTP ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
