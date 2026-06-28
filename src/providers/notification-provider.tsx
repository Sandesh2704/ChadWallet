"use client";

import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useNotificationStore } from "@/store/notification-store";
import { cn } from "@/lib/utils";

const ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const STYLES = {
  success: "border-success/30 bg-success/10",
  error: "border-danger/30 bg-danger/10",
  warning: "border-warning/30 bg-warning/10",
  info: "border-accent/30 bg-accent/10",
};

export function ToastContainer() {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="fixed bottom-20 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {notifications.map((notification) => {
        const Icon = ICONS[notification.type];
        return (
          <div
            key={notification.id}
            className={cn(
              "flex items-start gap-3 p-4 rounded-lg border backdrop-blur-xl animate-in slide-in-from-right-full duration-300",
              STYLES[notification.type]
            )}
          >
            <Icon size={18} className="shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{notification.title}</p>
              {notification.message && (
                <p className="text-xs text-muted-foreground mt-0.5">{notification.message}</p>
              )}
            </div>
            <button onClick={() => removeNotification(notification.id)}>
              <X size={14} className="text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
