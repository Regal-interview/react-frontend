import React, { useReducer } from "react";
import "../css/app.css";
import { initState, reducer } from "./state";
import MicPermission, { useMicPermissionStatus } from "./contexts/MicPermission";
import EnableMic from "./components/MicButton";
import CallPanel from "./components/CallPanel";
import ContactsList from "./components/ContactList";
import { useDocumentClassToggle } from "./utils/css";

function AppInner() {
  const [state, dispatch] = useReducer(reducer, initState());
  const [micGranted] = useMicPermissionStatus();

  useDocumentClassToggle("available", micGranted);

  if (!micGranted) {
    return <EnableMic />;
  }

  const { activeCall } = state;
  return (
    <>
      <ContactsList dispatch={dispatch} {...state} />
      <section>{activeCall && <CallPanel dispatch={dispatch} {...activeCall} />}</section>
    </>
  );
}

export default function App() {
  return (
    <MicPermission>
      <AppInner />
    </MicPermission>
  );
}
