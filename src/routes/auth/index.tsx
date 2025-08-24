import { useAuth } from '@/hooks/auth';
import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/" : "/auth/signin"} from="/auth" />
}
