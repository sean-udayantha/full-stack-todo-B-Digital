import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { todosApi } from '../features/todos/todosApi';
import uiReducer from '../features/ui/uiSlice';

export function createStore() {
  return configureStore({
    reducer: { ui: uiReducer, [todosApi.reducerPath]: todosApi.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware),
  });
}

export const store = createStore();
setupListeners(store.dispatch);

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
