import { AppState } from '@/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ExampleState = {
  count: number;
};

/** Slice */
const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    count: 0,
  } as ExampleState,
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
    countUpdated(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
});

/** Selectors */
export function selectCount(state: AppState) {
  return state.example.count;
}

/** Actions */
export const { increment, decrement, countUpdated } = exampleSlice.actions;

export default exampleSlice.reducer;
