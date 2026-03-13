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
  { name: "Central African Republic", dial: "+236" },
  { name: "Chad", dial: "+235" },
  { name: "Chile", dial: "+56" },
  { name: "China", dial: "+86" },
  { name: "Colombia", dial: "+57" },
  { name: "Comoros", dial: "+269" },
  { name: "Congo (Brazzaville)", dial: "+242" },
  { name: "Congo (Kinshasa)", dial: "+243" },
  { name: "Costa Rica", dial: "+506" },
  { name: "Cote d'Ivoire", dial: "+225" },
  { name: "Croatia", dial: "+385" },
  { name: "Cuba", dial: "+53" },
  { name: "Cyprus", dial: "+357" },
  { name: "Czechia", dial: "+420" },
  { name: "Denmark", dial: "+45" },
  { name: "Djibouti", dial: "+253" },
  { name: "Dominica", dial: "+1" },
  { name: "Dominican Republic", dial: "+1" },
  { name: "Ecuador", dial: "+593" },
  { name: "Egypt", dial: "+20" },
  { name: "El Salvador", dial: "+503" },
  { name: "Equatorial Guinea", dial: "+240" },
  { name: "Eritrea", dial: "+291" },
  { name: "Estonia", dial: "+372" },
  { name: "Eswatini", dial: "+268" },
  { name: "Ethiopia", dial: "+251" },
  { name: "Fiji", dial: "+679" },
  { name: "Finland", dial: "+358" },
  { name: "France", dial: "+33" },
  { name: "Gabon", dial: "+241" },
  { name: "Gambia", dial: "+220" },
  { name: "Georgia", dial: "+995" },
  { name: "Germany", dial: "+49" },
  { name: "Ghana", dial: "+233" },
  { name: "Greece", dial: "+30" },
  { name: "Grenada", dial: "+1" },
  { name: "Guatemala", dial: "+502" },
  { name: "Guinea", dial: "+224" },
  { name: "Guinea-Bissau", dial: "+245" },
  { name: "Guyana", dial: "+592" },
  { name: "Haiti", dial: "+509" },
  { name: "Honduras", dial: "+504" },
  { name: "Hungary", dial: "+36" },
  { name: "Iceland", dial: "+354" },
  { name: "India", dial: "+91" },
  { name: "Indonesia", dial: "+62" },
  { name: "Iran", dial: "+98" },
  { name: "Iraq", dial: "+964" },
  { name: "Ireland", dial: "+353" },
  { name: "Israel", dial: "+972" },
  { name: "Italy", dial: "+39" },
  { name: "Jamaica", dial: "+1" },
  { name: "Japan", dial: "+81" },
  { name: "Jordan", dial: "+962" },
  { name: "Kazakhstan", dial: "+7" },
  { name: "Kenya", dial: "+254" },
  { name: "Kiribati", dial: "+686" },
  { name: "Kuwait", dial: "+965" },
  { name: "Kyrgyzstan", dial: "+996" },
  { name: "Laos", dial: "+856" },
  { name: "Latvia", dial: "+371" },
  { name: "Lebanon", dial: "+961" },
  { name: "Lesotho", dial: "+266" },
  { name: "Liberia", dial: "+231" },
  { name: "Libya", dial: "+218" },
  { name: "Liechtenstein", dial: "+423" },
  { name: "Lithuania", dial: "+370" },
  { name: "Luxembourg", dial: "+352" },
  { name: "Madagascar", dial: "+261" },
  { name: "Malawi", dial: "+265" },
  { name: "Malaysia", dial: "+60" },
  { name: "Maldives", dial: "+960" },
  { name: "Mali", dial: "+223" },
  { name: "Malta", dial: "+356" },
  { name: "Marshall Islands", dial: "+692" },
  { name: "Mauritania", dial: "+222" },
  { name: "Mauritius", dial: "+230" },
  { name: "Mexico", dial: "+52" },
  { name: "Micronesia", dial: "+691" },
  { name: "Moldova", dial: "+373" },
  { name: "Monaco", dial: "+377" },
  { name: "Mongolia", dial: "+976" },
  { name: "Montenegro", dial: "+382" },
  { name: "Morocco", dial: "+212" },
  { name: "Mozambique", dial: "+258" },
  { name: "Myanmar", dial: "+95" },
  { name: "Namibia", dial: "+264" },
  { name: "Nauru", dial: "+674" },
  { name: "Nepal", dial: "+977" },
  { name: "Netherlands", dial: "+31" },
  { name: "New Zealand", dial: "+64" },
  { name: "Nicaragua", dial: "+505" },
  { name: "Niger", dial: "+227" },
  { name: "Nigeria", dial: "+234" },
  { name: "North Macedonia", dial: "+389" },
  { name: "Norway", dial: "+47" },
  { name: "Oman", dial: "+968" },
  { name: "Pakistan", dial: "+92" },
  { name: "Palau", dial: "+680" },
  { name: "Panama", dial: "+507" },
  { name: "Papua New Guinea", dial: "+675" },
  { name: "Paraguay", dial: "+595" },
  { name: "Peru", dial: "+51" },
  { name: "Philippines", dial: "+63" },
  { name: "Poland", dial: "+48" },
  { name: "Portugal", dial: "+351" },
  { name: "Qatar", dial: "+974" },
  { name: "Romania", dial: "+40" },
  { name: "Russia", dial: "+7" },
  { name: "Rwanda", dial: "+250" },
  { name: "Saint Kitts and Nevis", dial: "+1" },
  { name: "Saint Lucia", dial: "+1" },
  { name: "Saint Vincent and the Grenadines", dial: "+1" },
  { name: "Samoa", dial: "+685" },
  { name: "San Marino", dial: "+378" },
  { name: "Sao Tome and Principe", dial: "+239" },
  { name: "Saudi Arabia", dial: "+966" },
  { name: "Senegal", dial: "+221" },
  { name: "Serbia", dial: "+381" },
  { name: "Seychelles", dial: "+248" },
  { name: "Sierra Leone", dial: "+232" },
  { name: "Singapore", dial: "+65" },
  { name: "Slovakia", dial: "+421" },
  { name: "Slovenia", dial: "+386" },
  { name: "Solomon Islands", dial: "+677" },
  { name: "Somalia", dial: "+252" },
  { name: "South Africa", dial: "+27" },
  { name: "South Korea", dial: "+82" },
  { name: "South Sudan", dial: "+211" },
  { name: "Spain", dial: "+34" },
  { name: "Sri Lanka", dial: "+94" },
  { name: "Sudan", dial: "+249" },
  { name: "Suriname", dial: "+597" },
  { name: "Sweden", dial: "+46" },
  { name: "Switzerland", dial: "+41" },
  { name: "Syria", dial: "+963" },
  { name: "Taiwan", dial: "+886" },
  { name: "Tajikistan", dial: "+992" },
  { name: "Tanzania", dial: "+255" },
  { name: "Thailand", dial: "+66" },
  { name: "Timor-Leste", dial: "+670" },
  { name: "Togo", dial: "+228" },
  { name: "Tonga", dial: "+676" },
  { name: "Trinidad and Tobago", dial: "+1" },
  { name: "Tunisia", dial: "+216" },
  { name: "Turkey", dial: "+90" },
  { name: "Turkmenistan", dial: "+993" },
  { name: "Tuvalu", dial: "+688" },
  { name: "Uganda", dial: "+256" },
  { name: "Ukraine", dial: "+380" },
  { name: "United Arab Emirates", dial: "+971" },
  { name: "United Kingdom", dial: "+44" },
  { name: "United States", dial: "+1" },
  { name: "Uruguay", dial: "+598" },
  { name: "Uzbekistan", dial: "+998" },
  { name: "Vanuatu", dial: "+678" },
  { name: "Vatican City", dial: "+379" },
  { name: "Venezuela", dial: "+58" },
  { name: "Vietnam", dial: "+84" },
  { name: "Yemen", dial: "+967" },
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
    'Kogi',
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

