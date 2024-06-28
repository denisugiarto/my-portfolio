import data from "../../constant/data.json";
export default function Footer() {
  const contactGithub = data.contact.find(
    (contact) => contact.type === "github",
  );
  return (
    <footer className="bg-primary py-4">
      <div className="container pt-0">
        <div className="text-center text-base text-white">
          <a
            href={contactGithub.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Copyright &copy; {new Date().getFullYear()} Made by Deni Sugiarto
          </a>
        </div>
      </div>
    </footer>
  );
}
