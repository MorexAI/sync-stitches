const THEME_KEY = "theme"
const SESSION_EMAIL_KEY = "stitchSync_user"
const SESSION_ROLE_KEY = "stitchSync_role"
const SESSION_TOKEN_KEY = "stitchSync_token"

const PROFILE_KEY = "stitchSync_appUserProfile"
const PREFS_KEY = "stitchSync_appUserPreferences"
const HISTORY_KEY = "stitchSync_fitHistory"
const ACCOUNTS_KEY = "stitchSync_accounts"
const NOTIFICATIONS_KEY = "stitchSync_notifications"
const BALANCE_VISIBILITY_KEY = "stitchSync_balanceVisible"

const countryOptions = [
  { name: "Afghanistan", dial: "+93" },
  { name: "Albania", dial: "+355" },
  { name: "Algeria", dial: "+213" },
  { name: "Andorra", dial: "+376" },
  { name: "Angola", dial: "+244" },
  { name: "Antigua and Barbuda", dial: "+1" },
  { name: "Argentina", dial: "+54" },
  { name: "Armenia", dial: "+374" },
  { name: "Australia", dial: "+61" },
  { name: "Austria", dial: "+43" },
  { name: "Azerbaijan", dial: "+994" },
  { name: "Bahamas", dial: "+1" },
  { name: "Bahrain", dial: "+973" },
  { name: "Bangladesh", dial: "+880" },
  { name: "Barbados", dial: "+1" },
  { name: "Belarus", dial: "+375" },
  { name: "Belgium", dial: "+32" },
  { name: "Belize", dial: "+501" },
  { name: "Benin", dial: "+229" },
  { name: "Bhutan", dial: "+975" },
  { name: "Bolivia", dial: "+591" },
  { name: "Bosnia and Herzegovina", dial: "+387" },
  { name: "Botswana", dial: "+267" },
  { name: "Brazil", dial: "+55" },
  { name: "Brunei", dial: "+673" },
  { name: "Bulgaria", dial: "+359" },
  { name: "Burkina Faso", dial: "+226" },
  { name: "Burundi", dial: "+257" },
  { name: "Cabo Verde", dial: "+238" },
  { name: "Cambodia", dial: "+855" },
  { name: "Cameroon", dial: "+237" },
  { name: "Canada", dial: "+1" },
  { name: "China", dial: "+86" },
  { name: "Denmark", dial: "+45" },
  { name: "Egypt", dial: "+20" },
  { name: "Ethiopia", dial: "+251" },
  { name: "Finland", dial: "+358" },
  { name: "France", dial: "+33" },
  { name: "Germany", dial: "+49" },
  { name: "Ghana", dial: "+233" },
  { name: "India", dial: "+91" },
  { name: "Ireland", dial: "+353" },
  { name: "Italy", dial: "+39" },
  { name: "Japan", dial: "+81" },
  { name: "Kenya", dial: "+254" },
  { name: "Mexico", dial: "+52" },
  { name: "Morocco", dial: "+212" },
  { name: "Netherlands", dial: "+31" },
  { name: "New Zealand", dial: "+64" },
  { name: "Nigeria", dial: "+234" },
  { name: "Norway", dial: "+47" },
  { name: "Pakistan", dial: "+92" },
  { name: "Portugal", dial: "+351" },
  { name: "Qatar", dial: "+974" },
  { name: "Rwanda", dial: "+250" },
  { name: "Saudi Arabia", dial: "+966" },
  { name: "South Africa", dial: "+27" },
  { name: "Spain", dial: "+34" },
  { name: "Sweden", dial: "+46" },
  { name: "Switzerland", dial: "+41" },
  { name: "Tanzania", dial: "+255" },
  { name: "United Arab Emirates", dial: "+971" },
  { name: "United Kingdom", dial: "+44" },
  { name: "United States", dial: "+1" },
  { name: "Zambia", dial: "+260" },
  { name: "Zimbabwe", dial: "+263" },
  { name: "Other", dial: "" },
]

const statesByCountry = {
  Canada: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon",
  ],
  Nigeria: [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT",
  ],
  "United Kingdom": ["England", "Northern Ireland", "Scotland", "Wales"],
  "United States": [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
    "District of Columbia",
  ],
}

