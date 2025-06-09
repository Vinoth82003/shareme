"use client";
import { useState } from 'react';
import styles from './receive.module.css';
import Navbar from '@/components/Navbar/Navbar';

export default function ReceivePage() {
    const [code, setCode] = useState(['', '', '', '']);
    const [receivedItem, setReceivedItem] = useState(null);

    const handleCodeChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Auto-focus next input
            if (value && index < 3) {
                const nextInput = document.getElementById(`code-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleGetItem = () => {
        const fullCode = code.join('');
        if (fullCode.length === 4) {
            // TODO: Implement API call to get shared item
            setReceivedItem({
                type: 'image',
                content: 'https://placeholder.com/image.jpg'
            });
        }
    };

    return (
        <div className={styles.container}>
            <Navbar
                leftLink={{ href: '/', text: 'Home' }}
                rightLink={{ href: '/share', text: 'Share' }}
            />
            <div className={styles.receiveBox}>
                <h2>Enter 4-Digit Code</h2>
                <div className={styles.codeInputContainer}>
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            className={styles.codeInput}
                            value={digit}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            maxLength={1}
                        />
                    ))}
                </div>
                <button
                    className={styles.getButton}
                    onClick={handleGetItem}
                    disabled={code.some(digit => !digit)}
                >
                    Get Shared Item
                </button>

                {receivedItem && (
                    <div className={styles.previewContainer}>
                        {receivedItem.type === 'image' ? (
                            <img
                                src={receivedItem.content}
                                alt="Received item"
                                className={styles.imagePreview}
                            />
                        ) : (
                            <div className={styles.filePreview}>
                                <div className={styles.fileInfo}>
                                    <div className={styles.fileName}>shared-file.pdf</div>
                                    <div className={styles.fileType}>PDF Document</div>
                                    <div className={styles.fileSize}>2.5 MB</div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}