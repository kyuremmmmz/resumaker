import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, Globe, MapPin } from "lucide-react"

export default function RachelleResume() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
            <div className="max-w-5xl mx-auto p-6">
                <div className="relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="#D53F8C" fillOpacity="0.2" />
                        </svg>
                    </div>
                    <div className="absolute bottom-0 left-0">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="#D53F8C" fillOpacity="0.2" />
                        </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div>
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative mb-4">
                                    <div className="absolute inset-0 border-2 border-pink-400 rounded-full transform rotate-45"></div>
                                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white">
                                        <Image
                                            src="/images/rachelle-profile.png"
                                            alt="Profile silhouette"
                                            width={200}
                                            height={200}
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-indigo-900 text-center">Software Expert</h3>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-2xl font-serif font-bold border-b border-gray-300 pb-2 mb-4">EDUCATION</h3>
                                <div className="mb-6">
                                    <p className="text-gray-700">2012 - 2015</p>
                                    <p className="font-bold">Shodwe University</p>
                                    <ul className="list-disc pl-5 mt-2">
                                        <li>Bachelor Degree of Marketing and Business</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-gray-700">2015 - 2018</p>
                                    <p className="font-bold">Reallygreatsite University</p>
                                    <ul className="list-disc pl-5 mt-2">
                                        <li>Master Degree of Marketing and Business</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-serif font-bold border-b border-gray-300 pb-2 mb-4">SKILL</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span>Digital Marketing Tool</span>
                                            <span>90%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span>Copywriting & Storywriting</span>
                                            <span>80%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: "80%" }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span>Digital Marketing Tool</span>
                                            <span>77%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: "77%" }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span>Search Engine Optimization</span>
                                            <span>80%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: "80%" }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span>Meta Tag Optimization</span>
                                            <span>88%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: "88%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div>
                            <div className="mb-8">
                                <h1 className="text-5xl font-serif font-bold text-indigo-900 mb-2">RACHELLE BEAUDRY</h1>
                                <h2 className="text-2xl text-gray-700 mb-6 border-b border-gray-300 pb-2">
                                    Digital Marketing Specialist
                                </h2>
                                <p className="mb-6">
                                    I'm Rachelle Beaudry, a Digital Marketing Specialist with 4 years of experience. I'm a specialist in
                                    handling and managing day to day team operations with considerable experience to read trends
                                </p>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-2xl font-serif font-bold border-b border-gray-300 pb-2 mb-4">WORK EXPERIENCE</h3>
                                <div className="mb-6">
                                    <p className="text-gray-700">2018 - 2019</p>
                                    <p className="font-bold">Larana Inc, Branding</p>
                                    <p className="font-medium">Social Media Manager</p>
                                    <ul className="list-disc pl-5 mt-2">
                                        <li>Handling social media campaigns and Managing team to handling social media timeline upload</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-gray-700">2019 - present</p>
                                    <p className="font-bold">Shodwe Cosmetics</p>
                                    <p className="font-medium">Digital Marketing Manager</p>
                                    <ul className="list-disc pl-5 mt-2">
                                        <li>
                                            Managing oversees Company's digital marketing strategies to reach more clients on the website and
                                            social media.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-serif font-bold border-b border-gray-300 pb-2 mb-4">CONTACT</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Phone className="text-pink-500" />
                                        <span>+123-456-7890</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="text-pink-500" />
                                        <span>hello@reallygreatsite.com</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Globe className="text-pink-500" />
                                        <span>www.reallygreatsite.com</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="text-pink-500" />
                                        <span>123 Anywhere St., Any City</span>
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
