import nodemailer from "nodemailer";

// Email service wrapper
export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }
  }

  async sendAccessCode(to: string, code: string): Promise<boolean> {
    if (!this.transporter) {
      console.log(`[Email Mock] Sending access code ${code} to ${to}`);
      return false;
    }

    try {
      await this.transporter.sendMail({
        from: '"Space Child" <no-reply@spacechild.dev>',
        to,
        subject: "PROJECT: SENTIENT // ACCESS GRANTED",
        html: `
          <div style="font-family: monospace; background: #000; color: #0ff; padding: 20px;">
            <h1>ACCESS GRANTED</h1>
            <p>Welcome to the Vanguard.</p>
            <p>Your unique encrypted access code is:</p>
            <h2 style="font-size: 32px; letter-spacing: 5px; color: #fff;">${code}</h2>
            <p>Do not share this frequency.</p>
            <br/>
            <p>Space Child Industries</p>
          </div>
        `,
      });
      return true;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  }
}

export const emailService = new EmailService();
