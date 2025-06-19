'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher'; // Adjust path if needed


// Note: You would typically place the LanguageSwitcher in your layout or navigation
// import LanguageSwitcher from './LanguageSwitcher';

export default function LandingPage() {
    const t = useTranslations('LandingPage');
    const router = useRouter();

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
    const [selectedTourName, setSelectedTourName] = useState('');

    // Dynamically build data from translations
    const tourIds = ["tour2day", "tour3a", "tour3b", "tour4a", "tour6day", "tour7day", "tour8day", "tour10day", "tour12day", "tour14day"];
    const tours = tourIds.map(id => ({
        id,
        image: `/${id.replace('tour', '')}.webp`, // A placeholder for image logic
        name: t(`tours.${id}.name`),
        duration: t(`tours.${id}.duration`),
        desc: t(`tours.${id}.desc`),
        itinerary: t.raw(`tours.${id}.itinerary`)
    }));

    const whyUsCards = ["expertise", "customTours", "reputation"].map(key => ({
        title: t(`whyUs.cards.${key}.title`),
        desc: t(`whyUs.cards.${key}.desc`),
        icon:
            key === 'expertise' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A2 2 0 013 15.382V5a2 2 0 012-2h14a2 2 0 012 2v10.382a2 2 0 01-1.553 1.894L15 20l-3-1.5-3 1.5z" /></svg>
            ) : key === 'customTours' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h12" /></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.158 3.554a1 1 0 00.95.69h3.733c.969 0 1.371 1.24.588 1.81l-3.02 2.195a1 1 0 00-.364 1.118l1.158 3.554c.3.921-.755 1.688-1.54 1.118l-3.02-2.195a1 1 0 00-1.175 0l-3.02 2.195c-.784.57-1.838-.197-1.539-1.118l1.157-3.554a1 1 0 00-.364-1.118L2.43 8.98c-.783-.57-.38-1.81.588-1.81h3.733a1 1 0 00.95-.69l1.158-3.554z" /></svg>
            )
    }));

    const reviewKeys = ["review1", "review2", "review3", "review4", "review5", "review6"];
    const reviews = reviewKeys.map(key => t.raw(`reviews.${key}`));

    const faqKeys = ["faq1", "faq2", "faq3", "faq4", "faq5", "faq6"];
    const faqs = faqKeys.map(key => t.raw(`faqs.${key}`));

    // Your image paths might need adjusting
    const tourImages: { [key: string]: string } = {
        tour2day: "/ouarzazate-ait-ben-haddou.webp",
        tour3a: "/fes-medina.webp",
        tour3b: "/ait-ben-haddou-2.webp",
        tour4a: "/ergchegaga.webp",
        tour6day: "/marrakechj.webp",
        tour7day: "/chefchouen.webp",
        tour8day: "/ait-benhaddou.webp",
        tour10day: "/essaouira.webp",
        tour12day: "/sahara.webp",
        tour14day: "/fes.webp",
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

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


    return (
        <main className="bg-white text-gray-900 scroll-smooth">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-black text-white">
                <div className="absolute top-0 left-0 right-0 z-20 px-6 py-4 flex flex-wrap justify-center items-center text-sm bg-black/70 backdrop-blur border-b border-white/10 text-center">
                    <div className="flex items-center space-x-6 justify-center flex-wrap text-center">
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927a1 1 0 011.902 0l1.158 3.554H16.9a1 1 0 01.588 1.81l-2.936 2.136 1.116 3.422a1 1 0 01-1.54 1.118L10 13.347l-3.129 2.32a1 1 0 01-1.54-1.118l1.117-3.422L3.512 8.29a1 1 0 01.588-1.81h3.791L9.049 2.927z" /></svg>
                            <span>{t('credibility.reviews')}</span>
                        </div>
                        <div className="hidden md:inline-block w-px h-4 bg-white/20"></div>
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.866-3.582 7-8 7 0-3.866 3.582-7 8-7zm0 0c3.866 0 7 3.582 7 8-3.866 0-7-3.582-7-8zm0 0V3m0 0a2 2 0 100 4 2 2 0 000-4z" /></svg>
                            <span>{t('credibility.expertise')}</span>
                        </div>
                        <div className="hidden md:inline-block w-px h-4 bg-white/20"></div>
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m0 4v2m0 4v2m4-10h6a2 2 0 012 2v10a2 2 0 01-2 2h-6m-4 0v-4m0 4v-4m0 0H3V5h6m0 4H3m6 4H3" /></svg>
                            <span>{t('credibility.travelers')}</span>
                        </div>
                    </div>
                    {/* Language Switcher Here */}
                    <div className="mt-2 sm:mt-0">
                        <LanguageSwitcher />
                    </div>
                </div>

                <div className="absolute inset-0 z-0">
                    <Image src="/morocco-1.webp" alt="Morocco Hero" fill objectFit="cover" objectPosition="center" priority className="opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 text-center max-w-3xl">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-md">{t('hero.title')}</h1>
                    <p className="text-xl md:text-2xl mb-10 text-gray-100 drop-shadow">{t('hero.subtitle')}</p>
                    <div className="flex justify-center space-x-4">
                        <a href="#booking" className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl shadow hover:bg-yellow-300 transition">{t('hero.bookButton')}</a>
                        <a href="#tours" className="border border-white px-6 py-3 rounded-xl text-white hover:bg-white hover:text-black transition">{t('hero.browseButton')}</a>
                    </div>
                </div>
            </section>

            {/* Why Us */}
            <section className="py-24 px-6 bg-gradient-to-br from-white via-yellow-50 to-white text-center">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-6 text-gray-900">{t('whyUs.title')}</h2>
                    <p className="text-lg text-gray-700 mb-12">{t('whyUs.subtitle')}</p>
                    <div className="grid md:grid-cols-3 gap-10">
                        {whyUsCards.map((item, i) => (
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
                    <h2 className="text-4xl font-bold mb-12">{t('toursSection.title')}</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {tours.map((tour) => (
                            <div key={tour.id} className="bg-white w-full rounded-xl shadow hover:shadow-2xl transition flex flex-col">
                                <div className="relative">
                                    <Image src={tourImages[tour.id] || "/sahara.webp"} alt={tour.name} width={600} height={400} className="w-full h-56 object-cover rounded-t-xl" />
                                    <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded shadow">{tour.duration}</span>
                                </div>
                                <div className="p-6 flex flex-col justify-between flex-grow">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">{tour.name}</h3>
                                        <p className="text-sm text-gray-700 mb-4">{tour.desc}</p>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 w-full mt-4">
                                        <button onClick={() => { setSelectedTourName(tour.name); document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full md:w-1/2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm md:text-base py-3 px-4 rounded-md shadow hover:shadow-md transition-all duration-300 ease-in-out">
                                            {t('hero.bookButton')}
                                        </button>
                                        <button onClick={() => handleViewMore(tour.id)} className="w-full md:w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm md:text-base py-3 px-4 rounded-md shadow hover:shadow-md transition-all duration-300 ease-in-out">
                                            {selectedTourId === tour.id ? t('toursSection.hideDetails') : t('toursSection.viewDetails')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedTourId && (
                        <section id={`tour-details-${selectedTourId}`} className="mt-24 text-left bg-white p-8 rounded-xl shadow-md border border-yellow-200 max-w-4xl mx-auto">
                            {tours.filter((tour) => tour.id === selectedTourId).map((tour) => (
                                <div key={tour.id}>
                                    <h3 className="text-3xl font-bold mb-4">{tour.name} {t('toursSection.fullItinerary')}</h3>
                                    <p className="text-gray-700 mb-8">{tour.desc}</p>
                                    <div className="space-y-6">
                                        {tour.itinerary.map((item: any, i: number) => (
                                            <div key={i} className="bg-yellow-50 p-6 rounded-xl shadow border-l-4 border-yellow-400">
                                                <h4 className="text-xl font-semibold mb-2">{item.day}: {item.title}</h4>
                                                <p className="text-gray-700">{item.highlights}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-10 text-center">
                                        <a href="#booking" onClick={() => setSelectedTourName(tour.name)} className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base py-3 px-8 rounded-md shadow-md transition-all duration-300 ease-in-out">
                                            {t('toursSection.bookThisTour')}
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
                    <h2 className="text-4xl font-bold mb-12">{t('reviewsSection.title')}</h2>
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                        loop
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        className="pb-4"
                    >
                        {reviews.map((review: any, i) => (
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
                                            <div className="text-xs text-gray-600">{t('reviewsSection.verified')}</div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="mt-8">
                        <a href="https://www.tripadvisor.com/Attraction_Review-g293734-d12253955-Reviews-Asara_Morocco_Tours-Marrakech_Marrakech_Safi.html" target="_blank" rel="noopener noreferrer" className="text-gray-600 underline hover:text-gray-800">
                            {t('reviewsSection.readMore')}
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold mb-4 text-gray-900">{t('faqSection.title')}</h2>
                    <p className="text-lg text-gray-600 mb-12">{t('faqSection.subtitle')}</p>
                    <div className="space-y-6 text-left">
                        {faqs.map((faq: any, i) => (
                            <details key={i} className="group bg-gray-50 p-6 rounded-xl shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg">
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
                <h2 className="text-3xl font-bold mb-4">{t('whatsapp.title')}</h2>
                <p className="text-gray-700 mb-6">{t('whatsapp.subtitle')}</p>
                <a href="https://wa.me/85252393767" target="_blank" className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition">
                    {t('whatsapp.button')}
                </a>
            </section>

            {/* Trust Badges */}
            <section className="py-10 px-6 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto flex justify-center flex-wrap gap-8 items-center">
                    <Image src="/tripadvisor.webp" alt={t('trustBadges.tripadvisor')} width={150} height={50} />
                    <Image src="/google.webp" alt={t('trustBadges.google')} width={150} height={50} />
                    <Image src="/paypal.webp" alt={t('trustBadges.paypal')} width={150} height={50} />
                </div>
            </section>

            {/* Booking Form */}
            <section id="booking" className="py-24 px-6 bg-gradient-to-tr from-yellow-100 to-white">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">{t('bookingForm.title')}</h2>
                    <p className="mb-10 text-lg text-gray-700">{t('bookingForm.subtitle')}</p>
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow space-y-6 text-left">
                        <input id="fullName" name="fullName" placeholder={t('bookingForm.fullName')} required className="w-full px-4 py-3 border rounded-md" />
                        <div className="grid md:grid-cols-2 gap-4">
                            <input id="email" name="email" type="email" placeholder={t('bookingForm.email')} required className="w-full px-4 py-3 border rounded-md" />
                            <input id="phone" name="phone" type="tel" placeholder={t('bookingForm.phone')} required className="w-full px-4 py-3 border rounded-md" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input id="startDate" name="startDate" type="date" required className="w-full px-4 py-3 border rounded-md" />
                            <input id="travelers" name="travelers" type="number" min={1} placeholder={t('bookingForm.travelers')} required className="w-full px-4 py-3 border rounded-md" />
                        </div>
                        <select id="tour" name="tour" required value={selectedTourName} onChange={(e) => setSelectedTourName(e.target.value)} className="w-full px-4 py-3 border rounded-md">
                            <option value="">{t('bookingForm.selectTour')}</option>
                            {tours.map(t => (<option key={t.id} value={t.name}>{t.name}</option>))}
                            <option value="custom">{t('bookingForm.customTour')}</option>
                        </select>
                        <textarea id="message" name="message" placeholder={t('bookingForm.requests')} required className="w-full px-4 py-3 border rounded-md h-32" />
                        <button type="submit" disabled={status === 'loading'} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-md font-semibold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                            {status === 'loading' ? t('bookingForm.sending') : t('bookingForm.submit')}
                        </button>
                        {status === 'success' && (<p className="text-green-600 mt-4">{t('bookingForm.success')}</p>)}
                        {status === 'error' && (<p className="text-red-600 mt-4">{t('bookingForm.error')}</p>)}
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 text-center bg-gray-900 text-gray-300 text-sm">
                <p>
                    {t('footer.copyright')}{' '}
                    <a href="https://www.asaramoroccotours.com/" className="text-yellow-400 underline" target="_blank">
                        {t('footer.company')}
                    </a>
                </p>
            </footer>
        </main>
    );
}