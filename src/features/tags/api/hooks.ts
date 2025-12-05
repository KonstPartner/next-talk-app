'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { tagsApi } from '@features/tags/api/tagsApi';

export const useSuspenseTags = () => {
  const { data } = useSuspenseQuery(tagsApi.getAllOptions());

  return { tags: data };
};
