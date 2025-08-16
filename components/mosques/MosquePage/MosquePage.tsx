"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Accessibility, CircleParking, Droplet, Globe, LibraryBig, Mail, Phone, Venus } from "lucide-react";
import Link from "next/link";
import { Mosque, MosqueAmenity } from "@/types";

export default function MosquePage({ mosque }: { mosque: Mosque }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative w-full h-[400px] mb-6 rounded-lg overflow-hidden">
        <Image
          src={
            mosque.imageUrl ||
            "https://upload.wikimedia.org/wikipedia/commons/6/62/Silhouette_of_the_Mosque.jpg"
          }
          alt={
            mosque.imageUrl
              ? `An image of ${mosque.name}`
              : "An image of a mosque"
          }
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight mb-6">
        {mosque.name}
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Address:</h3>
                <div className="text-muted-foreground">
                  <p>{mosque.address.name}</p>
                  <p>{mosque.address.street}</p>
                  <p>{mosque.address.city}</p>
                  <p>{mosque.address.postcode}</p>
                </div>
              </div>
              <div>
                {mosque.contact.phone && (
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Phone size={16} />
                    {mosque.contact.phone}
                  </span>
                )}
                {mosque.contact.email && (
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Mail size={16} />
                    {mosque.contact.email}
                  </span>
                )}
                {mosque.contact.website && (
                  <Link href={mosque.contact.website ? mosque.contact.website : '#'}>
                    <span className="text-manarah-500 flex items-center gap-2 hover:underline">
                      <Globe size={16} className="text-muted-foreground"/>
                      {mosque.contact.website}
                    </span>
                  </Link>
                )}
                {mosque.contact.emasjidLive && (
                  <Link href={mosque.contact.emasjidLive ? mosque.contact.emasjidLive : '#'}>
                    <span className="text-manarah-500 flex items-center gap-2 hover:underline">
                      <Image alt={'eMasjid Live logo'} width={32} height={32} src={'https://emasjidlive.co.uk/wp-content/uploads/2020/11/cropped-em-favicon-32x32.png'} className="w-4 h-4"/>
                      View on eMasjidLive
                    </span>
                  </Link>
                )}

              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mosque.amenities.map((amenity, index) => (
                  <Badge key={index} variant="secondary">
                    {amenity == MosqueAmenity.ABLUTION_FACILITIES && <Droplet />}
                    {amenity == MosqueAmenity.WHEELCHAIR_ACCESS && <Accessibility />}
                    {amenity == MosqueAmenity.WOMENS_SECTION && <Venus />}
                    {amenity == MosqueAmenity.PARKING && <CircleParking />}
                    {amenity == MosqueAmenity.LIBRARY && <LibraryBig />}
                    {amenity.substring(0, 1).toUpperCase()}
                    {amenity.replace(/_/g, " ").substring(1)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Prayer Times */}
        <Card>
          <CardHeader>
            <CardTitle>Congregation Times</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {Object.entries(mosque.congregationTimes).map(
                  ([prayer, time]) => (
                    <TableRow key={prayer}>
                      <TableCell className="font-medium capitalize">
                        {prayer}
                      </TableCell>
                      <TableCell className="text-right">{time}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {mosque.lastUpdated && (
        <p className="text-sm text-muted-foreground mt-6">
          Last updated: {new Date(mosque.lastUpdated).toLocaleDateString()}
        </p>
      )}
      {mosque.imageUrl && (
      <p className="text-sm text-muted-foreground">Image Source: <Link href={mosque.imageUrl} className="text-sm text-manarah-500 hover:underline mt-4">{mosque.imageUrl?.split('//')[1].split('/')[0]}</Link></p>
      )
      }
    </div>
  );
}
