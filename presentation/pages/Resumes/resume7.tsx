import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, Globe, MapPin } from "lucide-react"

export default function OliviaResume() {
    return (
        <div className="min-h-screen bg-[#f0e9e5]">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-[350px_1fr]">
                    {/* Left Column */}
                    <div className="border border-gray-300 p-6 bg-white">
                        <div className="flex justify-center mb-8">
                            <Image
                                src="/images/olivia-profile.png"
                                alt="Profile silhouette"
                                width={200}
                                height={200}
                                className="object-contain"
                            />
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-200 p-1 rounded">
                                    <Phone size={16} className="text-gray-700" />
                                </div>
                                <span>+123-456-7890</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-200 p-1 rounded">
                                    <Mail size={16} className="text-gray-700" />
                                </div>
                                <span>hello@reallygreatsite.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-200 p-1 rounded">
                                    <Globe size={16} className="text-gray-700" />
                                </div>
                                <span>www.reallygreatsite.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-200 p-1 rounded">
                                    <MapPin size={16} className="text-gray-700" />
                                </div>
                                <span>123 Anywhere St., Any City, ST 12345</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 bg-[#f0e9e5] p-2">Education</h2>
                            <div className="mb-4">
                                <h3 className="text-lg font-bold">Bachelor of Design</h3>
                                <p>Wardiere University</p>
                                <p>2006 - 2008</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-bold">Bachelor of Design</h3>
                                <p>Wardiere University</p>
                                <p>2006 - 2008</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4 bg-[#f0e9e5] p-2">Skills</h2>
                            <ul className="space-y-3">
                                <li>Digital Marketing</li>
                                <li>Branding</li>
                                <li>Copywriting</li>
                                <li>SEO</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="p-6">
                        <div className="mb-8">
                            <h1 className="text-5xl font-bold text-gray-800 mb-1">OLIVIA WILSON</h1>
                            <h2 className="text-2xl text-gray-600 mb-8">Graphics Designer</h2>

                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-gray-700">
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
                                        >
                                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    </span>
                                    <h3 className="text-xl font-bold">Profile</h3>
                                </div>
                                <p className="text-gray-700">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat.
                                </p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-gray-700">
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
                                        >
                                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                        </svg>
                                    </span>
                                    <h3 className="text-xl font-bold">Work Experience</h3>
                                </div>

                                <div className="border-l-2 border-gray-300 pl-6 ml-3 space-y-8">
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1 w-5 h-5 rounded-full bg-gray-300"></div>
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-bold">Ginyard International Co.</h4>
                                            <span className="text-gray-600">2020 - 2023</span>
                                        </div>
                                        <p className="font-medium mb-2">Product Design Manager</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Working with the wider development team.</li>
                                            <li>Manage website design, content, and SEO Marketing, Branding and Logo Design</li>
                                        </ul>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1 w-5 h-5 rounded-full bg-gray-300"></div>
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-bold">Arowwai Industries</h4>
                                            <span className="text-gray-600">2019 - 2020</span>
                                        </div>
                                        <p className="font-medium mb-2">Product Design Manager</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Working with the wider development team.</li>
                                            <li>Manage website design, content, and SEO Marketing, Branding and Logo Design</li>
                                        </ul>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1 w-5 h-5 rounded-full bg-gray-300"></div>
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-bold">Ginyard International Co.</h4>
                                            <span className="text-gray-600">2017 - 2019</span>
                                        </div>
                                        <p className="font-medium mb-2">Product Design Manager</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Working with the wider development team.</li>
                                            <li>Manage website design, content, and SEO Marketing, Branding and Logo Design</li>
                                        </ul>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1 w-5 h-5 rounded-full bg-gray-300"></div>
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-bold">Arowwai Industries</h4>
                                            <span className="text-gray-600">2017 - 2019</span>
                                        </div>
                                        <p className="font-medium mb-2">Product Design Manager</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Working with the wider development team.</li>
                                            <li>Manage website design, content, and SEO Marketing, Branding and Logo Design</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-gray-700">
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
                                        >
                                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                        </svg>
                                    </span>
                                    <h3 className="text-xl font-bold">Additional Information</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-bold">Bailey Dupont</h4>
                                        <p>Wardiere Inc. / CEO</p>
                                        <p>
                                            <span className="font-medium">Phone:</span> 123-456-7890
                                        </p>
                                        <p>
                                            <span className="font-medium">Email:</span> hello@reallygreatsite.com
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Harumi Kobayashi</h4>
                                        <p>Wardiere Inc. / CEO</p>
                                        <p>
                                            <span className="font-medium">Phone:</span> 123-456-7890
                                        </p>
                                        <p>
                                            <span className="font-medium">Email:</span> hello@reallygreatsite.com
                                        </p>
                                    </div>
                                </div>
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
