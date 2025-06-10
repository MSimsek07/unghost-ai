'use server';
/**
 * @fileOverview AI agent that generates a follow-up email to a recruiter in Turkish.
 *
 * - generateFollowUpEmail - A function that generates the follow-up email.
 * - GenerateFollowUpEmailInput - The input type for the generateFollowUpEmail function.
 * - GenerateFollowUpEmailOutput - The return type for the generateFollowUpEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFollowUpEmailInputSchema = z.object({
  recruiterEmail: z.string().describe('The email address of the recruiter.'),
  companyName: z.string().describe('The name of the company the user applied to.'),
  position: z.string().describe('The position the user applied for.'),
  applicationDate: z.string().describe('The date the user submitted the application (YYYY-MM-DD).'),
});
export type GenerateFollowUpEmailInput = z.infer<typeof GenerateFollowUpEmailInputSchema>;

const GenerateFollowUpEmailOutputSchema = z.object({
  subject: z.string().describe('The subject of the follow-up email.'),
  body: z.string().describe('The body of the follow-up email, written in Turkish.'),
});
export type GenerateFollowUpEmailOutput = z.infer<typeof GenerateFollowUpEmailOutputSchema>;

export async function generateFollowUpEmail(
  input: GenerateFollowUpEmailInput
): Promise<GenerateFollowUpEmailOutput> {
  return generateFollowUpEmailFlow(input);
}

const generateFollowUpEmailPrompt = ai.definePrompt({
  name: 'generateFollowUpEmailPrompt',
  input: {schema: GenerateFollowUpEmailInputSchema},
  output: {schema: GenerateFollowUpEmailOutputSchema},
  prompt: `You are an AI assistant specializing in writing professional follow-up emails in Turkish. A job seeker has applied for a job and has not heard back from the recruiter in two weeks. You will generate an email to the recruiter in Turkish to check on the status of their application.

  Include a polite and professional tone and express continued interest in the position.

  Do not be overly pushy or demanding.

  Use a professional subject line.

  Include the following information:
  - Recruiter Email: {{{recruiterEmail}}}
  - Company Name: {{{companyName}}}
  - Position: {{{position}}}
  - Application Date: {{{applicationDate}}}

  The output should be in Turkish.
`,
});

const generateFollowUpEmailFlow = ai.defineFlow(
  {
    name: 'generateFollowUpEmailFlow',
    inputSchema: GenerateFollowUpEmailInputSchema,
    outputSchema: GenerateFollowUpEmailOutputSchema,
  },
  async input => {
    const {output} = await generateFollowUpEmailPrompt(input);
    return output!;
  }
);
