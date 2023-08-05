import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { PhoneIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import data from '../../constant/data.json'
import Image from 'next/image';
import Link from 'next/link';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Header() {
	return (
		<Disclosure as="nav" className="bg-secondary border-b border-secondary sticky top-0 z-10 ">
			{({ open }) => (
				<>
					<div className="container py-2">
						<div className="relative flex items-center justify-between h-16">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex-shrink-0 flex items-center">
									<Link href="/">
										<a className="font-title text-4xl rounded p-1 border border-transparent  hover:border-black hover:bg-gray-100 transition duration-300" title={data.profile.name}>DS</a>
									</Link>
								</div>
								<div className="hidden sm:block sm:ml-6 my-auto font-body">
									<div className="flex space-x-4">
										{data.navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.active ? 'bg-primary text-white shadow-2xl' : 'text-gray-300 hover:bg-primary hover:text-white',
													'px-3 py-2 rounded-xl text-sm font-medium'
												)}
												aria-current={item.active ? 'page' : undefined}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
							<div className="hidden sm:block sm:ml-1">
								<a
									href="https://api.whatsapp.com/send/?phone=6281217986332&text&app_absent=0"
									className="absolute inset-y-0 right-0 flex items-center justify-center sm:static px-4 py-2 rounded-xl text-primary font-bold font-serif border-2 border-primary capitalize hover:bg-primary hover:text-white duration-300 transform hover:scale-110"
								>
									let&apos;s chat
								</a>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{data.navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.active ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block px-3 py-2 rounded-xl text-base font-medium cursor-pointer'
									)}
									aria-current={item.active ? 'page' : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
							<div className="flex">
								<PhoneIcon className="h-6 w-6 mr-2" aria-hidden="true" />
								<a href="https://api.whatsapp.com/send/?phone=6281217986332&text&app_absent=0">+6281217986332</a>
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
