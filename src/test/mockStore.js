import { configureStore } from '@reduxjs/toolkit';

const createMockStore = (initialState) => {
  return configureStore({
    reducer: () => initialState,
  });
};

export default createMockStore;