function readJson(key, fallback) {
  const raw = localStorage.getItem(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function formatDateTime(ts) {
  const date = new Date(ts)
  return date.toLocaleString()
}

function getInitials(name) {
  const cleaned = String(name || "").trim().replace(/\s+/g, " ")
  if (!cleaned) return "U"
  const parts = cleaned.split(" ")
  const first = parts[0]?.[0] || ""
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] || "" : ""
  const initials = (first + last).toUpperCase()
  return initials || "U"
}

function maskDigits(text) {
  return String(text || "").replace(/\d/g, "•")
}

function getBalanceVisible() {
  const raw = localStorage.getItem(BALANCE_VISIBILITY_KEY)
  if (raw === null) return false
  return raw === "true"
}

function setBalanceVisible(next) {
  localStorage.setItem(BALANCE_VISIBILITY_KEY, next ? "true" : "false")
}

function ensureSignedIn() {
  const token = localStorage.getItem(SESSION_TOKEN_KEY)
  const role = localStorage.getItem(SESSION_ROLE_KEY)
  if (!token || role !== "app") {
    window.location.href = "userlogin.html"
  }
}

function loadProfile() {
  const stored = readJson(PROFILE_KEY, null)
  if (stored) {
    const next = {
      avatarDataUrl: String(stored.avatarDataUrl || ""),
      fullName: String(stored.fullName || stored.name || "App User"),
      email: String(stored.email || ""),
      country: String(stored.country || ""),
      state: String(stored.state || ""),
      phone: String(stored.phone || ""),
      postalCode: String(stored.postalCode || ""),
      membershipTier: String(stored.membershipTier || "Basic"),
      balanceOrCredits: String(stored.balanceOrCredits || "Credits left: 12"),
    }
    writeJson(PROFILE_KEY, next)
    return next
  }

  const email = String(localStorage.getItem(SESSION_EMAIL_KEY) || "").trim().toLowerCase()
  const accounts = readJson(ACCOUNTS_KEY, [])
  const match = accounts.find((a) => String(a.email || "").toLowerCase() === email)

  const base = {
    avatarDataUrl: "",
    fullName: String(match?.appUserProfile?.fullName || match?.name || "App User"),
    email: email || String(match?.email || ""),
    country: String(match?.contactProfile?.country || ""),
    state: String(match?.contactProfile?.state || ""),
    phone: String(match?.contactProfile?.phone || ""),
    postalCode: String(match?.contactProfile?.postalCode || ""),
    membershipTier: "Basic",
    balanceOrCredits: "Credits left: 12",
  }

  writeJson(PROFILE_KEY, base)
  return base
}

function saveProfile(profile) {
  writeJson(PROFILE_KEY, profile)
}

function loadPreferences() {
  const stored = readJson(PREFS_KEY, null)
  if (stored) return stored
  const defaults = { size: "", shape: "" }
  writeJson(PREFS_KEY, defaults)
  return defaults
}

function savePreferences(prefs) {
  writeJson(PREFS_KEY, prefs)
}

function seedDemoDataIfEmpty() {
  const existing = readJson(HISTORY_KEY, null)
  if (Array.isArray(existing) && existing.length > 0) return

  const now = Date.now()
  const demo = [
    {
      id: "fit_" + (now - 1000 * 60 * 60 * 2),
      companyName: "Zara",
      garmentName: "Classic Trousers",
      checkedAt: now - 1000 * 60 * 60 * 2,
      result: "Pass",
    },
    {
      id: "fit_" + (now - 1000 * 60 * 60 * 26),
      companyName: "Ralph Lauren",
      garmentName: "Slim Fit Shirt",
      checkedAt: now - 1000 * 60 * 60 * 26,
      result: "Tight",
    },
    {
      id: "fit_" + (now - 1000 * 60 * 60 * 24 * 10),
      companyName: "FILA",
      garmentName: "Relaxed Hoodie",
      checkedAt: now - 1000 * 60 * 60 * 24 * 10,
      result: "Loose",
    },
  ]

  writeJson(HISTORY_KEY, demo)
}

function loadHistory() {
  const items = readJson(HISTORY_KEY, [])
  return Array.isArray(items) ? items : []
}

function getStatusClass(result) {
  const normalized = String(result || "").toLowerCase()
  if (normalized === "pass") return "status status--pass"
  if (normalized === "tight") return "status status--tight"
  if (normalized === "loose") return "status status--loose"
  return "status"
}

function renderHistory(items) {
  const list = document.getElementById("history-list")
  if (!list) return
  list.innerHTML = ""

  if (!items || items.length === 0) {
    const empty = document.createElement("div")
    empty.className = "table-row"
    empty.innerHTML = `<div>${formatDateTime(Date.now())}</div><div>—</div><div>No records yet</div><div><span class="status">—</span></div>`
    list.appendChild(empty)
    return
  }

  items
    .slice()
    .sort((a, b) => Number(b.checkedAt) - Number(a.checkedAt))
    .forEach((item) => {
      const row = document.createElement("div")
      row.className = "table-row"
      row.innerHTML = `
        <div>${formatDateTime(item.checkedAt)}</div>
        <div>${String(item.companyName || "—")}</div>
        <div>${String(item.garmentName || "—")}</div>
        <div><span class="${getStatusClass(item.result)}">${String(item.result || "—")}</span></div>
      `
      list.appendChild(row)
    })
}

function filterHistory(allItems, { query, rangeDays }) {
  const q = String(query || "").trim().toLowerCase()
  const now = Date.now()

  return allItems.filter((item) => {
    const company = String(item.companyName || "").toLowerCase()
    if (q && !company.includes(q)) return false

    if (rangeDays === "all") return true
    const days = Number(rangeDays)
    if (!Number.isFinite(days) || days <= 0) return true
    const cutoff = now - days * 24 * 60 * 60 * 1000
    return Number(item.checkedAt) >= cutoff
  })
}

function populateCountrySelect(selectEl) {
  if (!selectEl) return
  if (selectEl.options.length > 1) return
  const sorted = [...countryOptions].sort((a, b) => a.name.localeCompare(b.name))
  sorted.forEach(({ name }) => {
    const opt = document.createElement("option")
    opt.value = name
    opt.textContent = name
    selectEl.appendChild(opt)
  })
}

function setStateDatalist(listEl, countryName) {
  if (!listEl) return
  listEl.innerHTML = ""
  const states = statesByCountry[countryName]
  if (!states) return
  states.forEach((s) => {
    const opt = document.createElement("option")
    opt.value = s
    listEl.appendChild(opt)
  })
}

function setPhoneDialPlaceholder(phoneInput, countryName) {
  if (!phoneInput) return
  const match = countryOptions.find((c) => c.name === countryName)
  const dial = match?.dial || ""
  if (!dial) return

  const raw = String(phoneInput.value || "")
  const trimmed = raw.trim()
  if (!trimmed || trimmed.startsWith("+")) {
    if (!trimmed || trimmed === dial) {
      phoneInput.value = dial + " "
    }
    phoneInput.placeholder = dial + " 800 000 0000"
    return
  }
  phoneInput.placeholder = dial + " 800 000 0000"
}

function hydrateProfileUI(profile) {
  const welcomeNameEl = document.getElementById("welcome-name")
  const nameEl = document.getElementById("profile-name")
  const emailEl = document.getElementById("profile-email")
  const locationEl = document.getElementById("profile-location")
  const phoneEl = document.getElementById("profile-phone")
  const avatarEl = document.getElementById("profile-avatar")
  const topbarNameEl = document.getElementById("topbar-name")
  const topbarAvatarEl = document.getElementById("topbar-avatar")
  const tierEl = document.getElementById("membership-tier")
  const renewalEl = document.getElementById("membership-renewal")
  const balanceEl = document.getElementById("membership-balance")

  const displayName = profile.fullName || "—"
  if (welcomeNameEl) welcomeNameEl.textContent = `${displayName} 👋`
  if (nameEl) nameEl.textContent = displayName
  if (emailEl) emailEl.textContent = profile.email || "—"
  if (locationEl) {
    const parts = [profile.state, profile.country].filter(Boolean)
    locationEl.textContent = parts.length ? parts.join(", ") : "—"
  }
  if (phoneEl) phoneEl.textContent = profile.phone || "—"

  if (avatarEl) {
    const url = String(profile.avatarDataUrl || "")
    if (url) {
      avatarEl.style.backgroundImage = `url("${url}")`
      avatarEl.textContent = ""
    } else {
      avatarEl.style.backgroundImage = "none"
      avatarEl.textContent = getInitials(displayName)
    }
  }

  if (topbarNameEl) topbarNameEl.textContent = displayName
  if (topbarAvatarEl) {
    const url = String(profile.avatarDataUrl || "")
    if (url) {
      topbarAvatarEl.style.backgroundImage = `url("${url}")`
      topbarAvatarEl.textContent = ""
    } else {
      topbarAvatarEl.style.backgroundImage = "none"
      topbarAvatarEl.textContent = getInitials(displayName)
    }
  }

  if (tierEl) tierEl.textContent = profile.membershipTier || "—"
  if (renewalEl) {
    const dt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    renewalEl.textContent = dt.toLocaleDateString()
  }
  if (balanceEl) {
    const visible = getBalanceVisible()
    const raw = profile.balanceOrCredits || "—"
    balanceEl.textContent = visible ? raw : maskDigits(raw)
  }
}

function wireBalanceToggle(profile) {
  const btn = document.getElementById("balance-toggle")
  const balanceEl = document.getElementById("membership-balance")
  if (!btn || !balanceEl) return

  function render() {
    const visible = getBalanceVisible()
    const raw = profile.balanceOrCredits || "—"
    balanceEl.textContent = visible ? raw : maskDigits(raw)
    btn.textContent = visible ? "🙈" : "👁"
    btn.setAttribute("aria-pressed", visible ? "true" : "false")
    btn.setAttribute("aria-label", visible ? "Hide balance" : "Show balance")
  }

  render()
  btn.addEventListener("click", () => {
    setBalanceVisible(!getBalanceVisible())
    render()
  })
}

function hydratePreferencesUI(prefs) {
  const sizeEl = document.getElementById("size")
  const shapeEl = document.getElementById("shape")
  const summaryEl = document.getElementById("fit-summary")

  if (sizeEl && prefs.size) sizeEl.value = prefs.size
  if (shapeEl && prefs.shape) shapeEl.value = prefs.shape

  if (summaryEl) {
    const size = prefs.size || "—"
    const shape = prefs.shape ? prefs.shape.replace(/-/g, " ") : "—"
    summaryEl.textContent = `Size: ${size} • Shape: ${shape.charAt(0).toUpperCase() + shape.slice(1)}`
  }
}

function wireThemeToggle() {
  const btn = document.getElementById("theme-toggle")
  const stored = localStorage.getItem(THEME_KEY)

  if (stored === "dark") document.body.classList.add("dark-mode")
  if (btn) btn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙"

  if (!btn) return
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
    const isDark = document.body.classList.contains("dark-mode")
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light")
    btn.textContent = isDark ? "☀️" : "🌙"
  })
}

