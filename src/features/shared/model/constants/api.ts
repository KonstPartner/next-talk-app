import { apiInstance } from '@features/shared/model';

export const LOCAL_API_BASE_URL = 'http://localhost:4000';

export const localApi = apiInstance(LOCAL_API_BASE_URL);

export const JSON_PLACEHOLDER_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const jsonPlaceholderApi = apiInstance(JSON_PLACEHOLDER_BASE_URL);
