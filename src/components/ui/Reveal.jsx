const PRESETS = {
  fade: "fade-in 1s ease",
  slideDown: "slide-down 1.5s ease",
  slideUp: "slide-up 1.5s ease",
  zoom: "zoom-in 1s ease",
  bounce: "bounce-in 1s ease",
};

/**
 * Plays one of the shared entrance animations once `active` flips to true, and
 * keeps the element hidden until then.
 */
export function Reveal({
  as = "div",
  preset = "fade",
  delay = 0,
  active = true,
  className = "",
  children,
  ...rest
}) {
  const Tag = as;

  return (
    <Tag
      {...rest}
      data-animate={preset}
      className={className}
      style={
        active
          ? { animation: `${PRESETS[preset]} ${delay}ms forwards`, opacity: 0 }
          : { opacity: 0 }
      }
    >
      {children}
    </Tag>
  );
}
