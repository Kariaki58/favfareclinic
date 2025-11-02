"use client";

import { useState, useTransition } from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { runOptimizer } from '@/app/lib/actions';
import type { OptimizeHeroCopyOutput } from '@/ai/flows/homepage-hero-copy-optimization';

const mockData = {
  headlineVariations: [
    "Your Smile Deserves Expert Care",
    "Brighten Your Smile with Precision",
    "Modern Dentistry, Gentle Touch",
  ],
  subheadlineVariations: [
    "Experience modern dentistry with a gentle touch.",
    "Trusted by thousands of happy patients.",
    "Where technology meets compassionate care.",
  ],
  clickThroughRates: {
    "headline1_subheadline1": 0.15,
    "headline1_subheadline2": 0.18,
    "headline2_subheadline1": 0.22,
    "headline2_subheadline2": 0.25,
    "headline3_subheadline1": 0.19,
    "headline3_subheadline2": 0.21,
  },
  engagementMetrics: {
    "headline1_subheadline1": 65,
    "headline1_subheadline2": 70,
    "headline2_subheadline1": 85,
    "headline2_subheadline2": 92,
    "headline3_subheadline1": 75,
    "headline3_subheadline2": 80,
  },
};

export default function AiOptimizer() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<OptimizeHeroCopyOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOptimization = () => {
    setError(null);
    setResult(null);
    startTransition(async () => {
      const response = await runOptimizer(mockData);
      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.error ?? "An unknown error occurred.");
      }
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold font-headline">
          AI-Powered Conversion Optimization
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We use cutting-edge AI to analyze visitor interactions and continuously
          refine our messaging. This ensures we're always communicating the
          value of our services in the most effective way, helping more people
          find the care they need.
        </p>
        <Button onClick={handleOptimization} disabled={isPending} className="mt-6">
          {isPending ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-5 w-5" />
          )}
          Run Live Optimization Demo
        </Button>
      </div>

      <Card className="min-h-[300px] flex flex-col justify-center">
        <CardHeader>
          <CardTitle>Optimization Result</CardTitle>
          <CardDescription>
            The AI's suggestion based on mock performance data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isPending && (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p>Analyzing performance data...</p>
            </div>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {result && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="font-semibold text-primary">Optimized Headline:</h4>
                <p className="text-lg font-medium">"{result.optimizedHeadline}"</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary">Optimized Subheadline:</h4>
                <p>"{result.optimizedSubheadline}"</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary">Reasoning:</h4>
                <p className="text-sm text-muted-foreground italic">
                  "{result.reasoning}"
                </p>
              </div>
            </div>
          )}
          {!isPending && !result && !error && (
            <div className="text-center text-muted-foreground">
              Click the button to see the AI in action.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
