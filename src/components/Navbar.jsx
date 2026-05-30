import React, { useMemo, useState } from 'react';
import { cn } from '../lib/utils';
import { useScrollSpy } from '../hooks/useScrollSpy';
import Magnetic from './ui/Magnetic';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiCode, FiBriefcase, FiMail } from 'react-icons/fi';

const navItems = [
  { label: 'Intro', id: 'home', icon: FiHome },
  { label: 'Whoami', id: 'about', icon: FiUser },
  { label: 'Skills', id: 'skills', icon: FiCode },
  { label: 'Works', id: 'works', icon: FiBriefcase },
  { label: 'Contact', id: 'contact', icon: FiMail },
];

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionIds = useMemo(() => navItems.map(item => item.id), []);
  const activeId = useScrollSpy(sectionIds, 150);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex justify-center">
      {/* 
        Hover zone target that wraps the nav so it doesn't collapse 
        immediately when cursor slightly leaves the pill. 
      */}
      <div 
        className="p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.nav 
          layout
          className="transition-colors duration-300 transform-gpu liquid-glass rounded-full px-2 py-2 shadow-2xl"
          style={{ borderRadius: 9999 }}
        >
          <motion.div layout className="relative flex items-center gap-1">
            <AnimatePresence mode="popLayout">
              {navItems.map(({ label, id, icon: Icon }) => {
                const isActive = activeId === id;
                const isVisible = isHovered || isActive || isMobile;

                if (!isVisible) return null;

                return (
                  <motion.div
                    layout
                    key={id}
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  >
                    <Magnetic>
                      <a
                        href={`#${id}`}
                        onClick={(e) => handleScrollTo(e, id)}
                        className={cn(
                          'relative z-10 rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-200 flex items-center gap-2 whitespace-nowrap',
                          isActive
                            ? 'text-accent'
                            : 'text-text-muted hover:text-text-primary'
                        )}
                      >

                        <Icon className="text-[15px]" />
                        <span className="relative z-10 hidden sm:block">{label}</span>
                      </a>
                    </Magnetic>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </motion.nav>
      </div>
    </div>
  );
}
