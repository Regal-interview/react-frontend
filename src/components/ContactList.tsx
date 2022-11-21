import React, { Dispatch, useEffect } from "react";
import "../../css/ContactList.css";
import { ActionTypes, State, requestContacts, callContact } from "../state";
import ContactsSearch from "./ContactsSearch";
import Icon from "./Icon";
import { displaySince } from "../utils/time";

export interface Props extends State {
  dispatch: Dispatch<ActionTypes>;
}

export default function ContactsList({ dispatch, filter, nextCursor, contacts, loading }: Props) {
  useEffect(() => {
    requestContacts(dispatch);
  }, []);
  return (
    <div className="ContactsList">
      <header>Contacts</header>
      <ContactsSearch dispatch={dispatch} />
      <section>
        {contacts.map(({ id, firstname, surname, contacted }) => (
          <article
            key={id}
            className="ContactsList-contact"
            onClick={() => dispatch(callContact(id))}
          >
            <Icon id="PERSON" />
            <span>
              <b>{firstname + " " + surname}</b>
              <em>{contacted ? `Contacted ${displaySince(new Date(contacted))} ago` : "\u00A0"}</em>
            </span>
          </article>
        ))}
        {nextCursor ? (
          <button
            className="ContactsList-more"
            disabled={loading}
            onClick={() => requestContacts(dispatch, filter, nextCursor)}
          >
            Load More
          </button>
        ) : undefined}
      </section>
    </div>
  );
}
