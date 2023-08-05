import Image from "next/image";
export default function Footer() {
  return (
    <footer className='bg-primary py-8'>
      <div className='container pt-0'>
        <div className='text-base text-center text-white'>
          <a href='https://github.com/denzord' target='_blank' rel='noopener noreferrer'>
            Powered by Deni Sugiarto &copy;{new Date().getFullYear()}
          </a>
        </div>
      </div>
    </footer>
  );
}
