import { PhoneIcon, AtSymbolIcon } from '@heroicons/react/outline';
import data from '../../constant/data.json';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IoLogoGithub, IoMdMail, IoLogoWhatsapp, IoLogoLinkedin } from 'react-icons/io';
import { SiUpwork } from 'react-icons/si';

const iconContactList = {
	email: <IoMdMail className="h-6 w-6" />,
	whatsapp: <IoLogoWhatsapp className="h-6 w-6 text-green-600" />,
	linkedin: <IoLogoLinkedin className="h-7 w-7 text-blue-700" />,
	github: <IoLogoGithub className="h-6 w-6" />,
	upwork: <SiUpwork className="h-6 w-6 text-green-500" />,
};

export default function Contact() {
	return (
		<section className="overflow-hidden bg-primary max-w-screen min-h-[80dvh]">
			<div className="container">
				<h2 className="title-section text-center text-white">Contact Me</h2>
					<div className="content grid grid-cols-1 gap-y-10 max-w-sm mx-auto mt-16">
						{data.contact.map((item, index) => (
							<motion.div
								key={`contact-${index}`}
								initial={{ opacity: 0, x: index % 2 === 0 ? -120 : 120 }}
								transition={{ duration: 0.7, delay: index * 0.1 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="cursor-pointer"
							>
								<a
									title={item.type}
									href={item.link}
									target="_blank"
									rel="noreferrer"
									className="flex gap-2 p-2 hover:bg-gray-50 rounded-lg bg-white hover:-translate-y-1 hover:scale-105 duration-300 transition shadow-lg"
								>
									<div className="w-8 flex justify-center items-center">{iconContactList[item.type]}</div>
									<p className="text-xl ml-4">{item.value}</p>
								</a>
							</motion.div>
						))}
				</div>
			</div>
		</section>
	);
}
