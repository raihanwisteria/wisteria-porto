import { useState, useEffect, useRef } from 'react';

export function useScrollSpy(ids, offset = 0) {
  const [activeId, setActiveId] = useState(ids[0]);
  const observer = useRef(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return;

    const visibleElements = new Map();

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleElements.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleElements.delete(entry.target.id);
          }
        });

        if (visibleElements.size > 0) {
          let maxRatio = 0;
          let maxId = null;
          
          visibleElements.forEach((ratio, id) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              maxId = id;
            }
          });
          
          if (maxId) {
            setActiveId(maxId);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -20% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    elements.forEach((el) => observer.current.observe(el));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [ids]);

  return activeId;
}
