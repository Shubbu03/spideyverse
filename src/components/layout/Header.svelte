<script lang="ts">
  import SoundtrackPlayer from '../SoundtrackPlayer.svelte'

  let menuOpen = $state(false)

  function closeMenu() {
    menuOpen = false
  }
</script>

<header class="topbar">
  <a class="brand" href="/" aria-label="Spideyverse home" onclick={closeMenu}>
    <img class="brand-icon" src="/spidey-favicon.png" alt="" />
    <span><b>SPIDEY</b><i>VERSE</i></span>
  </a>

  <nav class:open={menuOpen} aria-label="Primary navigation">
    <a href="/#films" onclick={closeMenu}>The films</a>
    <a href="/#spider-people" onclick={closeMenu}>Spider-People</a>
    <a href="/#leap" onclick={closeMenu}>The leap</a>
    <span class="nav-stamp">Fan site / Earth–1610</span>
  </nav>

  <div class="topbar-actions">
    <SoundtrackPlayer />
    <button class="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onclick={() => (menuOpen = !menuOpen)}>
      <span></span><span></span>
    </button>
  </div>
</header>
