import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Adike Labour OTP",
      html: `
        <h2>Adike Labour Platform</h2>
        <h1>${otp}</h1>
        <p>Your OTP is valid for 5 minutes.</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}
