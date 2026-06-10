import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/productivity")({
  component: () => (
    <CategoryPage category="productivity" title="Productivity Tools" subtitle="Move faster on the work that matters." />
  ),
});
