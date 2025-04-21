import Image from "next/image"
import Link from "next/link"

export default function KathrynResume() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="mb-8">
                <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center">
                    <div className="w-32 h-32 md:w-48 md:h-48 relative mb-4 md:mb-0 md:mr-8">
                        <Image
                            src="/images/kathryn-profile.png"
                            alt="Profile silhouette"
                            width={200}
                            height={200}
                            className="object-contain"
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-2">KATHRYN SORIANO, RN</h1>
                        <ul className="list-disc md:list-none pl-6 md:pl-0 space-y-1">
                            <li>0123 456 7890</li>
                            <li>hello@reallygreatsite.com</li>
                            <li>123 Malasakit St., Kababayan City 1234</li>
                        </ul>
                    </div>
                </div>
            </header>

            <div className="border-t border-blue-700"></div>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <section>
                        <h3 className="text-2xl font-bold text-blue-700 mb-4">INTRODUCTION</h3>
                        <p className="mb-8">
                            A nurse with 5+ years of experience in various healthcare settings, including hospitals and clinics.
                            Proficient in patient assessment, medication administration, and care plan implementation. Skilled in
                            communication and teamwork, dedicated to providing compassionate care to patients.
                        </p>

                        <h3 className="text-2xl font-bold text-blue-700 mb-4">EDUCATION</h3>
                        <div className="mb-4">
                            <h4 className="font-bold">Master of Science in Nursing</h4>
                            <p>Narra National University - College of Nursing, 2017</p>
                        </div>
                        <div className="mb-4">
                            <h4 className="font-bold">Bachelor of Science in Nursing</h4>
                            <p>Narra National University - College of Nursing, 2015</p>
                        </div>
                        <div className="mb-4">
                            <h4 className="font-bold">Secondary Education</h4>
                            <p>Narra National Highschool, 2011</p>
                        </div>
                        <div className="mb-8">
                            <h4 className="font-bold">Primary Education</h4>
                            <p>Narra National Elementary School, 2007</p>
                        </div>

                        <h3 className="text-2xl font-bold text-blue-700 mb-4">CERTIFICATIONS</h3>
                        <div className="mb-8">
                            <h4 className="font-bold">Nurse Licensure Exam (NLE)</h4>
                            <p>Passed 2015</p>
                            <p>Professional Regulations Commission</p>
                        </div>

                        <h3 className="text-2xl font-bold text-blue-700 mb-4">SKILLS</h3>
                        <ul className="list-disc pl-5 space-y-1 mb-8">
                            <li>Leadership</li>
                            <li>Time Management</li>
                            <li>Punctual</li>
                        </ul>
                    </section>

                    {/* Right Column */}
                    <section>
                        <h3 className="text-2xl font-bold text-blue-700 mb-4">WORK EXPERIENCE</h3>
                        <div className="mb-6">
                            <h4 className="font-bold">Clinical Nurse Educator</h4>
                            <p>Narra National University - College of Nursing</p>
                            <p className="mb-2">January 2023 - Present</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Taught and mentored nursing students</li>
                                <li>Developed and implemented the program's nursing curriculum</li>
                                <li>Continuously stayed up-to-date with the latest healthcare practices and technologies.</li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-bold">Charge Nurse</h4>
                            <p>Las Felipinas General Hospital</p>
                            <p className="mb-2">January 2021 - Present</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Supervised a team of nurses and certified nursing assistants</li>
                                <li>Ensured high-quality patient care</li>
                                <li>Maintained accurate patient records.</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h4 className="font-bold">Staff Nurse</h4>
                            <p>Las Felipinas General Hospital</p>
                            <p className="mb-2">January 2018 - December 2020</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    Responsible for providing direct patient care, administering medications, and coordinating with other
                                    healthcare professionals
                                </li>
                            </ul>
                        </div>

                        <h3 className="text-2xl font-bold text-blue-700 mb-4">ADDITIONAL INFORMATION</h3>
                        <div className="mb-8">
                            <h4 className="font-bold">Volunteer Nurse</h4>
                            <p>Sagip Dalisay Foundation</p>
                            <p className="mb-2">2015-Present</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Participated in disaster relief efforts</li>
                                <li>Provided healthcare and first-aid services at community events</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="container mx-auto px-4 py-4 text-center">
                <Link href="/" className="text-blue-600 hover:underline">
                    Back to Home
                </Link>
            </footer>
        </div>
    )
}