function wireSignup() {
  const form = document.getElementById("signup-form")
  if (!form) return

  const roleSelect = document.getElementById("role")
  const roleFromQuery = getRoleFromQuery()
  if (roleSelect && roleFromQuery) roleSelect.value = roleFromQuery

  const manufacturerFields = document.getElementById("manufacturer-fields")
  const nameLabel = document.getElementById("name-label")
  const nameInput = document.getElementById("name")
  const countryInput = document.getElementById("country")
  const phoneInput = document.getElementById("phone")
  const stateInput = document.getElementById("state")
  const stateList = document.getElementById("state-list")
  const postalCodeInput = document.getElementById("postalCode")

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

  function syncRoleFields() {
    const role = String(roleSelect?.value || "").trim()
    const isManufacturer = role === "manufacturer"

    if (manufacturerFields) manufacturerFields.hidden = !isManufacturer

    if (nameLabel) nameLabel.textContent = isManufacturer ? "Business name" : "Full name"
    if (nameInput) {
      nameInput.placeholder = isManufacturer ? "StitchSync Manufacturing Ltd" : "Jane Doe"
      nameInput.autocomplete = isManufacturer ? "organization" : "name"
    }

    const shouldRequire = (el) => {
      if (!el) return
      if (isManufacturer) el.setAttribute("required", "")
      else el.removeAttribute("required")
    }

    shouldRequire(countryInput)
    shouldRequire(phoneInput)
    shouldRequire(stateInput)
    shouldRequire(postalCodeInput)
  }

  function setStateSuggestions(countryName) {
    if (!stateList) return
    stateList.innerHTML = ""
    const options = statesByCountry[countryName]
    if (!options || options.length === 0) return
    options.forEach((name) => {
      const opt = document.createElement("option")
      opt.value = name
      stateList.appendChild(opt)
    })
  }

  function setPhoneDialCode(countryName) {
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

  function populateCountries() {
    if (!countryInput) return
    if (countryInput.tagName !== "SELECT") return
    if (countryInput.options.length > 1) return

    const sorted = [...countryOptions].sort((a, b) => a.name.localeCompare(b.name))
    sorted.forEach(({ name }) => {
      if (!name) return
      const opt = document.createElement("option")
      opt.value = name
      opt.textContent = name
      countryInput.appendChild(opt)
    })
  }

  function handleCountryChange() {
    const countryName = String(countryInput?.value || "").trim()
    setStateSuggestions(countryName)
    setPhoneDialCode(countryName)
    if (stateInput) stateInput.placeholder = statesByCountry[countryName] ? "Select or type..." : "Start typing..."
  }

  populateCountries()
  handleCountryChange()
  if (countryInput) countryInput.addEventListener("change", handleCountryChange)

  syncRoleFields()
  if (roleSelect) roleSelect.addEventListener("change", syncRoleFields)

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    clearError()

    const name = String(document.getElementById("name")?.value || "").trim()
    const email = String(document.getElementById("email")?.value || "").trim().toLowerCase()
    const password = String(document.getElementById("password")?.value || "")
    const confirm = String(document.getElementById("confirm")?.value || "")
    const role = String(roleSelect?.value || "").trim()

    if (!name) return showError(role === "manufacturer" ? "Please enter your business name." : "Please enter your name.")
    if (!email.includes("@")) return showError("Please enter a valid email.")
    if (password.length < 6) return showError("Password must be at least 6 characters.")
    if (password !== confirm) return showError("Passwords do not match.")
    if (role !== "manufacturer" && role !== "app") return showError("Please choose an account type.")

    const manufacturerProfile =
      role === "manufacturer"
        ? {
            businessName: name,
            country: String(countryInput?.value || "").trim(),
            phone: String(phoneInput?.value || "").trim(),
            state: String(stateInput?.value || "").trim(),
            postalCode: String(postalCodeInput?.value || "").trim(),
          }
        : null

    if (role === "manufacturer") {
      if (!manufacturerProfile.country) return showError("Please enter your country.")
      if (!manufacturerProfile.phone) return showError("Please enter your phone.")
      if (!manufacturerProfile.state) return showError("Please enter your state.")
      if (!manufacturerProfile.postalCode) return showError("Please enter your postal code.")
    }

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
      manufacturerProfile,
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
    btn.textContent = isPassword ? "/" : "👁"
  })
})
