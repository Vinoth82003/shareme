"use client";
import styles from "./page.module.css";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

export default function Contact() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Message sent successfully!");
      e.target.reset();
    } else {
      alert(data.error || "Something went wrong.");
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactContainer}>
        <h1 className={styles.contactTitle}>Contact Us</h1>
        <p className={styles.contactSubtitle}>
          We're here to help! Reach out with any questions or feedback.
        </p>

        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail size={20} />
              <a href="mailto:vinothg0618@gmail.com">vinothg0618@gmail.com</a>
            </div>
            <div className={styles.contactItem}>
              <Phone size={20} />
              <a href="tel:+919384460843">+91 93844 60843</a>
            </div>
            <div className={styles.contactItem}>
              <Linkedin size={20} />
              <a
                href="https://www.linkedin.com/in/vinoth82003"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/vinoth82003
              </a>
            </div>
            <div className={styles.contactItem}>
              <Github size={20} />
              <a
                href="https://github.com/Vinoth82003"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/Vinoth82003
              </a>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={20} />
              <span>Chennai, Tamil Nadu, India</span>
            </div>
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              required
              className={styles.inputField}
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className={styles.inputField}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              className={styles.textareaField}
            ></textarea>
            <button type="submit" className={styles.sendButton}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
