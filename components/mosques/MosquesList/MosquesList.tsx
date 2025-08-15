'use client'

import { PrayerTimeContext } from '@/lib/context/prayerTimeContext'
import React, { useContext } from 'react'
import MosqueItem from '../MosqueItem/MosqueItem';
import { getDistanceFromLatLonInKm } from '@/lib/utils/utils';
import { LocationContext } from '@/lib/context/locationContext';

export default function MosquesList({className, ...props}:React.ComponentProps<"div">) {
  const { location } = useContext(LocationContext);
  const { mosques } = useContext(PrayerTimeContext);
 
  const mosqueList = mosques.map(mosque => mosque); // Make a copy of the array so that sorting does not mutate the original
  mosqueList.sort((a,b) => {
    a.distance = getDistanceFromLatLonInKm(location.coordinates.latitude, location.coordinates.longitude, a.coordinates.latitude, a.coordinates.longitude)
    b.distance = getDistanceFromLatLonInKm(location.coordinates.latitude, location.coordinates.longitude, b.coordinates.latitude, b.coordinates.longitude)
    return a.distance - b.distance
  })
  return (
    <div className={className} {...props}>
      {mosqueList.map(mosque => {
        return <MosqueItem key={mosque.coordinates.latitude+mosque.coordinates.longitude} mosque={mosque} distance={mosque.distance}/>
      })}
    </div>
  )
}
