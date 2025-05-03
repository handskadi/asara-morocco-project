import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const data = await req.json();
  const { fullName, email, phone, startDate, travelers, tour, message } = data;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1. Send to Admin
    await transporter.sendMail({
      from: `"Asara Morocco Tours" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Tour Booking from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <h2 style="color: #e6b800;">New Booking Request</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Tour:</strong> ${tour}</p>
          <p><strong>Start Date:</strong> ${startDate || "Not specified"}</p>
          <p><strong>Travelers:</strong> ${travelers || "Not specified"}</p>
          <p><strong>Message:</strong><br/>${
            message || "No additional notes."
          }</p>
          <hr />
          <p style="font-size: 0.9em; color: #777;">Asara Morocco Tours - Notification System</p>
        </div>
      `,
    });

    // 2. Auto-reply to Sender
    await transporter.sendMail({
      from: `"Asara Morocco Tours" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank You for Booking with Asara Morocco Tours`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <h2 style="color: #e6b800;">Thank You, ${fullName}!</h2>
          <p>We’ve received your booking request and one of our friendly travel experts will reach out shortly to help finalize your itinerary.</p>
          <p>In the meantime, feel free to explore more about our tours:</p>
          <ul>
            <li><a href="https://www.asaramoroccotours.com" target="_blank">www.asaramoroccotours.com</a></li>
            <li><a href="http://journeythroughmorocco.com" target="_blank">journeythroughmorocco.com</a></li>
          </ul>
          <p style="margin-top: 20px;">Looking forward to creating an unforgettable journey with you!</p>
          <p>Warm regards,<br/>Asara Morocco Tours Team</p>
          <hr />
          <p style="font-size: 0.85em; color: #777;">This is an automated confirmation email — we'll be in touch very soon.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Email send error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
