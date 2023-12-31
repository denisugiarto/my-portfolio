import data from '../../constant/data.json';
export default function Skills() {
	return (
		<section id="skills">
			<div className="container">
				<h2 className="title-section text-center">Skills</h2>
				<div className="flex flex-wrap gap-3 max-w-lg mx-auto">
					{data.skills.map((item, index) => (
						<div key={`${index}`} className="px-3 py-2 rounded-lg shadow-md bg-primary text-white font-semibold ">
							{item}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
