// src/app/saved-roadmaps/page.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockRoadmaps = [
  {
    id: "1",
    title: "Become Backend Developer",
    steps: 5,
    date: "2025-06-15",
  },
  {
    id: "2",
    title: "Crack GATE Exam",
    steps: 7,
    date: "2025-06-10",
  },
];

export default function SavedRoadmapsPage() {
  return (
    <div className="min-h-screen px-6 py-12 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-8 text-center">📚 Saved Roadmaps</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockRoadmaps.map((roadmap) => (
          <Card key={roadmap.id} className="bg-white shadow-lg hover:shadow-xl transition">
            <CardContent className="p-5 space-y-2">
              <h2 className="text-xl font-semibold">{roadmap.title}</h2>
              <p className="text-sm text-muted-foreground">{roadmap.steps} steps</p>
              <p className="text-sm text-muted-foreground">Generated on: {roadmap.date}</p>
              <Button className="mt-2 w-full" variant="outline">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}