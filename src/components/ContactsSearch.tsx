import React, { ChangeEvent, Dispatch } from "react";
import "../../css/ContactsSearch.css";
import { ActionTypes, requestContacts } from "../state";
import Icon from "./Icon";

export interface Props {
  dispatch: Dispatch<ActionTypes>;
}

export default function ContactsSearch({ dispatch }: Props) {
  return (
    <div className="ContactsSearch">
      <label>
        <Icon id="SEARCH" />
        <input
          type="text"
          placeholder="Search Contacts"
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            requestContacts(dispatch, evt.target.value.trim());
          }}
        />
      </label>
    </div>
  );
}
