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
        // Redirect to Thank You page
        router.push('/thank-you');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="bg-white text-gray-900 scroll-smooth">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-black text-white">
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

        {/* Content */}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A2 2 0 013 15.382V5a2 2 0 012-2h14a2 2 0 012 2v10.382a2 2 0 01-1.553 1.894L15 20l-3-1.5-3 1.5z" />
                  </svg>
                ),
              },
              {
                title: 'Custom Private Tours',
                desc: 'Every journey is tailored — no cookie-cutter trips. You dream it, we build it.',
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h12" />
                  </svg>
                ),
              },
              {
                title: '5-Star Reputation',
                desc: 'Hundreds of glowing TripAdvisor and Google reviews reflect our service excellence.',
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.158 3.554a1 1 0 00.95.69h3.733c.969 0 1.371 1.24.588 1.81l-3.02 2.195a1 1 0 00-.364 1.118l1.158 3.554c.3.921-.755 1.688-1.54 1.118l-3.02-2.195a1 1 0 00-1.175 0l-3.02 2.195c-.784.57-1.838-.197-1.539-1.118l1.157-3.554a1 1 0 00-.364-1.118L2.43 8.98c-.783-.57-.38-1.81.588-1.81h3.733a1 1 0 00.95-.69l1.158-3.554z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition border-t-4 border-yellow-400 flex flex-col items-center text-center"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Experience Highlights */}
      {/* <section className="py-24 px-6 bg-white text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Experience Highlights</h2>
          <p className="text-gray-600 text-lg mb-12">Golden dunes, hidden medinas, and local meals — these are just a few moments from our tours.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              'Sunset Camel Trek in Merzouga',
              'Colorful Souks of Marrakech',
              'Starry Night in the Desert Camp',
              'Blue Streets of Chefchaouen',
              'Home-Cooked Tagine with Locals',
              'Atlas Mountains Scenic Drive'
            ].map((title, i) => (
              <div key={i} className="rounded-xl shadow hover:shadow-xl overflow-hidden">
                <Image src={`/images/highlight${i + 1}.jpg`} alt={title} width={600} height={400} className="w-full h-56 object-cover" />
                <div className="p-4 text-left">
                  <h3 className="text-lg font-semibold">{title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Tours */}
      <section id="tours" className="py-24 px-6 bg-yellow-50 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Asara Moroccan Tours</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "3-Day Tour: Marrakech to Fes",
                duration: "3 Days",
                desc: "Marrakech • Tizi N'Tichka • Ouarzazate • Todgha Gorges • Merzouga • Fes",
                image: "/fes-medina.webp",
              },
              {
                name: "3-Day Tour: Fes to Marrakech",
                duration: "3 Days",
                desc: "Fes • Merzouga • Todgha Gorges • Ait Benhaddou • Tizi N'Tichka • Marrakech",
                image: "/ait-ben-haddou-2.webp",
              },
              {
                name: "4-Day Tour: Marrakech to Erg Chegaga",
                duration: "4 Days",
                desc: "Marrakech • High Atlas (Tichka) • Taznakht • Foum Zguid • Erg Chegaga Dunes",
                image: "/ergchegaga.webp",
              },
              {
                name: "6-Day Desert Discovery",
                duration: "6 Days",
                desc: "Marrakech • Ouarzazate • Erg Chebbi • Dades Valley • Camel Ride • Desert Camp",
                image: "/marrakechj.webp",
              },
              {
                name: "7-Day Imperial Cities",
                duration: "7 Days",
                desc: "Casablanca • Rabat • Fes • Meknes • Chefchaouen • Guided Medina Walks",
                image: "/chefchouen.webp",
              },
              {
                name: "8-Day Sahara Adventure",
                duration: "8 Days",
                desc: "Marrakech to Fes • Erg Chebbi Dunes • Todra Gorge • Cultural Experiences",
                image: "/ait-benhaddou.webp",
              },
              {
                name: "10-Day Grand Tour",
                duration: "10 Days",
                desc: "Marrakech • Atlas Mountains • Sahara Desert • Ait Benhaddou • Essaouira",
                image: "/essaouira.webp",
              },
              {
                name: "12-Day Full Morocco",
                duration: "12 Days",
                desc: "All major cities + desert • Off-the-beaten path routes • Local culinary moments",
                image: "/sahara.webp",
              },
              {
                name: "14-Day Ultimate Journey",
                duration: "14 Days",
                desc: "Complete Morocco • North to South • Beaches • Desert • Culture • Real immersion",
                image: "/fes.webp",
              },
            ].map((tour, i) => (
              <div key={i} className="bg-white rounded-xl shadow hover:shadow-2xl transition overflow-hidden flex flex-col">
                <div className="relative">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    width={600}
                    height={400}
                    className="w-full h-56 object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
                    {tour.duration}
                  </span>
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{tour.name}</h3>
                    <p className="text-sm text-gray-700 mb-4">{tour.desc}</p>
                  </div>
                  <a
                    href="#booking"
                    className="inline-block mt-auto bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm py-2 px-4 rounded transition"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
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


      {/* FAQ */}
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
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
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
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="sr-only">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 border rounded-md"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-3 border rounded-md"
                />
              </div>
            </div>

            {/* Start Date & Travelers */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="sr-only">Trip Start Date</label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  required
                  className="w-full px-4 py-3 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="travelers" className="sr-only">Number of Travelers</label>
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
            </div>

            {/* Tour Select */}
            <div>
              <label htmlFor="tour" className="sr-only">Select a Tour</label>
              <select
                id="tour"
                name="tour"
                required
                className="w-full px-4 py-3 border rounded-md"
              >
                <option value="">Select a Tour</option>
                <option value="3a">3-Day Tour: Marrakech to Fes</option>
                <option value="3b">3-Day Tour: Fes to Marrakech</option>
                <option value="4a">4-Day Tour: Marrakech to Erg Chegaga</option>
                <option value="6day">6-Day Desert Discovery</option>
                <option value="7day">7-Day Imperial Cities</option>
                <option value="8day">8-Day Sahara Adventure</option>
                <option value="10day">10-Day Grand Tour</option>
                <option value="12day">12-Day Full Morocco</option>
                <option value="14day">14-Day Ultimate Journey</option>
                <option value="custom">Request a Custom Tour</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="sr-only">Additional Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Anything else we should know? Dates, preferences, special requests, etc."
                required
                className="w-full px-4 py-3 border rounded-md h-32"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-yellow-400 text-black py-3 rounded-xl font-semibold hover:bg-yellow-300 transition"
            >
              {status === 'loading' ? 'Sending...' : 'Submit Request'}
            </button>

            {status === 'success' && (
              <p className="text-green-600 mt-4">
                Thank you! We’ll be in touch shortly via email or WhatsApp.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-600 mt-4">
                Something went wrong. Please try again later.
              </p>
            )}
          </form>
        </div>
      </section>




      {/* Footer */}
      <footer className="py-8 text-center bg-gray-900 text-gray-300 text-sm">
        <p>&copy; 2025 Asara Morocco Tours. Crafted with love in the Sahara. Powered by <a href="https://www.asaramoroccotours.com/" className="text-gay-400 underline" target='_blank'> Asara Morocco</a></p>
      </footer>
    </main>
  );
}
