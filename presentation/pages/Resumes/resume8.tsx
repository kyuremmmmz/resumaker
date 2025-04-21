import Link from "next/link"

export default function DanielResume() {
    return (
        <div className="min-h-screen bg-white p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">DANIEL GALLEGO</h1>
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">UX DESIGNER</h2>
                    <p className="text-gray-600">
                        123 Anywhere St., Any City | hello@reallygreatsite.com | www.reallygreatsite.com
                    </p>
                </header>

                {/* Introduction */}
                <section className="mb-8">
                    <div className="bg-gray-200 rounded-lg p-4">
                        <h3 className="text-xl font-bold text-gray-700 mb-2">INTRODUCTION</h3>
                    </div>
                    <p className="mt-4 text-gray-700">
                        UX Designer with a focus on delivering impactful results, eager to tackle dynamic challenges and apply
                        creativity to craft intuitive user experiences. Demonstrated proficiency in project management, user-centric
                        problem-solving, and seamless collaboration across teams. Skilled in leveraging state-of-the-art tools and
                        methodologies to streamline processes and elevate user satisfaction
                    </p>
                </section>

                {/* Technical Skills */}
                <section className="mb-8">
                    <div className="bg-gray-200 rounded-lg p-4">
                        <h3 className="text-xl font-bold text-gray-700 mb-2">TECHNICAL SKILLS</h3>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <ul className="space-y-2">
                                <li>Prototyping Tools</li>
                                <li>User Research</li>
                                <li>Information Architecture</li>
                            </ul>
                        </div>
                        <div>
                            <ul className="space-y-2">
                                <li>Interaction Design</li>
                                <li>Visual Design</li>
                                <li>Usability Heuristics</li>
                            </ul>
                        </div>
                        <div>
                            <ul className="space-y-2">
                                <li>Accessibility</li>
                                <li>Responsive Design</li>
                                <li>User Testing Tools</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Work Experience */}
                <section className="mb-8">
                    <div className="bg-gray-200 rounded-lg p-4">
                        <h3 className="text-xl font-bold text-gray-700 mb-2">WORK EXPERIENCE</h3>
                    </div>
                    <div className="mt-4 space-y-6">
                        <div>
                            <div className="flex flex-col md:flex-row md:justify-between mb-2">
                                <h4 className="text-lg font-bold">Instant Chartz App, Morcelle Program</h4>
                                <p className="font-medium">Jan 2023 - Present</p>
                            </div>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    Led development of an advanced automation system, achieving a 15% increase in operational efficiency.
                                </li>
                                <li>Streamlined manufacturing processes, reducing production costs by 10%.</li>
                                <li>
                                    Implemented preventive maintenance strategies, resulting in a 20% decrease in equipment downtime.
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div className="flex flex-col md:flex-row md:justify-between mb-2">
                                <h4 className="text-lg font-bold">System UX Engineer, XarrowAI Industries</h4>
                                <p className="font-medium">Feb 2021 - Dec 2022</p>
                            </div>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Designed and optimised a robotic control system, realizing a 12% performance improvement.</li>
                                <li>Coordinated testing and validation, ensuring compliance with industry standards.</li>
                                <li>Provided technical expertise, contributing to a 15% reduction in system failures.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Education */}
                <section className="mb-8">
                    <div className="bg-gray-200 rounded-lg p-4">
                        <h3 className="text-xl font-bold text-gray-700 mb-2">EDUCATION</h3>
                    </div>
                    <div className="mt-4 space-y-6">
                        <div>
                            <div className="flex flex-col md:flex-row md:justify-between mb-2">
                                <h4 className="text-lg font-bold">UX Industrial Basics and General Application</h4>
                                <p className="font-medium">Aug 2016 - Oct 2019</p>
                            </div>
                            <p>University of Engineering UX Cohort</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Major in Automotive Technology.</li>
                                <li>Thesis on "Technological Advancements within the current Mechatronics Industry".</li>
                            </ul>
                        </div>
                        <div>
                            <div className="flex flex-col md:flex-row md:justify-between mb-2">
                                <h4 className="text-lg font-bold">Bachelor of Design in Process Engineering</h4>
                                <p className="font-medium">May 2014 - May 2016</p>
                            </div>
                            <p>Engineering University</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>Relevant coursework in Structural Design and Project Management.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Additional Information */}
                <section>
                    <div className="bg-gray-200 rounded-lg p-4">
                        <h3 className="text-xl font-bold text-gray-700 mb-2">ADDITIONAL INFORMATION</h3>
                    </div>
                    <ul className="list-disc pl-5 mt-4 space-y-2">
                        <li>
                            <span className="font-bold">Languages:</span> English, French, Mandarin.
                        </li>
                        <li>
                            <span className="font-bold">Certifications:</span> Professional Design Engineer (PDE) License, Project
                            Management Tech (PMT).
                        </li>
                        <li>
                            <span className="font-bold">Awards/Activities:</span> Most Innovative Employer of the Year (2021), Overall
                            Best Employee Division Two (2024), Onboarding Project Lead (2023)
                        </li>
                    </ul>
                </section>
            </div>

            <footer className="max-w-4xl mx-auto mt-8 text-center">
                <Link href="/" className="text-blue-600 hover:underline">
                    Back to Home
                </Link>
            </footer>
        </div>
    )
}
