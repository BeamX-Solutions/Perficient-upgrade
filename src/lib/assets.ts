/**
 * Editorial photography paths.
 *
 * These filenames match the design export exactly, so the real files can be
 * dropped straight into /public/assets without touching any component. Until
 * they are present, <Photo> renders the reserved placeholder treatment from the
 * design rather than a broken image.
 *
 * See public/assets/README.md for the drop-in list.
 */

export const PHOTOS = {
  chauffeurHero: {
    src: "/assets/perficient-chauffeur-hero.jpeg",
    width: 1800,
    height: 1202,
    alt: "A professional chauffeur opening the rear door of an executive car for a client",
  },
  eventCar: {
    src: "/assets/perficient-event-car.jpeg",
    width: 1800,
    height: 1263,
    alt: "A black car prepared with ribbons for a special occasion",
  },
  luxurySuv: {
    src: "/assets/perficient-luxury-suv.jpeg",
    width: 1800,
    height: 2658,
    alt: "A black luxury SUV in a modern urban setting",
  },
  luxuryInterior: {
    src: "/assets/perficient-luxury-interior.jpeg",
    width: 1800,
    height: 1200,
    alt: "A premium leather rear cabin illustrating passenger comfort",
  },
} as const;

export type PhotoKey = keyof typeof PHOTOS;

/*
 * Photography credits are no longer printed in the footer.
 *
 * The export's placeholder imagery came from Pexels (Pavel Danilyuk, Harem,
 * Saif allah Dawoud, NUDE Nahum) under a licence that does not require
 * attribution. Once the real Perficient fleet photography replaces it there is
 * nothing to credit — but if any third-party image that *does* require
 * attribution is ever used, the credit has to go back on the page.
 */
