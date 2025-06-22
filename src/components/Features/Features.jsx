import styles from "./Features.module.css";

const Features = ({ features }) => {
  return (
    <div className={styles.featuresGrid}>
      {features.map(({ Icon, title, description }, index) => (
        <div
          key={index + "-" + title}
          className={styles.featureCard}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className={styles.iconWrapper}>
            <Icon size={32} strokeWidth={2.5} />
          </div>
          <div className={styles.featureTitle}>{title}</div>
          <div className={styles.featureDescription}>{description}</div>
        </div>
      ))}
    </div>
  );
};

export default Features;
