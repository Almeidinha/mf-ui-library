import * as ToastPrimitive from "@radix-ui/react-toast";
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  getSwipeDirection,
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
  duration?: number;
  label?: string;
  maxVisible?: number;
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
  duration,
  label = "Notification",
  maxVisible = 3,
}) => {
  const [toasts, setToasts] = useState<ToastItemData[]>([]);
  const removalTimeoutsRef = useRef<Record<string, number>>({});

  const clearRemovalTimeout = useCallback((id: string) => {
    const timeoutId = removalTimeoutsRef.current[id];

    if (timeoutId) {
      window.clearTimeout(timeoutId);
      delete removalTimeoutsRef.current[id];
    }
  }, []);

  const removeToast = useCallback(
    (id: string) => {
      clearRemovalTimeout(id);
      setToasts((current) => current.filter((toast) => toast.id !== id));
    },
    [clearRemovalTimeout],
  );

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

  const closeToast = useCallback(
    (id: string) => {
      setToasts((current) =>
        current.map((toast) =>
          toast.id === id ? { ...toast, open: false } : toast,
        ),
      );
      scheduleRemoval(id);
    },
    [scheduleRemoval],
  );

  const closeAll = useCallback(() => {
    Object.keys(removalTimeoutsRef.current).forEach((id) => {
      window.clearTimeout(removalTimeoutsRef.current[id]);
    });

    removalTimeoutsRef.current = {};

    setToasts((current) => current.map((toast) => ({ ...toast, open: false })));

    window.setTimeout(() => {
      setToasts([]);
    }, 200);
  }, []);

  const showToast = useCallback(
    (input: ShowToastInput) => {
      const existingKey = input.key?.trim();
      const existingOpenToast = existingKey
        ? toasts.find((toast) => toast.key === existingKey)
        : undefined;

      if (existingOpenToast) {
        clearRemovalTimeout(existingOpenToast.id);

        setToasts((current) =>
          current.map((toast) =>
            toast.id === existingOpenToast.id
              ? {
                  ...toast,
                  ...input,
                  key: existingKey,
                  open: true,
                }
              : toast,
          ),
        );

        return existingOpenToast.id;
      }

      const id = createToastId();

      setToasts((current) => {
        const next = [
          ...current,
          {
            id,
            key: existingKey,
            open: true,
            variant: input.variant ?? "default",
            title: input.title,
            description: input.description,
            duration: input.duration,
            actionText: input.actionText,
            actionAltText: input.actionAltText,
            onActionClick: input.onActionClick,
          },
        ];

        return next.slice(-maxVisible);
      });

      return id;
    },
    [clearRemovalTimeout, maxVisible, toasts],
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
      <ToastPrimitive.Provider
        duration={duration}
        swipeDirection={getSwipeDirection(position)}
        label={label}
      >
        {children}

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
            variant={toast.variant}
            duration={toast.duration}
            title={toast.title}
            description={toast.description}
            actionText={toast.actionText}
            actionAltText={toast.actionAltText}
            onActionClick={toast.onActionClick}
          />
        ))}

        <ToastViewport $position={position} />
      </ToastPrimitive.Provider>
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
