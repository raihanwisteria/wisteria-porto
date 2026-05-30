import React from 'react';
import Reveal from './ui/Reveal';
import Magnetic from './ui/Magnetic';

const contacts = [
  {
    platform: 'GitHub',
    label: 'github.com/raihanwisteria',
    href: 'https://github.com/raihanwisteria',
    external: true,
  },
  {
    platform: 'Instagram',
    label: '@raihanwisteria',
    href: 'https://instagram.com/raihanwisteria',
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="min-h-[100svh] flex flex-col justify-center py-12">
      <Reveal className="mx-auto w-full max-w-3xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="mb-3 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
            04 / Contact
          </span>
          <h2 className="mb-6 max-w-md font-sans text-3xl font-semibold leading-[1.2] tracking-tight text-text-primary md:text-4xl">
            Let's build something
            <br />
            <span className="font-serif italic font-normal text-accent">
              worth remembering.
            </span>
          </h2>
          <p className="max-w-xl font-sans text-base leading-relaxed text-text-secondary md:text-lg">
            Whether you have a wild idea, a startup vision, or just want to chat about design systems and software architecture, my inbox is always open. Let's create an experience that leaves a lasting impression.
          </p>
        </div>

        {/* Contact Links */}
        <div className="flex flex-col gap-4 sm:flex-row">
          {contacts.map((contact, index) => (
            <a
              key={contact.platform}
              href={contact.href}
              target={contact.external ? '_blank' : undefined}
              rel={contact.external ? 'noopener noreferrer' : undefined}
              className="group flex flex-1 items-center justify-between rounded-2xl border px-6 py-5 transition-all duration-300 transform-gpu border-glass-border bg-glass backdrop-blur-lg md:hover:-translate-y-1 md:hover:border-border-mid md:hover:bg-card md:hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-text-faint">
                  {contact.platform}
                </span>
                <span className="font-sans text-base font-medium text-text-primary transition-colors duration-200 group-hover:text-accent">
                  {contact.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
