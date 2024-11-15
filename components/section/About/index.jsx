import data from "../../../constant/data.json";

export default function About() {
  return (
    <section id="aboutMe" className="container">
      <div className="desc">
        <h2 className="title-section">About Me</h2>
        {data.aboutMe.map((item, index) => (
          <p key={index} className="leading-loose">
            {item}
          </p>
        ))}
        <a
          href="https://api.whatsapp.com/send/?phone=6281217986332&text&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 block text-lg font-bold text-blue-400"
        >
          Let&apos;s make something special.
        </a>
      </div>
    </section>
  );
}
