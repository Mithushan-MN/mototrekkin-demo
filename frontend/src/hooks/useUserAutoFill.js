// src/hooks/useUserAutoFill.js
import { useEffect, useRef } from "react";

const STORAGE_KEY = "mototrekkinUserData";

export const useUserAutoFill = (fieldNames = []) => {
  const formRef = useRef(null);

  // === LOAD DATA ===
  useEffect(() => {
    if (!formRef.current) return;

    const tryFill = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const data = JSON.parse(saved);
      let filled = false;

      fieldNames.forEach(name => {
        const value = getNestedValue(data, name);
        if (value === undefined || value === null) return;

        const field = formRef.current.elements.namedItem(name);
        if (field && !field.value) {
          field.value = value;
          filled = true;
        }
      });

      if (filled) {
        formRef.current.dispatchEvent(new Event("input", { bubbles: true }));
      }
    };

    tryFill();

    // Retry until form is ready (for conditional steps)
    let attempts = 0;
    const interval = setInterval(() => {
      if (attempts++ > 30) {
        clearInterval(interval);
        return;
      }
      tryFill();
    }, 100);

    return () => clearInterval(interval);
  }, [fieldNames]);

  // === SAVE DATA ===
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const save = () => {
      const payload = {};
      fieldNames.forEach(name => {
        const field = form.elements.namedItem(name);
        if (field?.value) {
          setNestedValue(payload, name, field.value.trim());
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

// === HELPERS ===
function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

function setNestedValue(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}