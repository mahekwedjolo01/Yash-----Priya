import { Fragment } from "react";

import { SmartImage } from "./ui/SmartImage";
import { useInView } from "../hooks/useInView";
import { locationPresentation } from "../lib/location";

export function EventCard({ event, index }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const location = locationPresentation(event.location);
  const hasMap = location?.mode === "map";

  const details = [
    ["DATE", event.date],
    ["TIME", event.time],
    ["VENUE", event.venue],
  ];

  return (
    <div
      ref={ref}
      className={`relative mx-auto my-[20px] flex min-h-[380px] sm:min-h-[440px] w-full max-w-[1300px] flex-col justify-center overflow-hidden rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,.25)] transition-all duration-1000 md:my-[40px] md:rounded-[35px] ${
        hasMap ? "md:min-h-[780px]" : "md:h-[650px] md:min-h-0"
      }`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(100px)",
      }}
    >
      <SmartImage
        src={event.image}
        alt=""
        placeholderLabel={event.title}
        seed={index}
        loading="lazy"
        className="absolute inset-0 size-full object-cover pointer-events-none"
      />

      <div className="relative z-10 flex size-full min-h-[380px] sm:min-h-[440px] md:min-h-0 flex-col items-center justify-center bg-[linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.55))] p-[20px] py-[25px] text-center text-white md:p-[30px]">
        <h2 className="mb-[8px] font-script text-[32px] sm:text-[40px] font-bold leading-tight text-shadow-[0_5px_15px_rgba(0,0,0,.5)] md:mb-[10px] md:text-[70px]">
          {event.title}
        </h2>

        <p className="mb-[16px] max-w-[600px] text-[13px] sm:text-[15px] leading-relaxed md:mb-[25px] md:text-[22px]">
          {event.description}
        </p>

        <div className="flex flex-col gap-[4px] sm:gap-[6px]">
          {details.map(([label, value]) => (
            <Fragment key={label}>
              <span className="text-[12px] sm:text-[14px] tracking-[3px] opacity-80 uppercase">
                {label}
              </span>
              <strong className="max-w-[90vw] text-[14px] sm:text-[16px] font-semibold leading-snug md:max-w-none md:text-[24px]">
                {value}
              </strong>
            </Fragment>
          ))}
        </div>

        {location?.mode === "button" ? (
          <a
            href={location.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 max-w-full items-center justify-center rounded-full border border-gold-100 bg-gold-500 px-7 py-2 text-center text-sm font-semibold break-words text-wine-800 shadow-lg transition hover:bg-gold-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-100 md:text-base"
          >
            {location.label}
          </a>
        ) : null}

        {hasMap ? (
          <div className="mt-6 w-full max-w-[860px] overflow-hidden rounded-[18px] border-2 border-gold-100/80 bg-white shadow-[0_15px_40px_rgba(0,0,0,.3)] md:mt-8">
            <iframe
              title={`Map to ${event.venue || event.title}`}
              src={location.url}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="block h-[250px] w-full border-0 sm:h-[300px] md:h-[340px]"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
