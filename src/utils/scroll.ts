/**
 * Smoothly scrolls the window to the precise visual start of an element.
 * For section elements, it targets the first child container to bypass large top padding,
 * ensuring the heading aligns perfectly below the floating nav capsule.
 *
 * @param selector CSS selector of the target element (e.g. "#services")
 */
export function scrollToElement(selector: string) {
  if (selector === "#home") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;
  }

  const element = document.querySelector(selector) as HTMLElement | null;
  if (!element) return;

  // If the target is a SECTION tag, we target its first child (the content container)
  // to avoid scrolling to the blank padding-top area of the section.
  const targetElement = (element.tagName === "SECTION" && element.firstElementChild)
    ? (element.firstElementChild as HTMLElement)
    : element;

  const rect = targetElement.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const absoluteTop = rect.top + scrollTop;

  // 110px leaves the perfect visual margin under the 64px high navbar floating at top-6 (88px)
  const offset = 110;

  window.scrollTo({
    top: Math.max(0, absoluteTop - offset),
    behavior: "smooth",
  });
}
