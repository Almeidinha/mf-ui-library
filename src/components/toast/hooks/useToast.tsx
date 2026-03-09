import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ToastItem,
  ToastItemData,
  ToastPosition,
  ToastSharedProps,
  ToastViewport,
} from "../toast";

export type ShowToastInput = ToastSharedProps & {
  key?: string;
};

export type ToastContextValue = {
  showToast: (input: ShowToastInput) => string;
  closeToast: (id: string) => void;
  closeAll: () => void;
};

export type ToastProviderProps = {
  children?: ReactNode;
  position?: ToastPosition;
  label?: string;
  maxVisible?: number;
  duration?: number;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function createToastId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const ToastProvider: FC<ToastProviderProps> = ({
  children,
  position = "top",
  label = "Notification",
  maxVisible = 3,
  duration,
}) => {
  const [toasts, setToasts] = useState<ToastItemData[]>([]);
  const removalTimeoutsRef = useRef<Record<string, number>>({});
  const toastsRef = useRef<ToastItemData[]>([]);
  const autoCloseTimeoutsRef = useRef<Record<string, number>>({});

  useEffect(() => {
    toastsRef.current = toasts;
  }, [toasts]);

  const clearRemovalTimeout = useCallback((id: string) => {
    const timeoutId = removalTimeoutsRef.current[id];

    if (timeoutId) {
      window.clearTimeout(timeoutId);
      delete removalTimeoutsRef.current[id];
    }
  }, []);

  const scheduleRemoval = useCallback(
    (id: string) => {
      clearRemovalTimeout(id);

      removalTimeoutsRef.current[id] = window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
        delete removalTimeoutsRef.current[id];
      }, 200);
    },
    [clearRemovalTimeout],
  );

  const clearAutoCloseTimeout = useCallback((id: string) => {
    const timeoutId = autoCloseTimeoutsRef.current[id];

    if (timeoutId) {
      window.clearTimeout(timeoutId);
      delete autoCloseTimeoutsRef.current[id];
    }
  }, []);

  const scheduleAutoClose = useCallback(
    (id: string, timeoutMs?: number) => {
      clearAutoCloseTimeout(id);

      if (!timeoutMs || timeoutMs <= 0) {
        return;
      }

      autoCloseTimeoutsRef.current[id] = window.setTimeout(() => {
        setToasts((current) =>
          current.map((toast) =>
            toast.id === id ? { ...toast, open: false } : toast,
          ),
        );
        scheduleRemoval(id);
        delete autoCloseTimeoutsRef.current[id];
      }, timeoutMs);
    },
    [clearAutoCloseTimeout, scheduleRemoval],
  );

  const removeToast = useCallback(
    (id: string) => {
      clearRemovalTimeout(id);
      clearAutoCloseTimeout(id);
      setToasts((current) => current.filter((toast) => toast.id !== id));
    },
    [clearRemovalTimeout, clearAutoCloseTimeout],
  );

  const closeToast = useCallback(
    (id: string) => {
      clearAutoCloseTimeout(id);

      setToasts((current) =>
        current.map((toast) =>
          toast.id === id ? { ...toast, open: false } : toast,
        ),
      );

      scheduleRemoval(id);
    },
    [clearAutoCloseTimeout, scheduleRemoval],
  );

  const closeAll = useCallback(() => {
    Object.keys(removalTimeoutsRef.current).forEach((id) => {
      window.clearTimeout(removalTimeoutsRef.current[id]);
    });

    Object.keys(autoCloseTimeoutsRef.current).forEach((id) => {
      window.clearTimeout(autoCloseTimeoutsRef.current[id]);
    });

    removalTimeoutsRef.current = {};
    autoCloseTimeoutsRef.current = {};

    setToasts((current) => current.map((toast) => ({ ...toast, open: false })));

    window.setTimeout(() => {
      setToasts([]);
    }, 200);
  }, []);

  const showToast = useCallback(
    (input: ShowToastInput) => {
      const nextKey = input.key?.trim();
      const effectiveDuration = input.duration ?? duration;
      const existingToast = nextKey
        ? toastsRef.current.find((toast) => toast.key === nextKey)
        : undefined;

      if (existingToast) {
        clearRemovalTimeout(existingToast.id);

        setToasts((current) =>
          current.map((toast) =>
            toast.id === existingToast.id
              ? {
                  ...toast,
                  ...input,
                  key: nextKey,
                  open: true,
                  createdAt: Date.now(),
                }
              : toast,
          ),
        );

        scheduleAutoClose(existingToast.id, effectiveDuration);
        return existingToast.id;
      }

      const id = createToastId();

      setToasts((current) => {
        const nextToast: ToastItemData = {
          id,
          key: nextKey,
          open: true,
          createdAt: Date.now(),
          title: input.title,
          description: input.description,
          variant: input.variant ?? "default",
          duration: input.duration,
          closeable: input.closeable,
          actionText: input.actionText,
          actionAltText: input.actionAltText,
          onActionClick: input.onActionClick,
        };

        const next = [...current, nextToast];
        const overflow = next.slice(0, Math.max(0, next.length - maxVisible));
        const visible = next.slice(-maxVisible);

        overflow.forEach((toast) => {
          clearAutoCloseTimeout(toast.id);
          clearRemovalTimeout(toast.id);
        });

        return visible;
      });

      scheduleAutoClose(id, effectiveDuration);
      return id;
    },
    [
      clearAutoCloseTimeout,
      clearRemovalTimeout,
      duration,
      maxVisible,
      scheduleAutoClose,
    ],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      showToast,
      closeToast,
      closeAll,
    }),
    [showToast, closeToast, closeAll],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <ToastViewport $position={position} aria-label={label}>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            open={toast.open}
            onOpenChange={(nextOpen) => {
              if (!nextOpen) {
                closeToast(toast.id);
              }
            }}
            onRemove={() => removeToast(toast.id)}
            position={position}
            closeable={toast.closeable}
            variant={toast.variant}
            duration={toast.duration}
            createdAt={toast.createdAt}
            title={toast.title}
            description={toast.description}
            actionText={toast.actionText}
            actionAltText={toast.actionAltText}
            onActionClick={toast.onActionClick}
          />
        ))}
      </ToastViewport>
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
