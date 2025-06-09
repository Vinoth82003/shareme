import Link from 'next/link';
import styles from './navbar.module.css';

export default function Navbar({ leftLink, rightLink }) {
  return (
    <nav className={styles.navbar}>
      <Link href={leftLink.href} className={styles.navLink}>
        <span className={styles.arrow}>←</span> {leftLink.text}
      </Link>
      <Link href={rightLink.href} className={styles.navLink}>
        {rightLink.text} <span className={styles.arrow}>→</span>
      </Link>
    </nav>
  );
}