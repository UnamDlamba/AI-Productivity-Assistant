import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/strategy")({
  component: () => (
    <CategoryPage category="strategy" title="Strategy Tools" subtitle="See the bigger picture and act on it." />
  ),
});
