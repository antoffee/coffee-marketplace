import React from 'react';

export const useTimer = (initialValue: number) => {
    const [timer, setTimer] = React.useState(initialValue);
    const id = React.useRef<ReturnType<typeof setInterval>>();
    const clear = () => {
        if (id.current) {
            clearInterval(id.current);
        }
    };
    React.useEffect(() => {
        id.current = setInterval(() => {
            setTimer((time) => time - 1);
        }, 1000);
        return () => clear();
    }, []);

    React.useEffect(() => {
        if (timer === 0) {
            clear();
        }
    }, [timer]);

    React.useEffect(() => {
        setTimer(initialValue);
    }, [initialValue]);

    return { timer };
};
