'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser } from '../features/counter/user';
import AddUser from './AddUser';
const UserList = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useDispatch();

	const users = useSelector((state) => state.user.users);
	const loading = useSelector((state) => state.user.status);

	const deleteUserAction = (user) => {
		console.log(users);
		console.log(user);
		dispatch(deleteUser(user.id));
	};
	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		if (loading === 'idle') {
			dispatch(fetchUsers());
		}
	}, []);
	return (
		<>
			<AddUser isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />
			<div className='text-black'>{users.length}</div>

			<div>
				<button
					className='px-4 py-2 my-2 bg-blue-500 hover:hover:bg-blue-600 hover:hover:scale-105 hover:hover:drop-shadow-lg rounded text-white'
					onClick={handleOpenModal}
				>
					Add User
				</button>

				<table className='w-full overflow-x-auto text-center border-2'>
					<thead>
						<tr className='bg-indigo-400'>
							<th className='p-4 border-2'>No</th>
							<th className='p-4 border-2'>ID</th>
							<th className='p-4 border-2'>Name</th>
							<th className='p-4 border-2'>Email</th>
							<th className='p-4 border-2'>Phone</th>
							<th className='p-4 border-2'>Action</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr key={user.id}>
								<td className='p-4 border-2'>{index + 1}</td>
								<td className='p-4 border-2'>{user.id}</td>
								<td className='p-4 border-2'>{user.name}</td>
								<td className='p-4 border-2'>{user.email}</td>
								<td className='p-4 border-2'>{user.phone}</td>
								<td className='p-4 border-2'>
									{/* Insert your action here, for example a delete button */}
									<button
										className='bg-red-200 p-2 rounded text-gray-600 hover:hover:scale-105 hover:hover:drop-shadow-xl'
										onClick={() => deleteUserAction(user)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
						{users.length < 1 && <div className='w-full'>no recordsa</div>}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default UserList;
