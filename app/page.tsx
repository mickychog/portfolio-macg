import { Portfolio } from "./components/Portfolio";

export default function Home() {
  return <Portfolio turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />;
}
