<script lang="ts">
  interface Props {
    soundtrackOpen: boolean
    toggleSoundtrack: () => void
  }

  let { soundtrackOpen, toggleSoundtrack }: Props = $props()
  let menuOpen = $state(false)

  function closeMenu() {
    menuOpen = false
  }
</script>

<header class="topbar">
  <a class="brand" href="#top" aria-label="Spideyverse home" onclick={closeMenu}>
    <svg viewBox="0 0 44 44" aria-hidden="true">
      <path d="M22 3 9 10 4 24l9 14h18l9-14-5-14L22 3Z" />
      <path d="m12 13 10 9 10-9M7 24h30M13 35l9-13 9 13M22 4v18" />
    </svg>
    <span><b>SPIDEY</b><i>VERSE</i></span>
  </a>

  <nav class:open={menuOpen} aria-label="Primary navigation">
    <a href="#story" onclick={closeMenu}>THE STORY</a>
    <a href="#society" onclick={closeMenu}>THE SOCIETY</a>
    <a href="#lab" onclick={closeMenu}>THE LAB</a>
    <span class="nav-stamp">EARTH–1610</span>
  </nav>

  <div class="topbar-actions">
    <button
      class="sound-button"
      class:active={soundtrackOpen}
      type="button"
      aria-expanded={soundtrackOpen}
      aria-controls="soundtrack-player"
      aria-label="Open the Spider-Verse soundtrack picker"
      onclick={toggleSoundtrack}
    >
      <span class="equalizer" aria-hidden="true"><i></i><i></i><i></i></span>
      <span>SOUNDTRACK</span>
    </button>
    <button
      class="menu-toggle"
      type="button"
      aria-label="Toggle navigation"
      aria-expanded={menuOpen}
      onclick={() => (menuOpen = !menuOpen)}
    >
      <span></span><span></span>
    </button>
  </div>
</header>
