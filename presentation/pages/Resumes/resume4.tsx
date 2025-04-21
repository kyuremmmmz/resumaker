import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin, User, Briefcase, GraduationCap, Book } from "lucide-react"

export default function LornaResume() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="relative">
                    <div className="h-64 bg-blue-500 clip-diagonal"></div>
                    <div className="container mx-auto px-6 relative -mt-32">
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
                            <div className="flex flex-col items-center">
                                <div className="w-48 h-48 rounded-full bg-white p-2 mb-4">
                                    <div className="w-full h-full rounded-full overflow-hidden">
                                        <Image
                                            src="/images/lorna-profile.png"
                                            alt="Profile silhouette"
                                            width={200}
                                            height={200}
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <h1 className="text-4xl font-bold text-blue-500 text-center">Lorna Alvarado</h1>
                                <h2 className="text-xl text-gray-600 mb-8 text-center">Marketing Manager</h2>
                            </div>
                            <div className="pt-16"></div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
                        {/* Left Column */}
                        <div className="space-y-8">
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <Phone className="text-blue-500" />
                                    <h3 className="text-xl font-bold text-gray-700">Contact</h3>
                                </div>
                                <div className="space-y-3 pl-8">
                                    <div className="flex items-center gap-2">
                                        <Phone size={16} className="text-blue-500" />
                                        <span>+123-456-7890</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail size={16} className="text-blue-500" />
                                        <span>hello@reallygreatsite.com</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-blue-500" />
                                        <span>123 Anywhere St., Any City, ST 12345</span>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <User className="text-blue-500" />
                                    <h3 className="text-xl font-bold text-gray-700">Introduction</h3>
                                </div>
                                <p className="text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-blue-500"
                                    >
                                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-700">Skills</h3>
                                </div>
                                <ul className="list-disc pl-10 space-y-2">
                                    <li>Management Skills</li>
                                    <li>Creativity</li>
                                    <li>Digital Marketing</li>
                                    <li>Negotiation</li>
                                    <li>Critical Thinking</li>
                                    <li>Leadership</li>
                                </ul>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            <section>
                                <div className="flex items-center gap-2 mb-6 border-b pb-2">
                                    <GraduationCap className="text-blue-500" />
                                    <h3 className="text-xl font-bold text-gray-700">Education</h3>
                                </div>

                                <div className="space-y-8">
                                    <div className="relative border-l-2 border-blue-200 pl-6">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500"></div>
                                        <h4 className="text-lg font-bold">Bachelor of Business Management</h4>
                                        <p className="text-gray-600 italic">Borcelle University</p>
                                        <div className="flex justify-between">
                                            <p className="text-gray-500">2016 - 2020</p>
                                        </div>
                                        <p className="mt-2 text-gray-600">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec risus egestas
                                            accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque. Sed leo nisl, semper ac
                                            hendrerit a, sollicitudin in arcu.
                                        </p>
                                    </div>

                                    <div className="relative border-l-2 border-blue-200 pl-6">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500"></div>
                                        <h4 className="text-lg font-bold">Bachelor of Business Management</h4>
                                        <p className="text-gray-600 italic">Borcelle University</p>
                                        <div className="flex justify-between">
                                            <p className="text-gray-500">2020 - 2023</p>
                                        </div>
                                        <p className="mt-2 text-gray-600">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec risus egestas
                                            accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque. Sed leo nisl, semper ac
                                            hendrerit a, sollicitudin in arcu.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center gap-2 mb-6 border-b pb-2">
                                    <Briefcase className="text-blue-500" />
                                    <h3 className="text-xl font-bold text-gray-700">Work Experience</h3>
                                </div>

                                <div className="space-y-8">
                                    <div className="relative border-l-2 border-blue-200 pl-6">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500"></div>
                                        <h4 className="text-lg font-bold">Product Design Manager</h4>
                                        <p className="text-gray-600 italic">Arowwai Industries</p>
                                        <div className="flex justify-between">
                                            <p className="text-gray-500">2016 - 2020</p>
                                        </div>
                                        <p className="mt-2 text-gray-600">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec risus egestas
                                            accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque.
                                        </p>
                                    </div>

                                    <div className="relative border-l-2 border-blue-200 pl-6">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500"></div>
                                        <h4 className="text-lg font-bold">Marketing Manager</h4>
                                        <p className="text-gray-600 italic">Arowwai Industries</p>
                                        <div className="flex justify-between">
                                            <p className="text-gray-500">2019 - 2020</p>
                                        </div>
                                        <p className="mt-2 text-gray-600">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec risus egestas
                                            accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque.
                                        </p>
                                    </div>

                                    <div className="relative border-l-2 border-blue-200 pl-6">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500"></div>
                                        <h4 className="text-lg font-bold">Marketing Manager</h4>
                                        <p className="text-gray-600 italic">Arowwai Industries</p>
                                        <div className="flex justify-between">
                                            <p className="text-gray-500">2017 - 2019</p>
                                        </div>
                                        <p className="mt-2 text-gray-600">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec risus egestas
                                            accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque.
                                        </p>
                                    </div>

                                    <div className="relative border-l-2 border-blue-200 pl-6">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500"></div>
                                        <h4 className="text-lg font-bold">Marketing Manager</h4>
                                        <p className="text-gray-600 italic">Arowwai Industries</p>
                                        <div className="flex justify-between">
                                            <p className="text-gray-500">2016 - 2017</p>
                                        </div>
                                        <p className="mt-2 text-gray-600">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec risus egestas
                                            accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center gap-2 mb-6 border-b pb-2">
                                    <Book className="text-blue-500" />
                                    <h3 className="text-xl font-bold text-gray-700">Additional Information</h3>
                                </div>
                                <p className="text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat.
                                </p>
                            </section>
                        </div>
                    </div>
                </main>
            </div>

            <footer className="container mx-auto px-4 py-4 text-center">
                <Link href="/" className="text-blue-600 hover:underline">
                    Back to Home
                </Link>
            </footer>
        </div>
    )
}
