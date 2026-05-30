import React from 'react';

export default function Footer() {
  return (
    <>
      {/* Subtle Copyright Sign-off */}
      <footer className="w-full pb-12 pt-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-2 px-6 text-center md:px-8">
          <span className="font-sans font-medium text-[13px] tracking-wide text-text-muted">
            © {new Date().getFullYear()} Raihan Wisteria.
          </span>
        </div>
      </footer>
    </>
  );
}
