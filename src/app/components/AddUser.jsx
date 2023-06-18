'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/counter/user';

const schema = yup.object().shape({
	name: yup.string().trim('No leading/trailing whitepaces allowed').required(),
	email: yup.string().required().email(),
	phone: yup.string().trim('No leading/trailing whitepaces allowed').required(),
});

function AddUser({ isModalOpen, handleCloseModal }) {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const dispatch = useDispatch();

	const onSubmit = (data) => {
		const user = {
			id: Date.now(), // Generate a unique ID using uuidv4()
			...data,
		};
		dispatch(addUser(user));
		reset();
		handleCloseModal();
	};

	if (!isModalOpen) {
		return null;
	}

	return (
		<div className='fixed z-10 inset-0 overflow-y-auto w-full'>
			<div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center'>
				<div
					className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
					aria-hidden='true'
				></div>
				<span
					className='hidden sm:inline-block sm:align-middle sm:h-screen'
					aria-hidden='true'
				>
					&#8203;
				</span>
				<div className='inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
					<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									Name
								</label>
								<Controller
									name='name'
									control={control}
									defaultValue=''
									render={({ field }) => (
										<div>
											<input
												{...field}
												className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
											/>
											<p
												className={`text-red-600 ${
													errors.name ? '' : 'invisible'
												}`}
											>
												{errors.field?.name}
											</p>
										</div>
									)}
								/>
							</div>
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									Email
								</label>
								<Controller
									name='email'
									control={control}
									defaultValue=''
									render={({ field }) => (
										<input
											{...field}
											className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
										/>
									)}
								/>
							</div>
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									Phone
								</label>
								<Controller
									name='phone'
									control={control}
									defaultValue=''
									render={({ field }) => (
										<input
											{...field}
											className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
										/>
									)}
								/>
							</div>
							<div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
								<button
									type='submit'
									className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
								>
									Add User
								</button>
								<button
									type='button'
									onClick={handleCloseModal}
									className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
								>
									Close
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddUser;
