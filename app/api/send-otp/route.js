import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, otp, portal } =
      await req.json();

    console.log("================================");
    console.log("OTP REQUEST");
    console.log("Portal:", portal);
    console.log("Email:", email);
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
        from: `"Adike Labour Platform" <${process.env.EMAIL_USER}>`,
        to: email,

        subject:
          portal === "owner"
            ? "Owner Portal OTP Verification"
            : "Labour Portal OTP Verification",

        html: `
          <div
            style="
              font-family: Arial, sans-serif;
              padding: 20px;
            "
          >
            <h2 style="color:#16a34a;">
              Adike Labour Platform
            </h2>

            <p>
              Your One Time Password (OTP)
            </p>

            <div
              style="
                font-size:40px;
                font-weight:bold;
                color:#2563eb;
                margin:20px 0;
              "
            >
              ${otp}
            </div>

            <p>
              Valid for 5 minutes.
            </p>

            <hr />

            <p>
              Do not share this OTP with anyone.
            </p>
          </div>
        `,
      });

    console.log(
      "MESSAGE ID:",
      info.messageId
    );

    return Response.json({
      success: true,
      messageId: info.messageId,
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
