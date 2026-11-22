import { useSite } from "../hooks/useSite";

const BACKDROP =
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600";

export function VenueSection() {
  const { venue } = useSite();

  return (
    <section
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-5 py-[80px]"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url('${BACKDROP}')`,
      }}
    >
      <div className="w-full max-w-[1200px] text-center text-white">
        <h2 className="mb-[15px] font-script text-[50px] font-bold md:text-[80px]">
          {venue.title}
        </h2>

        <p className="mb-[40px] text-[16px] md:text-[22px]">{venue.subtitle}</p>

        <div className="mb-[30px] rounded-[25px] bg-white/15 p-[20px] backdrop-blur-[10px] md:p-[30px]">
          <h3 className="mb-[10px] text-[24px] font-bold md:text-[32px]">
            {venue.name}
          </h3>
          {/* The source stylesheet sizes every paragraph in this section alike. */}
          <p className="mb-[40px] text-[16px] whitespace-pre-line md:text-[22px]">
            {venue.address}
          </p>
        </div>

        <div className="overflow-hidden rounded-[25px] shadow-[0_15px_40px_rgba(0,0,0,.3)]">
          <iframe
            title={`Map to ${venue.name}`}
            src={venue.mapSrc}
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-[350px] w-full border-0 md:h-[500px]"
          />
        </div>
      </div>
    </section>
  );
}
