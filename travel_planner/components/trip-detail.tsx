"use client";

import { Trip } from "@/lib/generated/prisma";
import Image from "next/image";
import Link from "next/link";

import { Calendar, CalendarIcon, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";

interface TripDetailClientProps {
  trip: Trip;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {trip.imageUrl && (
        <div className="w-full h-72 md:h-96 overflow-hidden rounded-xl shadow-lg relative">
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            className="object-contain"
            fill
            priority
          />
        </div>
      )}

      <div className="p-6 shadow rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold">{trip.title}</h1>
          <div className="flex items-center mt-2">
            <CalendarIcon className="h-5 w-5 mr-2" />
            <span className="text-lg">
              {trip.startDate.toLocaleDateString()} ~{" "}
              {trip.endDate.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href={`/trips/${trip.id}/itinerary/new`}>
            <Button>
              <Plus className="mr-2 size-5" />
              Add Location
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview"> Overview</TabsTrigger>
            <TabsTrigger value="itinerary"> Itinerary</TabsTrigger>
            <TabsTrigger value="map"> Map</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md: grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Trip Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-6 w-6 mr-3" />
                    <div>
                      <p className="font-medium">Dates</p>
                      <p className="text-sm">
                        {trip.startDate.toLocaleDateString()} ~{" "}
                        {trip.endDate.toLocaleDateString()}
                        <br />
                        {`${Math.round(
                          (trip.endDate.getTime() - trip.startDate.getTime()) / (1000*60*60*24)
                        )} day(s)`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
