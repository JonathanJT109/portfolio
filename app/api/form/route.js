import { NextResponse } from "next/server"

export async function POST(request) {
        const formData = await request.formData();
        formData.append("access_key", process.env.WEBFORMS_KEY);

        const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
        });

        const data = await response.json();
        console.log(data.message);
        if (data.success) {
                return NextResponse.json({ message: "Form submitted successfully", success: true }, { status: 200 });
        }
        else {
                return NextResponse.json({ message: "Failed to submit form", success: false });
        }
}
