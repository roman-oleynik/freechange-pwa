import React, {useState, useEffect} from 'react';
import './style.scss';

function BackOnlineMessage() {
    const [isVisible, setIsVisible] = useState(true);
    
    useEffect(() => {
        setTimeout(() => setIsVisible(false), 800);
    })
    
    if (isVisible) {
        return (
            <div className="Back-Online-Message-Toast">
                Соединение установлено
            </div>
        );
    } else {
        return null;
    }
}

export default BackOnlineMessage;