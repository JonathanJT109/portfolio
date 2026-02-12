import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { from_name, from_email, service, message } = await request.json();

    // Validate required fields server-side
    if (!from_name || !from_email || !service || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: "service_2r62h6o",
        template_id: "template_vzf7hy7",
        user_id: "gbQ-NcqstoyJKepZ1",
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          from_name,
          from_email,
          service,
          message,
        },
      }),
    });

    if (response.ok) {
      return NextResponse.json(
        { success: true, message: "Email sent successfully" },
        { status: 200 }
      );
    }

    const errorText = await response.text();
    console.error("EmailJS error:", response.status, errorText);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
