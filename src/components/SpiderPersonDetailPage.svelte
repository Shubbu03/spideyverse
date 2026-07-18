<script lang="ts">
  import { spiderPeople, type SpiderPerson } from '../data/spider-people'

  interface Props {
    person: SpiderPerson
  }

  let { person }: Props = $props()
  let personIndex = $derived(spiderPeople.findIndex((entry) => entry.slug === person.slug))
  let previousPerson = $derived(spiderPeople[personIndex - 1])
  let nextPerson = $derived(spiderPeople[personIndex + 1])
</script>

<article
  class={'spider-profile spider-profile-' + person.imageStyle}
  id="top"
  style={'--profile-accent: ' + person.color + '; --profile-secondary: ' + person.secondary}
>
  <section class="profile-hero" aria-labelledby="profile-title">
    <div class="profile-art">
      <div class="profile-art-ring" aria-hidden="true"></div>
      <img
        src={person.image}
        alt={person.imageAlt}
        style={'object-position: ' + person.imagePosition}
        fetchpriority="high"
      />
      <span aria-hidden="true">{person.principle}</span>
    </div>

    <div class="profile-identity">
      <p class="profile-file">[ Spider file {String(personIndex + 1).padStart(2, '0')} ]</p>
      <p class="profile-earth">{person.earth}</p>
      <h1 id="profile-title">{person.name}</h1>
      <p class="profile-spider-name">{person.spiderName}</p>
      <p class="profile-intro">{person.intro}</p>
      <a href="/#spider-people">← Back to the Spider-People</a>
    </div>
  </section>

  <section class="profile-story" aria-label={'About ' + person.name}>
    <div class="profile-story-copy">
      <p class="section-index">[ About this Spider ]</p>
      <h2>A different world.<br />A different way to wear the mask.</h2>
      <p>{person.description}</p>
    </div>

    <aside class="profile-facts" aria-label="Character details">
      <p class="section-index">[ Identity file ]</p>
      <dl>
        <div>
          <dt>Spider name</dt>
          <dd>{person.spiderName}</dd>
        </div>
        <div>
          <dt>Earth</dt>
          <dd>{person.earth}</dd>
        </div>
        {#each person.facts as fact}
          <div>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        {/each}
      </dl>
      <a href={person.artworkSource} target="_blank" rel="noreferrer">
        Artwork source <span aria-hidden="true">↗</span>
      </a>
    </aside>
  </section>

  <nav class="profile-pagination" aria-label="Spider-People navigation">
    {#if previousPerson}
      <a class="profile-page-link previous" href={'/spider-people/' + previousPerson.slug + '/'}>
        <span>← Previous Spider</span>
        <b>{previousPerson.name}</b>
      </a>
    {:else}
      <a class="profile-page-link previous" href="/#spider-people">
        <span>← Back</span>
        <b>All Spider-People</b>
      </a>
    {/if}

    <a class="profile-home-link" href="/">
      <img src="/spidey-favicon.png" alt="" />
      <span>Homepage</span>
    </a>

    {#if nextPerson}
      <a class="profile-page-link next" href={'/spider-people/' + nextPerson.slug + '/'}>
        <span>Next Spider →</span>
        <b>{nextPerson.name}</b>
      </a>
    {:else}
      <a class="profile-page-link next" href="/#spider-people">
        <span>Archive complete →</span>
        <b>All Spider-People</b>
      </a>
    {/if}
  </nav>
</article>
