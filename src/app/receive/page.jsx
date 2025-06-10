"use client";
import { useEffect, useState } from 'react';
import styles from './receive.module.css';
import Navbar from '@/components/Navbar/Navbar';

export default function ReceivePage() {
    const [code, setCode] = useState(['', '', '', '']);
    const [receivedItem, setReceivedItem] = useState(null);
    const [copied, setCopied] = useState(false);

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

    const handleGetItem = async () => {
        const fullCode = code.join('');
        if (fullCode.length === 4) {
            try {
                const res = await fetch('/api/receive', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code: fullCode }),
                });

                const data = await res.json();

                if (res.ok) {
                    console.log("Content: "+data.content);
                    console.log("Url: "+data.blobUrl);
                    
                    setReceivedItem({
                        type: data.type,
                        content: data.content,
                        url: data.blobUrl,
                    });
                } else {
                    alert(data.error || 'Something went wrong');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                alert('Server error. Please try again.');
            }
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => alert('Failed to copy'));
    };


    useEffect(()=>{handleGetItem();},[])

    return (
        <div className={styles.container}>
            <Navbar
                leftLink={{ href: '/', text: 'Home' }}
                rightLink={{ href: '/share', text: 'Share' }}
            />
            <div className={styles.receiveBox} style={{ maxWidth: receivedItem ? 'unset' : '400px' }}>
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
                    <div className={styles.textPreviewWrapper}>
                        {receivedItem.type === 'text' ? (
                            <div className={styles.copyWrapper}>
                                <button
                                    className={styles.copyIconButton}
                                    onClick={() => handleCopy(receivedItem.content)}
                                    aria-label="Copy text"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
                                        <path d="M16 1H4C2.897 1 2 1.897 2 3v14h2V3h12V1zm3 4H8c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h11c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm0 16H8V7h11v14z" />
                                    </svg>
                                </button>
                                {copied && <span className={styles.copiedText}>Copied!</span>}
                                <div className={styles.textBox}>
                                    <pre>{receivedItem.content}</pre>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.filePreviewWrapper}>
                                {receivedItem.url &&
                                    /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(receivedItem.url) ? (
                                    <img
                                        src={receivedItem.url}
                                        alt={receivedItem.content}
                                        className={styles.imagePreview}
                                    />

                                ) : (
                                    <iframe
                                        src={receivedItem.url}
                                        title="File Preview"
                                        className={styles.fileIframe}
                                    />
                                )}

                                <a
                                    href={receivedItem.url}
                                    download={receivedItem.content}
                                    className={styles.downloadLink}
                                >
                                    ⬇ Download {receivedItem.content}
                                </a>
                            </div>
                        )}
                    </div>
                )}


            </div>
        </div>
    );
}