import Image from 'next/image';
import data from '../../constant/data.json';
export default function Footer() {
	const contactGithub = data.contact.find((contact) => contact.type === 'github');
	return (
		<footer className="bg-primary py-8">
			<div className="container pt-0">
				<div className="text-base text-center text-white">
					<a href={contactGithub.link} target="_blank" rel="noopener noreferrer">
						Copyright &copy; {new Date().getFullYear()} <br />
						Made by Deni Sugiarto
					</a>
				</div>
			</div>
		</footer>
	);
}
