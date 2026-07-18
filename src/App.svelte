<script lang="ts">
  import { tick } from 'svelte'
  import HeroSection from './components/HeroSection.svelte'
  import MovieDetailPage from './components/MovieDetailPage.svelte'
  import QuoteSection from './components/QuoteSection.svelte'
  import SocietySection from './components/SocietySection.svelte'
  import SpiderPersonDetailPage from './components/SpiderPersonDetailPage.svelte'
  import StorySection from './components/StorySection.svelte'
  import Footer from './components/layout/Footer.svelte'
  import Header from './components/layout/Header.svelte'
  import { findFilmBySlug } from './data/chapters'
  import { findSpiderPersonBySlug } from './data/spider-people'

  let pathname = $state(window.location.pathname)
  let filmRoute = $derived(/^\/films\/([^/]+)\/?$/.exec(pathname))
  let spiderRoute = $derived(/^\/spider-people\/([^/]+)\/?$/.exec(pathname))
  let activeFilm = $derived(findFilmBySlug(filmRoute?.[1]))
  let activeSpider = $derived(findSpiderPersonBySlug(spiderRoute?.[1]))
  let pageTitle = $derived(
    activeFilm
      ? `${activeFilm.fullTitle} | spideyverse`
      : activeSpider
        ? `${activeSpider.name} / ${activeSpider.spiderName} | spideyverse`
        : 'spideyverse',
  )
  let pageDescription = $derived(
    activeFilm
      ? `${activeFilm.fullTitle}: synopsis, credits, and film details.`
      : activeSpider
        ? `${activeSpider.name}, ${activeSpider.spiderName} of ${activeSpider.earth}: a Spider-Verse character file.`
        : 'A fan-made tribute to the Spider-Verse films, characters, music, and multiverse.',
  )

  async function scrollToLocation(hash: string) {
    await tick()

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    target?.scrollIntoView()
  }

  function handleInternalNavigation(event: MouseEvent) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (!(event.target instanceof Element)) return

    const link = event.target.closest<HTMLAnchorElement>('a[href]')
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return

    const url = new URL(link.href, window.location.href)
    if (url.origin !== window.location.origin || !['http:', 'https:'].includes(url.protocol)) return

    event.preventDefault()
    window.history.pushState({}, '', url)
    pathname = url.pathname
    void scrollToLocation(url.hash)
  }

  function handleHistoryNavigation() {
    pathname = window.location.pathname
    void scrollToLocation(window.location.hash)
  }
</script>

<svelte:window onclick={handleInternalNavigation} onpopstate={handleHistoryNavigation} />

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <meta name="theme-color" content="#09090d" />
</svelte:head>

<div
  class="site-shell"
  style={activeSpider ? `--accent: ${activeSpider.color}; --accent-two: ${activeSpider.secondary}` : undefined}
>
  <a class="skip-link" href="#main">Skip to content</a>
  <Header />

  <main id="main">
    {#if activeFilm}
      <MovieDetailPage film={activeFilm} />
    {:else if activeSpider}
      <SpiderPersonDetailPage person={activeSpider} />
    {:else}
      <HeroSection />
      <StorySection />
      <SocietySection />
      <QuoteSection />
    {/if}
  </main>

  <Footer />
</div>
