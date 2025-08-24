import { baseApi } from "./baseApi";

export const shipmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllShipments: builder.query({
            query: () => ({
                url: `/shipping`,
                method: 'GET',
            }),
            providesTags: ['shipments']
        }),
    
    }),
})

export const { useGetAllShipmentsQuery } = shipmentApi;