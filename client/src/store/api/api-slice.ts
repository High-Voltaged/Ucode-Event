import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQueryWithReauth';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Event', 'Company', 'UserProfile', 'Format', 'Theme', 'CompanySubscribers', 'EventSubscribers'],
  endpoints: (_builder) => ({}),
});
