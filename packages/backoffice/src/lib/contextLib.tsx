import { useContext, createContext } from "react";

interface UserContext {
  isAuthenticated: boolean;
  userHasAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContext = {
  isAuthenticated: false,
};

export const AppContext = createContext<UserContext>(defaultContext);

export function useAppContext() {
  return useContext(AppContext);
}
