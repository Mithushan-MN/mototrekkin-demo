// src/hooks/useUserAutoFill.js
import { useEffect, useRef, useState, useCallback } from "react";

const LS_KEY = "profile:v1";

const indexNames = (FIELD_MAP) => {
  // Map input name -> profile key (for quick reverse lookup)
  const m = new Map();
  FIELD_MAP.forEach(({ profile, names }) => {
    names.forEach((n) => m.set(n, profile));
  });
  return m;
};

export function useUserAutoFill(FIELD_MAP) {
  const formRef = useRef(null);
  const [profile, setProfile] = useState({});
  const [ready, setReady] = useState(false);
  const nameToProfile = useRef(indexNames(FIELD_MAP));

  // load from cache fast
  useEffect(() => {
    const cached = localStorage.getItem(LS_KEY);
    if (cached) {
      try { setProfile(JSON.parse(cached)); } catch {}
    }
  }, []);

  // fetch from API then merge
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/profile/me", { credentials: "include" });
        const data = await res.json();
        if (!alive) return;
        const merged = { ...(profile || {}), ...(data || {}) };
        setProfile(merged);
        localStorage.setItem(LS_KEY, JSON.stringify(merged));
      } catch (e) {
        // ignore network errors for offline-first fill
      } finally {
        if (alive) setReady(true);
      }
    })();
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // helper: set input value respecting input type
  const setInputValue = (el, value) => {
    if (el.type === "checkbox" || el.type === "radio") {
      el.checked = value === true || value === el.value;
    } else {
      el.value = value ?? "";
      el.dispatchEvent(new Event("input", { bubbles: true })); // let React pick it up
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  // Prefill once DOM is ready & profile loaded
  const prefill = useCallback(() => {
    const form = formRef.current;
    if (!form || !profile) return;

    // For each profile key, fill all known names if empty in the UI
    FIELD_MAP.forEach(({ profile: key, names }) => {
      const value = profile[key];
      if (value === undefined || value === null || value === "") return;

      names.forEach((n) => {
        const el = form.querySelector(`[name="${CSS.escape(n)}"]`);
        if (!el) return;
        // only override if field is blank
        const isBlank =
          (el.type === "checkbox" || el.type === "radio")
            ? !el.checked
            : !el.value;
        if (isBlank) setInputValue(el, value);
      });
    });

    // Special case: keep confirmEmail in sync with email if it exists blank
    const email = profile.email;
    if (email) {
      const confirm = form.querySelector('[name="confirmEmail"]');
      if (confirm && !confirm.value) setInputValue(confirm, email);
    }
  }, [FIELD_MAP, profile]);

  useEffect(() => { if (ready) prefill(); }, [ready, prefill]);

  // Push updates to cache + server whenever a mapped input changes
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handler = (e) => {
      const { name, type, value, checked } = e.target;
      const key = nameToProfile.current.get(name);
      if (!key) return; // not a common field

      const next = { ...profile };
      next[key] = (type === "checkbox") ? !!checked : value;

      setProfile(next);
      localStorage.setItem(LS_KEY, JSON.stringify(next));

      // fire-and-forget save (debounced in a real app)
      fetch("/api/profile/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(next),
      }).catch(() => {});
    };

    form.addEventListener("input", handler, true);
    form.addEventListener("change", handler, true);
    return () => {
      form.removeEventListener("input", handler, true);
      form.removeEventListener("change", handler, true);
    };
  }, [profile]);

  const saveProfile = async (partial) => {
    const next = { ...profile, ...partial };
    setProfile(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    const res = await fetch("/api/profile/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(next),
    });
    return res.json();
  };

  return { formRef, profile, saveProfile };
}
