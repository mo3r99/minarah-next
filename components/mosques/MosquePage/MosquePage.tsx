'use client'

import { PrayerTimeContext } from '@/lib/context/prayerTimeContext'
import Image from 'next/image';
import React, { useContext } from 'react'

export default function MosquePage({mosqueId}:{mosqueId: number}) {
    const { mosques } = useContext(PrayerTimeContext);
    const mosque = mosques[mosqueId-1]

    return (
        <div className="max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] mb-6 rounded-lg overflow-hidden">
                <Image 
                    src={mosque.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/6/62/Silhouette_of_the_Mosque.jpg"} 
                    alt={mosque.imageUrl ? `An image of ${mosque.name}` : "An image of a mosque"}
                    fill
                    className="object-cover"
                />
            </div>

            <h1 className="text-3xl font-bold mb-6">{mosque.name}</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Contact Information */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="font-semibold text-gray-700">Address:</p>
                                <div className="text-gray-600">
                                    <p>{mosque.address.name}</p>
                                    <p>{mosque.address.street}</p>
                                    <p>{mosque.address.city}</p>
                                    <p>{mosque.address.postcode}</p>
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700">Phone:</p>
                                <p className="text-gray-600">{mosque.contact.phone}</p>
                            </div>
                            {mosque.contact.email && (
                                <div>
                                    <p className="font-semibold text-gray-700">Email:</p>
                                    <p className="text-gray-600">{mosque.contact.email}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                        <div className="flex flex-wrap gap-2">
                            {mosque.amenities.map((amenity, index) => (
                                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                    {amenity.replace(/_/g, ' ')}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Prayer Times */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Congregation Times</h2>
                    <div className="space-y-3">
                        {Object.entries(mosque.congregationTimes).map(([prayer, time]) => (
                            <div key={prayer} className="flex justify-between items-center py-2 border-b last:border-0">
                                <span className="font-medium capitalize">{prayer}</span>
                                <span className="text-gray-600">{time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {mosque.lastUpdated && (
                <p className="text-sm text-gray-500 mt-6">
                    Last updated: {new Date(mosque.lastUpdated).toLocaleDateString()}
                </p>
            )}
        </div>
    )
}
