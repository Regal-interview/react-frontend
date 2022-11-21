import { Dispatch } from "react";
import { fetchContacts } from "../services/api";
import { Contact } from "../types";

import { CALL_CONTACT, CALL_HANGUP, API_REQUEST_CONTACTS, API_RECEIVED_CONTACTS } from "./types";

export type ActionTypes =
  | ReturnType<typeof loadContacts>
  | ReturnType<typeof receivedContacts>
  | ReturnType<typeof callContact>
  | ReturnType<typeof hangupCall>;

export const loadContacts = (filter: string, refresh: boolean, nextCursor: string = "") =>
  ({ type: API_REQUEST_CONTACTS, filter, refresh, nextCursor } as const);

const receivedContacts = (refresh: boolean, contacts: Contact[], nextCursor?: string) =>
  ({ type: API_RECEIVED_CONTACTS, refresh, contacts, nextCursor } as const);

export const requestContacts = (
  dispatch: Dispatch<ActionTypes>,
  filter: string = "",
  nextCursor: string = ""
) => {
  const refresh = nextCursor === "";

  dispatch(loadContacts(filter, refresh, nextCursor));

  fetchContacts(filter, 50, nextCursor).then(({ contacts, nextCursor }) => {
    dispatch(receivedContacts(refresh, contacts, nextCursor));
  });
};

export const callContact = (id: string) => ({ type: CALL_CONTACT, id } as const);
export const hangupCall = () => ({ type: CALL_HANGUP } as const);
