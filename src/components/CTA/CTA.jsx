import styles from "./CTA.module.css";

const CTA = ({ cta }) => {
    return (
        < section className={styles.cta} >
            <div className={styles.ctaContent}>
                <h2 className={styles.ctaTitle}>{cta.title}</h2>
                <p className={styles.ctaDescription}>{cta.description}</p>
                <button className={styles.ctaButton}>{cta.buttonText}</button>
            </div>
        </section >
    )
}

export default CTA;