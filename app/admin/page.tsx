import { cookies } from "next/headers";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const initialIsAuthenticated = verifySessionToken(token);

  return <AdminDashboard initialIsAuthenticated={initialIsAuthenticated} />;
}
