import Image from "next/image";

export default function Hero() {
  return (
    <section id='home' className='bg-blue-100'>
      <div className='container'>
        <div className=' flex flex-col sm:flex-row justify-between '>
          <div className='py-10 flex-col my-auto'>
            <h1 className='leading-10'>
              Hello, I&apos;m
              <span className='text-4xl text-primary'> Deni Sugiarto.</span>
              <br />
              I&apos;m a front-end web developer
            </h1>
            <button
              className='px-8 py-3 border border-transparent font-bold text-base rounded-xl text-white bg-primary hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 mt-5
            transform motion-safe:hover:scale-110'>
              Hire me
            </button>
          </div>
          <div className='img-wrapper mx-auto sm:mx-0'>
            <div className='w-72 h-72 rounded-full border-8 overflow-hidden border-gray-300'>
              <Image
                src='/profile.webp'
                width={400}
                height={400}
                alt='profile-picture'
                priority='true'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
