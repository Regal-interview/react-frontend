import React from "react";
import "../../css/MicButton.css";
import { requestMicPermission } from "../contexts/MicPermission";
import Icon from "./Icon";

export default function MicButton() {
  return (
    <label className="MicButton">
      <Icon id="HEADSET_OFF" />
      Enable your Microphone
      <input type="button" onClick={requestMicPermission} />
    </label>
  );
}