function wireLogout() {
  const logoutBtn = document.getElementById("logout-btn")
  if (!logoutBtn) return
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem(SESSION_TOKEN_KEY)
    localStorage.removeItem(SESSION_ROLE_KEY)
    localStorage.removeItem(SESSION_EMAIL_KEY)
    window.location.href = "index.html"
  })
}

function wireSidebar() {
  const profileBtn = document.getElementById("profile-btn")
  const closeBtn = document.getElementById("menu-close-btn")
  const sidebar = document.getElementById("sidebar")
  const backdrop = document.getElementById("sidebar-backdrop")
  const logoutBtn = document.getElementById("sidebar-logout")

  function open() {
    document.body.classList.add("sidebar-open")
    if (profileBtn) profileBtn.setAttribute("aria-expanded", "true")
  }

  function close() {
    document.body.classList.remove("sidebar-open")
    if (profileBtn) profileBtn.setAttribute("aria-expanded", "false")
  }

  if (profileBtn) profileBtn.addEventListener("click", open)
  if (closeBtn) closeBtn.addEventListener("click", close)
  if (backdrop) backdrop.addEventListener("click", close)

  if (sidebar) {
    sidebar.addEventListener("click", (e) => {
      const a = e.target?.closest?.("a[data-nav]")
      if (!a) return
      close()
    })
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem(SESSION_TOKEN_KEY)
      localStorage.removeItem(SESSION_ROLE_KEY)
      localStorage.removeItem(SESSION_EMAIL_KEY)
      window.location.href = "index.html"
    })
  }
}

