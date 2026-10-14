"use client";

import React, { useId, useRef, useState } from "react";
import { Lock, Eye, EyeOff, ArrowRight, Layers3, AlertTriangle, KeyRound } from "lucide-react";
import styles from "./AdminAuthGate.module.css";

interface AdminAuthGateProps {
  onSuccess: () => void;
}

export default function AdminAuthGate({ onSuccess }: AdminAuthGateProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestPending = useRef(false);
  const passwordId = useId();
  const errorId = useId();
  const hintId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (requestPending.current) return;

    if (!password.trim()) {
      setError("Enter your admin password to continue.");
      return;
    }

    requestPending.current = true;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onSuccess();
      } else {
        setError(
          typeof data.error === "string" && data.error
            ? data.error
            : "That password wasn’t recognized. Please try again."
        );
      }
    } catch {
      setError("Unable to sign in right now. Check your connection and try again.");
    } finally {
      requestPending.current = false;
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.layout}>
        <section className={styles.intro} aria-label="Your administration workspace">
          <div className={styles.brand}>
            <span className={styles.brandMark}><Layers3 size={22} aria-hidden="true" /></span>
            <span>myJourney<span className={styles.brandLabel}>ADMIN WORKSPACE</span></span>
          </div>
          <div className={styles.introCopy}>
            <p className={styles.eyebrow}>A LITTLE CLARITY. A LOT OF POSSIBILITY.</p>
            <h2>Your journey.<br /><span>Your control.</span></h2>
            <p>A considered space to manage your content, explore insights, and shape what comes next.</p>
          </div>
          <div className={styles.art} aria-hidden="true">
            <div className={styles.artHalo} />
            <div className={styles.sculpture}>
              <div className={`${styles.plate} ${styles.plateBottom}`} />
              <div className={`${styles.plate} ${styles.plateMiddle}`} />
              <div className={`${styles.plate} ${styles.plateTop}`}>
                <span className={styles.plateCore} />
              </div>
            </div>
            <span className={styles.artCaption}>ONE WORKSPACE. EVERY PERSPECTIVE.</span>
          </div>
        </section>

        <section className={styles.card} aria-labelledby="admin-sign-in-title">
          <div className={styles.cardTop}>
            <span className={styles.accessIcon}><Lock size={20} aria-hidden="true" /></span>
            <span className={styles.accessBadge}>ADMIN ACCESS</span>
          </div>
          <p className={styles.eyebrow}>WELCOME BACK</p>
          <h1 id="admin-sign-in-title">Make yourself<br />at home.</h1>
          <p className={styles.description}>Sign in to your administration workspace.</p>

          <form onSubmit={handleSubmit} className={styles.form} aria-busy={loading} noValidate>
            <label className={styles.label} htmlFor={passwordId}>Admin password</label>
            <div className={styles.inputWrap}>
              <KeyRound className={styles.keyIcon} size={18} aria-hidden="true" />
              <input
                id={passwordId}
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                autoFocus
                required
                readOnly={loading}
                aria-invalid={Boolean(error)}
                aria-describedby={`${hintId}${error ? ` ${errorId}` : ""}`}
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className={styles.passwordToggle}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-controls={passwordId}
              >
                {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </div>
            <p id={hintId} className={styles.hint}>Use your administrator password to continue.</p>
            <div id={errorId} role="alert" aria-atomic="true" className={error ? styles.error : undefined}>
              {error && <><AlertTriangle size={17} aria-hidden="true" /><span>{error}</span></>}
            </div>
            <button type="submit" disabled={loading} className={styles.submit}>
              <span>{loading ? "Signing in…" : "Enter workspace"}</span>
              {!loading && <ArrowRight size={18} aria-hidden="true" />}
            </button>
          </form>
          <p className={styles.srOnly} role="status">{loading ? "Signing in. Please wait." : ""}</p>
          <div className={styles.footer}>
            <Lock size={14} aria-hidden="true" />
            <span>A private workspace for administrators.</span>
          </div>
        </section>
      </div>
      <p className={styles.pageFooter}>myJourney <span aria-hidden="true">/</span> A space for what’s next.</p>
    </main>
  );
}
