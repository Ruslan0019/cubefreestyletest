// app/api/contact/route.js
import nodemailer from "nodemailer";

export const revalidate = 0;

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const service = formData.get("service")?.toString() || "";
    const message = formData.get("message")?.toString() || "";

    const text = `
Нова заявка з сайту Cube Freestyle

Ім’я: ${name}
Телефон: ${phone}
Послуга: ${service}
Повідомлення: ${message || "-"}
`.trim();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (token && chatId) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Cube Freestyle" <${process.env.GMAIL_USER}>`,
      to: process.env.SMTP_TO,
      subject: "Нова заявка з сайту Cube Freestyle",
      text,
      html: text.replace(/\n/g, "<br>"),
    });

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("CONTACT_FORM_ERROR:", err);
    return new Response("Error sending message", { status: 500 });
  }
}
