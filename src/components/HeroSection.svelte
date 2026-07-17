<script lang="ts">
  import heroArtwork from '../assets/dimension-dive-clean.jpg'
  import type { UniverseId } from '../data/universes'
  import UniverseSwitcher from './UniverseSwitcher.svelte'

  interface Props {
    universe: UniverseId
  }

  let { universe = $bindable() }: Props = $props()
</script>

<section class="hero-section" id="top">
  <img class="hero-art" src={heroArtwork} alt="" width="1672" height="941" fetchpriority="high" />
  <div class="hero-ink" aria-hidden="true"></div>
  <div class="speed-lines" aria-hidden="true"></div>

  <div class="hero-copy">
    <p class="eyebrow"><span>SONY’S ANIMATED MULTIVERSE</span> / FAN ARCHIVE 001</p>
    <h1 aria-label="Leap first, figure it out mid-air">
      <span class="title-leap" data-text="LEAP">LEAP</span>
      <span class="title-first">FIRST.</span>
      <span class="title-rest">FIGURE IT OUT <i>MID-AIR.</i></span>
    </h1>
    <p class="hero-deck">A noisy, neon love letter to the movies that tore up the superhero rulebook—and taped it back together sideways.</p>
    <a class="comic-button" href="#story">
      <span>ENTER THE SPIDER-VERSE</span>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 14 0m-6-6 6 6-6 6" /></svg>
    </a>
  </div>

  <UniverseSwitcher bind:universe />
  <div class="hero-sticker" aria-hidden="true"><span>NO CAPES.</span><b>JUST<br />LEAPS.</b></div>
  <p class="scroll-note">SCROLL TO GLITCH THE CANON <span>↓</span></p>
</section>

<div class="ticker" aria-hidden="true">
  <div>
    <span>ANYONE CAN WEAR THE MASK</span><i></i><span>EARTH–1610 IS CALLING</span><i></i><span>DO YOUR OWN THING</span><i></i>
    <span>ANYONE CAN WEAR THE MASK</span><i></i><span>EARTH–1610 IS CALLING</span><i></i><span>DO YOUR OWN THING</span><i></i>
  </div>
</div>
