import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "get-all-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourses: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    editCourses: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getUsersAllCourses: builder.query({
      query: () => ({
        url: "get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `get-course-content//${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: "add-question",
        method: "PUT",
        body: {
          question,
          courseId,
          contentId,
        },
        credentials: "include" as const,
      }),
    }),
    addAnswer: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: "add-answer",
        method: "PUT",
        body: {
          answer,
          courseId,
          contentId,
          questionId,
        },
        credentials: "include" as const,
      }),
    }),
    addReview: builder.mutation({
      query: ({ review, rating, courseId }) => ({
        url: `add-review/${courseId}`,
        method: "PUT",
        body: { 
            review, 
            rating, 
            courseId
        },
        credentials: "include" as const,
      }),
    }),
    addReply: builder.mutation({
      query: ({ comment, courseId, reviewId }) => ({
        url: `add-reply`,
        method: "PUT",
        body: { 
            comment, courseId, reviewId
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCoursesMutation,
  useEditCoursesMutation,
  useGetUsersAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnswerMutation,
  useAddReviewMutation,
  useAddReplyMutation
} = courseApi;
