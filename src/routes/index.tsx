import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/auth";
import { Todos } from "@/components/todos";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/auth" from="/" />

  return <Todos />;
}
