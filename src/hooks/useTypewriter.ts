import { useState, useEffect } from "react";

/**
 * Custom hook to create a looping typewriter effect.
 * @param text The string to be typed out.
 * @param speed Typing speed in milliseconds.
 * @param pause Duration to wait before deleting starts.
 */
export const useTypewriter = (text: string, speed = 100, pause = 3000) => {
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        let index = 0;
        let isDeleting = false;
        let timer: NodeJS.Timeout;

        const typeLoop = () => {
            if (!isDeleting && index <= text.length) {
                // Currently Typing
                setTypedText(text.substring(0, index));
                index++;
                timer = setTimeout(typeLoop, speed);
            } else if (!isDeleting && index > text.length) {
                // Reached the end, start pause before deleting
                isDeleting = true;
                timer = setTimeout(typeLoop, pause);
            } else if (isDeleting && index >= 0) {
                // Currently Deleting
                setTypedText(text.substring(0, index));
                index--;
                timer = setTimeout(typeLoop, speed / 2);
            } else if (isDeleting && index < 0) {
                // Restart the loop
                isDeleting = false;
                index = 0;
                timer = setTimeout(typeLoop, 500);
            }
        };

        timer = setTimeout(typeLoop, 500);
        return () => clearTimeout(timer);
    }, [text, speed, pause]);

    return typedText;
};