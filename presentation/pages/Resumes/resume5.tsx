import Image from "next/image"
import Link from "next/link"
import { Phone, MapPin, Mail, Globe } from "lucide-react"

export default function MargotResume() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-5xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        <div className="flex flex-col items-center">
                            <Image
                                src="/images/margot-profile.png"
                                alt="Profile silhouette"
                                width={200}
                                height={200}
                                className="object-contain mb-4"
                            />
                            <h3 className="text-xl font-bold text-indigo-900 text-center">Software Expert</h3>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-indigo-900 mb-4">CONTACT INFO</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center">
                                        <Phone className="text-white" size={20} />
                                    </div>
                                    <span>123-456-7890</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center">
                                        <MapPin className="text-white" size={20} />
                                    </div>
                                    <span>123 Anywhere Street, Any City, State, Country</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center">
                                        <Mail className="text-white" size={20} />
                                    </div>
                                    <span>hello@reallygreatsite.com</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center">
                                        <Globe className="text-white" size={20} />
                                    </div>
                                    <span>www.reallygreatsite.com</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-indigo-900 mb-4">SKILLS</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Creative</li>
                                <li>Time Management</li>
                                <li>Punctual</li>
                                <li>Flexible</li>
                                <li>Communication</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-5xl font-bold text-indigo-900 mb-2">MARGOT ELSHER</h1>
                            <p className="mb-6">
                                I'm a software engineer with over five years of experience working in the tech industry, providing
                                valuable expertise to start-up businesses.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-indigo-900 mb-4">AREAS OF EXPERTISE</h2>
                            <p className="mb-6">
                                I've worked with various types of projects and have mastered multiple programming languages and coding
                                as well as software testing and debugging.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-indigo-900 mb-4">EDUCATION</h2>
                            <div className="mb-4">
                                <h3 className="text-lg font-bold">North City University</h3>
                                <p>MS Software Engineering, Class of 2030</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Graduated with honors</li>
                                    <li>Graduate TA for Advanced Programming</li>
                                    <li>Worked as Head Student Supervisor at North City University Tech Support Office</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-indigo-900 mb-4">WORK EXPERIENCE</h2>
                            <div className="mb-6">
                                <h3 className="text-lg font-bold">Senior Software Engineer</h3>
                                <p className="mb-2">The Systems Design Group | May 2033 - Present</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Manages a team of 20 engineers, ensuring the successful delivery of projects</li>
                                    <li>Oversees technical documentation and system scalability solutions</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Software Engineer</h3>
                                <p className="mb-2">The Systems Design Inc. | May 2030 - March 2033</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>
                                        Designed and implemented new features based on user feedback, increasing user engagement by 20%
                                    </li>
                                    <li>Implemented automated testing, reducing system downtime by 30%</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="container mx-auto px-4 py-4 text-center">
                <Link href="/" className="text-blue-600 hover:underline">
                    Back to Home
                </Link>
            </footer>
        </div>
    )
}
