import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useUserPreferences = () => {
  return useQuery(api.user.getUserPreferences);
};

export const useSaveUserPreferences = () => {
  return useMutation(api.user.saveUserPreferences).withOptimisticUpdate(
    (localStore, args) => {
      const preferences = localStore.getQuery(api.user.getUserPreferences, {});
      if (!preferences) return;
      localStore.setQuery(
        api.user.getUserPreferences,
        {},
        { ...preferences, ...args.preferences },
      );
    },
  );
};
