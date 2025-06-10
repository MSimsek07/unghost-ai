
"use server";
import { generateApplicationTips, type GenerateApplicationTipsInput } from "@/ai/flows/generate-application-tips";
import { generateFollowUpEmail, type GenerateFollowUpEmailInput } from "@/ai/flows/generate-follow-up-email";

export async function getApplicationTipsAction(input: GenerateApplicationTipsInput) {
  try {
    console.log("Requesting tips for:", input);
    const result = await generateApplicationTips(input);
    console.log("Tips received:", result);
    return { success: true, tips: result.tips };
  } catch (error) {
    console.error("Error generating application tips:", error);
    return { success: false, error: "İpuçları oluşturulurken bir hata oluştu." };
  }
}

export async function getFollowUpEmailAction(input: GenerateFollowUpEmailInput) {
  try {
    console.log("Requesting follow-up email for:", input);
    const result = await generateFollowUpEmail(input);
    console.log("Follow-up email received:", result);
    return { success: true, subject: result.subject, body: result.body };
  } catch (error) {
    console.error("Error generating follow-up email:", error);
    return { success: false, error: "Takip e-postası oluşturulurken bir hata oluştu." };
  }
}
