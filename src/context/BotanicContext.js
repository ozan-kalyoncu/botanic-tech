
import { createContext } from "react";

const BotanicContext  = createContext()

export const BotanicProvider = ({children, user}) => {
    return (
        <BotanicContext.Provider
            value={{
               user: user
            }}
        >
            {children}
        </BotanicContext.Provider>
    )
}

export default BotanicContext;

