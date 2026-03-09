import { act, renderHook, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ToastProvider, useToast } from "./useToast";

describe("ToastProvider + useToast", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("throws if useToast is used outside ToastProvider", () => {
    expect(() => renderHook(() => useToast())).toThrow(
      "useToast must be used within a ToastProvider",
    );
  });

  it("renders a viewport with the provided label", () => {
    renderHook(() => useToast(), {
      wrapper: ({ children }) => (
        <ToastProvider label="My Notifications">{children}</ToastProvider>
      ),
    });

    expect(screen.getByLabelText("My Notifications")).toBeInTheDocument();
  });

  it("shows a toast when showToast is called", () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ({ children }) => <ToastProvider>{children}</ToastProvider>,
    });

    act(() => {
      result.current.showToast({
        title: "Hello",
        description: "World",
      });
    });

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("World")).toBeInTheDocument();
  });

  it("dedupes toasts by key and updates the existing one", () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ({ children }) => <ToastProvider>{children}</ToastProvider>,
    });

    act(() => {
      result.current.showToast({
        key: "same",
        title: "First",
        description: "One",
      });
    });

    act(() => {
      result.current.showToast({
        key: "same",
        title: "Second",
        description: "Two",
      });
    });

    expect(screen.queryByText("First")).not.toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });

  it("closeToast hides and then removes the toast", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useToast(), {
      wrapper: ({ children }) => <ToastProvider>{children}</ToastProvider>,
    });

    let id = "";

    act(() => {
      id = result.current.showToast({
        title: "Closable",
        description: "Toast",
      });
    });

    expect(screen.getByText("Closable")).toBeInTheDocument();

    act(() => {
      result.current.closeToast(id);
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.queryByText("Closable")).not.toBeInTheDocument();
  });

  it("closeAll closes and then removes all toasts", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useToast(), {
      wrapper: ({ children }) => <ToastProvider>{children}</ToastProvider>,
    });

    act(() => {
      result.current.showToast({ title: "One", description: "A" });
      result.current.showToast({ title: "Two", description: "B" });
    });

    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();

    act(() => {
      result.current.closeAll();
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.queryByText("One")).not.toBeInTheDocument();
    expect(screen.queryByText("Two")).not.toBeInTheDocument();
  });

  it("respects maxVisible by only rendering the newest toasts", () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ({ children }) => (
        <ToastProvider maxVisible={2}>{children}</ToastProvider>
      ),
    });

    act(() => {
      result.current.showToast({ title: "One", description: "A" });
      result.current.showToast({ title: "Two", description: "B" });
      result.current.showToast({ title: "Three", description: "C" });
    });

    expect(screen.queryByText("One")).not.toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
    expect(screen.getByText("Three")).toBeInTheDocument();
  });

  it("auto-closes toasts after duration and removes them after 200ms", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useToast(), {
      wrapper: ({ children }) => <ToastProvider>{children}</ToastProvider>,
    });

    act(() => {
      result.current.showToast({
        title: "Timed",
        description: "Toast",
        duration: 500,
      });
    });

    expect(screen.getByText("Timed")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByText("Timed")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.queryByText("Timed")).not.toBeInTheDocument();
  });
});
