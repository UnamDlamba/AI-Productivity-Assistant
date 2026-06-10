import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/content")({
  component: () => (
    <CategoryPage category="content" title="Content Tools" subtitle="From caption to calendar in one flow." />
  ),
});
