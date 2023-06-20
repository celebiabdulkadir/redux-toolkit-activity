// import necessary dependencies
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser } from '../features/counter/user';
import Loading from '../loading';
import AddUser from './AddUser';
import ConfirmDialog from './ConfirmModal'; // ensure you have a confirm dialog component
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

const UserList = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState(null);
	const dispatch = useDispatch();

	const users = useSelector((state) => state.user.users);
	const loading = useSelector((state) => state.user.status);

	const deleteUserAction = () => {
		dispatch(deleteUser(userToDelete.id));
		enqueueSnackbar('Deleted Successfully', {
			variant: 'success',
			autoHideDuration: 3000,
		});
		setUserToDelete(null);
		setConfirmModalOpen(false);
	};

	const openDeleteConfirmation = (user) => {
		setUserToDelete(user);
		setConfirmModalOpen(true);
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
			{loading === 'loading' ? (
				<Loading />
			) : (
				<>
					<SnackbarProvider
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					/>

					<AddUser
						isModalOpen={isModalOpen}
						handleCloseModal={handleCloseModal}
					/>

					<ConfirmDialog
						isOpen={confirmModalOpen}
						title='Confirm Delete'
						message='Are you sure you want to delete this user?'
						onConfirm={deleteUserAction}
						onClose={() => setConfirmModalOpen(false)}
					/>

					<button
						className='px-4 py-2 my-2  bg-blue-500 hover:hover:bg-blue-600 hover:hover:scale-105 hover:hover:drop-shadow-lg rounded text-white '
						onClick={handleOpenModal}
					>
						Add User
					</button>
					{users.length < 1 ? (
						<div className='w-full text-2xl font-bold border-t-2'>
							No records
						</div>
					) : (
						<div className='w-full lg:w-2/3   overflow-auto'>
							<table className='w-full  text-center border-2 min-w-max'>
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
												<button
													className='bg-red-200 p-2 rounded text-gray-600 hover:hover:scale-105 hover:hover:drop-shadow-xl'
													onClick={() => openDeleteConfirmation(user)}
												>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default UserList;
