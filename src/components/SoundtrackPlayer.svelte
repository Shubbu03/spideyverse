<script lang="ts">
  import { onDestroy, tick } from 'svelte'
  import { soundtrack, type TrackId } from '../data/soundtrack'

  let audioElement: HTMLAudioElement
  let triggerElement: HTMLButtonElement
  let visualizerCanvas: HTMLCanvasElement | undefined = $state()
  let panelOpen = $state(false)
  let dismissed = $state(false)
  let maximized = $state(false)
  let panelPinnedBeforeMaximize = false
  let playbackQueued = $state(false)
  let pressTimer: ReturnType<typeof setTimeout> | undefined
  let suppressNextClick = false
  let selectedTrackId = $state<TrackId>('sunflower')
  let isPlaying = $state(false)
  let currentTime = $state(0)
  let duration = $state(0)
  let volume = $state(0.85)
  let playbackError = $state('')
  let audioContext: AudioContext | undefined
  let analyser: AnalyserNode | undefined
  let audioSource: MediaElementAudioSourceNode | undefined
  let frequencyData: Uint8Array<ArrayBuffer> | undefined
  let animationFrame = 0
  let currentTrack = $derived(soundtrack.find((track) => track.id === selectedTrackId) ?? soundtrack[0])
  let currentTrackIndex = $derived(soundtrack.findIndex((track) => track.id === selectedTrackId))
  let progress = $derived(duration > 0 ? (currentTime / duration) * 100 : 0)

  function formatTime(seconds: number) {
    if (!Number.isFinite(seconds)) return '0:00'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  async function playTrack() {
    playbackError = ''
    if (audioContext?.state === 'suspended') await audioContext.resume()

    if (audioElement.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      playbackQueued = true
      audioElement.load()
      return
    }

    playbackQueued = false
    try {
      await audioElement.play()
    } catch {
      playbackQueued = false
      playbackError = 'This track could not start. Try pressing play again.'
    }
  }

  function togglePlayback() {
    if (isPlaying || playbackQueued) {
      playbackQueued = false
      audioElement.pause()
      return
    }
    void playTrack()
  }

  function selectTrack(trackId: TrackId, autoplay = true) {
    const nextTrack = soundtrack.find((track) => track.id === trackId)
    if (!nextTrack) return
    if (trackId === selectedTrackId) {
      if (autoplay) void playTrack()
      return
    }

    selectedTrackId = trackId
    currentTime = 0
    duration = 0
    isPlaying = false
    playbackQueued = autoplay
    playbackError = ''
    audioElement.pause()
    audioElement.src = nextTrack.src
    audioElement.load()
  }

  function moveTrack(direction: -1 | 1) {
    const nextIndex = (currentTrackIndex + direction + soundtrack.length) % soundtrack.length
    selectTrack(soundtrack[nextIndex].id)
  }

  function seek(event: Event) {
    const nextTime = Number((event.currentTarget as HTMLInputElement).value)
    audioElement.currentTime = nextTime
    currentTime = nextTime
  }

  function changeVolume(event: Event) {
    volume = Number((event.currentTarget as HTMLInputElement).value)
    audioElement.volume = volume
  }

  function loadMetadata() {
    duration = audioElement.duration
    audioElement.volume = volume
  }

  function continueQueuedPlayback() {
    if (playbackQueued) void playTrack()
  }

  function handleTrigger() {
    if (suppressNextClick) {
      suppressNextClick = false
      return
    }

    dismissed = false
    togglePlayback()
  }

  function closePanel() {
    if (maximized) leaveMaximizedMode()
    panelOpen = false
    dismissed = true
    triggerElement.blur()
  }

  function beginLongPress(event: PointerEvent) {
    if (event.pointerType === 'mouse') return

    window.clearTimeout(pressTimer)
    pressTimer = window.setTimeout(() => {
      panelOpen = true
      dismissed = false
      suppressNextClick = true
    }, 350)
  }

  function cancelLongPress() {
    window.clearTimeout(pressTimer)
    pressTimer = undefined
  }

  function resizeVisualizer() {
    if (!visualizerCanvas) return

    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    const width = Math.max(1, visualizerCanvas.clientWidth)
    const height = Math.max(1, visualizerCanvas.clientHeight)
    visualizerCanvas.width = Math.floor(width * ratio)
    visualizerCanvas.height = Math.floor(height * ratio)
  }

  function averageRange(data: Uint8Array<ArrayBuffer>, from: number, to: number) {
    const end = Math.min(to, data.length)
    let total = 0
    for (let index = from; index < end; index += 1) total += data[index]
    return end > from ? total / (end - from) / 255 : 0
  }

  function spectrumAt(data: Uint8Array<ArrayBuffer>, position: number) {
    const index = Math.min(data.length - 1, Math.max(0, Math.floor(position * data.length)))
    return data[index] / 255
  }

  function drawWeb(
    context: CanvasRenderingContext2D,
    data: Uint8Array<ArrayBuffer>,
    centerX: number,
    centerY: number,
    radius: number,
    time: number,
    color: string,
    offsetX: number,
    offsetY: number,
    alpha: number,
  ) {
    const spokeCount = 14
    const ringCount = 7
    const rotation = -0.18 + Math.sin(time * 0.00018) * 0.025

    context.save()
    context.translate(centerX + offsetX, centerY + offsetY)
    context.rotate(rotation)
    context.strokeStyle = color
    context.globalAlpha = alpha
    context.lineWidth = 1.15

    for (let ring = 1; ring <= ringCount; ring += 1) {
      const ringScale = ring / ringCount
      context.beginPath()
      for (let spoke = 0; spoke <= spokeCount; spoke += 1) {
        const normalizedSpoke = (spoke % spokeCount) / spokeCount
        const angle = normalizedSpoke * Math.PI * 2
        const signal = spectrumAt(data, normalizedSpoke * 0.72)
        const distortion = 1 + signal * 0.15 + Math.sin(spoke * 1.7 + ring * 0.9 + time * 0.0011) * 0.025
        const pointRadius = radius * ringScale * distortion
        const perspective = 0.68 + ringScale * 0.32
        const x = Math.cos(angle) * pointRadius
        const y = Math.sin(angle) * pointRadius * perspective
        if (spoke === 0) context.moveTo(x, y)
        else context.lineTo(x, y)
      }
      context.stroke()
    }

    for (let spoke = 0; spoke < spokeCount; spoke += 1) {
      const normalizedSpoke = spoke / spokeCount
      const angle = normalizedSpoke * Math.PI * 2
      const signal = spectrumAt(data, normalizedSpoke * 0.72)
      const outerRadius = radius * (1.02 + signal * 0.16)
      context.beginPath()
      context.moveTo(Math.cos(angle) * radius * 0.08, Math.sin(angle) * radius * 0.055)
      context.lineTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius)
      context.stroke()
    }

    context.restore()
  }

  function drawSignalRibbon(
    context: CanvasRenderingContext2D,
    data: Uint8Array<ArrayBuffer>,
    width: number,
    baseline: number,
    amplitude: number,
    color: string,
    offset: number,
    alpha: number,
  ) {
    const points = Math.min(72, data.length)
    context.save()
    context.strokeStyle = color
    context.globalAlpha = alpha
    context.lineWidth = 2
    context.beginPath()
    for (let index = 0; index <= points; index += 1) {
      const progress = index / points
      const mirrored = progress <= 0.5 ? progress * 2 : (1 - progress) * 2
      const signal = spectrumAt(data, mirrored * 0.82)
      const y = baseline - signal * amplitude + Math.sin(index * 0.72 + offset) * 2
      if (index === 0) context.moveTo(0, y)
      else context.lineTo(progress * width, y)
    }
    context.stroke()
    context.restore()
  }

  function drawVisualizer(time: number) {
    if (!visualizerCanvas || !analyser || !frequencyData || !maximized) return

    const context = visualizerCanvas.getContext('2d')
    if (!context) return

    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    const width = visualizerCanvas.clientWidth
    const height = visualizerCanvas.clientHeight
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    analyser.getByteFrequencyData(frequencyData)

    const bass = averageRange(frequencyData, 0, 12)
    const mids = averageRange(frequencyData, 12, 48)
    const highs = averageRange(frequencyData, 48, 96)
    const pulse = isPlaying ? bass : 0.025 + Math.sin(time * 0.0012) * 0.01
    const centerX = width * (width < 700 ? 0.52 : 0.61)
    const centerY = height * (width < 700 ? 0.4 : 0.43)
    const portalRadius = Math.min(width * 0.28, height * 0.34) * (1 + pulse * 0.11)

    context.fillStyle = 'rgba(3, 3, 8, 0.32)'
    context.fillRect(0, 0, width, height)

    const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.68)
    glow.addColorStop(0, `${currentTrack.color}42`)
    glow.addColorStop(0.26, 'rgba(24, 216, 255, 0.15)')
    glow.addColorStop(0.58, 'rgba(242, 13, 58, 0.05)')
    glow.addColorStop(1, 'rgba(3, 3, 8, 0)')
    context.fillStyle = glow
    context.fillRect(0, 0, width, height)

    context.save()
    context.globalAlpha = 0.08 + highs * 0.15
    context.fillStyle = '#f6f2e8'
    const dotSpacing = width < 700 ? 18 : 24
    const drift = (time * 0.012) % dotSpacing
    for (let y = -dotSpacing; y < height + dotSpacing; y += dotSpacing) {
      for (let x = -dotSpacing; x < width + dotSpacing; x += dotSpacing) {
        const distance = Math.hypot(x - centerX, y - centerY)
        if (distance < portalRadius * 1.55 || (x / dotSpacing + y / dotSpacing) % 3 !== 0) continue
        const dot = 1 + spectrumAt(frequencyData, ((x + y + drift) % width) / width) * 2.4
        context.beginPath()
        context.arc(x + drift, y, dot, 0, Math.PI * 2)
        context.fill()
      }
    }
    context.restore()

    context.save()
    context.translate(centerX, centerY)
    context.rotate(-0.24)
    const shardReach = portalRadius * (1.5 + bass * 0.45)
    const shardColors = ['#18d8ff', currentTrack.color, '#ff5ebc', '#f4ef45']
    for (let shard = 0; shard < 8; shard += 1) {
      const angle = (shard / 8) * Math.PI * 2 + time * 0.00005
      const spread = 0.06 + spectrumAt(frequencyData, shard / 16) * 0.09
      const inner = portalRadius * 0.9
      const outer = shardReach * (0.8 + spectrumAt(frequencyData, shard / 10) * 0.35)
      context.fillStyle = shardColors[shard % shardColors.length]
      context.globalAlpha = 0.035 + mids * 0.11
      context.beginPath()
      context.moveTo(Math.cos(angle - spread) * inner, Math.sin(angle - spread) * inner)
      context.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer)
      context.lineTo(Math.cos(angle + spread) * inner, Math.sin(angle + spread) * inner)
      context.closePath()
      context.fill()
    }
    context.restore()

    drawWeb(context, frequencyData, centerX, centerY, portalRadius, time, '#ff2f72', 8 + bass * 7, -3, 0.48)
    drawWeb(context, frequencyData, centerX, centerY, portalRadius, time, '#18d8ff', -8 - bass * 7, 3, 0.54)
    drawWeb(context, frequencyData, centerX, centerY, portalRadius, time, currentTrack.color, 0, 0, 0.78)

    const coreSize = Math.max(44, portalRadius * (0.24 + bass * 0.05))
    context.save()
    context.translate(centerX, centerY)
    context.rotate(-0.12 + Math.sin(time * 0.0007) * 0.035)
    context.fillStyle = '#18d8ff'
    context.globalAlpha = 0.7
    context.fillRect(-coreSize / 2 - 6, -coreSize / 2 + 5, coreSize, coreSize)
    context.fillStyle = '#ff2f72'
    context.fillRect(-coreSize / 2 + 6, -coreSize / 2 - 5, coreSize, coreSize)
    context.globalAlpha = 1
    context.fillStyle = '#08080d'
    context.strokeStyle = '#f6f2e8'
    context.lineWidth = 2
    context.fillRect(-coreSize / 2, -coreSize / 2, coreSize, coreSize)
    context.strokeRect(-coreSize / 2, -coreSize / 2, coreSize, coreSize)
    context.fillStyle = '#f6f2e8'
    context.font = `900 ${Math.max(19, coreSize * 0.34)}px Barlow Condensed, sans-serif`
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(`0${currentTrackIndex + 1}`, 0, 1)
    context.restore()

    const ribbonBase = Math.min(height * 0.72, centerY + portalRadius * 1.25)
    drawSignalRibbon(context, frequencyData, width, ribbonBase - 7, height * 0.16, '#ff2f72', time * 0.006, 0.42)
    drawSignalRibbon(context, frequencyData, width, ribbonBase + 7, height * 0.16, '#18d8ff', time * 0.006 + 1.4, 0.55)
    drawSignalRibbon(context, frequencyData, width, ribbonBase, height * 0.16, currentTrack.color, time * 0.006 + 0.7, 0.78)

    context.save()
    context.globalAlpha = 0.08 + mids * 0.12
    context.fillStyle = '#f6f2e8'
    for (let y = 1; y < height; y += 6) context.fillRect(0, y, width, 1)
    context.restore()

    animationFrame = window.requestAnimationFrame(drawVisualizer)
  }

  async function prepareVisualizerAudio() {
    try {
      if (!audioContext) {
        audioContext = new AudioContext()
        analyser = audioContext.createAnalyser()
        analyser.fftSize = 256
        analyser.smoothingTimeConstant = 0.84
        audioSource = audioContext.createMediaElementSource(audioElement)
        audioSource.connect(analyser)
        analyser.connect(audioContext.destination)
        frequencyData = new Uint8Array(analyser.frequencyBinCount)
      }

      if (audioContext.state === 'suspended') await audioContext.resume()
      return true
    } catch {
      playbackError = 'The visualizer could not connect to the audio signal.'
      return false
    }
  }

  function startVisualizer() {
    resizeVisualizer()
    window.cancelAnimationFrame(animationFrame)
    animationFrame = window.requestAnimationFrame(drawVisualizer)
  }

  function stopVisualizer() {
    window.cancelAnimationFrame(animationFrame)
    animationFrame = 0
  }

  function leaveMaximizedMode() {
    maximized = false
    panelOpen = panelPinnedBeforeMaximize
    document.documentElement.classList.remove('radio-visualizer-open')
    stopVisualizer()
  }

  async function toggleMaximizedMode() {
    if (maximized) {
      leaveMaximizedMode()
      return
    }

    panelPinnedBeforeMaximize = panelOpen
    panelOpen = true
    maximized = true
    dismissed = false
    document.documentElement.classList.add('radio-visualizer-open')
    const audioReady = prepareVisualizerAudio()
    await tick()
    if (await audioReady) startVisualizer()
  }

  function handleWindowKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && maximized) leaveMaximizedMode()
  }

  onDestroy(() => {
    document.documentElement.classList.remove('radio-visualizer-open')
    window.clearTimeout(pressTimer)
    stopVisualizer()
    void audioContext?.close()
  })
