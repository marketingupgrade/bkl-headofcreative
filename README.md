# Creative ís de targeting — Q4-strategie Buckley Belts

Explainer-site bij de opdracht Head of Creative (Cintura Group): de Q4-strategie en de audience-audit, als scroll-verhaal in het Buckley-palet.

## Routes

| Route | Wat |
|---|---|
| `/` | Het scroll-verhaal in 14 beats (zie de volgorde in `app/page.tsx`) |
| `/strategie/` | `content/q4-creative-strategie-v4.md`, volledig |
| `/audit/` | `content/audience-audit-youtube.md`, volledig |

## Draaien

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # statische export naar out/, overal te hosten
```

Stack: Next.js 16 (static export), React 19, Tailwind v4, GSAP (ScrollTrigger).

## Opbouw

- `components/v4/` — de scroll-secties, gebaseerd op de v4 landing kit en BYQ Supply-onderdelen (text-mask-zoom, rolodex, scroll-stack, scroll-blur-reveal, kelvin-schematic, nextwell-marquee, scroll-path-draw, kelvin-converge, scroll-text-reveal, kelvin-testimonials, kelvin-pricing, scroll-timeline, kelvin-faq, kelvin-footer-6). De motion-waarden van de gems zijn ongewijzigd; alleen kleur, type en copy zijn aangepast.
- `brand/` — het Buckley-palet (van buckleybelts.nl).
- `public/images/` — het ratelveld voor de hero en een abstract gespmerk (geen Buckley-logo).
- `docs/byq-shortlist.md` — de BYQ-shortlist.

## Eerlijkheid

Alle citaten zijn letterlijk uit de audit (reageerders anoniem) met een Nederlandse vertaling eronder. De AOV-rekensom staat gelabeld als rekenwerk op een aanname. Er staan geen claims op de site die niet in de twee documenten staan.
