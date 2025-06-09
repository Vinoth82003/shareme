import { motion, AnimatePresence } from 'framer-motion';
import styles from "./model.module.css";

const Model = ({ isOpen, setIsOpen, model }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.modelContainer}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className={styles.modelOverlay}
                        onClick={() => setIsOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.div
                        className={styles.model}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 300
                        }}
                    >
                        <motion.button
                            className={styles.closeButton}
                            onClick={() => setIsOpen(false)}
                            whileHover={{ rotate: 90, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            ✕
                        </motion.button>

                        <motion.h1
                            className={styles.modelTitle}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            {model?.title || "Model Title"}
                        </motion.h1>

                        {model?.icon && <motion.div
                            className={styles.modelIcon}
                            initial={{ scale: 0 }}
                            animate={{ scale: [1.2, 1] }}
                            transition={{
                                type: "spring",
                                delay: 0.2,
                                stiffness: 500,
                                damping: 15
                            }}
                        >
                            {model?.icon || "✨"}
                        </motion.div>}

                        <motion.p
                            className={styles.modelText}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {model?.text || "Your content goes here"}
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Model;