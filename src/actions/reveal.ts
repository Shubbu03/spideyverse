export function reveal(node: HTMLElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    node.classList.add('is-visible')
    return
  }

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return

    node.classList.add('is-visible')
    observer.unobserve(node)
  }, { threshold: 0.14 })

  observer.observe(node)

  return {
    destroy: () => observer.disconnect(),
  }
}
