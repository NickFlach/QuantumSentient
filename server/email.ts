import nodemailer from "nodemailer";

// Email service wrapper
export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const port = parseInt(process.env.SMTP_PORT || "587");
      // 465 is typically secure (SSL/TLS), others are usually STARTTLS
      const secure = port === 465;

      console.log(`Initializing Email Service with host: ${process.env.SMTP_HOST}, port: ${port}, secure: ${secure}`);

      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: port,
        secure: secure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      console.log("Email service credentials missing, running in mock mode");
    }
  }

  async sendAccessCode(to: string, code: string): Promise<boolean> {
    if (!this.transporter) {
      console.log(`[Email Mock] Sending access code ${code} to ${to}`);
      return true;
    }

    try {
      // Verify connection configuration
      await this.transporter.verify();
      
      await this.transporter.sendMail({
        from: process.env.SMTP_USER, // Use the authenticated user as sender to avoid spoofing blocks
        to,
        subject: "PROJECT: SENTIENT // ACCESS GRANTED",
        html: `
          <div style="font-family: monospace; background: #000; color: #0ff; padding: 20px;">
            <h1>ACCESS GRANTED</h1>
            <p>Welcome to the Vanguard.</p>
            <p>Your unique encrypted access code is:</p>
            <h2 style="font-size: 32px; letter-spacing: 5px; color: #fff;">${code}</h2>
            <p>Do not share this frequency.</p>
            <p>You will be contacted shortly with further directive.</p>
            <br/>
            <p>Space Child Industries</p>
          </div>
        `,
      });
      console.log(`Email sent successfully to ${to}`);
      return true;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  }
}

export const emailService = new EmailService();
