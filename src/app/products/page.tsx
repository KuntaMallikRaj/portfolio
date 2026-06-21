import type { Metadata } from "next";
import { ProductsSection } from "@/components/Sections";

export const metadata: Metadata = { title: "Founded Products — Kunta Mallik Raj" };

export default function Page() {
  return <ProductsSection />;
}
