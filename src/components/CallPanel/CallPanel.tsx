import React, { Dispatch, useEffect, useState } from "react";
import "../../../css/CallPanel.css";
import Icon from "../Icon";
import { displaySince } from "../../utils/time";
import { ActionTypes, hangupCall } from "../../state";
import { ActiveCall } from "../../types";

export interface Props extends ActiveCall {
  dispatch: Dispatch<ActionTypes>;
}

export default function CallPanel({
  contact: { firstname, surname, phonenumber },
  connected,
  dispatch,
}: Props) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!connected) return;
    // Trigger an update every 0.5s to update the display
    const i = setInterval(() => {
      setNow(Date.now());
    }, 500);
    return () => clearInterval(i);
  }, [connected]);

  return (
    <article className="CallPanel">
      <aside></aside>
      <header>
        <div className="TaskInfo">
          <em>Outgoing Call</em>
          <i className="TaskInfo-recording">Recording</i>
        </div>
        <div className="BrandInfo">
          <em>Acquisition Line</em>
          <i>+1 (201) 352-8130</i>
        </div>
      </header>
      <div className="CallInfo">
        <div className="CallInfo-user">
          <Icon id="PERSON" />
        </div>
        <div className="CallInfo-info">
          <em>{`${firstname} ${surname}`}</em>
          <i>{phonenumber}</i>
        </div>
        <div className="CallInfo-status">
          {connected ? `Live | ${displaySince(connected, now)}` : "Ringing"}
        </div>
      </div>
      <nav className="CallControls">
        <button
          className="CallControls-reject"
          onClick={() => {
            dispatch(hangupCall());
          }}
        >
          <Icon id="CROSS" />
        </button>
      </nav>
    </article>
  );
}
