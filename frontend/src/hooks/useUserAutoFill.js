// src/hooks/useUserAutoFill.js
import { useEffect, useRef } from "react";

const STORAGE_KEY = "mototrekkinUserData";

export const useUserAutoFill = (fieldNames = []) => {
  const formRef = useRef(null);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved || !formRef.current) return;

    const data = JSON.parse(saved);
    const form = formRef.current;

    fieldNames.forEach(name => {
      const field = form.elements.namedItem(name);
      if (field && !field.value) {
        field.value = data[name] ?? "";
      }
    });
  }, [fieldNames]);

  // Save on every input/change
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const save = () => {
      const payload = {};
      fieldNames.forEach(name => {
        const field = form.elements.namedItem(name);
        if (field?.value) {
          payload[name] = field.value.trim();
        }
      });

      if (Object.keys(payload).length > 0) {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, ...payload }));
      }
    };

    form.addEventListener("input", save);
    form.addEventListener("change", save);

    return () => {
      form.removeEventListener("input", save);
      form.removeEventListener("change", save);
    };
  }, [fieldNames]);

  return { formRef };
};