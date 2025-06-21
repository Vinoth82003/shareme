'use client'
import { useEffect, useState } from 'react';
import styles from './receive.module.css';
import Navbar from '@/components/Navbar/Navbar';
import { ButtonLoader, PageLoader } from '@/components/Loading/Loading';

export default function ReceivePage() {
    const [code, setCode] = useState(['', '', '', '']);
    const [receivedItem, setReceivedItem] = useState(null);
    const [copied, setCopied] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isReceiveing, setIsReceiveing] = useState(false);

    function parseTextWithLinks(text) {
        // Regex for URL
        const urlRegex = /((https?:\/\/|www\.)[^\s]+)/gi;
        // Regex for email
        const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;

        // First, replace URLs with links
        let parts = [];
        let lastIndex = 0;

        // Combine URLs and emails into one pass for ordering
        // We will find all matches of URLs and emails, then sort by index

        // Find URLs
        const urlMatches = [...text.matchAll(urlRegex)].map(match => ({
            type: 'url',
            index: match.index,
            length: match[0].length,
            text: match[0]
        }));

        // Find emails
        const emailMatches = [...text.matchAll(emailRegex)].map(match => ({
            type: 'email',
            index: match.index,
            length: match[0].length,
            text: match[0]
        }));

        // Merge and sort by index
        const matches = [...urlMatches, ...emailMatches].sort((a, b) => a.index - b.index);

        // No matches? Just return text as is
        if (matches.length === 0) return [text];

        for (const match of matches) {
            // Add text before the match as normal text
            if (lastIndex < match.index) {
                parts.push(text.slice(lastIndex, match.index));
            }

            // Add link
            if (match.type === 'url') {
                let href = match.text;
                if (!href.startsWith('http')) {
                    href = 'http://' + href; // Add protocol if missing (like www.example.com)
                }
                parts.push(
                    <a
                        key={match.index}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'blue', textDecoration: 'underline' }}
                    >
                        {match.text}
                    </a>
                );
            } else if (match.type === 'email') {
                parts.push(
                    <a
                        key={match.index}
                        href={`mailto:${match.text}`}
                        style={{ color: 'blue', textDecoration: 'underline' }}
                    >
                        {match.text}
                    </a>
                );
            }

            lastIndex = match.index + match.length;
        }

        // Add remaining text after last match
        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }

        return parts;
    }


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
                setIsReceiveing(true);
                const res = await fetch('/api/receive', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code: fullCode }),
                });

                const data = await res.json();

                if (res.ok) {
                    console.log("Content: " + data.content);
                    console.log("Url: " + data.blobUrl);

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
            } finally {
                setIsReceiveing(false);
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


    useEffect(() => {
        setIsPageLoading(false);
    }, [])

    return (
        <div className={styles.container}>
            {isPageLoading && <PageLoader />}
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
                    {isReceiveing ? <ButtonLoader /> : 'Get Shared Item'}
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
                                    {copied ? <span className={styles.copiedText}>Copied!</span> : <span className={styles.copiedText}>Copy</span>}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
                                        <path d="M16 1H4C2.897 1 2 1.897 2 3v14h2V3h12V1zm3 4H8c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h11c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm0 16H8V7h11v14z" />
                                    </svg>
                                </button>

                                <div className={styles.textBox}>
                                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                        {parseTextWithLinks(receivedItem.content)}
                                    </pre>
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