<script lang="ts">
  import { onMount } from 'svelte'
  import { reveal } from '../actions/reveal'
  import { spiderPeople } from '../data/spider-people'

  const desktopPageSize = 4
  const mobilePageSize = 1
  type PageDirection = 'next' | 'previous'

  let pageSize = $state(desktopPageSize)
  let startIndex = $state(0)
  let pageDirection = $state<PageDirection>('next')
  let totalPages = $derived(Math.ceil(spiderPeople.length / pageSize))
  let lastPageStart = $derived(Math.max(0, (totalPages - 1) * pageSize))
  let visiblePeople = $derived(spiderPeople.slice(startIndex, startIndex + pageSize))
  let atStart = $derived(startIndex === 0)
  let atEnd = $derived(startIndex >= lastPageStart)

  function movePage(direction: -1 | 1) {
    pageDirection = direction === 1 ? 'next' : 'previous'
    startIndex = Math.min(
      lastPageStart,
      Math.max(0, startIndex + direction * pageSize),
    )
  }

  onMount(() => {
    const mobileQuery = window.matchMedia('(max-width: 560px)')

    const syncPageSize = () => {
      const nextPageSize = mobileQuery.matches ? mobilePageSize : desktopPageSize

      if (nextPageSize === pageSize) {
        return
      }

      const firstVisibleIndex = startIndex
      pageSize = nextPageSize
      startIndex = Math.floor(firstVisibleIndex / nextPageSize) * nextPageSize
    }

    syncPageSize()
    mobileQuery.addEventListener('change', syncPageSize)

    return () => mobileQuery.removeEventListener('change', syncPageSize)
  })
</script>

<section class="society-section" id="spider-people">
  <div class="society-heading reveal" use:reveal>
    <p class="section-index">[ 02 / Spider-People ]</p>
    <h2>Meet the<br /><span>Spider-People.</span></h2>
    <p>
      Twelve worlds, twelve visual languages, and twelve different ways to wear the mask.
      Open a file to enter that Spider’s dimension.
    </p>
  </div>

  <div class="dossier-carousel">
    <button
      class="carousel-button carousel-previous"
      type="button"
      aria-label="Show the previous Spider-People"
      aria-controls="spider-person-files"
      disabled={atStart}
      onclick={() => movePage(-1)}
    >
      <span class="carousel-icon" aria-hidden="true">←</span>
      <span class="carousel-label">Back</span>
    </button>

    {#key startIndex}
      <div
        class="dossier-grid"
        class:carousel-page-next={pageDirection === 'next'}
        class:carousel-page-previous={pageDirection === 'previous'}
        id="spider-person-files"
      >
        {#each visiblePeople as person, index (person.slug)}
          <a
            class={'dossier dossier-' + person.imageStyle}
            href={'/spider-people/' + person.slug + '/'}
            aria-label={'Open the ' + person.name + ' character file'}
            style={'--person-color: ' + person.color + '; --person-secondary: ' + person.secondary + '; --entry-index: ' + index}
          >
            <div class="dossier-topline">
              <span>{person.earth}</span>
              <span>File {String(startIndex + index + 1).padStart(2, '0')}</span>
            </div>
            <div class="portrait">
              <div class="portrait-halo" aria-hidden="true"></div>
              <img
                src={person.image}
                alt={person.imageAlt}
                loading="lazy"
                style={'object-position: ' + person.imagePosition}
              />
              <span class="scribble" aria-hidden="true">{person.principle}</span>
            </div>
            <div class="dossier-copy">
              <p>{person.spiderName}</p>
              <h3>{person.name}</h3>
              <span>{person.note}</span>
            </div>
            <span class="dossier-open">Open file <i aria-hidden="true">↗</i></span>
          </a>
        {/each}
      </div>
    {/key}

    <button
      class="carousel-button carousel-next"
      type="button"
      aria-label="Show the next Spider-People"
      aria-controls="spider-person-files"
      disabled={atEnd}
      onclick={() => movePage(1)}
    >
      <span class="carousel-label">Next</span>
      <span class="carousel-icon" aria-hidden="true">→</span>
    </button>
  </div>

</section>
