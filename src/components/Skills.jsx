import React from 'react';
import Reveal from './ui/Reveal';
import {
  SiReact,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiNextdotjs,
  SiNuxt,
  SiAstro,
  SiExpress,
  SiNestjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiFigma,
  SiNodedotjs,
  SiGit
} from 'react-icons/si';

const technologies = [
  { name: 'React', icon: <SiReact className="h-8 w-8" />, hoverClass: 'group-hover:text-[#61DAFB] group-active:text-[#61DAFB]' },
  { name: 'Vue.js', icon: <SiVuedotjs className="h-8 w-8" />, hoverClass: 'group-hover:text-[#4FC08D] group-active:text-[#4FC08D]' },
  { name: 'Angular', icon: <SiAngular className="h-8 w-8" />, hoverClass: 'group-hover:text-[#DD0031] group-active:text-[#DD0031]' },
  { name: 'Svelte', icon: <SiSvelte className="h-8 w-8" />, hoverClass: 'group-hover:text-[#FF3E00] group-active:text-[#FF3E00]' },
  { name: 'Next.js', icon: <SiNextdotjs className="h-8 w-8" />, hoverClass: 'group-hover:text-white group-active:text-white' },
  { name: 'Nuxt', icon: <SiNuxt className="h-8 w-8" />, hoverClass: 'group-hover:text-[#00DC82] group-active:text-[#00DC82]' },
  { name: 'Astro', icon: <SiAstro className="h-8 w-8" />, hoverClass: 'group-hover:text-[#FF5D01] group-active:text-[#FF5D01]' },
  { name: 'Express', icon: <SiExpress className="h-8 w-8" />, hoverClass: 'group-hover:text-white group-active:text-white' },
  { name: 'NestJS', icon: <SiNestjs className="h-8 w-8" />, hoverClass: 'group-hover:text-[#E0234E] group-active:text-[#E0234E]' },
  { name: 'Node.js', icon: <SiNodedotjs className="h-8 w-8" />, hoverClass: 'group-hover:text-[#339933] group-active:text-[#339933]' },
  { name: 'TypeScript', icon: <SiTypescript className="h-8 w-8" />, hoverClass: 'group-hover:text-[#3178C6] group-active:text-[#3178C6]' },
  { name: 'JavaScript', icon: <SiJavascript className="h-8 w-8" />, hoverClass: 'group-hover:text-[#F7DF1E] group-active:text-[#F7DF1E]' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="h-8 w-8" />, hoverClass: 'group-hover:text-[#06B6D4] group-active:text-[#06B6D4]' },
  { name: 'Figma', icon: <SiFigma className="h-8 w-8" />, hoverClass: 'group-hover:text-[#F24E1E] group-active:text-[#F24E1E]' },
  { name: 'Git', icon: <SiGit className="h-8 w-8" />, hoverClass: 'group-hover:text-[#F05032] group-active:text-[#F05032]' }
];

// Duplicate the array mapped internally instead of pre-concatenating
export default function Skills() {
  const track1Ref = React.useRef(null);
  const track2Ref = React.useRef(null);

  const setPlaybackRate = (rate) => {
    [track1Ref, track2Ref].forEach(ref => {
      if (ref.current) {
        ref.current.getAnimations().forEach(anim => {
          anim.playbackRate = rate;
        });
      }
    });
  };

  return (
    <section id="skills" className="min-h-[100svh] flex flex-col justify-center py-12">
      <Reveal className="mx-auto w-full max-w-3xl px-6 mb-12">
        <div>
          <span className="mb-3 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
            02 / Skills
          </span>
          <h2 className="mb-6 font-sans text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            My Skills
          </h2>
          <p className="max-w-2xl font-sans text-base leading-relaxed text-text-secondary md:text-lg">
            I specialize in building scalable web applications and seamless user experiences. Here are the technologies, frameworks, and tools I use to bring ideas to life.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div
          className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
          onPointerEnter={() => setPlaybackRate(0.2)}
          onPointerLeave={() => setPlaybackRate(1)}
          onPointerDown={() => setPlaybackRate(0.2)}
          onPointerUp={() => setPlaybackRate(1)}
          onPointerCancel={() => setPlaybackRate(1)}
        >
          {/* Marquee Track Container */}
          <div className="flex w-full flex-nowrap overflow-visible">
            {/* First Track */}
            <div
              ref={track1Ref}
              className="flex w-max shrink-0 animate-marquee items-center justify-around"
            >
              {technologies.map((tech, index) => (
                <div
                  key={`first-${tech.name}-${index}`}
                  className="group flex flex-col items-center justify-center mx-8 md:mx-12 transition-all duration-300 cursor-pointer"
                >
                  <div className={`text-text-muted  transition-all duration-300 group-hover:scale-110 group-active:scale-95 ${tech.hoverClass}`}>
                    {tech.icon}
                  </div>
                  <span className={`mt-4 font-sans text-[10px] font-semibold uppercase tracking-wider text-transparent transition-all duration-300 translate-y-2 group-hover:translate-y-0 group-active:translate-y-0 ${tech.hoverClass}`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Second Track (Exact Clone) */}
            <div
              ref={track2Ref}
              className="flex w-max shrink-0 animate-marquee items-center justify-around"
              aria-hidden="true"
            >
              {technologies.map((tech, index) => (
                <div
                  key={`second-${tech.name}-${index}`}
                  className="group flex flex-col items-center justify-center mx-8 md:mx-12 transition-all duration-300 cursor-pointer"
                >
                  <div className={`text-text-muted  transition-all duration-300 group-hover:scale-110 group-active:scale-95 ${tech.hoverClass}`}>
                    {tech.icon}
                  </div>
                  <span className={`mt-4 font-sans text-[10px] font-semibold uppercase tracking-wider text-transparent transition-all duration-300 translate-y-2 group-hover:translate-y-0 group-active:translate-y-0 ${tech.hoverClass}`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
