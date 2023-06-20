'use client';
import UserList from './components/UserList';
import Loading from './loading';
import { Suspense } from 'react';

export default function Home() {
	return (
		<main className='flex flex-col items-center justify-center my-12  '>
			<div className='w-full flex flex-col justify-center items-center'>
				<Suspense fallback={<Loading />}>
					<UserList classNamew-full></UserList>
				</Suspense>{' '}
			</div>
		</main>
	);
}
