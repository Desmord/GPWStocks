import { useState, useEffect, useCallback } from "react";

const useShowHide = (isComponentDisplay: boolean) => {
    const [isDisplay, setIsDisplay] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [animationTime] = useState(500);

    const hide = useCallback(() => {
        setIsShown(false)
        setTimeout(() => setIsDisplay(false), animationTime);
    }, [animationTime])

    const show = useCallback(() => {
        setIsDisplay(true);
        setTimeout(() => setIsShown(true), animationTime);
    }, [animationTime])

    useEffect(() => isComponentDisplay ? show() : hide(), [isComponentDisplay, hide, show])

    return {
        isDisplay,
        isShown,
    }

}

export default useShowHide