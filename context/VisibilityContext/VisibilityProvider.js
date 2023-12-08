import { createContext } from 'react';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const VisibilityContext = createContext();

const VisibilityProvider = ({ children }) => {
  const [modal, setModal] = useState({});
  return (
    <>
      <VisibilityContext.Provider
        value={{
          visibility: {
            demo: {},
            demo2: {},
          },
          modal: {
            state: modal,
            setState: setModal,
          },
        }}
      >
        {children}
      </VisibilityContext.Provider>
    </>
  );
};

export { VisibilityContext };
export default VisibilityProvider;
