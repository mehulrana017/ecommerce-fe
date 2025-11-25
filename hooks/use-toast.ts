import * as React from "react"
import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  action?: React.ReactNode
}

export function toast({ title, description, variant = "default", action }: ToastProps) {
  if (variant === "destructive") {
    return sonnerToast.error(title || description, {
      description: title ? description : undefined,
      action: action as any,
    })
  }

  return sonnerToast(title || description, {
    description: title ? description : undefined,
    action: action as any,
  })
}

export function useToast() {
  return {
    toast,
  }
}
