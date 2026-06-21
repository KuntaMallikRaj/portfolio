import type { Metadata } from "next";
import { StoriesSection } from "@/components/Sections";

export const metadata: Metadata = { title: "Production Stories — Kunta Mallik Raj" };

export default function Page() {
  return <StoriesSection />;
}
