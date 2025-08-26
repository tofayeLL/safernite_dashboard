import { baseApi } from "./baseApi";

export const donationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDonations: builder.query({
      query: () => ({
        url: `/payment`,
        method: "GET",
      }),
      providesTags: ["donation"],
    }),

    updateStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/donation-post/approve/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["donation"],
    }),
  }),
});

export const { useGetAllDonationsQuery, useUpdateStatusMutation } = donationApi;
