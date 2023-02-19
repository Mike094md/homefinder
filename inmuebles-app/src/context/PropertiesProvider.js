import { createContext, useState } from "react";

const PropertiesContext = createContext(null);

export const PropertiesProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <PropertiesContext.Provider value={{ user, setUser }}>
      {children}
    </PropertiesContext.Provider>
  );
};
export default PropertiesContext;