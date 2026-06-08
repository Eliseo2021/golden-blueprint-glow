import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/fixture")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
