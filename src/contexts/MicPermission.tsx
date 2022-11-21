import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";

export const requestMicPermission = async () => {
  // TODO: Request user/browser for audio permissions
};

export enum Status {
  Denied = -1,
  Unknown = 0,
  Granted = 1,
}

const MicPermission = createContext<Status>(Status.Unknown);

// Return the current microphone's permission
export const useMicPermissionStatus = (): [boolean, Status] => {
  const status = useContext(MicPermission);
  return [status === Status.Granted, useContext(MicPermission)];
};

// MicProvider will check if the browser has given permission to use the microphone.
// NOTE: any changes to the permissions will auto trigger a state update
export default function MicProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<Status>(Status.Unknown);
  const transformStatus = ({ state }: PermissionStatus): Status => {
    switch (state) {
      case "denied":
        return Status.Denied;
      case "granted":
        return Status.Granted;
      default:
        return Status.Unknown;
    }
  };
  useEffect(() => {
    // Query browser's for microphone
    navigator.permissions.query({ name: "microphone" as PermissionName }).then((s) => {
      // Update the current permission status
      setStatus(transformStatus(s));
      // Trigger an update to the microphone permission status
      s.onchange = () => setStatus(transformStatus(s));
      return s;
    });
  }, []);
  return <MicPermission.Provider value={status}>{children}</MicPermission.Provider>;
}
