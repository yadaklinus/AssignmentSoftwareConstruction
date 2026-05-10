"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitSurvey(formData: {
  gender: string;
  department: string;
  restaurantChoice: string;
  reason: string;
}) {
  try {
    await prisma.surveyResponse.create({
      data: {
        gender: formData.gender,
        department: formData.department,
        restaurantChoice: formData.restaurantChoice,
        reason: formData.reason,
      },
    });
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Survey submission error:", error);
    return { success: false, error: "Failed to submit survey" };
  }
}
