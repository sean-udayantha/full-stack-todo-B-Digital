import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiResponse, Todo, TodoInput } from '../../types/todo';

export const todosApi = createApi({
  
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env?.VITE_API_BASE_URL || 'http://localhost:4000/api',
    timeout: 10000,
  }),
  tagTypes: ['Todo'],
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => '/todos',
      transformResponse: (response: ApiResponse<Todo[]>) => response.data,
      providesTags: ['Todo'],
    }),
    createTodo: builder.mutation<Todo, TodoInput>({
      query: (body) => ({ url: '/todos', method: 'POST', body }),
      transformResponse: (response: ApiResponse<Todo>) => response.data,
      invalidatesTags: (_result, error) => error ? [] : ['Todo'],
    }),
    updateTodo: builder.mutation<Todo, { id: number; values: TodoInput }>({
      query: ({ id, values }) => ({ url: `/todos/${id}`, method: 'PUT', body: values }),
      transformResponse: (response: ApiResponse<Todo>) => response.data,
      invalidatesTags: (_result, error) => error ? [] : ['Todo'],
    }),
    toggleDone: builder.mutation<Todo, number>({
      query: (id) => ({ url: `/todos/${id}/done`, method: 'PATCH' }),
      transformResponse: (response: ApiResponse<Todo>) => response.data,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        let previousDone: boolean | undefined;
        dispatch(todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
          const todo = draft.find((item) => item.id === id);
          if (todo) {
            previousDone = todo.done;
            todo.done = !todo.done;
          }
        }));
        try {
          const { data } = await queryFulfilled;
          dispatch(todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const index = draft.findIndex((item) => item.id === id);
            if (index !== -1) draft[index] = data;
          }));
        } catch {
          // Match by ID because another mutation may have reordered the cached list.
          dispatch(todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const todo = draft.find((item) => item.id === id);
            if (todo && previousDone !== undefined) todo.done = previousDone;
          }));
          // Reconcile with the database if a response was lost after a successful write.
          dispatch(todosApi.util.invalidateTags(['Todo']));
        }
      },
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({ url: `/todos/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, error) => error ? [] : ['Todo'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useToggleDoneMutation,
  useDeleteTodoMutation,
} = todosApi;
