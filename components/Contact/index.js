import { PhoneIcon, AtSymbolIcon } from "@heroicons/react/outline";

export default function Contact() {
  return (
    <section id='contactme'>
      <div className=''>
        <h3 className='title-section'>Contact Me</h3>
        <div className='content'>
          <div className='flex mb-4'>
            <div className='w-8 flex justify-center'>
              <AtSymbolIcon className='h-5 w-5 text-primary' />
            </div>
            <p className='text-xl ml-4'>sugiarto.deni@gmail.com</p>
          </div>
          <div className='flex items-center mb-4'>
            <div className='w-8 flex justify-center'>
              <PhoneIcon className='h-5 w-5 text-primary' />
            </div>
            <p className='text-xl ml-4'>081217986332</p>
          </div>
          <div className='flex items-center mb-4'>
            <div className='w-8 flex justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                width='32'
                height='32'
                viewBox='0 0 48 48'
                style={{ fill: "#000000" }}>
                <path
                  fill='#0288D1'
                  d='M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z'></path>
                <path
                  fill='#FFF'
                  d='M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z'></path>
              </svg>
            </div>
            <p className='text-xl ml-4'>linkedin.com/in/sugiarto-deni</p>
          </div>
          <div className='flex items-center'>
            <div className='w-8 flex justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                style={{ fill: "#000000" }}>
                {" "}
                <path d='M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.6,5,2.5,9.3,6.9,10.7v-2.3c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9 c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1c0.4,0,0.7-0.1,0.9-0.2 c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6c0,0,1.4,0,2.8,1.3 C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3 c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v3.3c4.1-1.3,7-5.1,7-9.5C22,6.1,16.9,1.4,10.9,2.1z'></path>
              </svg>
            </div>
            <a
              href='https://github.com/denzord'
              target='_blank'
              rel='noreferrer'>
              <p className='text-xl ml-4'>github.com/denzord</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
