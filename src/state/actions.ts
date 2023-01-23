import { Dispatch } from "react";
import { fetchContacts } from "../services/api";
import { Contact } from "../types";

import {
  CALL_CONTACT,
  CALL_HANGUP,
  API_START_LOADING_CONTACTS,
  API_RECEIVED_CONTACTS,
} from "./types";

export type ActionTypes =
  | ReturnType<typeof startLoadingContacts>
  | ReturnType<typeof receivedContacts>
  | ReturnType<typeof callContact>
  | ReturnType<typeof hangupCall>;

const startLoadingContacts = (filter: string, nextCursor: string = "") =>
  ({ type: API_START_LOADING_CONTACTS, filter, nextCursor } as const);

const receivedContacts = (loadMoreContacts: boolean, contacts: Contact[], nextCursor?: string) =>
  ({ type: API_RECEIVED_CONTACTS, loadMoreContacts, contacts, nextCursor } as const);

export const requestContacts = (
  dispatch: Dispatch<ActionTypes>,
  filter: string = "",
  nextCursor: string = ""
) => {
  dispatch(startLoadingContacts(filter, nextCursor));

  const loadMoreContacts = nextCursor !== "";

  fetchContacts(filter, 25, nextCursor).then(({ contacts, nextCursor }) => {
    dispatch(receivedContacts(loadMoreContacts, contacts, nextCursor));
  });
};

export const callContact = (id: string) => ({ type: CALL_CONTACT, id } as const);
export const hangupCall = () => ({ type: CALL_HANGUP } as const);
