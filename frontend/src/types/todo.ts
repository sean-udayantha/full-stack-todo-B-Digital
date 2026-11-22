export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodoInput {
  title: string;
  description: string;
}

export interface ApiResponse<T> {
  data: T;
}

export type TodoFilter = 'all' | 'active' | 'completed';
export type TodoSort = 'newest' | 'oldest' | 'alphabetical';
export interface Notice {
  message: string;
  kind: 'success' | 'error';
}
