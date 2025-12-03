export const USERS_PATH = '/users';

export const getUserByUsername = (username: string) =>
  `${USERS_PATH}?username=${encodeURIComponent(username)}`;

export const getUserEndpoint = (id: number) => `${USERS_PATH}/${id}`;
