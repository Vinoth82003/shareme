import Features from '@/components/Features/Features';
import styles from './page.module.css';
import CTA from '@/components/CTA/CTA';

export default function Home() {

  const features = [
    {
      emoji:"🔐",
      title:"No Sign-Up Required",
      description:"Share instantly without any account"
    },
    {
      emoji:"🔢",
      title:"4-Digit Code",
      description:"Simple codes for quick sharing"
    },
    {
      emoji:"⏱️",
      title:"Auto-Expire",
      description:"Content auto-deletes after 5 minutes"
    },
    {
      emoji:"📎",
      title:"Multiple Formats",
      description:"Share text, links, images & documents"
    },
    {
      emoji:"👤",
      title:"Optional Sign-In",
      description:"Save your shared content history"
    },
    {
      emoji:"💡",
      title:"Clean UI",
      description:"Minimal, fast, and mobile-friendly"
    },
  ]

  const cta = {
    title:"Start Sharing Now",
    description:"No registration required. It's that simple!",
    buttonText:"Try ShareMe!"
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <main className={styles.main}>
        <h1 className={styles.title}>Share Content Instantly</h1>
        <p className={styles.description}>
          No signup needed. Share text, links, images, and documents with just a 4-digit code!
        </p>
        <div className={styles.buttonGroup}>
          <a href='/share' className={styles.primaryButton}>Share me </a>
          <a href='/receive' className={styles.secondaryButton}>Receive</a>
        </div>

        {/* Features Grid */}
        {features && <Features features={features}/>}
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
      <CTA cta={cta}/>
    </div>
  );
}
