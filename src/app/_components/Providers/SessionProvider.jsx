// "use client";
// import { createContext, useContext, useState } from "react";

// export const SessionContext = createContext(null);

// const SessionContextProvider = ({ children }) => {
//   const [session, setSession] = useState(null);

//   return (
//     <SessionContext.Provider value={{ session, setSession }}>
//       {children}
//     </SessionContext.Provider>
//   );
// };
// export default SessionContextProvider;

// export const useUser = () => useContext(SessionContext)