import React from 'react';
import { Separator } from './ui/separator';
import Reveal from './ui/Reveal';

export default function About() {
  return (
    <section id="about" className="min-h-[100svh] flex flex-col justify-center py-12">
      <Reveal className="mx-auto w-full max-w-3xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="mb-3 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
            01 / Whoami
          </span>
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            Who I Am
          </h2>
        </div>

        {/* Intro */}
        <p className="mb-12 font-sans text-xl font-medium leading-snug tracking-tight text-text-primary md:text-2xl md:leading-snug">
          A developer who thinks deeply about{' '}
          <em className="font-serif italic font-normal text-accent">systems</em>{' '}
          —
          <br className="hidden md:block" />
          from code architecture to seamless user experiences.
        </p>

        {/* Two columns content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <div className="space-y-4 font-sans text-base leading-relaxed text-text-muted md:text-lg">
            <p>
              My philosophy is simple: technology should feel invisible. Good code is like good typography—conveying its purpose without drawing unnecessary attention to itself.
            </p>
          </div>

          <div className="space-y-4 font-sans text-base leading-relaxed text-text-muted md:text-lg">
            <p>
              Design is a language of patterns. My curiosity across UI/UX and software architecture drives me to not just write code, but to engineer holistic digital experiences.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
