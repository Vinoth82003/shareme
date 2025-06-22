import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // App password or actual password (if less secure apps enabled)
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Your Gmail (receiver)
      subject: `Contact Form Message from ${name}`,
      text: `From: ${name}\nEmail: ${email}\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Mail Error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Try again later." },
      { status: 500 }
    );
  }
}
