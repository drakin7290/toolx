import { useEffect } from "react";
import { useState } from "react";
import LoadingContainer from "~/containers/LoadingContainer";

const { createContext } = require("react");

export const LoadingContext = createContext()

const LoadingProvider = ({ children }) => {

    const [watchLoading, setWatchLoading] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    function checkAllPropsTruthy(obj) {
        for (let key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }
            if (!obj[key]) {
                return false; // If any property has a falsy value, return false
            }
        }
        return true; // All properties have truthy values
    }

    useEffect(() => {
        setIsLoading(checkAllPropsTruthy(watchLoading))
    }, [watchLoading])


    return <LoadingContext.Provider value={[]}>
        {
            isLoading && <LoadingContainer />
        }
        {children}
    </LoadingContext.Provider>
}

export default LoadingProvider
