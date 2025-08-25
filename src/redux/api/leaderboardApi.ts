import { baseApi } from "./baseApi";

export const leaderboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLeaderBoardOverview: builder.query({
            query: () => ({
                url: `/admin/donation/leaderboard`,
                method: 'GET',
            }),
            providesTags: ['leaderboard']
        }),
    
    }),
})

export const { useGetAllLeaderBoardOverviewQuery } = leaderboardApi;