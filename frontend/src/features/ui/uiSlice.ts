import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TodoFilter, TodoSort } from '../../types/todo';

interface UiState {
  filter: TodoFilter;
  search: string;
  sort: TodoSort;
}

const initialState: UiState = { filter: 'all', search: '', sort: 'newest' };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<TodoFilter>) => { state.filter = action.payload; },
    setSearch: (state, action: PayloadAction<string>) => { state.search = action.payload; },
    setSort: (state, action: PayloadAction<TodoSort>) => { state.sort = action.payload; },
    resetFilters: () => initialState,
  },
});

export const { setFilter, setSearch, setSort, resetFilters } = uiSlice.actions;
export default uiSlice.reducer;
