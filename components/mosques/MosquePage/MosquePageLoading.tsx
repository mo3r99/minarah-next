"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Make sure you have this component
import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function MosquePageLoading() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative w-full h-[400px] mb-6 rounded-lg overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      <Skeleton className="h-12 w-2/3 mb-6" />

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
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
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
                {[1, 2, 3, 4, 5].map((index) => (
                  <Skeleton key={index} className="h-6 w-24" />
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
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-16 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}
