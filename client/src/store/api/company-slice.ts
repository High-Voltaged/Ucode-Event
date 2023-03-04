import { CompaniesParam, CompaniesResponse, Company } from '~/types/company';
import { apiSlice } from './api-slice';
import type { IUpdate } from '~/validation/companies';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<CompaniesResponse, CompaniesParam>({
      query: (queryParams) => ({
        url: `/companies`,
        params: { ...queryParams },
      }),
      transformResponse(companies: Company[], meta: any) {
        return { companies, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
      providesTags: (result) => {
        const companies = result?.companies || [];
        return ['Company', ...companies.map(({ id }) => ({ type: 'Company' as const, id }))];
      },
    }),
    getCompany: builder.query<Company, number>({
      query: (id) => `/companies/${id}`,
      providesTags: (_result, _error, arg) => [{ type: 'Company' as const, id: arg }],
    }),
    updateCompany: builder.mutation<Company, IUpdate & Pick<Company, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `/companies/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Company', id: arg.id }],
    }),
    deleteCompany: builder.mutation<void, number>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Company'],
    }),
    updateCompanyAvatar: builder.mutation<Company, { form: FormData } & Pick<Company, 'id'>>({
      query: ({ id, form }) => ({
        url: `/companies/${id}/avatar`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Company', id: arg.id }],
    }),
    deleteCompanyAvatar: builder.mutation<void, number>({
      query: (id) => ({
        url: `/companies/${id}/avatar`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Company', id: arg }],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyQuery,
  useLazyGetCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useUpdateCompanyAvatarMutation,
  useDeleteCompanyAvatarMutation,
} = extendedApiSlice;
