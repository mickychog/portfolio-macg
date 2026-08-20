import { getChatGPTUser } from "@/app/chatgpt-auth";

export async function isPortfolioAdmin() {
  if (process.env.NODE_ENV === "development") return true;
  const user = await getChatGPTUser();
  const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return Boolean(user && allowedEmail && user.email.toLowerCase() === allowedEmail);
}
