import data from "@/constant/data.json";
export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <h2 className="title-section text-center">Skills</h2>
        <div className="mx-auto flex max-w-lg flex-wrap gap-3">
          {data.skills.map((item, index) => (
            <div
              key={`${index}`}
              className="rounded-lg bg-primary px-3 py-2 font-semibold text-white shadow-md "
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
