import styles from "./Features.module.css";

const Features = ({ features }) => {
    return (
        <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
                <div key={index + "-" + feature.title} className={styles.featureCard} style={{ animationDelay: index * 0.2 + "s" }}>
                    <h1 className={styles.emoji}>
                        {feature.emoji}
                    </h1>
                    <div className={styles.featureTitle}>
                        {feature.title}
                    </div>
                    <div className={styles.featureDescription}>
                        {feature.description}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Features;