import { createContext } from "react";

export const CompletionContext = createContext({
  completed: false,
  setCompletion: (completed: boolean) => {},
});

export const PriceTotalContext = createContext({
    total: 0,
    setTotal: (total: any) => {}
})
