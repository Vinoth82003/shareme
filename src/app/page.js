import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <main className={styles.main}>
        <h1 className={styles.title}>Share Content Instantly</h1>
        <p className={styles.description}>
          No signup needed. Share text, links, images, and documents with just a 4-digit code!
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.primaryButton}>Share Now</button>
          <button className={styles.secondaryButton}>Receive</button>
        </div>

        {/* Features Grid */}
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.emoji}>🔐</div>
            <h3 className={styles.featureTitle}>No Sign-Up Required</h3>
            <p className={styles.featureDescription}>Share instantly without any account</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.emoji}>🔢</div>
            <h3 className={styles.featureTitle}>4-Digit Code</h3>
            <p className={styles.featureDescription}>Simple codes for quick sharing</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.emoji}>⏱️</div>
            <h3 className={styles.featureTitle}>Auto-Expire</h3>
            <p className={styles.featureDescription}>Content auto-deletes after 5 minutes</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.emoji}>📎</div>
            <h3 className={styles.featureTitle}>Multiple Formats</h3>
            <p className={styles.featureDescription}>Share text, links, images & documents</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.emoji}>👤</div>
            <h3 className={styles.featureTitle}>Optional Sign-In</h3>
            <p className={styles.featureDescription}>Save your shared content history</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.emoji}>💡</div>
            <h3 className={styles.featureTitle}>Clean UI</h3>
            <p className={styles.featureDescription}>Minimal, fast, and mobile-friendly</p>
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <div className={styles.emoji}>📤</div>
            <h3 className={styles.stepTitle}>Share</h3>
            <p className={styles.stepDescription}>Click Share, choose your content type, and get a 4-digit code instantly</p>
          </div>
          <div className={styles.step}>
            <div className={styles.emoji}>📥</div>
            <h3 className={styles.stepTitle}>Receive</h3>
            <p className={styles.stepDescription}>Enter the 4-digit code to instantly access shared content</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Start Sharing Now</h2>
          <p className={styles.ctaDescription}>No registration required. It's that simple!</p>
          <button className={styles.ctaButton}>Try ShareMe</button>
        </div>
      </section>
    </div>
  );
}
