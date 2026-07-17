<script lang="ts">
  import { reveal } from '../actions/reveal'

  interface Props {
    chaos: number
  }

  let { chaos = $bindable() }: Props = $props()
</script>

<section class="lab-section" id="lab">
  <div class="lab-copy reveal" use:reveal>
    <p class="section-index">[ 03 / COLLIDER LAB ]</p>
    <h2>BREAK THE<br /><span>FRAME.</span></h2>
    <p>Turn up the visual instability. The collider will shift the print layers, tilt the panels, and make the universe a little less supervised.</p>
    <label for="chaos">COLLIDER INSTABILITY <output for="chaos">{chaos}%</output></label>
    <input id="chaos" type="range" min="0" max="100" bind:value={chaos} />
    <div class="range-labels"><span>CANON</span><span>ABSOLUTE CHAOS</span></div>
  </div>

  <div class="collider reveal" use:reveal aria-hidden="true">
    <div class="collider-ring ring-one"></div>
    <div class="collider-ring ring-two"></div>
    <div class="collider-ring ring-three"></div>
    <div class="collider-core"><span>{chaos}</span><small>DIMENSIONS<br />OUT OF SYNC</small></div>
    <p>THIS IS PROBABLY FINE</p>
  </div>
</section>
