"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
        const { data, error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            // FIX: This MUST be jessengolab.dev@gmail.com for the free tier
            to: ['jessengolab.dev@gmail.com'],
            subject: `New Portfolio Message from ${name}`,
            replyTo: email, // This stays as the user's email so you can reply to them
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        if (error) {
            console.error("Resend Error:", error);
            return { success: false };
        }

        return { success: true };
    } catch (err) {
        console.error("Server Action Error:", err);
        return { success: false };
    }
}