function wireProfileDialog(profile) {
  const dialog = document.getElementById("profile-dialog")
  const openBtn = document.getElementById("edit-profile-btn")
  const cancelBtn = document.getElementById("profile-cancel")
  const form = document.getElementById("profile-form")

  const fullNameEl = document.getElementById("profileFullName")
  const avatarFileEl = document.getElementById("profileAvatar")
  const emailEl = document.getElementById("profileEmail")
  const countryEl = document.getElementById("profileCountry")
  const phoneEl = document.getElementById("profilePhone")
  const stateEl = document.getElementById("profileState")
  const stateList = document.getElementById("profile-state-list")
  const postalEl = document.getElementById("profilePostalCode")
  const tierEl = document.getElementById("profileTier")
  const balanceEl = document.getElementById("profileBalance")

  populateCountrySelect(countryEl)

  let pendingAvatarDataUrl = String(profile.avatarDataUrl || "")

  function syncStateForCountry() {
    const c = String(countryEl?.value || "").trim()
    setStateDatalist(stateList, c)
    setPhoneDialPlaceholder(phoneEl, c)
  }

  if (countryEl) countryEl.addEventListener("change", syncStateForCountry)

  if (avatarFileEl) {
    avatarFileEl.addEventListener("change", () => {
      const file = avatarFileEl.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        pendingAvatarDataUrl = String(reader.result || "")
        profile.avatarDataUrl = pendingAvatarDataUrl
        hydrateProfileUI(profile)
      }
      reader.readAsDataURL(file)
    })
  }

  function fillForm() {
    if (fullNameEl) fullNameEl.value = profile.fullName || ""
    if (emailEl) emailEl.value = profile.email || ""
    if (countryEl) countryEl.value = profile.country || ""
    if (phoneEl) phoneEl.value = profile.phone || ""
    if (stateEl) stateEl.value = profile.state || ""
    if (postalEl) postalEl.value = profile.postalCode || ""
    if (tierEl) tierEl.value = profile.membershipTier || "Basic"
    if (balanceEl) balanceEl.value = profile.balanceOrCredits || "Credits left: 12"
    if (avatarFileEl) avatarFileEl.value = ""
    pendingAvatarDataUrl = String(profile.avatarDataUrl || "")
    syncStateForCountry()
  }

  if (openBtn && dialog) {
    openBtn.addEventListener("click", () => {
      fillForm()
      if (typeof dialog.showModal === "function") dialog.showModal()
    })
  }

  if (cancelBtn && dialog) {
    cancelBtn.addEventListener("click", () => dialog.close())
  }

  if (!form) return
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const next = {
      fullName: String(fullNameEl?.value || "").trim(),
      email: String(emailEl?.value || "").trim().toLowerCase(),
      country: String(countryEl?.value || "").trim(),
      phone: String(phoneEl?.value || "").trim(),
      state: String(stateEl?.value || "").trim(),
      postalCode: String(postalEl?.value || "").trim(),
      membershipTier: String(tierEl?.value || "Basic").trim(),
      balanceOrCredits: String(balanceEl?.value || "").trim(),
      avatarDataUrl: String(pendingAvatarDataUrl || profile.avatarDataUrl || ""),
    }

    saveProfile(next)
    localStorage.setItem(SESSION_EMAIL_KEY, next.email)
    profile.fullName = next.fullName
    profile.email = next.email
    profile.country = next.country
    profile.phone = next.phone
    profile.state = next.state
    profile.postalCode = next.postalCode
    profile.membershipTier = next.membershipTier
    profile.balanceOrCredits = next.balanceOrCredits
    profile.avatarDataUrl = next.avatarDataUrl

    hydrateProfileUI(profile)
    wireBalanceToggle(profile)
    if (dialog) dialog.close()
  })
}

