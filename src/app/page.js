'use client';
import UserList from './components/UserList';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div>
				<UserList></UserList>
			</div>
		</main>
	);
}
