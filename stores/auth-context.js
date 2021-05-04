import { createContext, useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    netlifyIdentity.on('login', (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log('LOGGIN IN');
    });

    netlifyIdentity.on('logout', () => {
      setUser(null);
      console.log('LOGGIN OUT');
    });

    netlifyIdentity.init();
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const context = { user, login, logout };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
