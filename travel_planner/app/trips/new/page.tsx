"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTrip } from "@/lib/actions/create-trip";
import { UploadButton } from "@/lib/uploadthings";
import Image from "next/image";
import { useState, useTransition } from "react";

export default function NewTrip() {
  const [isPending, startTransition] = useTransition();
  const [startDate, setStartDate] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader>New Trip</CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-y-4"
            action={(formData: FormData) => {
              if(imageUrl){
                formData.append("imageUrl", imageUrl);
              }
              startTransition(() => {
                createTrip(formData);
              });
            }}
          >
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <Input
                id="title"
                type="text"
                name="title"
                placeholder="e.g 'Japan Trip'"
                required
              />
            </div>
            <div>
              <label htmlFor="desc" className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea
                id="desc"
                name="description"
                placeholder="Trip description"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1"
                >
                  Start Date
                </label>
                <Input
                  id="startDate"
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1"
                >
                  End Date
                </label>
                <Input
                  id="endDate"
                  type="date"
                  name="endDate"
                  min={startDate}
                  required
                />
              </div>
            </div>

            <div>
              <label> Trip Image</label>
              {typeof window !== "undefined" && imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Trip Preview"
                  className="w-full mb-4 rounded-md max-h-48 object-cover"
                  width={400}
                  height={400}
                />
              )}
              <UploadButton
                endpoint={"imageUploader"}
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setImageUrl(res[0].ufsUrl);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("Upload error:", error);
                }}
              />
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Trip"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
