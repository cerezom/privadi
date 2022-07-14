import { useEffect } from 'react';

export default function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = event => {
                // Do nothing if clicking ref's element or descendent elements
                // let timer;
                if (ref.current.contains(event.target)) {

                    // clearInterval(timer);
                    // timer = setTimeout((event) => {
                    //     handler(event);
                    // }, 5000);

                }

                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        [ref, handler]
    );
}
