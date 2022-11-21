import React from "react";

export default function Icon({ id }: { id: string }): JSX.Element {
  return (
    <svg>
      <use xlinkHref={`/image/icons.svg#${id}`}></use>
    </svg>
  );
}
