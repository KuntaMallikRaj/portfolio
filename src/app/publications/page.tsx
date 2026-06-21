import type { Metadata } from "next";
import { PublicationsSection } from "@/components/Sections";

export const metadata: Metadata = { title: "Publications — Kunta Mallik Raj" };

export default function Page() {
  return <PublicationsSection />;
}