function wireUpgradeDialog(profile) {
  const dialog = document.getElementById("upgrade-dialog")
  const openBtn = document.getElementById("upgrade-btn")
  if (openBtn && dialog) {
    openBtn.addEventListener("click", () => {
      if (typeof dialog.showModal === "function") dialog.showModal()
    })
  }

  if (!dialog) return
  dialog.addEventListener("click", (e) => {
    const target = e.target
    const btn = target?.closest?.(".upgrade-option")
    if (!btn) return
    const tier = String(btn.getAttribute("data-tier") || "").trim()
    if (!tier) return
    profile.membershipTier = tier
    saveProfile(profile)
    hydrateProfileUI(profile)
  })
}

function wirePreferences(prefs) {
  const form = document.getElementById("prefs-form")
  if (!form) return
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const size = String(document.getElementById("size")?.value || "").trim()
    const shape = String(document.getElementById("shape")?.value || "").trim()
    const next = { size, shape }
    savePreferences(next)
    prefs.size = next.size
    prefs.shape = next.shape
    hydratePreferencesUI(prefs)
  })
}

function wireHistory(allItems) {
  const search = document.getElementById("history-search")
  const range = document.getElementById("history-range")

  function rerender() {
    const filtered = filterHistory(allItems, {
      query: search?.value || "",
      rangeDays: range?.value || "all",
    })
    renderHistory(filtered)
  }

  if (search) search.addEventListener("input", rerender)
  if (range) range.addEventListener("change", rerender)
  rerender()
}

