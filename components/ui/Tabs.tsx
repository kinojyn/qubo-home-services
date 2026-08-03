"use client";

import { type KeyboardEvent, type ReactNode, useId, useState } from "react";

import { mergeClassNames } from "@/utils/mergeClassNames";

export type TabItem = {
  content: ReactNode;
  disabled?: boolean;
  id: string;
  label: ReactNode;
};

type TabsProps = {
  className?: string;
  defaultTabId?: string;
  items: TabItem[];
  label: string;
};

export function Tabs({ className, defaultTabId, items, label }: TabsProps) {
  const fallbackTab = items.find((item) => !item.disabled)?.id ?? "";
  const validDefaultTab = items.some((item) => item.id === defaultTabId && !item.disabled)
    ? defaultTabId
    : undefined;
  const [activeTabId, setActiveTabId] = useState(validDefaultTab ?? fallbackTab);
  const instanceId = useId();
  const enabledItems = items.filter((item) => !item.disabled);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, itemId: string) {
    if (enabledItems.length === 0) {
      return;
    }

    const currentIndex = enabledItems.findIndex((item) => item.id === itemId);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % enabledItems.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = enabledItems.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextItem = enabledItems[nextIndex];
    setActiveTabId(nextItem.id);
    document.getElementById(`${instanceId}-tab-${nextItem.id}`)?.focus();
  }

  return (
    <div className={className}>
      <div
        aria-label={label}
        className="flex gap-2 overflow-x-auto border-b border-divider"
        role="tablist"
      >
        {items.map((item) => {
          const isActive = activeTabId === item.id;

          return (
            <button
              aria-controls={`${instanceId}-panel-${item.id}`}
              aria-selected={isActive}
              className={mergeClassNames(
                "min-h-button shrink-0 border-b-2 border-transparent px-4 text-sm font-semibold text-text-secondary transition duration-[var(--ds-duration-normal)] ease-standard hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:text-disabled-text",
                isActive && "border-accent text-text-primary",
              )}
              disabled={item.disabled}
              id={`${instanceId}-tab-${item.id}`}
              key={item.id}
              onClick={() => setActiveTabId(item.id)}
              onKeyDown={(event) => handleKeyDown(event, item.id)}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => {
        const isActive = activeTabId === item.id;

        return (
          <div
            aria-labelledby={`${instanceId}-tab-${item.id}`}
            className={mergeClassNames("py-6", !isActive && "hidden")}
            hidden={!isActive}
            id={`${instanceId}-panel-${item.id}`}
            key={item.id}
            role="tabpanel"
            tabIndex={0}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}
