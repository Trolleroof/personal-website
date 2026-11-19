'use client';

import { useEffect, useState } from 'react';

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let ignore = false;
    fetch('/api/visits')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { value?: number | null } | null) => {
        if (ignore || data?.value == null || !Number.isFinite(data.value)) return;
        setCount(data.value);
      })
      .catch(() => {});
    return () => {
      ignore = true;
    };
  }, []);

  if (count === null) return null;

  return <span>visitors: {count.toLocaleString('en-US')}</span>;
}
