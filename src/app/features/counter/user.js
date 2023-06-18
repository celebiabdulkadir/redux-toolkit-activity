import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await axios.get(
		'https://jsonplaceholder.typicode.com/users'
	);
	return response.data;
});

const usersSlice = createSlice({
	name: 'users',
	initialState: { users: [], status: 'idle', error: null },
	reducers: {
		// Action for adding user
		addUser: (state, action) => {
			state.users.push(action.payload);
		},
		// Action for deleting user
		deleteUser: (state, action) => {
			state.users = state.users.filter((user) => user.id !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = 'succeeded';
				// Add users to the state array
				state.users = state.users.concat(action.payload);
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(addUser, (state, action) => {
				state.users.push(action.payload);
			})
			.addCase(deleteUser, (state, action) => {
				state.users = state.users.filter((user) => user.id !== action.payload);
			});
	},
});

export const { addUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
