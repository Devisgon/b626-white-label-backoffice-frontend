"use client";

import {
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  lotteryGameSchema,
} from "@/features/lottery/schemas";
import type {
  CreateLotteryGamePayload,
} from "@/features/lottery/types";

type LotteryGameFormInput = z.input<
  typeof lotteryGameSchema
>;

type LotteryGameFormOutput = z.output<
  typeof lotteryGameSchema
>;

interface LotteryGameFormProps {
  mode?: "create" | "edit";
  gameId?: number;
  initialValues?: Partial<LotteryGameFormInput>;
}

export function LotteryGameForm({
  mode = "create",
  gameId,
  initialValues,
}: LotteryGameFormProps) {
  const router = useRouter();

  const [serverError, setServerError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<
    LotteryGameFormInput,
    unknown,
    LotteryGameFormOutput
  >({
    resolver: zodResolver(
      lotteryGameSchema,
    ),

    defaultValues: {
      name:
        initialValues?.name ?? "",

      game_number:
        initialValues?.game_number ?? "",

      ticket_price:
        initialValues?.ticket_price ?? "",

      tickets_per_pack:
        initialValues?.tickets_per_pack ?? "",

      status:
        initialValues?.status ?? "",
    },
  });

  async function onSubmit(
    values: LotteryGameFormOutput,
  ): Promise<void> {
    setServerError("");
    setSuccessMessage("");

    try {
      const payload: CreateLotteryGamePayload = {
        name: values.name.trim(),

        ticket_price: Number(
          values.ticket_price,
        ),

        status: values.status,
      };

      const gameNumber =
        values.game_number?.trim();

      if (gameNumber) {
        payload.game_number =
          gameNumber;
      }

      if (
        values.tickets_per_pack
      ) {
        payload.tickets_per_pack =
          Number(
            values.tickets_per_pack,
          );
      }

      /*
       * Temporary frontend testing.
       *
       * Backend integration ke waqt:
       *
       * if (
       *   mode === "edit" &&
       *   gameId
       * ) {
       *   await updateLotteryGame(
       *     gameId,
       *     payload,
       *   );
       * } else {
       *   await createLotteryGame(
       *     payload,
       *   );
       * }
       */

      await new Promise<void>(
        (resolve) => {
          window.setTimeout(
            resolve,
            700,
          );
        },
      );

      console.log({
        mode,
        gameId,
        payload,
      });

      setSuccessMessage(
        mode === "edit"
          ? "Lottery game updated successfully."
          : "Lottery game created successfully.",
      );

      window.setTimeout(() => {
        router.push(
          "/lottery/games",
        );

        router.refresh();
      }, 800);
    } catch {
      setServerError(
        "Unable to save the lottery game. Please try again.",
      );
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
      onSubmit={handleSubmit(
        onSubmit,
      )}
      className="
        rounded-2xl border border-border
        bg-white p-5
        shadow-[var(--shadow-sm)]
        sm:p-6
      "
    >
      <div>
        <h2 className="text-lg font-bold">
          Game information
        </h2>

        <p className="mt-1 text-xs text-muted">
          Enter the lottery game, ticket price and
          pack information.
        </p>
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
        <Field
          label="Game name"
          required
          error={
            errors.name?.message
          }
          className="sm:col-span-2"
        >
          <input
            id="name"
            type="text"
            placeholder="For example: Lucky 7 Scratch"
            {...register("name")}
            className={`
              ${inputClassName}
              ${
                errors.name
                  ? "border-red-300"
                  : ""
              }
            `}
          />
        </Field>

        <Field
          label="Game number"
          error={
            errors.game_number
              ?.message
          }
        >
          <input
            id="game_number"
            type="text"
            placeholder="For example: LG-1007"
            {...register(
              "game_number",
            )}
            className={`
              ${inputClassName}
              ${
                errors.game_number
                  ? "border-red-300"
                  : ""
              }
            `}
          />
        </Field>

        <Field
          label="Ticket price"
          required
          error={
            errors.ticket_price
              ?.message
          }
        >
          <input
            id="ticket_price"
            type="number"
            min="0"
            step="0.01"
            placeholder="For example: 5"
            {...register(
              "ticket_price",
            )}
            className={`
              ${inputClassName}
              ${
                errors.ticket_price
                  ? "border-red-300"
                  : ""
              }
            `}
          />
        </Field>

        <Field
          label="Tickets per pack"
          error={
            errors.tickets_per_pack
              ?.message
          }
        >
          <input
            id="tickets_per_pack"
            type="number"
            min="1"
            step="1"
            placeholder="For example: 100"
            {...register(
              "tickets_per_pack",
            )}
            className={`
              ${inputClassName}
              ${
                errors.tickets_per_pack
                  ? "border-red-300"
                  : ""
              }
            `}
          />
        </Field>

        <Field
          label="Status"
          required
          error={
            errors.status?.message
          }
        >
          <select
            id="status"
            {...register("status")}
            className={`
              ${inputClassName}
              ${
                errors.status
                  ? "border-red-300"
                  : ""
              }
            `}
          >
            <option value="">
              Select status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
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
          onClick={() =>
            router.back()
          }
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
            justify-center gap-2
            rounded-xl bg-primary
            px-5 text-sm font-semibold
            text-white transition
            hover:bg-primary-hover
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <Save className="size-4" />

          {isSubmitting
            ? "Saving..."
            : mode === "edit"
              ? "Update game"
              : "Create game"}
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

        {required && (
          <span className="text-danger">
            {" "}*
          </span>
        )}
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}