import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, otp, portal } =
      await req.json();

    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user:
            process.env.EMAIL_USER,
          pass:
            process.env.EMAIL_PASS,
        },
      });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: email,

      subject:
        portal === "owner"
          ? "Owner Portal OTP"
          : "Labour Portal OTP",

      html: `
        <div
          style="
            font-family:Arial;
            padding:20px;
          "
        >
          <h2>
            Adike Labour Platform
          </h2>

          <p>
            Your OTP is:
          </p>

          <h1
            style="
              color:#2563eb;
            "
          >
            ${otp}
          </h1>

          <p>
            OTP valid for 5 minutes.
          </p>
        </div>
      `,
    });

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
        error:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}
