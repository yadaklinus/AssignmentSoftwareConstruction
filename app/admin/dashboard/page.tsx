import { prisma } from "@/lib/prisma";
import { AdminDashboard } from "@/components/AdminDashboard";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const isAuth = await verifyAuth();
  
  if (!isAuth) {
    redirect("/admin/login");
  }

  const responses = await prisma.surveyResponse.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="py-8">
      <AdminDashboard responses={responses} />
    </div>
  );
}
