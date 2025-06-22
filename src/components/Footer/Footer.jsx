"use client";
import styles from "./Footer.module.css";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <h2 className={styles.footerLogo}>ShareNow 🚀</h2>

        <nav className={styles.footerNav}>
          <a href="/" className={styles.footerLink}>
            Home
          </a>
          <a href="/share" className={styles.footerLink}>
            Share
          </a>
          <a href="/receive" className={styles.footerLink}>
            Receive
          </a>
          <a href="/privacy" className={styles.footerLink}>
            Privacy
          </a>
        </nav>

        <div className={styles.footerSocial}>
          <a
            href="https://github.com/Vinoth82003"
            target="_blank"
            className={styles.socialIcon}
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/vinoth82003"
            target="_blank"
            className={styles.socialIcon}
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:vinothg0618@gmail.com"
            className={styles.socialIcon}
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>

        <p className={styles.footerNote}>
          &copy; {year} ShareNow — Developed by <strong>Vinoth S</strong>
        </p>
      </div>
    </footer>
  );
}
