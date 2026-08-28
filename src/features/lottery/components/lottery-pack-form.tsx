"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { PackagePlus, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  lotteryPackSchema,
  type LotteryPackFormInput,
  type LotteryPackFormOutput,
} from "@/features/lottery/schemas";
import type { CreateLotteryPackPayload } from "@/features/lottery/types";

interface LotteryPackFormProps {
  mode?: "create" | "edit";
  packId?: number;
  initialValues?: Partial<LotteryPackFormInput>;
}

export function LotteryPackForm({
  mode = "create",
  packId,
  initialValues,
}: LotteryPackFormProps) {
  const router = useRouter();

  const [serverError, setServerError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LotteryPackFormInput, unknown, LotteryPackFormOutput>({
    resolver: zodResolver(lotteryPackSchema),

    defaultValues: {
      game_id: initialValues?.game_id ?? "",

      pack_number: initialValues?.pack_number ?? "",

      start_ticket_no: initialValues?.start_ticket_no ?? "",

      end_ticket_no: initialValues?.end_ticket_no ?? "",

      activated_at: initialValues?.activated_at ?? "",

      location_id: initialValues?.location_id ?? "",

      status: initialValues?.status ?? "",
    },
  });

  async function onSubmit(values: LotteryPackFormOutput): Promise<void> {
    setServerError("");
    setSuccessMessage("");

    try {
      const payload: CreateLotteryPackPayload = {
        game_id: Number(values.game_id),

        pack_number: values.pack_number.trim(),

        start_ticket_no: Number(values.start_ticket_no),

        end_ticket_no: Number(values.end_ticket_no),

        status: values.status,
      };

      if (values.activated_at) {
        payload.activated_at = new Date(values.activated_at).toISOString();
      }

      if (values.location_id) {
        payload.location_id = values.location_id;
      }

      /*
       * Temporary frontend testing.
       *
       * Backend integration ke waqt:
       *
       * if (
       *   mode === "edit" &&
       *   packId
       * ) {
       *   await updateLotteryPack(
       *     packId,
       *     payload,
       *   );
       * } else {
       *   await createLotteryPack(
       *     payload,
       *   );
       * }
       */

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 700);
      });

      console.log({
        mode,
        packId,
        payload,
      });

      setSuccessMessage(
        mode === "edit"
          ? "Lottery pack updated successfully."
          : "Lottery pack created successfully.",
      );

      window.setTimeout(() => {
        router.push("/lottery/packs");

        router.refresh();
      }, 800);
    } catch {
      setServerError("Unable to save the lottery pack. Please try again.");
    }
  }

  const inputClassName = `
    mt-2 h-11 w-full rounded-xl
    border border-border bg-white
    px-4 text-sm text-foreground
    outline-none transition
    placeholder:text-muted-light
    focus:border-primary
    focus:ring-4 focus:ring-primary/10
  `;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="
        rounded-2xl border border-border
        bg-white p-5
        shadow-[var(--shadow-sm)]
        sm:p-6
      "
    >
      <div className="flex items-center gap-3">
        <span
          className="
            flex size-10 items-center
            justify-center rounded-xl
            bg-blue-50 text-blue-700
          "
        >
          <PackagePlus className="size-5" />
        </span>

        <div>
          <h2 className="text-lg font-bold">Pack information</h2>

          <p className="mt-1 text-xs text-muted">
            Enter the game, ticket range and pack activation information.
          </p>
        </div>
      </div>

      {serverError && (
        <div
          role="alert"
          className="
            mt-6 rounded-xl border
            border-red-200 bg-red-50
            px-4 py-3 text-sm
            font-medium text-red-700
          "
        >
          {serverError}
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="
            mt-6 rounded-xl border
            border-emerald-200 bg-emerald-50
            px-4 py-3 text-sm
            font-medium text-emerald-700
          "
        >
          {successMessage}
        </div>
      )}

      <div
        className="
          mt-6 grid gap-5
          sm:grid-cols-2
        "
      >
        <Field label="Lottery game" required error={errors.game_id?.message}>
          <select
            id="game_id"
            {...register("game_id")}
            className={inputClassName}
          >
            <option value="">Select lottery game</option>

            <option value="1">Lucky 7 Scratch</option>

            <option value="2">Golden Cash</option>

            <option value="3">Mega Winner</option>

            <option value="4">Quick Fortune</option>
          </select>
        </Field>

        <Field label="Pack number" required error={errors.pack_number?.message}>
          <input
            id="pack_number"
            type="text"
            placeholder="For example: PK-000123"
            {...register("pack_number")}
            className={inputClassName}
          />
        </Field>

        <Field
          label="Starting ticket number"
          required
          error={errors.start_ticket_no?.message}
        >
          <input
            id="start_ticket_no"
            type="number"
            min="0"
            step="1"
            placeholder="For example: 1"
            {...register("start_ticket_no")}
            className={inputClassName}
          />
        </Field>

        <Field
          label="Ending ticket number"
          required
          error={errors.end_ticket_no?.message}
        >
          <input
            id="end_ticket_no"
            type="number"
            min="0"
            step="1"
            placeholder="For example: 100"
            {...register("end_ticket_no")}
            className={inputClassName}
          />
        </Field>

        <Field
          label="Activation date and time"
          error={errors.activated_at?.message}
        >
          <input
            id="activated_at"
            type="datetime-local"
            {...register("activated_at")}
            className={inputClassName}
          />
        </Field>

        <Field label="Location" error={errors.location_id?.message}>
          <select
            id="location_id"
            {...register("location_id")}
            className={inputClassName}
          >
            <option value="">Select location</option>

            <option value="b3f1c2e0-1234-4a5b-9c6d-7e8f9a0b1c2d">
              Phoenix Store
            </option>

            <option value="d4f2a3b1-4321-4c5d-8e7f-1a2b3c4d5e6f">
              Main Warehouse
            </option>
          </select>
        </Field>

        <Field
          label="Status"
          required
          error={errors.status?.message}
          className="sm:col-span-2"
        >
          <select
            id="status"
            {...register("status")}
            className={inputClassName}
          >
            <option value="">Select status</option>

            <option value="In Stock">In Stock</option>

            <option value="Active">Active</option>

            <option value="Completed">Completed</option>

            <option value="Inactive">Inactive</option>
          </select>
        </Field>
      </div>

      <div
        className="
          mt-8 flex flex-col-reverse gap-3
          border-t border-border pt-5
          sm:flex-row sm:justify-end
        "
      >
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="
            inline-flex h-11 items-center
            justify-center rounded-xl
            border border-border bg-white
            px-5 text-sm font-semibold
            text-muted transition
            hover:bg-surface-secondary
            hover:text-foreground
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            inline-flex h-11 items-center
            justify-center gap-2 rounded-xl
            bg-primary px-5 text-sm
            font-semibold text-white
            transition hover:bg-primary-hover
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <Save className="size-4" />

          {isSubmitting
            ? "Saving..."
            : mode === "edit"
              ? "Update pack"
              : "Create pack"}
        </button>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}

function Field({
  label,
  required = false,
  error,
  className = "",
  children,
}: FieldProps) {
  return (
    <div className={className}>
      <label className="text-sm font-semibold">
        {label}

        {required && <span className="text-danger"> *</span>}
      </label>

      {children}

      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}
