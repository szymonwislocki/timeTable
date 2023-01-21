import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

interface Children {
  children: JSX.Element;
}
interface AuthContextState {
  user: string | null;
  setUser: Dispatch<string | null>;
}
export const AuthContext = createContext({} as AuthContextState);

const AuthProvider: FC<Children> = ({ children }) => {
  const [user, setUser] = useState<null | string>(null);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
