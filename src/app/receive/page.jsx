"use client";
import { useEffect, useState } from "react";
import styles from "./receive.module.css";
import Navbar from "@/components/Navbar/Navbar";
import { ButtonLoader, PageLoader } from "@/components/Loading/Loading";
import Swal from "sweetalert2";

export default function ReceivePage() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [receivedItem, setReceivedItem] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isReceiveing, setIsReceiveing] = useState(false);

  const parseTextWithLinks = (text, styles) => {
    const urlRegex = /((https?:\/\/|www\.)[^\s]+)/gi;
    const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
    const hashtagRegex = /(^|\s)(#[a-z\d_]+)/gi;
    const mentionRegex = /(^|\s)(@[a-z\d_]+)/gi;

    let parts = [];
    let lastIndex = 0;

    const urlMatches = [...text.matchAll(urlRegex)].map((m) => ({
      type: "url",
      index: m.index,
      length: m[0].length,
      text: m[0],
    }));

    const emailMatches = [...text.matchAll(emailRegex)].map((m) => ({
      type: "email",
      index: m.index,
      length: m[0].length,
      text: m[0],
    }));

    const hashtagMatches = [...text.matchAll(hashtagRegex)].map((m) => ({
      type: "hashtag",
      index: m.index + (m[1] ? m[1].length : 0),
      length: m[2].length,
      text: m[2],
    }));

    const mentionMatches = [...text.matchAll(mentionRegex)].map((m) => ({
      type: "mention",
      index: m.index + (m[1] ? m[1].length : 0),
      length: m[2].length,
      text: m[2],
    }));

    const matches = [
      ...urlMatches,
      ...emailMatches,
      ...hashtagMatches,
      ...mentionMatches,
    ].sort((a, b) => a.index - b.index);

    if (matches.length === 0) return [text];

    for (const match of matches) {
      if (lastIndex < match.index) {
        parts.push(text.slice(lastIndex, match.index));
      }

      if (match.type === "url") {
        let href = match.text;
        if (!href.startsWith("http")) {
          href = "http://" + href;
        }
        parts.push(
          <a
            key={match.index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkified}
          >
            {match.text}
          </a>
        );
      } else if (match.type === "email") {
        parts.push(
          <a
            key={match.index}
            href={`mailto:${match.text}`}
            className={styles.linkified}
          >
            {match.text}
          </a>
        );
      } else if (match.type === "hashtag") {
        parts.push(
          <span key={match.index} className={styles.hashtag}>
            {match.text}
          </span>
        );
      } else if (match.type === "mention") {
        parts.push(
          <span key={match.index} className={styles.mention}>
            {match.text}
          </span>
        );
      }

      lastIndex = match.index + match.length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleGetItem = async () => {
    const fullCode = code.join("");
    if (fullCode.length === 4) {
      try {
        setIsReceiveing(true);
        const res = await fetch("/api/receive", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: fullCode }),
        });

        const data = await res.json();

        if (res.ok) {
          setReceivedItem({
            type: data.type,
            content: data.content,
            url: data.blobUrl,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: data.error || "Something went wrong",
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Please try again later.",
        });
      } finally {
        setIsReceiveing(false);
      }
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Copy Failed",
          text: "Could not copy to clipboard.",
        });
      });
  };

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  return (
    <div className={styles.container}>
      {isPageLoading && <PageLoader />}
      <Navbar
        leftLink={{ href: "/", text: "Home" }}
        rightLink={{ href: "/share", text: "Share" }}
      />
      <div
        className={styles.receiveBox}
        style={{ maxWidth: receivedItem ? "unset" : "400px" }}
      >
        <h2>Enter 4-Digit Code</h2>
        <div className={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              className={styles.codeInput}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
            />
          ))}
        </div>
        <button
          className={styles.getButton}
          onClick={handleGetItem}
          disabled={code.some((digit) => !digit)}
        >
          {isReceiveing ? <ButtonLoader /> : "Get Shared Item"}
        </button>

        {receivedItem && (
          <div className={styles.textPreviewWrapper}>
            {receivedItem.type === "text" ? (
              <div className={styles.copyWrapper}>
                <button
                  className={styles.copyIconButton}
                  onClick={() => handleCopy(receivedItem.content)}
                  aria-label="Copy text"
                >
                  {copied ? (
                    <span className={styles.copiedText}>Copied!</span>
                  ) : (
                    <span className={styles.copiedText}>Copy</span>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 1H4C2.897 1 2 1.897 2 3v14h2V3h12V1zm3 4H8c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h11c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm0 16H8V7h11v14z" />
                  </svg>
                </button>

                <div className={styles.textBox}>
                  <pre
                    style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                  >
                    {parseTextWithLinks(receivedItem.content, styles)}
                  </pre>
                </div>
              </div>
            ) : (
              <div className={styles.filePreviewWrapper}>
                {receivedItem.url &&
                /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(receivedItem.url) ? (
                  <img
                    src={receivedItem.url}
                    alt={receivedItem.content}
                    className={styles.imagePreview}
                  />
                ) : (
                  <iframe
                    src={receivedItem.url}
                    title="File Preview"
                    className={styles.fileIframe}
                  />
                )}

                <a
                  href={receivedItem.url}
                  download={receivedItem.content}
                  className={styles.downloadLink}
                >
                  ⬇ Download {receivedItem.content}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
