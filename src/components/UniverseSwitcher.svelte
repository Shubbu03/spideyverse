<script lang="ts">
  import { universes, type UniverseId } from '../data/universes'

  interface Props {
    universe: UniverseId
  }

  let { universe = $bindable() }: Props = $props()
</script>

<div class="universe-switcher" aria-label="Choose a universe color palette">
  <p>SYNC DIMENSION</p>
  <div class="universe-options">
    {#each universes as option}
      <button
        type="button"
        class:active={universe === option.id}
        aria-pressed={universe === option.id}
        onclick={() => (universe = option.id)}
      >
        <i style={`--swatch: ${option.color}`}></i>
        <span><b>{option.short}</b><small>{option.label}</small></span>
      </button>
    {/each}
  </div>
</div>
