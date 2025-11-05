// src/hooks/useUserAutoFill.js
import { useEffect, useRef } from "react";

const STORAGE_KEY = "mototrekkinUserData";

export const useUserAutoFill = (fieldNames = []) => {
  const formRef = useRef(null);
  const filledRef = useRef(false); // Prevent double-fill

  useEffect(() => {
    if (!formRef.current || filledRef.current) return;

    const tryFill = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved || filledRef.current) return;

      const data = JSON.parse(saved);
      let filled = false;

      fieldNames.forEach(name => {
        const field = formRef.current.elements.namedItem(name);
        if (!field || field.value) return;

        const value = getNestedValue(data, name);
        if (value === undefined || value === null) return;

        // Special: Date fields
        if (name === "licenceExpiry" && value) {
          field.value = value;
          const date = new Date(value);
          if (!isNaN(date)) {
            // Trigger DatePicker
            const datePicker = field.closest('div')?.querySelector('input[readonly]');
            if (datePicker) datePicker.value = value;
            filled = true;
          }
        }
        // File name
        else if (name === "licenceFileName" && value) {
          field.value = value;
          const fileInput = formRef.current.elements.namedItem("licenceFile");
          if (fileInput?.parentElement) {
            const p = fileInput.parentElement.querySelector('p');
            if (p) p.textContent = `Selected: ${value}`;
          }
          filled = true;
        }
        // Normal fields
        else if (typeof value === "string" || typeof value === "number") {
          field.value = value;
          filled = true;
        }
      });

      if (filled) {
        filledRef.current = true;
        formRef.current.dispatchEvent(new Event("input", { bubbles: true }));
        formRef.current.dispatchEvent(new Event("change", { bubbles: true }));
      }
    };

    // Try now
    tryFill();

    // Retry every 100ms for 3 seconds
    let attempts = 0;
    const interval = setInterval(() => {
      if (attempts++ > 30 || filledRef.current) {
        clearInterval(interval);
        return;
      }
      tryFill();
    }, 100);

    return () => clearInterval(interval);
  }, [fieldNames]);

  // SAVE
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