"use client";
import { useState, useEffect } from "react";
import Features from "@/components/Features/Features";
import styles from "./page.module.css";
import CTA from "@/components/CTA/CTA";
import { PageLoader } from "@/components/Loading/Loading";
import {
  Upload,
  Download,
  Lock,
  Hash,
  Clock,
  Paperclip,
  User,
  Lightbulb,
} from "lucide-react";

export default function Home() {
  const [isPageLoading, setIsPageLoading] = useState(true);

  const features = [
    {
      Icon: Lock,
      title: "No Sign-Up Required",
      description: "Share instantly without any account",
    },
    {
      Icon: Hash,
      title: "4-Digit Code",
      description: "Simple codes for quick sharing",
    },
    {
      Icon: Clock,
      title: "Auto-Expire",
      description: "Content auto-deletes after 5 minutes",
    },
    {
      Icon: Paperclip,
      title: "Multiple Formats",
      description: "Share text, links, images & documents",
    },
    {
      Icon: User,
      title: "Optional Sign-In",
      description: "Save your shared content history",
    },
    {
      Icon: Lightbulb,
      title: "Clean UI",
      description: "Minimal, fast, and mobile-friendly",
    },
  ];

  const cta = {
    title: "Start Sharing Now",
    description: "No registration required. It's that simple!",
    buttonText: "Try ShareMe!",
    href: "/share",
  };

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  return (
    <div className={styles.container}>
      {isPageLoading && <PageLoader />}
      {/* Hero Section */}
      <main className={styles.main}>
        <h1 className={styles.title}>Share Content Instantly</h1>
        <p className={styles.description}>
          No signup needed. Share text, links, images, and documents with just a
          4-digit code!
        </p>
        <div className={styles.buttonGroup}>
          <a href="/share" className={styles.primaryButton}>
            Share me{" "}
          </a>
          <a href="/receive" className={styles.secondaryButton}>
            Receive
          </a>
        </div>

        {/* Features Grid */}
        {features && <Features features={features} />}
      </main>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <h2 className={styles.title}>How It Works</h2>
        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <div className={styles.iconCircle}>
              <Upload size={32} strokeWidth={2.5} />
            </div>
            <h3 className={styles.stepTitle}>Share</h3>
            <p className={styles.stepDescription}>
              Upload content and get a 4-digit code.
            </p>
          </div>

          <div className={styles.step}>
            <div className={styles.iconCircle}>
              <Download size={32} strokeWidth={2.5} />
            </div>
            <h3 className={styles.stepTitle}>Receive</h3>
            <p className={styles.stepDescription}>
              Enter code to download the shared file or shared content.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA cta={cta} />

      <section className={styles.contactCTA}>
        <h2>Need Help or Have Questions?</h2>
        <p>
          I am love to hear from you. Reach out and I’ll get back to you ASAP.
        </p>
        <a href="/contact-us" className={styles.primaryButton}>
          Contact Me
        </a>
      </section>
    </div>
  );
}
