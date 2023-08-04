import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section id='home' className='bg-blue-100'>
      <motion.div
        className='container'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
      >
        <div className=' flex flex-row justify-between '>
          <div className='py-10 my-auto'>
            <h1 className='leading-10 mb-10'>
              Hello, I&apos;m
              <span className='text-4xl text-primary'> Deni Sugiarto.</span>
              <br />
              I&apos;m a front-end web developer
            </h1>
            <a
              href='https://api.whatsapp.com/send/?phone=6281217986332&text&app_absent=0'
              className='px-20 py-3 rounded-xl font-bold font-serif border-2 border-primary capitalize bg-primary text-white duration-300 transition easy-in-out transform hover:scale-110'
            >
              Hire me
            </a>
          </div>
          <div className='img-wrapper mx-auto sm:mx-0 hidden md:block'>
            <div className='w-72 h-72 rounded-full shadow-xl overflow-hidden'>
              <Image src='/img/profile.webp' width={400} height={400} alt='profile-picture' priority='true' />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
