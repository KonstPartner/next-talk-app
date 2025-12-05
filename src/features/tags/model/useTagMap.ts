'use client';

import { useSuspenseTags } from '../api';

const useTagMap = () => {
  const { tags } = useSuspenseTags();
  const map = new Map(tags.map((c) => [c.id, c]));

  return { tags, tagMap: map };
};

export default useTagMap;
