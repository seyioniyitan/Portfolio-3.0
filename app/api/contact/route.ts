import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fullName, email, projectDetails, budget, timeline } = body;

        // Validate required fields
        if (!fullName || !email || !projectDetails) {
            return NextResponse.json(
                { error: "Missing required fields. Name, email, and project description are required." },
                { status: 400 }
            );
        }

        const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f5f5f7;
            color: #1d1d1f;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            border: 1px solid #e5e5ea;
          }
          h1 {
            font-size: 24px;
            font-weight: 600;
            letter-spacing: -0.015em;
            margin-top: 0;
            margin-bottom: 24px;
            border-bottom: 1px solid #e5e5ea;
            padding-bottom: 16px;
          }
          .field {
            margin-bottom: 20px;
          }
          .label {
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #86868b;
            margin-bottom: 6px;
          }
          .value {
            font-size: 16px;
            line-height: 1.5;
            color: #1d1d1f;
          }
          .value-details {
            white-space: pre-wrap;
          }
          .footer {
            margin-top: 32px;
            padding-top: 16px;
            border-top: 1px solid #e5e5ea;
            font-size: 12px;
            color: #86868b;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>New Project Inquiry</h1>
          
          <div class="field">
            <div class="label">Full Name</div>
            <div class="value">${fullName}</div>
          </div>
          
          <div class="field">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${email}" style="color: #0071e3; text-decoration: none;">${email}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Project Details</div>
            <div class="value value-details">${projectDetails}</div>
          </div>
          
          <div class="field">
            <div class="label">Budget</div>
            <div class="value">${budget || "Not specified"}</div>
          </div>
          
          <div class="field">
            <div class="label">Timeline</div>
            <div class="value">${timeline || "Not specified"}</div>
          </div>
          
          <div class="footer">
            Sent from Portfolio Contact Form
          </div>
        </div>
      </body>
      </html>
    `;

        const { data, error } = await resend.emails.send({
            from: "Portfolio Contact Form <contact@seyioniyitan.com>",
            to: "hello@seyioniyitan.com",
            subject: `New Project Inquiry from ${fullName}`,
            replyTo: email,
            html: htmlContent,
        });

        if (error) {
            console.error("Resend API Error:", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err: any) {
        console.error("Contact API Route Error:", err);
        return NextResponse.json(
            { error: err?.message || "Internal server error occurred." },
            { status: 500 }
        );
    }
}