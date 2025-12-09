'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { usersApi } from '@features/users/api/usersApi';

export const useSuspenseUser = (id: number) => {
  const { data } = useSuspenseQuery(usersApi.getUserByIdOptions(id));

  return { user: data };
};
