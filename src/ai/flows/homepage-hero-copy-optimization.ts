'use server';

/**
 * @fileOverview Optimizes the hero section copy (headline and subheadline) based on user interaction data.
 *
 * - optimizeHeroCopy - A function that analyzes and suggests the best performing copy combinations.
 * - OptimizeHeroCopyInput - The input type for the optimizeHeroCopy function.
 * - OptimizeHeroCopyOutput - The return type for the optimizeHeroCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeHeroCopyInputSchema = z.object({
  headlineVariations: z.array(z.string()).describe('An array of headline variations to analyze.'),
  subheadlineVariations: z.array(z.string()).describe('An array of subheadline variations to analyze.'),
  clickThroughRates: z
    .record(z.number())
    .describe(
      'A record of click-through rates for each headline and subheadline combination (keys are combination identifiers).' /* Example: { 'headline1_subheadline1': 0.15, 'headline2_subheadline2': 0.20 } */
    ),
  engagementMetrics: z
    .record(z.number())
    .describe(
      'A record of engagement metrics (e.g., time on page, bounce rate) for each headline and subheadline combination.' /* Example: { 'headline1_subheadline1': 60, 'headline2_subheadline2': 75 } (seconds) */
    ),
});
export type OptimizeHeroCopyInput = z.infer<typeof OptimizeHeroCopyInputSchema>;

const OptimizeHeroCopyOutputSchema = z.object({
  optimizedHeadline: z.string().describe('The suggested optimized headline.'),
  optimizedSubheadline: z.string().describe('The suggested optimized subheadline.'),
  reasoning: z.string().describe('The AI’s reasoning for selecting the optimized combination.'),
});
export type OptimizeHeroCopyOutput = z.infer<typeof OptimizeHeroCopyOutputSchema>;

export async function optimizeHeroCopy(input: OptimizeHeroCopyInput): Promise<OptimizeHeroCopyOutput> {
  return optimizeHeroCopyFlow(input);
}

const optimizeHeroCopyPrompt = ai.definePrompt({
  name: 'optimizeHeroCopyPrompt',
  input: {schema: OptimizeHeroCopyInputSchema},
  output: {schema: OptimizeHeroCopyOutputSchema},
  prompt: `You are an AI copy optimizer for website hero sections. Analyze the provided headline and subheadline variations along with their click-through rates and engagement metrics to suggest the best performing combination.

Headline Variations:
{{#each headlineVariations}}- {{{this}}}
{{/each}}

Subheadline Variations:
{{#each subheadlineVariations}}- {{{this}}}
{{/each}}

Click-Through Rates:
{{#each (lookup @root.clickThroughRates)}}
 - Headline and Subheadline Combination {{@key}}: {{{this}}}
{{/each}}

Engagement Metrics (Time on Page):
{{#each (lookup @root.engagementMetrics)}}
 - Headline and Subheadline Combination {{@key}}: {{{this}}} seconds
{{/each}}

Based on this data, which headline and subheadline combination would likely result in the highest user engagement and click-through rates? Explain your reasoning, considering both click-through rates and engagement metrics, then suggest the best headline and subheadline.

Optimized Headline: 
Optimized Subheadline: 
Reasoning: `,
});

const optimizeHeroCopyFlow = ai.defineFlow(
  {
    name: 'optimizeHeroCopyFlow',
    inputSchema: OptimizeHeroCopyInputSchema,
    outputSchema: OptimizeHeroCopyOutputSchema,
  },
  async input => {
    const {output} = await optimizeHeroCopyPrompt(input);
    return output!;
  }
);
