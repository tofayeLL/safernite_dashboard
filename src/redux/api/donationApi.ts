import { baseApi } from "./baseApi";

export const donationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllDonations: builder.query({
            query: () => ({
                url: `/payment`,
                method: 'GET',
            }),
            providesTags: ['donation']
        }),
    
    }),
})

export const { useGetAllDonationsQuery } = donationApi;