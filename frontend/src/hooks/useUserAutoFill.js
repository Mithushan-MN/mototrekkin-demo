// src/hooks/useUserAutoFill.js
import { useEffect, useRef, useState, useCallback } from "react";

const LS_KEY = "profile:v1";

const indexNames = (FIELD_MAP) => {
  const m = new Map();
  FIELD_MAP.forEach(({ profile, names }) => {
    names.forEach((n) => m.set(n, profile));
  });
  return m;
};

export function useUserAutoFill(FIELD_MAP) {
  const formRef = useRef({});
  const [profile, setProfile] = useState({});
  const [ready, setReady] = useState(false);
  const nameToProfile = useRef(indexNames(FIELD_MAP));

  // Load from cache
  useEffect(() => {
    const cached = localStorage.getItem(LS_KEY);
    if (cached) {
      try { setProfile(JSON.parse(cached)); } catch {}
    }
  }, []);

  // FETCH FROM YOUR REAL API
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const userId = JSON.parse(atob(token.split('.')[1])).id;
        const res = await fetch(`/api/userProfile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Failed to fetch profile');

        const data = await res.json();
        if (!alive) return;

        const merged = { ...(profile || {}), ...data };
        setProfile(merged);
        localStorage.setItem(LS_KEY, JSON.stringify(merged));
      } catch (e) {
        console.warn("Profile load failed (offline OK):", e);
      } finally {
        if (alive) setReady(true);
      }
    })();
    return () => { alive = false; };
  }, []);

  // PREFILL: Use formRef.current object
  const prefill = useCallback(() => {
    if (!formRef.current || !profile) return;

    FIELD_MAP.forEach(({ profile: key, names }) => {
      const value = profile[key];
      if (value === undefined || value === null || value === "") return;

      names.forEach((name) => {
        const keys = name.split('.');
        let target = formRef.current;

        for (let i = 0; i < keys.length - 1; i++) {
          if (!target[keys[i]]) target[keys[i]] = {};
          target = target[keys[i]];
        }

        const finalKey = keys[keys.length - 1];
        if (target[finalKey] === undefined || target[finalKey] === "") {
          target[finalKey] = value;
        }
      });
    });

    if (profile.email && !formRef.current.confirmEmail) {
      formRef.current.confirmEmail = profile.email;
    }

    window.dispatchEvent(new Event('userProfileLoaded'));
  }, [profile]);

  useEffect(() => {
    if (ready) prefill();
  }, [ready, prefill]);

  // SAVE: Use your real API
  const saveProfile = async (partial) => {
    const next = { ...profile, ...partial };
    setProfile(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));

    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const userId = JSON.parse(atob(token.split('.')[1])).id;
      await fetch(`/api/userProfile/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(partial)
      });
    } catch (e) {
      console.warn("Profile save failed", e);
    }
  };

  return { formRef, profile, saveProfile };
}