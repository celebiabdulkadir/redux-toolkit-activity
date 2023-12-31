import './globals.css';
import { Inter } from 'next/font/google';
import { ReduxProvider } from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Next Redux',
	description: 'Generated by create next app and redux',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ReduxProvider>{children}</ReduxProvider>{' '}
			</body>
		</html>
	);
}
