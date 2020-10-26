import React, { useEffect, useState } from 'react';
import './style.scss';

type Props = {
    message: string
}

export function MessageToast({ message }: Props) {
    const [isVisible, setIsVisible] = useState(true);
    
    useEffect(() => {
        setTimeout(() => setIsVisible(false), 2500);
    }, []);
    
    if (!isVisible) {
        return null;
    }

    return <p className="Message-Toast">{message}</p>
}