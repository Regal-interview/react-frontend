import { ActionTypes, State } from "./index";
import {
  API_START_LOADING_CONTACTS,
  API_RECEIVED_CONTACTS,
  CALL_CONTACT,
  CALL_HANGUP,
} from "./types";

export default function reducer(state: State, action: ActionTypes): State {
  switch (action.type) {
    // API Interactions for contacts
    case API_START_LOADING_CONTACTS:
      return { ...state, loading: true };

    case API_RECEIVED_CONTACTS:
      const contacts = action.loadMoreContacts
        ? [...state.contacts, ...action.contacts]
        : action.contacts;
      return { ...state, loading: false, contacts, nextCursor: action.nextCursor };

    // Calling interactions
    case CALL_CONTACT:
      const contact = state.contacts.find((contact) => contact.id === action.id);
      if (contact) {
        return {
          ...state,
          activeCall: {
            contact: contact,
            connected: undefined,
          },
        };
      }
      break;

    case CALL_HANGUP:
      return { ...state, activeCall: undefined };
  }
  return state;
}
