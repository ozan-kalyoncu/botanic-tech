
import { createContext } from "react";

const BotanicContext  = createContext()

export const BotanicProvider = ({children, user, baseUrl, isExpired, hasSubscription}) => {
    return (
        <BotanicContext.Provider
            value={{
               user: user,
               baseUrl: baseUrl,
               isExpired: isExpired,
               hasSubscription: hasSubscription
            }}
        >
            {children}
        </BotanicContext.Provider>
    )
}

export default BotanicContext;