function seedNotificationsIfEmpty() {
  const existing = readJson(NOTIFICATIONS_KEY, null)
  if (Array.isArray(existing) && existing.length > 0) return

  const now = Date.now()
  const demo = [
    {
      id: "note_" + (now - 1000 * 60 * 60 * 3),
      title: "Fit check ready",
      message: "Your AI fit summary has been saved to history.",
      createdAt: now - 1000 * 60 * 60 * 3,
    },
    {
      id: "note_" + (now - 1000 * 60 * 60 * 24 * 4),
      title: "Membership update",
      message: "Upgrade anytime to unlock more fit checks.",
      createdAt: now - 1000 * 60 * 60 * 24 * 4,
    },
  ]

  writeJson(NOTIFICATIONS_KEY, demo)
}

function loadNotifications() {
  const items = readJson(NOTIFICATIONS_KEY, [])
  return Array.isArray(items) ? items : []
}

function renderNotifications(items) {
  const list = document.getElementById("notifications-list")
  if (!list) return
  list.innerHTML = ""

  const data = items?.slice?.().sort((a, b) => Number(b.createdAt) - Number(a.createdAt)) || []
  if (data.length === 0) {
    const el = document.createElement("div")
    el.className = "notice"
    el.innerHTML = `<div class="notice-title marcellus-regular">No notifications</div><div class="notice-meta">You're all caught up.</div>`
    list.appendChild(el)
    return
  }

  data.forEach((n) => {
    const el = document.createElement("div")
    el.className = "notice"
    el.innerHTML = `
      <div class="notice-title marcellus-regular">${String(n.title || "Update")}</div>
      <div class="notice-meta">${formatDateTime(n.createdAt)}</div>
      <div>${String(n.message || "")}</div>
    `
    list.appendChild(el)
  })
}

ensureSignedIn()
wireThemeToggle()
wireSidebar()
wireLogout()

seedDemoDataIfEmpty()
seedNotificationsIfEmpty()

const profile = loadProfile()
const prefs = loadPreferences()
const history = loadHistory()
const notifications = loadNotifications()

hydrateProfileUI(profile)
hydratePreferencesUI(prefs)
renderHistory(history)
renderNotifications(notifications)

wireProfileDialog(profile)
wireUpgradeDialog(profile)
wirePreferences(prefs)
wireHistory(history)
wireBalanceToggle(profile)
