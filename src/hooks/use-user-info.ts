import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useUserInfo = () => {
  return useQuery(api.auth.getUserInfo);
};
