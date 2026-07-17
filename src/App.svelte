<script lang="ts">
  import ColliderLab from './components/ColliderLab.svelte'
  import HeroSection from './components/HeroSection.svelte'
  import QuoteSection from './components/QuoteSection.svelte'
  import SocietySection from './components/SocietySection.svelte'
  import SoundtrackPlayer from './components/SoundtrackPlayer.svelte'
  import StorySection from './components/StorySection.svelte'
  import Footer from './components/layout/Footer.svelte'
  import Header from './components/layout/Header.svelte'
  import type { UniverseId } from './data/universes'

  let universe = $state<UniverseId>('miles')
  let chaos = $state(56)
  let soundtrackOpen = $state(false)
</script>

<svelte:head>
  <title>Spideyverse — A dimensional fan experience</title>
  <meta name="description" content="A playful, kinetic fan-made tribute to Sony Pictures Animation's Spider-Verse films." />
  <meta name="theme-color" content="#09090d" />
</svelte:head>

<div class="site-shell" data-universe={universe} style={`--chaos: ${chaos / 100}`}>
  <a class="skip-link" href="#main">Skip to the story</a>
  <Header {soundtrackOpen} toggleSoundtrack={() => (soundtrackOpen = !soundtrackOpen)} />

  <main id="main">
    <HeroSection bind:universe />
    <StorySection />
    <SocietySection />
    <ColliderLab bind:chaos />
    <QuoteSection />
  </main>

  <Footer />
  <SoundtrackPlayer bind:open={soundtrackOpen} />
</div>
