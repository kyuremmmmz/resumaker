import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"

export default function JulianaResume() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 p-6 md:p-10">
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg">
                {/* Header */}
                <header className="relative mb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="relative">
                            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white relative z-10">
                                <Image
                                    src="/images/juliana-profile.png"
                                    alt="Profile silhouette"
                                    width={160}
                                    height={160}
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 w-40 h-40 rounded-full border-2 border-pink-300 animate-[spin_20s_linear_infinite]"></div>
                        </div>

                        <div className="text-center md:text-left md:ml-4">
                            <div className="inline-block bg-white rounded-full px-4 py-2 mb-2">
                                <p className="font-medium">Hello! My name</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-4xl md:text-5xl font-bold">Juliana Silva</h1>
                                <Heart className="text-pink-500" />
                            </div>
                            <h2 className="text-xl text-gray-700 mb-4">Fashion Designer</h2>

                            <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
                                <div className="bg-black text-white rounded-full px-4 py-1 flex items-center justify-center">
                                    <span>+123-456-7890</span>
                                </div>
                                <div className="bg-pink-200 text-gray-800 rounded-full px-4 py-1 flex items-center justify-center">
                                    <span>hello@reallygreatsite.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* About Me */}
                <section className="mb-8">
                    <div className="bg-white rounded-full px-6 py-3 inline-block mb-4">
                        <h3 className="text-xl font-bold">About Me</h3>
                    </div>
                    <p className="text-gray-700">
                        An innovative fashion designer who has more than nine years of experience in the industry. Proficient in
                        various design software and use them on various fashion projects. Has been involved in various projects and
                        collaboration with many clients and big companies to deliver seasonal products and projects. Excellent in
                        problem identification and creation of the most effective solution. Following and knowledgeable about the
                        latest fashion trend and development.
                    </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Experience */}
                    <section>
                        <div className="bg-white rounded-full px-6 py-3 inline-block mb-4">
                            <h3 className="text-xl font-bold">Experience</h3>
                        </div>

                        <div className="space-y-8">
                            <div className="relative">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-lg font-bold uppercase">Fashion Designer Intern</h4>
                                    <Heart className="text-pink-500" />
                                </div>
                                <div className="flex justify-between mb-2">
                                    <p>Borcelle</p>
                                    <p>2011 – 2012</p>
                                </div>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>
                                        Assist in the various merchandise and assortment development for the Summer Fashion. The new
                                        addition improves the fashion category and depth.
                                    </li>
                                    <li>
                                        Created more than ten fresh designs for the content of the Borcelle fashion sketchbook released in
                                        fall 2012.
                                    </li>
                                    <li>
                                        Collaborated with the specialist team to purchase various materials that meet the production
                                        standard and requirements for the Winter Fashion event fashion by Juliana Silva.
                                    </li>
                                </ul>
                            </div>

                            <div className="relative">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-lg font-bold uppercase">Fashion Designer</h4>
                                    <Heart className="text-pink-500" />
                                </div>
                                <div className="flex justify-between mb-2">
                                    <p>Borcelle</p>
                                    <p>2012 – 2024</p>
                                </div>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>
                                        Developed more than 350 seasonal fashion style guides to promote Fauget's new collection of women's
                                        swimsuits.
                                    </li>
                                    <li>
                                        Led the negotiation with the new vendors for the new material used in the 2013 Autumn Fashion
                                        festival, which saved more than 20% of the annual expense covering the material distribution, price,
                                        specification, and delivery deadlines.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Education and Skills */}
                    <div className="space-y-8">
                        <section>
                            <div className="bg-white rounded-full px-6 py-3 inline-block mb-4">
                                <h3 className="text-xl font-bold">Education</h3>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-lg font-bold uppercase">Bachelor of Arts in Fashion Design</h4>
                                <p>Chidi Eze Fashion University</p>
                                <p>2005 – 2009</p>
                                <p>GPA: 3.90</p>
                            </div>
                        </section>

                        <section>
                            <div className="bg-white rounded-full px-6 py-3 inline-block mb-4">
                                <h3 className="text-xl font-bold">Personal Skill</h3>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span>APPAREL DESIGN</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span>SKETCHING</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span>HAND DRAWING</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: "80%" }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span>DIGITAL DRAWING</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span>ILLUSTRATION</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span>PATTERN MAKING</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: "95%" }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span>SEWING</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span>LEADERSHIP</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <footer className="max-w-4xl mx-auto mt-8 text-center">
                <Link href="/" className="text-pink-600 hover:underline">
                    Back to Home
                </Link>
            </footer>
        </div>
    )
}
