export interface MailPayload {
  to: string;
  subject: string;
  html: string;
}

export interface MailTemplatePayload {
  to: string;
  subject: string;
  name: string;
}
