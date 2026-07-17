<script lang="ts">
  import { soundtrack, type TrackId } from '../data/soundtrack'

  interface Props {
    open: boolean
  }

  let { open = $bindable() }: Props = $props()
  let selectedTrackId = $state<TrackId>('sunflower')
  let currentTrack = $derived(soundtrack.find((track) => track.id === selectedTrackId) ?? soundtrack[0])
</script>

<div class="music-dock" class:open id="soundtrack-player">
  {#if open}
    <div class="soundtrack-panel">
      <div class="soundtrack-heading">
        <div><span>SPIDER-VERSE RADIO</span><b>CHOOSE YOUR DROP.</b></div>
        <button class="soundtrack-close" type="button" aria-label="Close soundtrack picker" onclick={() => (open = false)}>×</button>
      </div>

      <div class="track-list" aria-label="Spider-Verse soundtrack choices">
        {#each soundtrack as track, index}
          <button
            class:active={selectedTrackId === track.id}
            type="button"
            aria-pressed={selectedTrackId === track.id}
            style={`--track-color: ${track.color}`}
            onclick={() => (selectedTrackId = track.id)}
          >
            <span>0{index + 1}</span>
            <span><b>{track.title}</b><small>{track.movie}</small></span>
          </button>
        {/each}
      </div>

      <iframe
        title={`Play ${currentTrack.title} by ${currentTrack.artist} on Spotify`}
        src={`https://open.spotify.com/embed/track/${currentTrack.spotifyId}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
      <p class="stream-note">OFFICIAL PLAYBACK VIA SPOTIFY · PRESS PLAY ABOVE</p>
    </div>
  {/if}

  <button
    class="dock-trigger"
    type="button"
    aria-expanded={open}
    onclick={() => (open = !open)}
    aria-label={open ? 'Close soundtrack picker' : 'Open soundtrack picker'}
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18V6l10-2v12M9 10l10-2M6.5 20c1.38 0 2.5-.9 2.5-2s-1.12-2-2.5-2S4 16.9 4 18s1.12 2 2.5 2Zm10 0c1.38 0 2.5-.9 2.5-2s-1.12-2-2.5-2-2.5.9-2.5 2 1.12 2 2.5 2Z" />
    </svg>
  </button>
  <div class="dock-copy"><span>SELECTED TRACK</span><b>{currentTrack.title}</b><small>{currentTrack.artist}</small></div>
  <button class="dock-queue" type="button" aria-expanded={open} onclick={() => (open = !open)}>{open ? 'CLOSE' : '4 TRACKS'}</button>
</div>
