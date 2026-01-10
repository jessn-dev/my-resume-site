"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
        const { data, error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>', // Update this once you have a domain
            to: ['your-email@example.com'], // Where you want to receive emails
            subject: `New Portfolio Message from ${name}`,
            reply_to: email,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        if (error) return { success: false, error };
        return { success: true };
    } catch (err) {
        return { success: false, error: err };
    }
}