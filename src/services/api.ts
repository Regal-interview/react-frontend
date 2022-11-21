import { Contact } from "../types";

export async function fetchContacts(
  filter: string,
  limit: number,
  cursor?: string,
  init?: RequestInit
): Promise<{
  contacts: Contact[];
  nextCursor?: string;
}> {
  const params = {
    filter,
    ...(limit && { limit: limit.toString() }),
    ...(cursor && { cursor: cursor }),
  };
  return fetch(`/api/contacts/?${new URLSearchParams(params).toString()}`, init).then((response) =>
    response.json()
  );
}
