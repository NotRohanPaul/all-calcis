import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const TIME_LIMIT = 3000;

const MessageBox = ({ message }: {
    message: string,
}) => {
    const [isMessageBoxVisible, setIsMessageBoxVisible] = useState<boolean>(true);

    useEffect(() => {
        const closeTimer = setTimeout(() => setIsMessageBoxVisible(false), TIME_LIMIT);

        return () => {
            clearTimeout(closeTimer);
        };
    }, []);

    return isMessageBoxVisible && createPortal(
        <div className='group/container max-w-60 max-h-44 fixed top-12 right-2 flex items-center justify-center text-xl break-all p-4 bg-gray-900 border border-white rounded-sm select-none'>
            {message}
            <div className='absolute bottom-0 left-0 h-1 bg-white animate-[progress_linear]'
                style={{
                    animationDuration: `${TIME_LIMIT}ms`
                }}
            ></div>
        </div>,
        document.body
    );
};

export default MessageBox;
