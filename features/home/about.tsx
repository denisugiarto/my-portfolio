import data from "@/constant/data.json";

export default function About() {
  return (
    <section id="aboutMe" className="container">
      <div className="desc">
        <h2 className="title-section">About Me</h2>
        <p className="leading-loose">{data.aboutMe}</p>
        <a
          href={
            data.contact.find((contact) => contact.type === "whatsapp")?.link
          }
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
