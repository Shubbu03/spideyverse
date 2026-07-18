<script lang="ts">
	import heroArtwork from "../assets/dimension-dive-clean.jpg";
</script>

<section class="hero-section" id="top">
	<img
		class="hero-art"
		src={heroArtwork}
		alt=""
		width="1672"
		height="941"
		fetchpriority="high"
	/>
	<div class="hero-ink" aria-hidden="true"></div>
	<div class="speed-lines" aria-hidden="true"></div>

	<div class="hero-copy">
		<p class="eyebrow">
			<span>A fan-made tribute</span> / The Spider-Verse films
		</p>
		<h1 aria-label="Welcome to the Spider-Verse">
			<span class="title-leap" data-text="Welcome">Welcome</span>
			<span class="title-first">to the</span>
			<span class="title-rest"><i>Spider-Verse.</i></span>
		</h1>
		<p class="hero-deck">
			Step into the animated films that turned comic-book panels into
			motion, following Miles Morales from Brooklyn into a multiverse of
			unforgettable worlds and Spider-People.
		</p>
		<a class="comic-button" href="#films">
			<span>Explore the films</span>
			<svg viewBox="0 0 24 24" aria-hidden="true"
				><path d="m5 12 14 0m-6-6 6 6-6 6" /></svg
			>
		</a>
	</div>

	<div class="hero-sticker" aria-hidden="true">
		<span>Earth–1610</span><b>Brooklyn</b>
	</div>
	<p class="scroll-note">Scroll into the multiverse <span>↓</span></p>
</section>
