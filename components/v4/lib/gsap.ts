/**
 * @module gsap
 * @description GSAP animation library configuration and exports.
 *
 * Centralizes GSAP setup for the entire site:
 * - Registers required plugins (CustomEase, ScrollTrigger)
 * - Defines the custom "signature" easing curve
 * - Exports configured gsap and ScrollTrigger for use across components
 *
 * The "signature" easing curve is this kit's house animation feel.
 * a quick start with a long, smooth deceleration. Used in all page
 * transitions, hero animations, and scroll-triggered reveals.
 *
 * @see https://gsap.com/docs/v3/
 */
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CustomEase, ScrollTrigger);

CustomEase.create("signature", "0.22, 1, 0.36, 1");

export { gsap, ScrollTrigger };
