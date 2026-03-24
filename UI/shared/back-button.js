(() => {
  const path = String(window.location.pathname || "").toLowerCase()
  if (path.endsWith("/index.html") || path.endsWith("/ui/index.html")) return

  const btn = document.createElement("button")
  btn.type = "button"
  btn.className = "back-switch"
  btn.setAttribute("aria-label", "Go back")
  btn.innerHTML = `<span class="back-switch__icon" aria-hidden="true">←</span><span>Back</span>`

  function getTopBar() {
    return (
      document.querySelector(".topbar") ||
      document.querySelector(".auth-nav") ||
      document.querySelector(".navbar") ||
      document.querySelector("header") ||
      null
    )
  }

  function positionButton() {
    const topBar = getTopBar()
    if (!topBar) return
    const rect = topBar.getBoundingClientRect()
    const height = Number(rect.height) || 0
    if (height <= 0) return
    btn.style.top = `${Math.max(12, height + 12)}px`
  }

  function fallbackHref() {
    if (path.includes("/ui/dashboard/")) return "../index.html"
    if (path.includes("/ui/")) return "index.html"
    if (path.includes("/dashboard/")) return "../UI/index.html"
    return "index.html"
  }

  btn.addEventListener("click", () => {
    const hasHistory = window.history.length > 1
    if (hasHistory) {
      window.history.back()
      return
    }
    window.location.href = fallbackHref()
  })

  document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(btn)
    positionButton()
    window.addEventListener("resize", positionButton)
  })
})()
