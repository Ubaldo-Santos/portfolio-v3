import { KONAMI_CELEBRATE_CLASS, KONAMI_CELEBRATE_MS, KONAMI_SEQUENCE } from "@/lib/konami-config";

export function matchesKonamiKey(key: string, expected: string) {
  return key === expected || (expected.length === 1 && key.toLowerCase() === expected);
}

export function createKonamiKeyHandler(onComplete: () => void) {
  let index = 0;

  return (event: KeyboardEvent) => {
    const expected = KONAMI_SEQUENCE[index];
    if (!expected) return;

    if (matchesKonamiKey(event.key, expected)) {
      index++;
      if (index === KONAMI_SEQUENCE.length) {
        index = 0;
        onComplete();
      }
      return;
    }

    index = matchesKonamiKey(event.key, KONAMI_SEQUENCE[0]!) ? 1 : 0;
  };
}

export function flashKonamiCelebrate() {
  const html = document.documentElement;
  if (html.classList.contains(KONAMI_CELEBRATE_CLASS)) return;

  html.classList.add(KONAMI_CELEBRATE_CLASS);
  window.setTimeout(() => html.classList.remove(KONAMI_CELEBRATE_CLASS), KONAMI_CELEBRATE_MS);
}
