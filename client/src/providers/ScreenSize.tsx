import { createContext, useState, type FC, type ReactNode } from "react";

type SizeContextType = {
    isMediumDevice : boolean,
    setIsMediumDevice : React.Dispatch<React.SetStateAction<boolean>>
}

export const SizeContext = createContext<SizeContextType | undefined>(undefined);

export const SizeProvider : FC<{children : ReactNode}>= ({children}) => {
    const [isMediumDevice,setIsMediumDevice] = useState(window.innerWidth < 1024)
    
    return (
        <SizeContext.Provider value={{isMediumDevice,setIsMediumDevice}}>
            {children}
        </SizeContext.Provider>
    )

}

