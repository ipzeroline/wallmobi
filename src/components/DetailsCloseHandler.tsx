"use client";

import { useEffect } from "react";

export default function DetailsCloseHandler() {
  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      // Close header details on click outside
      document.querySelectorAll("header details").forEach((d) => {
        if (!d.contains(e.target as Node)) {
          d.removeAttribute("open");
        }
      });

      // Close details if a link inside is clicked
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.closest("a")) {
        const parentDetails = target.closest("details");
        if (parentDetails) {
          parentDetails.removeAttribute("open");
        }
      }
    };

    document.addEventListener("click", handleClose);
    return () => document.removeEventListener("click", handleClose);
  }, []);

  return null;
}
