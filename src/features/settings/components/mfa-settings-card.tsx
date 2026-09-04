"use client";

import axios from "axios";
import { KeyRound, LoaderCircle, QrCode, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { disableMfa, setupMfa, verifyMfa } from "@/features/auth/api";
import type { ApiErrorResponse } from "@/lib/api";
import { useAuthStore } from "@/store";

type MfaStep = "idle" | "setup" | "disable";

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const message = error.response?.data?.message;

    if (Array.isArray(message)) return message[0];
    if (typeof message === "string") return message;
    if (!error.response) return "Unable to connect to the server.";
  }

  return "Something went wrong. Please try again.";
}

export function MfaSettingsCard() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [step, setStep] = useState<MfaStep>("idle");
  const [qrCode, setQrCode] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEnabled = Boolean(user?.mfaEnabled);

  async function beginSetup() {
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await setupMfa();
      setQrCode(response.qrCode);
      setCode("");
      setStep("setup");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function confirmSetup() {
    if (!/^\d{6}$/.test(code)) {
      setError("Enter a valid 6-digit authenticator code.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await verifyMfa({ code });
      if (user) setUser({ ...user, mfaEnabled: true });
      setMessage(response.message);
      setQrCode("");
      setCode("");
      setStep("idle");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function confirmDisable() {
    if (!/^\d{6}$/.test(code)) {
      setError("Enter a valid 6-digit authenticator code.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await disableMfa({ code });
      if (user) setUser({ ...user, mfaEnabled: false });
      setMessage(response.message);
      setCode("");
      setStep("idle");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-border bg-white p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <ShieldCheck className="size-5" />
          </span>
          <div>
            <h2 className="font-bold">Authenticator app</h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              Protect your account with a time-based 6-digit security code.
            </p>
          </div>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
            isEnabled
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {isEnabled ? "ENABLED" : "NOT ENABLED"}
        </span>
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {message && (
        <p className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </p>
      )}

      {step === "setup" && (
        <div className="mt-6 grid gap-6 border-t border-border pt-6 md:grid-cols-[220px_1fr]">
          <div className="flex min-h-52 items-center justify-center rounded-2xl border border-border bg-white p-3">
            {qrCode ? (
              // Backend returns a short-lived data URL generated for this user.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrCode} alt="Authenticator setup QR code" className="size-48" />
            ) : (
              <QrCode className="size-16 text-muted" />
            )}
          </div>

          <div>
            <h3 className="font-semibold">Scan and confirm</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted">
              <li>Open Google Authenticator, Microsoft Authenticator or Authy.</li>
              <li>Scan this QR code.</li>
              <li>Enter the current 6-digit code below.</li>
            </ol>
            <CodeInput value={code} onChange={setCode} />
            <div className="mt-4 flex flex-wrap gap-3">
              <ActionButton onClick={confirmSetup} loading={isSubmitting}>
                Verify and enable
              </ActionButton>
              <SecondaryButton onClick={() => { setStep("idle"); setQrCode(""); setCode(""); setError(""); }}>
                Cancel
              </SecondaryButton>
            </div>
          </div>
        </div>
      )}

      {step === "disable" && (
        <div className="mt-6 border-t border-border pt-6">
          <h3 className="font-semibold">Disable two-factor authentication</h3>
          <p className="mt-2 text-sm text-muted">
            Enter a current code from your authenticator app to confirm.
          </p>
          <div className="max-w-sm">
            <CodeInput value={code} onChange={setCode} />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <ActionButton onClick={confirmDisable} loading={isSubmitting} danger>
              Disable MFA
            </ActionButton>
            <SecondaryButton onClick={() => { setStep("idle"); setCode(""); setError(""); }}>
              Cancel
            </SecondaryButton>
          </div>
        </div>
      )}

      {step === "idle" && (
        <div className="mt-6 border-t border-border pt-5">
          {isEnabled ? (
            <SecondaryButton onClick={() => { setStep("disable"); setMessage(""); }}>
              Disable authenticator
            </SecondaryButton>
          ) : (
            <ActionButton onClick={beginSetup} loading={isSubmitting}>
              <KeyRound className="size-4" />
              Set up authenticator
            </ActionButton>
          )}
        </div>
      )}
    </section>
  );
}

function CodeInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="mt-5 block text-sm font-semibold">
      6-digit code
      <input
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        value={value}
        onChange={(event) => onChange(event.target.value.replace(/\D/g, ""))}
        placeholder="000000"
        className="mt-2 h-11 w-full rounded-xl border border-border bg-white px-4 text-sm tracking-[0.35em] outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
      />
    </label>
  );
}

function ActionButton({ children, onClick, loading, danger = false }: { children: React.ReactNode; onClick: () => void; loading: boolean; danger?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white transition disabled:opacity-60 ${danger ? "bg-red-600 hover:bg-red-700" : "bg-primary hover:bg-primary-hover"}`}
    >
      {loading && <LoaderCircle className="size-4 animate-spin" />}
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-white px-4 text-sm font-semibold text-muted transition hover:bg-surface-secondary hover:text-foreground">
      {children}
    </button>
  );
}
