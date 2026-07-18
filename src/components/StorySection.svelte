<script lang="ts">
  import { reveal } from '../actions/reveal'
  import { films } from '../data/chapters'
</script>

<section class="story-section" id="films">
  <div class="section-intro reveal" use:reveal>
    <p class="section-index">[ 01 / The films ]</p>
    <h2>A story<br /><span>across</span> dimensions.</h2>
    <p>Follow Miles Morales from his first night behind the mask to a multiverse where every Spider-Person brings a different world, style, and story.</p>
  </div>

  <div class="chapter-stack">
    {#each films as film}
      <a
        class="chapter-card reveal"
        href={`/films/${film.slug}/`}
        aria-label={`Open details for ${film.fullTitle}`}
        use:reveal
      >
        <div class="chapter-number" style={`--chapter: ${film.color}`}>{film.number}</div>
        <div class="chapter-copy">
          <p>{film.kicker}</p>
          <h3>{film.title}</h3>
          <span>{film.copy}</span>
        </div>
        <div class="chapter-year">{film.marker}</div>
        <svg class="chapter-arrow" viewBox="0 0 40 40" aria-hidden="true"><path d="M7 20h25M22 10l10 10-10 10" /></svg>
      </a>
    {/each}
  </div>
</section>
