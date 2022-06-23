import Image from "next/image";
export default function Footer() {
  return (
    <footer className='bg-blue-100'>
      <div className='container'>
        <div className='text-base text-center text-gray-400'>
          <a
            href='https://github.com/denzord'
            target='_blank'
            rel='noopener noreferrer'>
            Powered by Deni Sugiarto
          </a>
        </div>
      </div>
    </footer>
  );
}
