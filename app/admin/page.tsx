import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { AdminPanel } from "./AdminPanel";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (process.env.NODE_ENV !== "development") {
    const user = await requireChatGPTUser("/admin");
    const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    if (!allowedEmail || user.email.toLowerCase() !== allowedEmail) {
      return <main className="access-denied"><p className="section-index">Acceso restringido</p><h1>Esta cuenta no administra el portafolio.</h1><Link className="secondary-button" href="/">Volver al portafolio</Link></main>;
    }
  }
  return <AdminPanel />;
}
