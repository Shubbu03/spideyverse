<script lang="ts">
  import { reveal } from '../actions/reveal'
  import { spiderPeople } from '../data/spider-people'
</script>

<section class="society-section" id="society">
  <div class="society-heading reveal" use:reveal>
    <p class="section-index">[ 02 / SPIDER SOCIETY ]</p>
    <h2>PICK YOUR<br /><span>PLAYER.</span></h2>
    <p>Every universe prints a different kind of hero. Hover or tap the files.</p>
  </div>

  <div class="dossier-grid">
    {#each spiderPeople as person, index}
      <article class={`dossier dossier-${person.id} reveal`} use:reveal>
        <div class="dossier-topline"><span>{person.earth}</span><span>FILE 0{index + 1}</span></div>
        <div class="portrait">
          <div class="portrait-halo" aria-hidden="true"></div>
          <img src={person.image} alt={`${person.name} in their animated Spider-Verse suit`} loading="lazy" />
          <span class="scribble" aria-hidden="true">{index % 2 === 0 ? 'THWIP!' : 'HEY.'}</span>
        </div>
        <div class="dossier-copy"><p>{person.stat}</p><h3>{person.name}</h3><span>{person.note}</span></div>
        <div class="barcode" aria-hidden="true"></div>
        <a class="art-credit" href={person.source} target="_blank" rel="noreferrer">CUTOUT SOURCE ↗</a>
      </article>
    {/each}
  </div>
</section>
