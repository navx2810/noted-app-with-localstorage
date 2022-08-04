import { useEffect, useMemo, useState } from "react";

export default function useStateWithStorage(key, initialValue = null) {
    const existing = useMemo(() => {
        const storage = localStorage.getItem(key)
        return storage ? JSON.parse(storage) : null
    }, [key])
    
    const [state, setState] = useState(existing ? existing : initialValue)

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [state])

    return [state, setState]
}