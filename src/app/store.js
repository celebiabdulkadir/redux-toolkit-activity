import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/counter/user';
export const store = configureStore({
	reducer: {
		user: userSlice,
	},
});
