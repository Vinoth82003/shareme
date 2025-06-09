'use client'
import { useState, useRef } from 'react'
import styles from './page.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import Model from '@/components/Model/Model'
import Navbar from '@/components/Navbar/Navbar';

const SharePage = () => {
    const [isDragging, setIsDragging] = useState(false)
    const [filePreview, setFilePreview] = useState(null)
    const [fileDetails, setFileDetails] = useState(null)
    const [shareContent, setShareContent] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [shareCode, setShareCode] = useState(null);
    const fileInputRef = useRef(null)

    const handleDragEnter = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const files = e.dataTransfer.files
        if (files.length) {
            handleFiles(files[0])
        }
    }

    const handleFiles = (file) => {
        setFileDetails({
            name: file.name,
            type: file.type || 'Unknown type',
            size: formatFileSize(file.size)
        })

        if (file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setFilePreview(e.target.result)
            }
            reader.readAsDataURL(file)
        } else {
            setFilePreview('/file.svg')
        }
    }

    const handleRemoveFile = () => {
        setFilePreview(null)
        setFileDetails(null)
        setShareContent('')
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const handleShare = async () => {
        try {
            setIsUploading(true);
            const formData = new FormData();

            if (filePreview && fileDetails) {
                // Get the file from the input ref
                const file = fileInputRef.current.files[0];
                formData.append('file', file);
            } else if (shareContent) {
                formData.append('text', shareContent);
            }

            const response = await fetch('/api/share', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            setShareCode(data.code);
            setIsOpen(true);
        } catch (error) {
            console.error('Share error:', error);
            // Handle error (show error message to user)
        } finally {
            setIsUploading(false);
        }
    };

    const model = {
        title: shareCode ? 'Share Code Generated!' : 'Error',
        icon: shareCode ? '✔️' : '❌',
        text: shareCode
            ? `Your share code is: ${shareCode}\nThis code will expire in 5 minutes.`
            : 'Failed to generate share code. Please try again.'
    };

    return (
        <div className={styles.container}>
            <Navbar
                leftLink={{ href: '/', text: 'Home' }}
                rightLink={{ href: '/receive', text: 'Receive' }}
            />
            <Model isOpen={isOpen} setIsOpen={setIsOpen} model={model} />
            <div className={styles.shareBox}>
                {!filePreview ? (
                    <motion.div
                        className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.uploadIcon}>
                            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                        </div>
                        <h2>Drop files here or</h2>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className={styles.hiddenInput}
                            onChange={(e) => e.target.files[0] && handleFiles(e.target.files[0])}
                            accept="image/*,.pdf,.doc,.docx,.txt"
                        />
                        <button
                            className={styles.browseButton}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Browse Files
                        </button>
                        <p className={styles.separator}>or</p>
                        <div className={styles.textInputContainer}>
                            <textarea
                                className={styles.textInput}
                                placeholder="Type or paste text to share..."
                                value={shareContent}
                                onChange={(e) => setShareContent(e.target.value)}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        className={styles.previewContainer}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.filePreview}>
                            <img
                                src={filePreview}
                                alt="Preview"
                                className={filePreview.startsWith('data:image') ? styles.imagePreview : styles.fileIcon}
                            />
                            {fileDetails && (
                                <div className={styles.fileInfo}>
                                    <p className={styles.fileName}>{fileDetails.name}</p>
                                    <p className={styles.fileType}>{fileDetails.type}</p>
                                    <p className={styles.fileSize}>{fileDetails.size}</p>
                                </div>
                            )}
                        </div>
                        <button
                            className={styles.removeButton}
                            onClick={handleRemoveFile}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </motion.div>
                )}
                <motion.button
                    className={styles.shareButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={(!filePreview && !shareContent) || isUploading}
                    onClick={handleShare}
                >
                    {isUploading ? 'Uploading...' : 'Get Share Code'}
                </motion.button>
            </div>
        </div>
    )
}

export default SharePage
