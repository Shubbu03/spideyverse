<script lang="ts">
  import { films, type Film } from '../data/chapters'

  interface Props {
    film: Film
  }

  let { film }: Props = $props()
  let filmIndex = $derived(films.findIndex((entry) => entry.slug === film.slug))
  let previousFilm = $derived(films[filmIndex - 1])
  let nextFilm = $derived(films[filmIndex + 1])
</script>

<article class="movie-page" id="top" style={`--movie-accent: ${film.color}`}>
  <header class="movie-masthead">
    <img
      src={film.banner}
      alt={film.bannerAlt}
      width="2572"
      height="1100"
      style={`object-position: ${film.bannerPosition}`}
      fetchpriority="high"
    />
    <div class="movie-masthead-ink" aria-hidden="true"></div>
    <p><span>Film {film.number}</span> / {film.marker}</p>
  </header>

  <section class="movie-title-block" aria-labelledby="movie-title">
    <span class="movie-title-number" aria-hidden="true">{film.number}</span>
    <p>{film.status} / {film.release}</p>
    <h1 id="movie-title">{film.fullTitle}</h1>
    <strong>{film.tagline}</strong>
  </section>

  <section class="movie-details" id="movie-details" aria-label={`${film.title} details`}>
    <div class="movie-synopsis">
      <p class="section-index">[ Synopsis ]</p>
      <h2>{film.synopsisHeading}</h2>
      <p class="movie-synopsis-lede">{film.synopsis}</p>
      <p>{film.perspective}</p>
    </div>

    <aside class="movie-fact-sheet" aria-label="Film facts">
      <p class="section-index">[ Film file ]</p>
      <dl>
        {#each film.facts as fact}
          <div>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        {/each}
      </dl>
      <a href={film.sourceUrl} target="_blank" rel="noreferrer">
        Official film page <span aria-hidden="true">↗</span>
      </a>
    </aside>
  </section>

  <nav class="movie-pagination" aria-label="Film navigation">
    {#if previousFilm}
      <a class="movie-page-link previous" href={`/films/${previousFilm.slug}/`}>
        <span>← Previous film</span>
        <b>{previousFilm.title}</b>
      </a>
    {:else}
      <a class="movie-page-link previous" href="/#films">
        <span>← Back</span>
        <b>All films</b>
      </a>
    {/if}

    <a class="movie-home-link" href="/">
      <img src="/spidey-favicon.png" alt="" />
      <span>Homepage</span>
    </a>

    {#if nextFilm}
      <a class="movie-page-link next" href={`/films/${nextFilm.slug}/`}>
        <span>Next film →</span>
        <b>{nextFilm.title}</b>
      </a>
    {:else}
      <a class="movie-page-link next" href="/">
        <span>End of the trilogy →</span>
        <b>Back home</b>
      </a>
    {/if}
  </nav>
</article>
