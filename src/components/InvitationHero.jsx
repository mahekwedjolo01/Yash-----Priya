import { ScratchCard } from "./ScratchCard";
import { Reveal } from "./ui/Reveal";
import { SmartImage } from "./ui/SmartImage";
import { useSite } from "../hooks/useSite";
import { dayName, parseDate } from "../lib/date";

const BACKDROP =
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200";

/** The invitation itself: names, portrait and the scratch-to-reveal date. */
export function InvitationHero({ active }) {
  const { hero, logo, couplePhoto, weddingDate, ceremonyHour } = useSite();
  const day = dayName(parseDate(weddingDate, ceremonyHour));

  return (
    <section
      className={`relative flex min-h-screen items-center justify-center bg-cover bg-center transition-opacity duration-1000 ${
        active ? "opacity-100" : "invisible opacity-0"
      }`}
      style={{
        backgroundImage: `linear-gradient(rgba(255,245,245,.9), rgba(255,245,245,.9)), url('${BACKDROP}')`,
      }}
    >
      <div className="p-5 text-center">
        <Reveal active={active} delay={300} className="mb-[20px] flex justify-center">
          <SmartImage
            src={logo.src}
            alt={logo.alt}
            placeholderLabel={logo.alt}
            seed={9}
            className="w-[90px] rounded-[12px] md:w-[120px]"
          />
        </Reveal>

        <Reveal active={active} delay={400}>
          <div className="relative mx-auto mb-[30px] size-[170px] rounded-full bg-[linear-gradient(135deg,#f7e7a9,#d4af37,#f7e7a9)] p-[8px] shadow-[0_10px_30px_rgba(0,0,0,.2),0_0_0_5px_#fff] md:size-[220px]">
            <SmartImage
              src={couplePhoto.src}
              alt={couplePhoto.alt}
              placeholderLabel="Couple"
              seed={1}
              className="size-full rounded-full border-4 border-white object-cover"
            />
          </div>
        </Reveal>

        <Reveal
          as="h1"
          active={active}
          preset="slideDown"
          className="font-display text-[60px] font-normal tracking-[3px] text-wine-500 md:text-[90px]"
        >
          {hero.groom}
        </Reveal>

        <Reveal
          active={active}
          delay={700}
          className="my-[15px] text-[16px] tracking-[5px] text-blush"
        >
          {hero.weds}
        </Reveal>

        <Reveal
          as="h1"
          active={active}
          preset="slideUp"
          delay={1000}
          className="font-display text-[60px] font-normal tracking-[3px] text-wine-500 md:text-[90px]"
        >
          {hero.bride}
        </Reveal>

        <Reveal
          as="p"
          active={active}
          delay={1800}
          className="my-[20px] text-[16px] leading-[1.8] whitespace-pre-line"
        >
          {hero.invite}
        </Reveal>

        <Reveal active={active} preset="zoom" delay={2400}>
          <ScratchCard label={hero.scratchLabel} date={weddingDate} day={day} />
        </Reveal>

        <Reveal active={active} preset="bounce" delay={3000}>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="size-[70px] rounded-full bg-wine-500 text-[30px] text-white shadow-[0_5px_20px_rgba(0,0,0,.2)] transition hover:scale-110 hover:bg-wine-400"
          >
            ❤️
          </button>
        </Reveal>
      </div>
    </section>
  );
}
