const themeToggleBtn = document.getElementById("theme-toggle")

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode")
  if (themeToggleBtn) themeToggleBtn.textContent = "☀️"
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark")
      themeToggleBtn.textContent = "☀️"
    } else {
      localStorage.setItem("theme", "light")
      themeToggleBtn.textContent = "🌙"
    }
  })
}

function readAccounts() {
  const raw = localStorage.getItem("stitchSync_accounts")
  if (!raw) return []
  try {
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function writeAccounts(accounts) {
  localStorage.setItem("stitchSync_accounts", JSON.stringify(accounts))
}

function setSession({ email, role }) {
  localStorage.setItem("stitchSync_token", "session_active_123")
  localStorage.setItem("stitchSync_user", email)
  localStorage.setItem("stitchSync_role", role)
}

function getRoleFromQuery() {
  const params = new URLSearchParams(window.location.search)
  const role = (params.get("role") || "").toLowerCase()
  if (role === "manufacturer") return "manufacturer"
  if (role === "app") return "app"
  return ""
}

function redirectAfterAuth(role) {
  if (role === "manufacturer") {
    window.location.href = "dashboard/dashboard.html"
    return
  }
  window.location.href = "index.html"
}

function wireSignup() {
  const form = document.getElementById("signup-form")
  if (!form) return

  const roleSelect = document.getElementById("role")
  const roleFromQuery = getRoleFromQuery()
  if (roleSelect && roleFromQuery) roleSelect.value = roleFromQuery

  const errorEl = document.getElementById("auth-error")

  function showError(message) {
    if (!errorEl) return
    errorEl.textContent = message
    errorEl.classList.add("is-visible")
  }

  function clearError() {
    if (!errorEl) return
    errorEl.textContent = ""
    errorEl.classList.remove("is-visible")
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    clearError()

    const name = String(document.getElementById("name")?.value || "").trim()
    const email = String(document.getElementById("email")?.value || "").trim().toLowerCase()
    const password = String(document.getElementById("password")?.value || "")
    const confirm = String(document.getElementById("confirm")?.value || "")
    const role = String(roleSelect?.value || "").trim()

    if (!name) return showError("Please enter your name.")
    if (!email.includes("@")) return showError("Please enter a valid email.")
    if (password.length < 6) return showError("Password must be at least 6 characters.")
    if (password !== confirm) return showError("Passwords do not match.")
    if (role !== "manufacturer" && role !== "app") return showError("Please choose an account type.")

    const accounts = readAccounts()
    const existing = accounts.find((a) => String(a.email || "").toLowerCase() === email)
    if (existing) {
      window.location.href = "userlogin.html?email=" + encodeURIComponent(email)
      return
    }

    accounts.push({
      name,
      email,
      password,
      role,
      createdAt: Date.now(),
    })

    writeAccounts(accounts)
    setSession({ email, role })
    redirectAfterAuth(role)
  })
}

function wireLogin() {
  const form = document.getElementById("login-form")
  if (!form) return

  const roleSelect = document.getElementById("role")
  const errorEl = document.getElementById("auth-error")

  const params = new URLSearchParams(window.location.search)
  const prefillEmail = params.get("email")
  if (prefillEmail) {
    const emailEl = document.getElementById("email")
    if (emailEl) emailEl.value = prefillEmail
  }

  function showError(message) {
    if (!errorEl) return
    errorEl.textContent = message
    errorEl.classList.add("is-visible")
  }

  function clearError() {
    if (!errorEl) return
    errorEl.textContent = ""
    errorEl.classList.remove("is-visible")
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    clearError()

    const email = String(document.getElementById("email")?.value || "").trim().toLowerCase()
    const password = String(document.getElementById("password")?.value || "")
    const role = String(roleSelect?.value || "").trim()

    if (!email.includes("@")) return showError("Please enter a valid email.")
    if (!password) return showError("Please enter your password.")
    if (role !== "manufacturer" && role !== "app") return showError("Please choose an account type.")

    const accounts = readAccounts()
    const account = accounts.find((a) => String(a.email || "").toLowerCase() === email)
    if (!account) return showError("No account found. Please sign up first.")
    if (String(account.password) !== password) return showError("Incorrect password.")
    if (String(account.role) !== role) return showError("This email is registered under a different account type.")

    setSession({ email, role })
    redirectAfterAuth(role)
  })
}

wireSignup()
wireLogin()

const passwordToggleButtons = document.querySelectorAll(".password-toggle")
passwordToggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target")
    if (!targetId) return
    const input = document.getElementById(targetId)
    if (!input) return

    const isPassword = input.getAttribute("type") === "password"
    input.setAttribute("type", isPassword ? "text" : "password")

    btn.setAttribute("aria-pressed", isPassword ? "true" : "false")
    btn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password")
    btn.textContent = isPassword ? "🙈" : "👁"
  })
})
