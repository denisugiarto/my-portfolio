import Image from "next/image";
export default function Footer() {
  return (
    <footer className='bg-secondary py-8'>
      <div className='container pt-0'>
        <div className='text-base text-center text-gray-400'>
          <a href='https://github.com/denzord' target='_blank' rel='noopener noreferrer'>
            Powered by Deni Sugiarto
          </a>
        </div>
      </div>
    </footer>
  );
}
