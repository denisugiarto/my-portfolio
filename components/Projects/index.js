import Image from "next/image";
import projects1 from "../../assets/img/projects1.webp";
import projects2 from "../../assets/img/projects2.webp";
import projects3 from "../../assets/img/projects3.webp";

export default function Projects() {
  return (
    <section id='projects' className='bg-blue-100'>
      <div className='container'>
        <h3 className='title-section font-serif'>projects</h3>
        <div className='flex flex-wrap justify-between'>
          <div className='flex-0 md:w-1/2 lg:w-1/3 mb-4 md:mb-0'>
            <div className='card md:mr-4'>
              <Image
                src={projects1}
                alt='Music Instruments webstore'
                priority
                layout='responsive'
                objectFit='cover'
              />
              <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>Top Music Shop</div>
                <p className='text-gray-700 text-base'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className='px-6 pt-4 pb-2'>
                <span className='tag'>#reactjs</span>
                <span className='tag'>#firebase</span>
                <span className='tag'>#e-commerce</span>
              </div>
            </div>
          </div>
          <div className='flex-0 md:w-1/2 lg:w-1/3 mb-4 md:mb-0 '>
            <div className='card md:mr-4'>
              <Image
                src={projects2}
                alt='Music Instruments webstore'
                priority
                layout='responsive'
                objectFit='cover'
              />
              <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>Smart POS</div>
                <p className='text-gray-700 text-base'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className='px-6 pt-4 pb-2'>
                <span className='tag'>#reactjs</span>
                <span className='tag'>#firebase</span>
                <span className='tag'>#e-commerce</span>
              </div>
            </div>
          </div>
          <div className='flex-0 md:mt-4 lg:mt-0 md:w-1/2 lg:w-1/3'>
            <div className='card md:mr-4 lg:mr-0'>
              <Image
                src={projects3}
                alt='Music Instruments webstore'
                priority
                layout='responsive'
                objectFit='cover'
              />
              <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>
                  Restaurant Menu Order
                </div>
                <p className='text-gray-700 text-base'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className='px-6 pt-4 pb-2'>
                <span className='tag'>#reactjs</span>
                <span className='tag'>#firebase</span>
                <span className='tag'>#e-commerce</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
