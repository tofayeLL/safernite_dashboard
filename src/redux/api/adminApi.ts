import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    getAllStats: builder.query({
      query: () => ({
        url: `/admin/overview`,
        method: "GET",
      }),
      providesTags: ["admins"],
    }),

      /* getMyProfile: builder.query({
      query: () => ({
        url: `/user/profile`,
        method: "GET",
      }),
      providesTags: ["admins"],
    }), */








    getAllAdmins: builder.query({
      query: () => ({
        url: `/admin/all`,
        method: "GET",
      }),
      providesTags: ["admins"],
    }),
  
      createAdmin: builder.mutation({
      query: (body) => ({
        url: `/admin/create`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["admins"],
    }),
    
    getAllResponders: builder.query({
      query: () => ({
        url: `/admin/responders`,
        method: "GET",
      }),
      providesTags: ["admins"],
    }),
    getAllCases: builder.query({
      query: () => ({
        url: `/legal-aid`,
        method: "GET",
      }),
      providesTags: ["admins"],
    }),
    getAllAdminAnalysis: builder.query({
      query: () => ({
        url: `/admin/analysis`,
        method: "GET",
      }),
      providesTags: ["admins"],
    }),
    
  }),
});

export const {
  useGetAllStatsQuery,



  useGetAllAdminsQuery,
  useGetAllRespondersQuery,
  useGetAllCasesQuery,
  useGetAllAdminAnalysisQuery,
  useCreateAdminMutation
 
} = adminApi;