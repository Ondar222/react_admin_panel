import { WithChildren } from "@/types/WithChildren"
import { FC, createContext } from "react"

const I18nContext = createContext({})

const I18NProvider: FC<WithChildren> = ({ children }) => {
    return (
        <I18nContext.Provider value={null}>
            {children}
        </I18nContext.Provider>
    )
}

export { I18NProvider }