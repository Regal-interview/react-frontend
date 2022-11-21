export interface Contact {
  id: string;
  firstname: string;
  surname: string;
  phonenumber: string;
  contacted?: string;
}

export interface ActiveCall {
  contact: Contact;
  connected?: Date;
}
