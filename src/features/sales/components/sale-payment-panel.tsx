"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Banknote,
  Building2,
  CheckCircle2,
  CreditCard,
  Smartphone,
} from "lucide-react";

import type { PaymentMethod } from "@/features/sales/types";

interface SalePaymentPanelProps {
  subtotal: number;
  itemCount: number;
}

const paymentMethods: Array<{
  value: PaymentMethod;
  label: string;
}> = [
  {
    value: "cash",
    label: "Cash",
  },
  {
    value: "card",
    label: "Card",
  },
  {
    value: "bank_transfer",
    label: "Bank transfer",
  },
  {
    value: "mobile_wallet",
    label: "Mobile wallet",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function SalePaymentPanel({
  subtotal,
  itemCount,
}: SalePaymentPanelProps) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [customerName, setCustomerName] = useState("");

  const [customerPhone, setCustomerPhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");

  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);

  // Cash
  const [amountReceived, setAmountReceived] = useState(0);

  // Card
  const [cardType, setCardType] = useState("Visa");
  const [cardLastFour, setCardLastFour] = useState("");
  const [cardReference, setCardReference] = useState("");

  // Bank transfer
  const [bankName, setBankName] = useState("");
  const [transferReference, setTransferReference] = useState("");

  // Mobile wallet
  const [walletProvider, setWalletProvider] = useState("JazzCash");
  const [walletReference, setWalletReference] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = Math.max(0, subtotal + tax - discount);

  const changeDue = Math.max(0, amountReceived - total);

  const isPaymentDetailsComplete =
    paymentMethod === "cash"
      ? amountReceived >= total
      : paymentMethod === "card"
        ? /^\d{4}$/.test(cardLastFour) && cardReference.trim().length > 0
        : paymentMethod === "bank_transfer"
          ? bankName.trim().length > 0 && transferReference.trim().length > 0
          : walletProvider.trim().length > 0 &&
            walletReference.trim().length > 0;

  async function handleCompleteSale() {
    if (itemCount === 0 || !isPaymentDetailsComplete) {
      return;
    }

    setIsSubmitting(true);

    /*
     * Temporary frontend testing.
     * Backend connect honay par createSale API call hogi.
     */
    await new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    setIsSubmitting(false);

    window.alert(
      `Sale ready!\nCustomer: ${
        customerName || "Walk-in customer"
      }\nPayment: ${paymentMethod}\nTotal: ${formatCurrency(total)}`,
    );
  }

  if (!showPaymentForm) {
    return (
      <aside className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] xl:sticky xl:top-24">
        <h2 className="font-bold">Payment summary</h2>

        <p className="mt-1 text-xs text-muted">
          Review sale totals before payment.
        </p>

        <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
          <div className="flex justify-between text-muted">
            <span>Items</span>
            <span>{itemCount}</span>
          </div>

          <div className="flex justify-between text-muted">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <div className="flex justify-between border-t border-border pt-4 text-lg font-bold">
            <span>Total</span>

            <span className="text-primary">{formatCurrency(subtotal)}</span>
          </div>
        </div>

        <button
          type="button"
          disabled={itemCount === 0}
          onClick={() => {
            setAmountReceived(subtotal);
            setShowPaymentForm(true);
          }}
          className="
            mt-6 h-11 w-full rounded-xl bg-primary
            text-sm font-semibold text-white transition
            hover:bg-primary-hover
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Continue to payment
        </button>
      </aside>
    );
  }

  return (
    <aside className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] xl:sticky xl:top-24">
      <button
        type="button"
        onClick={() => setShowPaymentForm(false)}
        className="
          inline-flex items-center gap-2 text-xs
          font-semibold text-muted transition
          hover:text-primary
        "
      >
        <ArrowLeft className="size-3.5" />
        Back to cart
      </button>

      <div className="mt-5 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary">
          <CreditCard className="size-4" />
        </span>

        <div>
          <h2 className="font-bold">Payment details</h2>

          <p className="text-xs text-muted">
            Complete the customer transaction.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <FormField
          id="customer-name"
          label="Customer name"
          placeholder="Walk-in customer"
          value={customerName}
          onChange={setCustomerName}
        />

        <FormField
          id="customer-phone"
          label="Phone number"
          placeholder="+92 300 0000000"
          value={customerPhone}
          onChange={setCustomerPhone}
          type="tel"
        />

        <div>
          <label htmlFor="payment-method" className="text-xs font-semibold">
            Payment method
          </label>

          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(event) =>
              setPaymentMethod(event.target.value as PaymentMethod)
            }
            className="
              mt-2 h-11 w-full rounded-xl border
              border-border bg-white px-3 text-sm
              outline-none transition
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
            "
          >
            {paymentMethods.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <NumberField
            id="sale-tax"
            label="Tax"
            value={tax}
            onChange={setTax}
          />

          <NumberField
            id="sale-discount"
            label="Discount"
            value={discount}
            onChange={setDiscount}
          />
        </div>

        <div className="border-t border-border pt-5">
          <PaymentMethodFields
            paymentMethod={paymentMethod}
            total={total}
            amountReceived={amountReceived}
            setAmountReceived={setAmountReceived}
            changeDue={changeDue}
            cardType={cardType}
            setCardType={setCardType}
            cardLastFour={cardLastFour}
            setCardLastFour={setCardLastFour}
            cardReference={cardReference}
            setCardReference={setCardReference}
            bankName={bankName}
            setBankName={setBankName}
            transferReference={transferReference}
            setTransferReference={setTransferReference}
            walletProvider={walletProvider}
            setWalletProvider={setWalletProvider}
            walletReference={walletReference}
            setWalletReference={setWalletReference}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
        <div className="flex justify-between text-muted">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-muted">
          <span>Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>

        <div className="flex justify-between text-muted">
          <span>Discount</span>
          <span>− {formatCurrency(discount)}</span>
        </div>

        <div className="flex justify-between border-t border-border pt-4 text-lg font-bold">
          <span>Total</span>

          <span className="text-primary">{formatCurrency(total)}</span>
        </div>
      </div>

      {!isPaymentDetailsComplete && (
        <p className="mt-4 rounded-xl bg-orange-50 px-3 py-2 text-[11px] font-medium text-orange-700">
          Complete the required payment details to continue.
        </p>
      )}

      <button
        type="button"
        disabled={isSubmitting || itemCount === 0 || !isPaymentDetailsComplete}
        onClick={handleCompleteSale}
        className="
          mt-5 inline-flex h-11 w-full
          items-center justify-center gap-2
          rounded-xl bg-primary text-sm
          font-semibold text-white transition
          hover:bg-primary-hover
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <CheckCircle2 className="size-4" />

        {isSubmitting ? "Completing sale..." : "Complete sale"}
      </button>
    </aside>
  );
}

