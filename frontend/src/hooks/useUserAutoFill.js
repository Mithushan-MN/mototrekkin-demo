// src/hooks/useUserAutoFill.js
import { useEffect, useRef } from "react";

const STORAGE_KEY = "bikeBookingUser";

/**
 * @param {string[]} whitelist – array of field names you want to sync
 */
export const useUserAutoFill = (whitelist = []) => {
  const formRef = useRef(null);

  // ---- LOAD saved data when component mounts ----
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved || !formRef.current) return;

    const data = JSON.parse(saved);
    const form = formRef.current;

    whitelist.forEach((name) => {
      const el = form.elements.namedItem(name);
      if (el && !el.value) {
        el.value = data[name] ?? "";
      }
    });
  }, [whitelist]);

  // ---- SAVE on every input / change (live sync) ----
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handler = () => {
      const payload = {};
      whitelist.forEach((name) => {
        const el = form.elements.namedItem(name);
        if (el && el.value) {
          payload[name] = el.value.trim();
        }
      });

      if (Object.keys(payload).length) {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...existing, ...payload })
        );
      }
    };

    form.addEventListener("input", handler);
    form.addEventListener("change", handler);
    return () => {
      form.removeEventListener("input", handler);
      form.removeEventListener("change", handler);
    };
  }, [whitelist]);

  return { formRef };
};