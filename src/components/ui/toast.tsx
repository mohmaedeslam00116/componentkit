"use client";

import { Toaster as SonnerToaster, toast as sonnerToast, type ToasterProps } from "sonner";

function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toaster]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}

/** Re-export sonner's toast with typed helpers */
const toast = {
  /** Show a default toast */
  default: (message: string, data?: Record<string, unknown>) =>
    sonnerToast(message, data as any),

  /** Show a success toast */
  success: (message: string, data?: Record<string, unknown>) =>
    sonnerToast.success(message, data as any),

  /** Show an error toast */
  error: (message: string, data?: Record<string, unknown>) =>
    sonnerToast.error(message, data as any),

  /** Show a warning toast */
  warning: (message: string, data?: Record<string, unknown>) =>
    sonnerToast.warning(message, data as any),

  /** Show an info toast */
  info: (message: string, data?: Record<string, unknown>) =>
    sonnerToast.info(message, data as any),

  /** Show a promise toast */
  promise: sonnerToast.promise,

  /** Dismiss a toast */
  dismiss: sonnerToast.dismiss,
};

export { Toaster, toast };