</script>

<svelte:window onresize={resizeVisualizer} onkeydown={handleWindowKeydown} />

<audio
  bind:this={audioElement}
  src={soundtrack[0].src}
  preload="metadata"
  onloadedmetadata={loadMetadata}
  oncanplay={continueQueuedPlayback}
  ontimeupdate={() => (currentTime = audioElement.currentTime)}
  onplay={() => { playbackQueued = false; isPlaying = true }}
  onpause={() => (isPlaying = false)}
  onended={() => moveTrack(1)}
  onerror={() => { playbackQueued = false; playbackError = 'This audio file could not be loaded.' }}
></audio>

<div
  class="music-dock"
  class:open={panelOpen}
  class:dismissed
  class:is-playing={isPlaying}
  class:maximized
  style={`--track-color: ${currentTrack.color}`}
  id="spidey-radio"
  role="group"
  aria-label="spidey radio"
  onmouseleave={() => (dismissed = false)}
>
    <div class="soundtrack-panel" id="spidey-radio-panel">
      <div class="soundtrack-heading">
        <b>spidey radio</b>
        <div class="soundtrack-window-actions">
          <button class="soundtrack-maximize" type="button" aria-label={maximized ? 'Minimize spidey radio' : 'Maximize spidey radio'} onclick={toggleMaximizedMode}>
            {#if maximized}
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4v5H4M15 20v-5h5M20 9h-5V4M4 15h5v5" /></svg>
            {:else}
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H4v5M15 20h5v-5M20 9V4h-5M4 15v5h5" /></svg>
            {/if}
          </button>
          <button class="soundtrack-close" type="button" aria-label="Close spidey radio" onclick={closePanel}>×</button>
        </div>
      </div>

      {#if maximized}
        <div class="radio-visualizer" aria-hidden="true">
          <canvas bind:this={visualizerCanvas}></canvas>
          <div class="visualizer-readout">
            <span>Earth–1610 / live signal</span>
            <strong>{currentTrack.title}</strong>
            <small>{isPlaying ? 'signal active' : 'signal paused'}</small>
          </div>
          <div class="visualizer-marker"><span></span><b>SV</b><span></span></div>
        </div>
      {/if}

      <div class="local-audio-player">
        <div class="player-art" class:playing={isPlaying} aria-hidden="true">
          <div class="player-disc"><span>0{currentTrackIndex + 1}</span><i></i></div>
        </div>

        <div class="player-main">
          <div class="player-meta">
            <small>{currentTrack.movie}</small>
            <strong>{currentTrack.title}</strong>
            <span>{currentTrack.artist}</span>
          </div>

          <input
            class="player-seek"
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            style={`--player-progress: ${progress}%`}
            aria-label={`Seek through ${currentTrack.title}`}
            oninput={seek}
          />
          <div class="player-time" aria-hidden="true"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>

          <div class="player-controls">
            <div class="player-transport" aria-label="Playback controls">
              <button type="button" aria-label="Play previous track" onclick={() => moveTrack(-1)}>←</button>
              <button class="player-play" type="button" aria-label={isPlaying || playbackQueued ? 'Pause track' : 'Play track'} onclick={togglePlayback}>
                {#if isPlaying || playbackQueued}<span aria-hidden="true">Ⅱ</span>{:else}<span class="play-icon" aria-hidden="true">▶</span>{/if}
              </button>
              <button type="button" aria-label="Play next track" onclick={() => moveTrack(1)}>→</button>
            </div>

            <label class="player-volume">
              <span aria-hidden="true">♪</span><span class="visually-hidden">Volume</span>
              <input type="range" min="0" max="1" step="0.05" value={volume} aria-label="Volume" oninput={changeVolume} />
            </label>
          </div>

          {#if playbackError}<p class="player-error" role="status">{playbackError}</p>{/if}
        </div>
      </div>

      <div class="track-list" aria-label="Spider-Verse soundtrack choices">
        {#each soundtrack as track, index}
          <button class:active={selectedTrackId === track.id} type="button" aria-pressed={selectedTrackId === track.id} style={`--track-color: ${track.color}`} onclick={() => selectTrack(track.id)}>
            <span>0{index + 1}</span><span><b>{track.title}</b><small>{track.artist}</small></span>
          </button>
        {/each}
      </div>
    </div>

  <button
    bind:this={triggerElement}
    class="dock-trigger"
    type="button"
    aria-label={isPlaying || playbackQueued ? 'Pause spidey radio' : 'Play spidey radio'}
    aria-controls="spidey-radio-panel"
    aria-expanded={panelOpen}
    onpointerdown={beginLongPress}
    onpointerup={cancelLongPress}
    onpointercancel={cancelLongPress}
    onpointerleave={cancelLongPress}
    onclick={handleTrigger}
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18V6l10-2v12M9 10l10-2M6.5 20c1.38 0 2.5-.9 2.5-2s-1.12-2-2.5-2S4 16.9 4 18s1.12 2 2.5 2Zm10 0c1.38 0 2.5-.9 2.5-2s-1.12-2-2.5-2-2.5.9-2.5 2 1.12 2 2.5 2Z" />
    </svg>
    <span class="radio-status" aria-hidden="true"><i></i><i></i><i></i></span>
  </button>
</div>
