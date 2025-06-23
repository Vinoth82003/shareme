"use client";
import styles from "./page.module.css";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { ButtonLoader } from "@/components/Loading/Loading";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { name, email, message } = formValues;
    setIsValid(name.trim() && email.trim() && message.trim());
  }, [formValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Message Sent",
          text: "Thank you! Your message has been successfully delivered.",
          confirmButtonColor: "#2563eb",
        });
        setFormValues({ name: "", email: "", message: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.error || "Something went wrong. Please try again.",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      console.error("Error sending Email: ", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Something went wrong while sending your message.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
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
              value={formValues.name}
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className={styles.inputField}
              value={formValues.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              className={styles.textareaField}
              value={formValues.message}
              onChange={handleChange}
            ></textarea>
            <button
              type="submit"
              className={styles.sendButton}
              disabled={!isValid || isLoading}
            >
              {isLoading ? <ButtonLoader /> : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
