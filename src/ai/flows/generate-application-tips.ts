'use server';

/**
 * @fileOverview Provides AI-powered tips based on the application status.
 *
 * - generateApplicationTips - A function that generates tips for a job application.
 * - GenerateApplicationTipsInput - The input type for the generateApplicationTips function.
 * - GenerateApplicationTipsOutput - The return type for the generateApplicationTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateApplicationTipsInputSchema = z.object({
  status: z
    .string()
    .describe(
      'The current status of the job application (e.g., applied, interviewed, offer received, rejected).'
    ),
  companyName: z.string().describe('The name of the company applied to.'),
  position: z.string().describe('The position applied for.'),
});
export type GenerateApplicationTipsInput = z.infer<typeof GenerateApplicationTipsInputSchema>;

const GenerateApplicationTipsOutputSchema = z.object({
  tips: z.string().describe('AI-generated tips based on the application status.'),
});
export type GenerateApplicationTipsOutput = z.infer<typeof GenerateApplicationTipsOutputSchema>;

export async function generateApplicationTips(
  input: GenerateApplicationTipsInput
): Promise<GenerateApplicationTipsOutput> {
  return generateApplicationTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateApplicationTipsPrompt',
  input: {schema: GenerateApplicationTipsInputSchema},
  output: {schema: GenerateApplicationTipsOutputSchema},
  prompt: `You are an AI assistant providing tips to job seekers in Turkey. The job seeker has applied to {{companyName}} for the position of {{position}} and the current status is {{status}}. Provide relevant and helpful tips in Turkish to improve their chances of success, be encouraging and supportive, and assume they are looking for jobs in the technology industry.

Tips:`,}
);

const generateApplicationTipsFlow = ai.defineFlow(
  {
    name: 'generateApplicationTipsFlow',
    inputSchema: GenerateApplicationTipsInputSchema,
    outputSchema: GenerateApplicationTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
