import { ActiveCall, Contact } from "../types";
import { ActionTypes, requestContacts, hangupCall, callContact } from "./actions";
import reducer from "./reducer";

export interface State {
  filter: string;
  contacts: Contact[];
  loading?: boolean;
  nextCursor?: string;
  activeCall?: ActiveCall;
}

export const initState = (): State => ({
  filter: "",
  contacts: [],
  loading: true,
});

export { ActionTypes, requestContacts, callContact, hangupCall, reducer };
