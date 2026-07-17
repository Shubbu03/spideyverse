<script lang="ts">
  import { reveal } from '../actions/reveal'
  import { chapters } from '../data/chapters'
</script>

<section class="story-section" id="story">
  <div class="section-intro reveal" use:reveal>
    <p class="section-index">[ 01 / STORY SO FAR ]</p>
    <h2>ONE KID.<br /><span>INFINITE</span> MESS.</h2>
    <p>It started with a bite and became a movement. Three chapters. A million visual ideas. Zero respect for tidy timelines.</p>
  </div>

  <div class="chapter-stack">
    {#each chapters as chapter, index}
      <article class="chapter-card reveal" class:future={index === 2} use:reveal>
        <div class="chapter-number" style={`--chapter: ${chapter.color}`}>{chapter.number}</div>
        <div class="chapter-copy">
          <p>{chapter.kicker}</p>
          <h3>{chapter.title}</h3>
          <span>{chapter.copy}</span>
        </div>
        <div class="chapter-year">{chapter.year}</div>
        <svg class="chapter-arrow" viewBox="0 0 40 40" aria-hidden="true"><path d="M7 20h25M22 10l10 10-10 10" /></svg>
      </article>
    {/each}
  </div>
</section>
