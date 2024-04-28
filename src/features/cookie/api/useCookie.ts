import { useState, useCallback } from "react"
import Cookies from "js-cookie"

function useCookie(name: string, defaultValue?: string) {
    const [cookieValue, setCookieValue] = useState<string | null>(() => {

        const cookie = Cookies.get(name)
        if (cookie) return cookie
        Cookies.set(name, defaultValue)
        return defaultValue
    })

    const updateCookie = useCallback(
        (newValue: string, options: Cookies.CookieAttributes) => {
            Cookies.set(name, newValue, options)
            setCookieValue(newValue)
        },
        [name]
    )

    const deleteCookie = useCallback(() => {
        Cookies.remove(name)
        setCookieValue(null)
    }, [name])

    return { cookieValue, updateCookie, deleteCookie }
}

export { useCookie }