interface PaymentMethodFieldsProps {
  paymentMethod: PaymentMethod;
  total: number;

  amountReceived: number;
  setAmountReceived: (value: number) => void;
  changeDue: number;

  cardType: string;
  setCardType: (value: string) => void;
  cardLastFour: string;
  setCardLastFour: (value: string) => void;
  cardReference: string;
  setCardReference: (value: string) => void;

  bankName: string;
  setBankName: (value: string) => void;
  transferReference: string;
  setTransferReference: (value: string) => void;

  walletProvider: string;
  setWalletProvider: (value: string) => void;
  walletReference: string;
  setWalletReference: (value: string) => void;
}

function PaymentMethodFields({
  paymentMethod,
  total,
  amountReceived,
  setAmountReceived,
  changeDue,
  cardType,
  setCardType,
  cardLastFour,
  setCardLastFour,
  cardReference,
  setCardReference,
  bankName,
  setBankName,
  transferReference,
  setTransferReference,
  walletProvider,
  setWalletProvider,
  walletReference,
  setWalletReference,
}: PaymentMethodFieldsProps) {
  if (paymentMethod === "cash") {
    return (
      <div>
        <PaymentHeading
          icon={Banknote}
          title="Cash payment"
          description={`Amount due: ${formatCurrency(total)}`}
        />

        <div className="mt-4">
          <NumberField
            id="amount-received"
            label="Amount received"
            value={amountReceived}
            onChange={setAmountReceived}
          />
        </div>

        <div className="mt-3 flex justify-between rounded-xl bg-primary-light px-3 py-3 text-sm">
          <span className="text-muted">Change due</span>

          <span className="font-bold text-primary">
            {formatCurrency(changeDue)}
          </span>
        </div>
      </div>
    );
  }

  if (paymentMethod === "card") {
    return (
      <div>
        <PaymentHeading
          icon={CreditCard}
          title="Card payment"
          description="Enter safe terminal information only."
        />

        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="card-type" className="text-xs font-semibold">
              Card type
            </label>

            <select
              id="card-type"
              value={cardType}
              onChange={(event) => setCardType(event.target.value)}
              className="
                mt-2 h-11 w-full rounded-xl
                border border-border bg-white px-3
                text-sm outline-none
                focus:border-primary
              "
            >
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="UnionPay">UnionPay</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <FormField
            id="card-last-four"
            label="Last 4 digits"
            placeholder="1234"
            value={cardLastFour}
            onChange={(value) =>
              setCardLastFour(value.replace(/\D/g, "").slice(0, 4))
            }
            inputMode="numeric"
            maxLength={4}
          />

          <FormField
            id="card-reference"
            label="Terminal transaction ID"
            placeholder="TXN-123456"
            value={cardReference}
            onChange={setCardReference}
          />

          <p className="rounded-xl bg-blue-50 px-3 py-2 text-[11px] text-blue-700">
            Full card number, expiry date aur CVV backoffice mein enter ya store
            nahi karna.
          </p>
        </div>
      </div>
    );
  }

  if (paymentMethod === "bank_transfer") {
    return (
      <div>
        <PaymentHeading
          icon={Building2}
          title="Bank transfer"
          description="Enter the transfer confirmation details."
        />

        <div className="mt-4 space-y-4">
          <FormField
            id="bank-name"
            label="Bank name"
            placeholder="Enter bank name"
            value={bankName}
            onChange={setBankName}
          />

          <FormField
            id="transfer-reference"
            label="Transfer reference"
            placeholder="TRF-123456"
            value={transferReference}
            onChange={setTransferReference}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PaymentHeading
        icon={Smartphone}
        title="Mobile wallet"
        description="Enter the wallet transaction details."
      />

      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor="wallet-provider" className="text-xs font-semibold">
            Wallet provider
          </label>

          <select
            id="wallet-provider"
            value={walletProvider}
            onChange={(event) => setWalletProvider(event.target.value)}
            className="
              mt-2 h-11 w-full rounded-xl
              border border-border bg-white px-3
              text-sm outline-none
              focus:border-primary
            "
          >
            <option value="JazzCash">JazzCash</option>

            <option value="Easypaisa">Easypaisa</option>

            <option value="NayaPay">NayaPay</option>

            <option value="SadaPay">SadaPay</option>

            <option value="Other">Other</option>
          </select>
        </div>

        <FormField
          id="wallet-reference"
          label="Wallet transaction ID"
          placeholder="WALLET-123456"
          value={walletReference}
          onChange={setWalletReference}
        />
      </div>
    </div>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  inputMode?:
    "text" | "numeric" | "tel" | "email" | "decimal" | "search" | "url";
  maxLength?: number;
}

function FormField({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  inputMode,
  maxLength,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold">
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        inputMode={inputMode}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="
          mt-2 h-11 w-full rounded-xl border
          border-border bg-white px-3 text-sm
          outline-none transition
          focus:border-primary
          focus:ring-4 focus:ring-primary/10
        "
      />
    </div>
  );
}

interface NumberFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

function NumberField({ id, label, value, onChange }: NumberFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold">
        {label}
      </label>

      <input
        id={id}
        type="number"
        min="0"
        value={value}
        onChange={(event) => onChange(Math.max(0, Number(event.target.value)))}
        className="
          mt-2 h-11 w-full rounded-xl border
          border-border bg-white px-3 text-sm
          outline-none transition
          focus:border-primary
          focus:ring-4 focus:ring-primary/10
        "
      />
    </div>
  );
}

interface PaymentHeadingProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function PaymentHeading({
  icon: Icon,
  title,
  description,
}: PaymentHeadingProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 items-center justify-center rounded-xl bg-surface-secondary text-primary">
        <Icon className="size-4" />
      </span>

      <div>
        <h3 className="text-sm font-semibold">{title}</h3>

        <p className="text-[11px] text-muted">{description}</p>
      </div>
    </div>
  );
}
