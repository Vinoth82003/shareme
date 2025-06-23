import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar({ leftLink, midlink, rightLink }) {
  return (
    <nav className={styles.navbar}>
      <Link href={leftLink.href} className={styles.navLink}>
        {leftLink.text}
      </Link>
      {midlink && (
        <Link href={midlink.href} className={styles.navLink}>
          {midlink.text}
        </Link>
      )}
      <Link href={rightLink.href} className={styles.navLink}>
        {rightLink.text}
      </Link>
    </nav>
  );
}
