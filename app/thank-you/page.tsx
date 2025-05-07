'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ThankYouPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white px-6 py-16">
            <div className="bg-white shadow-2xl rounded-2xl max-w-2xl w-full p-10 text-center border-t-4 border-yellow-400 animate-fade-in">
                {/* Checkmark Icon */}
                <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <svg
                        className="w-10 h-10 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Thank You for Reaching Out!
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-gray-600 mb-6">
                    We&apos;ve received your booking request and one of our Berber travel experts will be in touch shortly.
                </p>

                {/* Call to action */}
                <Link
                    href="/"
                    className="inline-block mt-4 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-xl shadow transition"
                >
                    ← Back to Home
                </Link>

                {/* Optional Image / Badge */}
                <div className="mt-10">
                    <Image
                        src="/tripadvisor.webp"
                        alt="TripAdvisor Badge"
                        width={120}
                        height={40}
                        className="mx-auto opacity-80"
                    />
                </div>
            </div>
        </main>
    );
}
