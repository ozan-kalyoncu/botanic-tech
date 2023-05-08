
import { createContext } from "react";

const BotanicContext  = createContext()

export const BotanicProvider = ({children, user, baseUrl}) => {
    return (
        <BotanicContext.Provider
            value={{
               user: user,
               baseUrl: baseUrl
            }}
        >
            {children}
        </BotanicContext.Provider>
    )
}

export default BotanicContext;

