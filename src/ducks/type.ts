export interface ITempEmail {
  name: string;
  hash: string;
}

export interface IEmail {
  mail_address_id: string;
  mail_from: string;
  mail_html: string;
  mail_id: string;
  mail_preview: string;
  mail_subject: string;
  mail_text: string;
  mail_text_only: string;
  mail_timestamp: number;
}
