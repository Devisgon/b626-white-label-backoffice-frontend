"use client";

import { useState } from "react";
import { Download, LoaderCircle } from "lucide-react";

interface ReceiptItem {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
}

interface ReceiptDownloadButtonProps {
  saleNumber: string;
  customerName: string;
  customerPhone: string;
  paymentMethod: string;
  date: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  items: ReceiptItem[];
}

function formatAmount(value: number) {
  return `PKR ${value.toLocaleString("en-PK")}`;
}

export function ReceiptDownloadButton({
  saleNumber,
  customerName,
  customerPhone,
  paymentMethod,
  date,
  subtotal,
  tax,
  discount,
  total,
  items,
}: ReceiptDownloadButtonProps) {
  const [isDownloading, setIsDownloading] =
    useState(false);

  async function downloadReceipt() {
    try {
      setIsDownloading(true);

      const { jsPDF } = await import("jspdf");

      const document = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth =
        document.internal.pageSize.getWidth();

      let currentY = 20;

      // Header
      document.setFillColor(8, 122, 91);
      document.rect(0, 0, pageWidth, 34, "F");

      document.setTextColor(255, 255, 255);
      document.setFont("helvetica", "bold");
      document.setFontSize(20);
      document.text("TOTAL STORE", 15, 15);

      document.setFont("helvetica", "normal");
      document.setFontSize(10);
      document.text("BACKOFFICE SALES RECEIPT", 15, 23);

      document.setFont("helvetica", "bold");
      document.setFontSize(13);
      document.text(
        saleNumber,
        pageWidth - 15,
        18,
        {
          align: "right",
        },
      );

      currentY = 46;

      // Sale information
      document.setTextColor(23, 33, 29);
      document.setFontSize(12);
      document.setFont("helvetica", "bold");
      document.text("Sale information", 15, currentY);

      currentY += 9;

      document.setFontSize(10);
      document.setFont("helvetica", "normal");
      document.setTextColor(100, 115, 108);

      document.text(
        `Date: ${date}`,
        15,
        currentY,
      );

      document.text(
        `Payment: ${paymentMethod}`,
        110,
        currentY,
      );

      currentY += 7;

      document.text(
        `Customer: ${customerName}`,
        15,
        currentY,
      );

      document.text(
        `Phone: ${customerPhone}`,
        110,
        currentY,
      );

      currentY += 12;

      // Table heading
      document.setFillColor(240, 244, 242);
      document.rect(15, currentY, 180, 10, "F");

      document.setTextColor(70, 85, 78);
      document.setFont("helvetica", "bold");
      document.setFontSize(9);

      document.text("PRODUCT", 19, currentY + 6.5);
      document.text("PRICE", 115, currentY + 6.5);
      document.text("QTY", 145, currentY + 6.5);
      document.text(
        "TOTAL",
        190,
        currentY + 6.5,
        {
          align: "right",
        },
      );

      currentY += 10;

      // Products
      items.forEach((item) => {
        document.setDrawColor(225, 231, 228);
        document.line(
          15,
          currentY + 16,
          195,
          currentY + 16,
        );

        document.setFont("helvetica", "bold");
        document.setFontSize(10);
        document.setTextColor(23, 33, 29);

        const productName =
          item.name.length > 38
            ? `${item.name.slice(0, 38)}...`
            : item.name;

        document.text(
          productName,
          19,
          currentY + 6,
        );

        document.setFont("helvetica", "normal");
        document.setFontSize(8);
        document.setTextColor(113, 128, 121);
        document.text(item.sku, 19, currentY + 12);

        document.setFontSize(9);
        document.setTextColor(23, 33, 29);

        document.text(
          formatAmount(item.price),
          115,
          currentY + 8,
        );

        document.text(
          String(item.quantity),
          148,
          currentY + 8,
          {
            align: "center",
          },
        );

        document.setFont("helvetica", "bold");
        document.text(
          formatAmount(item.total),
          190,
          currentY + 8,
          {
            align: "right",
          },
        );

        currentY += 17;
      });

      currentY += 8;

      // Payment totals
      const labelX = 125;
      const valueX = 190;

      document.setFontSize(10);
      document.setTextColor(100, 115, 108);
      document.setFont("helvetica", "normal");

      document.text("Subtotal", labelX, currentY);
      document.text(
        formatAmount(subtotal),
        valueX,
        currentY,
        {
          align: "right",
        },
      );

      currentY += 8;

      document.text("Tax", labelX, currentY);
      document.text(
        formatAmount(tax),
        valueX,
        currentY,
        {
          align: "right",
        },
      );

      currentY += 8;

      document.text("Discount", labelX, currentY);
      document.text(
        `- ${formatAmount(discount)}`,
        valueX,
        currentY,
        {
          align: "right",
        },
      );

      currentY += 5;

      document.setDrawColor(210, 220, 215);
      document.line(
        labelX,
        currentY,
        valueX,
        currentY,
      );

      currentY += 9;

      document.setFont("helvetica", "bold");
      document.setFontSize(14);
      document.setTextColor(8, 122, 91);

      document.text("Total", labelX, currentY);
      document.text(
        formatAmount(total),
        valueX,
        currentY,
        {
          align: "right",
        },
      );

      // Footer
      document.setFont("helvetica", "normal");
      document.setFontSize(9);
      document.setTextColor(113, 128, 121);

      document.text(
        "Thank you for shopping with Total Store.",
        pageWidth / 2,
        280,
        {
          align: "center",
        },
      );

      document.text(
        "This receipt was generated electronically.",
        pageWidth / 2,
        286,
        {
          align: "center",
        },
      );

      document.save(`${saleNumber}-receipt.pdf`);
    } catch (error) {
      console.error(
        "Receipt download failed:",
        error,
      );

      window.alert(
        "Receipt download nahi ho saki. Please dobara try karein.",
      );
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={downloadReceipt}
      disabled={isDownloading}
    className="
  inline-flex h-10 items-center justify-center gap-2
  rounded-xl border border-border bg-white px-4
  text-sm font-semibold text-muted transition
  hover:border-primary hover:bg-primary-light
  hover:text-primary
  disabled:cursor-not-allowed disabled:opacity-60
"
    >
      {isDownloading ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <Download className="size-4" />
      )}

      {isDownloading
        ? "Downloading..."
        : "Download receipt"}
    </button>
  );
}