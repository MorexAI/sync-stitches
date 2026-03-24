const toggleBtn = document.getElementById("theme-toggle")
const navEl = document.querySelector(".navbar")

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode")
  if (toggleBtn) toggleBtn.innerHTML = '<i class="ri-sun-line"></i>'
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode")

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark")
      toggleBtn.innerHTML = '<i class="ri-sun-line"></i>'
    } else {
      localStorage.setItem("theme", "light")
      toggleBtn.innerHTML = '<i class="ri-moon-line"></i>'
    }

  })
}

const getStartedBtn = document.getElementById("get-started")
const getStartedCtaBtn = document.getElementById("get-started-cta")
const roleDialog = document.getElementById("role-dialog")

function openRoleDialog() {
    if (!roleDialog) return
    if (typeof roleDialog.showModal === "function") {
        roleDialog.showModal()
        return
    }
    window.location.href = "signup.html"
}

if (getStartedBtn && roleDialog) {
    getStartedBtn.addEventListener("click", openRoleDialog)
}

if (getStartedCtaBtn && roleDialog) {
    getStartedCtaBtn.addEventListener("click", openRoleDialog)
}

const yearEl = document.getElementById("year")
if (yearEl) yearEl.textContent = String(new Date().getFullYear())

const revealEls = Array.from(document.querySelectorAll("[data-reveal]"))
if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return
                entry.target.classList.add("is-visible")
                io.unobserve(entry.target)
            })
        },
        { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    )
    revealEls.forEach((el) => io.observe(el))
} else {
    revealEls.forEach((el) => el.classList.add("is-visible"))
}

function onScrollNav() {
    if (!navEl) return
    if (window.scrollY > 10) navEl.classList.add("is-scrolled")
    else navEl.classList.remove("is-scrolled")
}

window.addEventListener("scroll", onScrollNav, { passive: true })
onScrollNav()
