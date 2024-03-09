import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext(null);

// Context.Provider
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    (sessionStorage.getItem('userSession') ? JSON.parse(sessionStorage.getItem('userSession')) : null)
  );

  useEffect(() => {
    sessionStorage.setItem('userSession', JSON.stringify(user));
  }, [user, setUser])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

// Context.Consumer
export const useUserContext = () => {
  return useContext(UserContext)
}