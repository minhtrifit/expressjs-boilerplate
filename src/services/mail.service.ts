import fs from 'fs';
import path from 'path';
import { transporter } from '@/libs/mail';
import { MailPayload, MailTemplatePayload } from '@/models/Mail';

export const mailService = {
  async sendMail(payload: MailPayload) {
    const { to, subject, html } = payload;

    const info = await transporter.sendMail({
      from: `"My App" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html
    });

    return info;
  },

  async sendMailTemplate(payload: MailTemplatePayload) {
    const { to, subject, name } = payload;

    const templatePath = path.join(__dirname, '../templates/welcome.html');

    let html = fs.readFileSync(templatePath, 'utf-8');

    html = html.replace('{{name}}', name);

    return transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      html
    });
  }
};
