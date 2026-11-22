import { useCountdown } from "../hooks/useCountdown";
import { useSite } from "../hooks/useSite";
import { formatLongDate, parseDate } from "../lib/date";

const BACKDROP =
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600";

const pad = (value) => String(value).padStart(2, "0");

export function CountdownSection() {
  const { countdown, weddingDate, ceremonyHour } = useSite();

  const target = parseDate(weddingDate, ceremonyHour);
  const remaining = useCountdown(target);

  // `target` must be checked too: an unparseable date also reports `isPast`,
  // and showing "Happily Married" because of a typo would be worse than zeros.
  const celebrating = Boolean(target) && remaining.isPast;

  return (
    <section
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center px-5 py-[50px] text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(255,245,245,.95), rgba(255,245,245,.95)), url('${BACKDROP}')`,
      }}
    >
      <h2 className="mb-[15px] font-script text-[50px] font-bold text-wine-500 md:text-[80px]">
        {celebrating ? countdown.completedTitle : countdown.title}
      </h2>

      <p className="mb-[40px] text-[20px] text-[#555]">
        {celebrating ? countdown.completedMessage : countdown.subtitle}
      </p>

      {celebrating ? (
        <p className="rounded-[25px] bg-white px-[35px] py-[22px] text-[22px] font-semibold tracking-[1px] text-wine-500 shadow-[0_10px_25px_rgba(0,0,0,.15)] md:text-[28px]">
          {formatLongDate(target)}
        </p>
      ) : (
        <div
          className="flex flex-wrap justify-center gap-[10px] md:gap-[25px]"
          role="timer"
          aria-label={`${remaining.days} days until the wedding`}
        >
          {countdown.units.map((unit) => (
            <div
              key={unit.id}
              className="flex size-[75px] flex-col items-center justify-center rounded-[25px] bg-white shadow-[0_10px_25px_rgba(0,0,0,.15)] md:size-[140px]"
            >
              <span className="text-[22px] font-bold text-wine-500 tabular-nums md:text-[48px]">
                {pad(remaining[unit.id])}
              </span>
              <small className="mt-[5px] text-[12px] text-[#666] md:text-[16px]">
                {unit.label}
              </small>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
