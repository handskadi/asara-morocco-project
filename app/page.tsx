'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
    const [selectedTourName, setSelectedTourName] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const payload = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            startDate: formData.get('startDate'),
            travelers: formData.get('travelers'),
            tour: formData.get('tour'),
            message: formData.get('message'),
        };

        setStatus('loading');
        try {
            const res = await fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setStatus('success');
                form.reset();
                setSelectedTourName('');
                router.push('/thank-you');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const handleViewMore = (id: string) => {
        setSelectedTourId(prev => (prev === id ? null : id));
        setTimeout(() => {
            document.getElementById(`tour-details-${id}`)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
    };

    const tours = [
        {
            id: "3a",
            name: "3-Day Tour: Marrakech to Fes",
            duration: "3 Days",
            desc: "Marrakech • Tizi N'Tichka • Ouarzazate • Todgha Gorges • Merzouga • Fes",
            image: "/fes-medina.webp",
            itinerary: [
                { day: "Day 1", title: "Marrakech to Ouarzazate", highlights: "Tizi n'Tichka Pass, Ait Benhaddou" },
                { day: "Day 2", title: "Ouarzazate to Merzouga", highlights: "Dades Valley, Camel Ride, Sahara Sunset" },
                { day: "Day 3", title: "Merzouga to Fes", highlights: "Sunrise in the Sahara, Ziz Valley" }
            ]
        },
        {
            id: "3b",
            name: "3-Day Tour: Fes to Marrakech",
            duration: "3 Days",
            desc: "Fes • Merzouga • Todgha Gorges • Ait Benhaddou • Tizi N'Tichka • Marrakech",
            image: "/ait-ben-haddou-2.webp",
            itinerary: [
                { day: "Day 1", title: "Fes to Merzouga", highlights: "Middle Atlas Mountains, Cedar Forests, Desert Camp" },
                { day: "Day 2", title: "Merzouga to Dades", highlights: "Camel Ride, Todgha Gorge, Dades Valley" },
                { day: "Day 3", title: "Dades to Marrakech", highlights: "Ait Benhaddou, High Atlas Pass" }
            ]
        },
        {
            id: "4a",
            name: "4-Day Tour: Marrakech to Erg Chegaga",
            duration: "4 Days",
            desc: "Marrakech • High Atlas (Tichka) • Taznakht • Foum Zguid • Erg Chegaga Dunes",
            image: "/ergchegaga.webp",
            itinerary: [
                { day: "Day 1", title: "Marrakech to Agdz", highlights: "High Atlas Mountains, Draa Valley" },
                { day: "Day 2", title: "Agdz to Chegaga", highlights: "Foum Zguid, Sahara Adventure" },
                { day: "Day 3", title: "Erg Chegaga", highlights: "Camel Trek, Nomadic Life, Sandboarding" },
                { day: "Day 4", title: "Return to Marrakech", highlights: "Scenic Drives, Cultural Stops" }
            ]
        },
        {
            id: "6day",
            name: "6-Day Desert Discovery",
            duration: "6 Days",
            desc: "Marrakech • Ouarzazate • Erg Chebbi • Dades Valley • Camel Ride • Desert Camp",
            image: "/marrakechj.webp",
            itinerary: [
                { day: "Day 1", title: "Marrakech to Ouarzazate", highlights: "Tizi n'Tichka Pass, Ait Benhaddou" },
                { day: "Day 2", title: "Ouarzazate to Dades Gorge", highlights: "Skoura Palm Grove, Rose Valley, Dades Canyons" },
                { day: "Day 3", title: "Dades to Merzouga", highlights: "Todgha Gorge, Camel Ride, Desert Sunset" },
                { day: "Day 4", title: "Desert Exploration", highlights: "Berber Nomads, Gnawa Music" },
                { day: "Day 5", title: "Return to Dades", highlights: "Off-road Routes, Fossil Sites" },
                { day: "Day 6", title: "Back to Marrakech", highlights: "Scenic Route Return" }
            ]
        },
        {
            id: "7day",
            name: "7-Day Imperial Cities",
            duration: "7 Days",
            desc: "Casablanca • Rabat • Fes • Meknes • Chefchaouen • Guided Medina Walks",
            image: "/chefchouen.webp",
            itinerary: [
                { day: "Day 1", title: "Casablanca to Rabat", highlights: "Hassan II Mosque, Oudayas Kasbah" },
                { day: "Day 2", title: "Rabat to Meknes", highlights: "Royal Palace, Volubilis" },
                { day: "Day 3", title: "Meknes to Fes", highlights: "Medina Walk, Pottery Workshops" },
                { day: "Day 4", title: "Fes Exploration", highlights: "Tanneries, Madrasas" },
                { day: "Day 5", title: "Fes to Chefchaouen", highlights: "Rif Mountains Drive" },
                { day: "Day 6", title: "Chefchaouen", highlights: "Blue Medina, Spanish Mosque" },
                { day: "Day 7", title: "Back to Casablanca", highlights: "Free Time & Airport Transfer" }
            ]
        },
        {
            id: "8day",
            name: "8-Day Sahara Adventure",
            duration: "8 Days",
            desc: "Marrakech to Fes • Erg Chebbi Dunes • Todra Gorge • Cultural Experiences",
            image: "/ait-benhaddou.webp",
            itinerary: [
                { day: "Day 1", title: "Marrakech to Ait Benhaddou", highlights: "High Atlas, Kasbah Stop" },
                { day: "Day 2", title: "To Dades", highlights: "Rose Valley, Gorge Walk" },
                { day: "Day 3", title: "Dades to Merzouga", highlights: "Todra Gorge, Desert Camp" },
                { day: "Day 4", title: "Erg Chebbi", highlights: "Camel Ride, Desert Culture" },
                { day: "Day 5", title: "Merzouga to Midelt", highlights: "Ziz Valley, Berber Villages" },
                { day: "Day 6", title: "Midelt to Fes", highlights: "Cedar Forests, Mountain Views" },
                { day: "Day 7", title: "Fes Tour", highlights: "Medina, Royal Palace" },
                { day: "Day 8", title: "Fes Departure", highlights: "Souvenirs, Airport Drop" }
            ]
        },
        {
            id: "10day",
            name: "10-Day Grand Tour",
            duration: "10 Days",
            desc: "Marrakech • Atlas Mountains • Sahara Desert • Ait Benhaddou • Essaouira",
            image: "/essaouira.webp",
            itinerary: [
                { day: "Day 1", title: "Arrival in Marrakech", highlights: "Jemaa El Fnaa" },
                { day: "Day 2", title: "Atlas Mountains", highlights: "Imlil, Scenic Views" },
                { day: "Day 3", title: "To Ouarzazate", highlights: "Ait Benhaddou, Kasbahs" },
                { day: "Day 4", title: "Desert Bound", highlights: "Dades Valley, Todra Gorge" },
                { day: "Day 5", title: "Merzouga Camp", highlights: "Camel Ride, Stars" },
                { day: "Day 6", title: "Return via Draa", highlights: "Palms, Ksars" },
                { day: "Day 7", title: "Taroudant", highlights: "Markets, Walls" },
                { day: "Day 8", title: "Essaouira", highlights: "Seaside Medina" },
                { day: "Day 9", title: "Back to Marrakech", highlights: "Shopping & Relax" },
                { day: "Day 10", title: "Departure", highlights: "Farewell Transfer" }
            ]
        },
        {
            id: "12day",
            name: "12-Day Full Morocco",
            duration: "12 Days",
            desc: "All major cities + desert • Off-the-beaten path routes • Local culinary moments",
            image: "/sahara.webp",
            itinerary: [
                { day: "Day 1", title: "Casablanca Arrival", highlights: "City Walk, Dinner" },
                { day: "Day 2", title: "Rabat Tour", highlights: "Chellah, Mausoleum" },
                { day: "Day 3", title: "Chefchaouen", highlights: "Blue Streets" },
                { day: "Day 4", title: "To Fes", highlights: "Mountain Route" },
                { day: "Day 5", title: "Fes City Tour", highlights: "Artisans, History" },
                { day: "Day 6", title: "To Merzouga", highlights: "Desert Start" },
                { day: "Day 7", title: "Sahara Day", highlights: "Culture, Music" },
                { day: "Day 8", title: "To Todra", highlights: "Gorge Trek" },
                { day: "Day 9", title: "To Ait Benhaddou", highlights: "Heritage" },
                { day: "Day 10", title: "Atlas to Marrakech", highlights: "Tizi n'Tichka" },
                { day: "Day 11", title: "Explore Marrakech", highlights: "Palaces, Markets" },
                { day: "Day 12", title: "Departure", highlights: "Airport Drop" }
            ]
        },
        {
            id: "14day",
            name: "14-Day Ultimate Journey",
            duration: "14 Days",
            desc: "Complete Morocco • North to South • Beaches • Desert • Culture • Real immersion",
            image: "/fes.webp",
            itinerary: [
                { day: "Day 1", title: "Casablanca", highlights: "Arrival & Welcome" },
                { day: "Day 2", title: "Rabat", highlights: "Capital Landmarks" },
                { day: "Day 3", title: "Chefchaouen", highlights: "Blue Medina" },
                { day: "Day 4", title: "Fes", highlights: "Cultural Heritage" },
                { day: "Day 5", title: "Ifrane & Midelt", highlights: "Cedar Forest" },
                { day: "Day 6", title: "Erfoud", highlights: "Desert Gateway" },
                { day: "Day 7", title: "Merzouga", highlights: "Camel Trek" },
                { day: "Day 8", title: "Dades Valley", highlights: "Canyon Views" },
                { day: "Day 9", title: "Ouarzazate", highlights: "Cinema Sites" },
                { day: "Day 10", title: "Agadir", highlights: "Beach Stop" },
                { day: "Day 11", title: "Essaouira", highlights: "Windsurfing City" },
                { day: "Day 12", title: "To Marrakech", highlights: "Drive Coastal" },
                { day: "Day 13", title: "Marrakech Tour", highlights: "Souks, Palaces" },
                { day: "Day 14", title: "Farewell", highlights: "Airport Transfer" }
            ]
        }
    ];

    return (
        <main className="bg-white text-gray-900 scroll-smooth">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-black text-white">
                {/* Credibility / Trust Strip */}
                <div className="absolute top-0 left-0 right-0 z-20 px-6 py-4 flex flex-wrap justify-center items-center text-sm bg-black/70 backdrop-blur border-b border-white/10 text-center">
                    <div className="flex items-center space-x-6 justify-center flex-wrap text-center">
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927a1 1 0 011.902 0l1.158 3.554H16.9a1 1 0 01.588 1.81l-2.936 2.136 1.116 3.422a1 1 0 01-1.54 1.118L10 13.347l-3.129 2.32a1 1 0 01-1.54-1.118l1.117-3.422L3.512 8.29a1 1 0 01.588-1.81h3.791L9.049 2.927z" /></svg>
                            <span>Hundreds of 5-Star Reviews</span>
                        </div>
                        <div className="hidden md:inline-block w-px h-4 bg-white/20"></div>
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.866-3.582 7-8 7 0-3.866 3.582-7 8-7zm0 0c3.866 0 7 3.582 7 8-3.866 0-7-3.582-7-8zm0 0V3m0 0a2 2 0 100 4 2 2 0 000-4z" /></svg>
                            <span>10+ Years of Local Expertise</span>
                        </div>
                        <div className="hidden md:inline-block w-px h-4 bg-white/20"></div>
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m0 4v2m0 4v2m4-10h6a2 2 0 012 2v10a2 2 0 01-2 2h-6m-4 0v-4m0 4v-4m0 0H3V5h6m0 4H3m6 4H3" /></svg>
                            <span>Trusted by 1,000+ Travelers</span>
                        </div>
                    </div>

                </div>

                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/morocco-1.webp"
                        alt="Morocco Hero"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        priority
                        className="opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center max-w-3xl">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-md">
                        Discover Morocco’s Magic with Asara
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-gray-100 drop-shadow">
                        Private desert tours, ancient cities, Berber hospitality — all tailored to you.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <a
                            href="#booking"
                            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl shadow hover:bg-yellow-300 transition"
                        >
                            Book Now
                        </a>
                        <a
                            href="#tours"
                            className="border border-white px-6 py-3 rounded-xl text-white hover:bg-white hover:text-black transition"
                        >
                            Browse Tours
                        </a>
                    </div>
                </div>
            </section>


            {/* Why Us */}
            <section className="py-24 px-6 bg-gradient-to-br from-white via-yellow-50 to-white text-center">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-6 text-gray-900">Why Choose Asara Morocco?</h2>
                    <p className="text-lg text-gray-700 mb-12">
                        We’re native Berber experts offering deeply personalized and unforgettable Moroccan experiences.
                    </p>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                title: 'Local Expertise',
                                desc: 'Born in the Atlas and Sahara, our guides know every hidden path, story, and sunset.',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A2 2 0 013 15.382V5a2 2 0 012-2h14a2 2 0 012 2v10.382a2 2 0 01-1.553 1.894L15 20l-3-1.5-3 1.5z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Custom Private Tours',
                                desc: 'Every journey is tailored — no cookie-cutter trips. You dream it, we build it.',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h12" />
                                    </svg>
                                ),
                            },
                            {
                                title: '5-Star Reputation',
                                desc: 'Hundreds of glowing TripAdvisor and Google reviews reflect our service excellence.',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.158 3.554a1 1 0 00.95.69h3.733c.969 0 1.371 1.24.588 1.81l-3.02 2.195a1 1 0 00-.364 1.118l1.158 3.554c.3.921-.755 1.688-1.54 1.118l-3.02-2.195a1 1 0 00-1.175 0l-3.02 2.195c-.784.57-1.838-.197-1.539-1.118l1.157-3.554a1 1 0 00-.364-1.118L2.43 8.98c-.783-.57-.38-1.81.588-1.81h3.733a1 1 0 00.95-.69l1.158-3.554z" />
                                    </svg>
                                ),
                            },
                        ].map((item, i) => (
                            <div key={i} className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition border-t-4 border-yellow-400 flex flex-col items-center text-center">
                                <div className="mb-4">{item.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tours Section */}
            <section id="tours" className="py-24 px-6 bg-yellow-50 text-center">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12">Asara Moroccan Tours</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {tours.map((tour) => (
                            <div key={tour.id} className="bg-white w-full rounded-xl shadow hover:shadow-2xl transition flex flex-col">
                                <div className="relative">
                                    <Image src={tour.image} alt={tour.name} width={600} height={400} className="w-full h-56 object-cover" />
                                    <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded shadow">
                                        {tour.duration}
                                    </span>
                                </div>
                                <div className="p-6 flex flex-col justify-between flex-grow">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">{tour.name}</h3>
                                        <p className="text-sm text-gray-700 mb-4">{tour.desc}</p>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 w-full">
                                        <button
                                            onClick={() => {
                                                setSelectedTourName(tour.name);
                                                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="w-full md:w-1/2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm md:text-base py-3 px-4 rounded-md shadow hover:shadow-md transition-all duration-300 ease-in-out"
                                        >
                                            Book Now
                                        </button>
                                        <button
                                            onClick={() => handleViewMore(tour.id)}
                                            className="w-full md:w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm md:text-base py-3 px-4 rounded-md shadow hover:shadow-md transition-all duration-300 ease-in-out"
                                        >
                                            {selectedTourId === tour.id ? "Hide Details" : "View Details"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Expanded Tour Details */}
                    {selectedTourId && (
                        <section id={`tour-details-${selectedTourId}`} className="mt-24 text-left bg-white p-8 rounded-xl shadow-md border border-yellow-200 max-w-4xl mx-auto">
                            {tours
                                .filter((tour) => tour.id === selectedTourId)
                                .map((tour) => (
                                    <div key={tour.id}>
                                        <h3 className="text-3xl font-bold mb-4">{tour.name} — Full Itinerary</h3>
                                        <p className="text-gray-700 mb-8">{tour.desc}</p>
                                        <div className="space-y-6">
                                            {tour.itinerary.map((item, i) => (
                                                <div key={i} className="bg-yellow-50 p-6 rounded-xl shadow border-l-4 border-yellow-400">
                                                    <h4 className="text-xl font-semibold mb-2">{item.day}: {item.title}</h4>
                                                    <p className="text-gray-700">{item.highlights}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-10 text-center">
                                            <a
                                                href="#booking"
                                                onClick={() => setSelectedTourName(tour.name)}
                                                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base py-3 px-8 rounded-md shadow-md transition-all duration-300 ease-in-out"
                                            >
                                                Book This Tour
                                            </a>
                                        </div>
                                    </div>
                                ))}
                        </section>
                    )}
                </div>
            </section>

            {/* Real Reviews Carousel */}
            <section className="py-24 px-6 bg-gradient-to-br from-yellow-50 to-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-12">Real Experiences From Our Travelers</h2>
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                        loop
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        className="pb-4"
                    >
                        {[
                            {
                                name: "Cinzia B",
                                summary: "Wonderful Morocco",
                                text: "Great tour and great experience. We got good advice and explanations about Morocco and its culture from our guide and driver Rashid.",
                                date: "April 21, 2025"
                            },
                            {
                                name: "Elena F",
                                summary: "Perfect and highly recommended ❤️",
                                text: "From the blue streets of Chefchaouen to celebrating Eid with Jamal’s family, every moment was personal, joyful, and unforgettable.",
                                date: "April 5, 2025"
                            },
                            {
                                name: "Sjoerd K",
                                summary: "The best place for your Morocco trip!",
                                text: "Jamal was an exceptional guide who made us feel safe and welcomed throughout. Everything was well arranged without stress.",
                                date: "April 5, 2025"
                            },
                            {
                                name: "Ernest",
                                summary: "2-Day Ait Ben Haddou Tour",
                                text: "A last-minute but well-organized trip. Jamal made it smooth, with great accommodations and thoughtful planning.",
                                date: "Dec 16, 2024"
                            },
                            {
                                name: "Natalia Mello",
                                summary: "Great tours and amazing people",
                                text: "As a solo traveler, I felt completely safe and supported. Their help went beyond the tour. 100% recommended!",
                                date: "Dec 8, 2024"
                            },
                            {
                                name: "Agnes T",
                                summary: "15 days around Morocco!",
                                text: "Our family experienced Morocco like never before — Sahara, Fez, Essaouira. Huge thanks to Jamal and Abdoul for making it magical.",
                                date: "Nov 18, 2024"
                            },
                        ].map((review, i) => (
                            <SwiperSlide key={i}>
                                <div className="h-full flex items-center">
                                    <div className="bg-white border shadow-md rounded-xl p-6 flex flex-col justify-between text-left w-full h-full max-h-[380px]">
                                        <div className="mb-4">
                                            <div className="text-yellow-500 text-lg mb-1">★★★★★</div>
                                            <h3 className="font-bold text-lg">{review.summary}</h3>
                                        </div>
                                        <p className="text-sm text-gray-700 mb-6 italic flex-1 line-clamp-5">{review.text}</p>
                                        <div className="text-sm text-gray-600 mt-auto">
                                            <div className="font-semibold">{review.name}</div>
                                            <div>{review.date}</div>
                                            <div className="text-xs text-gray-600">TripAdvisor verified</div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="mt-8">
                        <a
                            href="https://www.tripadvisor.com/Attraction_Review-g293734-d12253955-Reviews-Asara_Morocco_Tours-Marrakech_Marrakech_Safi.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 underline hover:text-gray-800"
                        >
                            Read More Reviews on TripAdvisor
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-600 mb-12">
                        Everything you need to know before booking your unforgettable Moroccan journey.
                    </p>
                    <div className="space-y-6 text-left">
                        {[
                            {
                                q: 'Is Morocco safe for travelers?',
                                a: 'Yes — Morocco is one of the safest countries in North Africa, especially when you travel with experienced local guides like us. We’ve guided families, solo travelers, and couples for over a decade without incident.',
                            },
                            {
                                q: 'Are your tours private or shared?',
                                a: 'All tours are 100% private. You’ll never be grouped with strangers. It’s your trip, your schedule, your pace.',
                            },
                            {
                                q: 'Can you customize the itinerary for us?',
                                a: 'Absolutely. Every tour we offer is tailored to your interests, whether that’s more time in the Sahara, foodie stops, or hidden mountain villages.',
                            },
                            {
                                q: 'Do you offer vegetarian or vegan meals?',
                                a: 'Yes! We’re happy to accommodate any dietary needs. Many of our clients are vegetarian or vegan — Morocco’s cuisine is flexible and flavorful.',
                            },
                            {
                                q: 'Do tours include airport pickup and drop-off?',
                                a: 'Yes — most of our packages include comfortable airport transfers, so your journey starts and ends with ease.',
                            },
                            {
                                q: 'Is the desert camping experience comfortable?',
                                a: 'Our luxury desert camps offer clean private tents with real beds, private bathrooms, electricity, and traditional Moroccan decor — no roughing it here.',
                            },
                        ].map((faq, i) => (
                            <details
                                key={i}
                                className="group bg-gray-50 p-6 rounded-xl shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg"
                            >
                                <summary className="text-lg font-semibold flex justify-between items-center text-gray-900">
                                    {faq.q}
                                    <span className="text-yellow-500 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="text-gray-700 mt-4 leading-relaxed">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
            {/* WhatsApp CTA */}
            <section className="py-16 px-6 bg-green-50 text-center">
                <h2 className="text-3xl font-bold mb-4">Need Help Planning?</h2>
                <p className="text-gray-700 mb-6">We’re available 24/7 to chat about your dream Morocco adventure.</p>
                <a
                    href="https://wa.me/85252393767"
                    target="_blank"
                    className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition"
                >
                    💬 Chat on WhatsApp
                </a>
            </section>

            {/* Trust Badges */}
            <section className="py-10 px-6 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto flex justify-center flex-wrap gap-8 items-center">
                    <Image src="/tripadvisor.webp" alt="TripAdvisor Badge" width={150} height={50} />
                    <Image src="/google.webp" alt="Google Reviews" width={150} height={50} />
                    <Image src="/paypal.webp" alt="Secure Payments" width={150} height={50} />
                </div>
            </section>

            {/* Booking Form */}
            <section id="booking" className="py-24 px-6 bg-gradient-to-tr from-yellow-100 to-white">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">Book Your Moroccan Journey</h2>
                    <p className="mb-10 text-lg text-gray-700">
                        Tell us what you&apos;re looking for — we&apos;ll craft the perfect experience.
                    </p>
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow space-y-6 text-left">
                        <input
                            id="fullName"
                            name="fullName"
                            placeholder="Full Name"
                            required
                            className="w-full px-4 py-3 border rounded-md"
                        />
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                required
                                className="w-full px-4 py-3 border rounded-md"
                            />
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Phone Number"

                                className="w-full px-4 py-3 border rounded-md"
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                id="startDate"
                                name="startDate"
                                type="date"
                                required
                                className="w-full px-4 py-3 border rounded-md"
                            />
                            <input
                                id="travelers"
                                name="travelers"
                                type="number"
                                min={1}
                                placeholder="Number of Travelers"
                                required
                                className="w-full px-4 py-3 border rounded-md"
                            />
                        </div>
                        <select
                            id="tour"
                            name="tour"
                            required
                            value={selectedTourName}
                            onChange={(e) => setSelectedTourName(e.target.value)}
                            className="w-full px-4 py-3 border rounded-md"
                        >
                            <option value="">Select a Tour</option>
                            {tours.map(t => (
                                <option key={t.id} value={t.name}>{t.name}</option>
                            ))}
                            <option value="custom">Request a Custom Tour</option>
                        </select>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Any special requests?"
                            required
                            className="w-full px-4 py-3 border rounded-md h-32"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-md font-semibold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                        >
                            {status === 'loading' ? 'Sending...' : 'Submit Request'}
                        </button>
                        {status === 'success' && (
                            <p className="text-green-600 mt-4">Thank you! We’ll be in touch shortly via email or WhatsApp.</p>
                        )}
                        {status === 'error' && (
                            <p className="text-red-600 mt-4">Something went wrong. Please try again later.</p>
                        )}
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 text-center bg-gray-900 text-gray-300 text-sm">
                <p>
                    &copy; 2025 Asara Morocco Tours. Crafted with love in the Sahara. Powered by{' '}
                    <a href="https://www.asaramoroccotours.com/" className="text-yellow-400 underline" target="_blank">
                        Asara Morocco
                    </a>
                </p>
            </footer>
        </main>
    );
}
