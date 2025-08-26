import { baseApi } from "./baseApi";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: ({ page, limit, search, postType }) => {
        // Build query parameters
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
       
        // Add search parameter if provided (searches by productName)
        if (search && search.trim() !== '') {
          params.append('search', search.trim());
        }
       
        // Add postType parameter if provided (filters by postType)
        if (postType && postType.trim() !== '' && postType !== 'all') {
          params.append('postType', postType.trim());
        }
       
        return {
          url: `/admin/all-posts?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["posts"],
    }),
   
    getSinglePost: builder.query({
      query: (id) => ({
        url: `/admin/donation/details/${id}`,
        method: "GET",
      }),
      providesTags: ["posts"],
    }),
   
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/donation-post/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetSinglePostQuery,
  useDeletePostMutation,
} = postApi;