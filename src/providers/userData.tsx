import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

interface Children {
  children: JSX.Element;
}
interface UserContextState {
  user: string | null;
  setUser: Dispatch<string | null>;
  userSettings: UserSettings;
  setUserSettings: Dispatch<SetStateAction<UserSettings>>;
  userShifts: UserShift[];
  setUserShifts: Dispatch<UserShift[]>;
}

export const UserDataContext = createContext({} as UserContextState);

const UserDataProvider: FC<Children> = ({ children }) => {
  const [user, setUser] = useState<null | string>(null);
  const [userSettings, setUserSettings] = useState<UserSettings>({} as UserSettings);
  const [userShifts, setUserShifts] = useState<UserShift[]>([] as UserShift[]);

  return <UserDataContext.Provider value={{ user, setUser, userSettings, setUserSettings, userShifts, setUserShifts }}>{children}</UserDataContext.Provider>;
};

export default UserDataProvider;
