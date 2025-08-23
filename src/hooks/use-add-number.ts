import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useAddNumber = () => {
  return useMutation(api.myFunctions.addNumber).withOptimisticUpdate(
    (localStore, args) => {
      const list = localStore.getQuery(api.myFunctions.listNumbers, {
        count: 10,
      });
      if (list !== undefined) {
        localStore.setQuery(
          api.myFunctions.listNumbers,
          { count: 10 },
          { ...list, numbers: [...list.numbers, args.value] },
        );
      }
    },
  );
};
