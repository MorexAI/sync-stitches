const PROFILE_KEY = "stitchSync_appUserProfile"

const PRODUCTS = [
  { id: "zara_tee", brand: "ZARA", name: "Classic Tee", img: "assets/shop/zara.jpg" },
  { id: "fila_tee", brand: "FILA", name: "Sport Tee", img: "assets/shop/fila.jpg" },
  { id: "gucci_tee", brand: "GUCCI", name: "Logo Tee", img: "assets/shop/gucci.jpg" },
  { id: "polo_tee", brand: "POLO RALPH LAUREN", name: "Polo Tee", img: "assets/shop/polo.jpg" },
  { id: "lacoste_tee", brand: "LACOSTE", name: "Croc Tee", img: "assets/shop/lacoste.jpg" },
]

function readProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return data && typeof data === "object" ? data : null
  } catch {
    return null
  }
}

function recommendSizeFromChest(chest) {
  if (!Number.isFinite(chest)) return ""
  if (chest < 84) return "XS"
  if (chest < 92) return "S"
  if (chest < 100) return "M"
  if (chest < 108) return "L"
  if (chest < 116) return "XL"
  if (chest < 124) return "XXL"
  return "XXXL"
}

function renderGrid() {
  const grid = document.getElementById("shop-grid")
  if (!grid) return
  grid.innerHTML = ""
  PRODUCTS.forEach((p) => {
    const el = document.createElement("article")
    el.className = "card-p"
    el.innerHTML = `
      <img class="card-p__img" src="${p.img}" alt="${p.brand} ${p.name}" loading="lazy">
      <div class="card-p__body">
        <div class="card-p__brand marcellus-regular">${p.brand}</div>
        <div class="card-p__name">${p.name}</div>
        <div class="card-p__actions">
          <button class="pill-btn pill-btn--primary" data-fit="${p.id}" type="button">Check Fit</button>
        </div>
      </div>
    `
    grid.appendChild(el)
  })
}

function openFitDialog(product) {
  const dialog = document.getElementById("fit-dialog")
  const title = document.getElementById("fit-title")
  const body = document.getElementById("fit-body")
  if (!dialog || !title || !body) return

  title.textContent = `${product.brand} • ${product.name}`
  const profile = readProfile()
  const m = profile?.measurements || {}
  const chest = Number(m.chestCm)
  const waist = Number(m.waistCm)
  const hip = Number(m.hipCm)
  const height = Number(m.heightCm)

  const has = Number.isFinite(chest) || Number.isFinite(waist) || Number.isFinite(hip)
  if (!has) {
    body.innerHTML = `
      <div class="marcellus-regular">Measurements not found.</div>
      <div>Add your body measurements to get a precise size recommendation.</div>
    `
  } else {
    const size = recommendSizeFromChest(chest)
    const details = [
      Number.isFinite(chest) ? `Chest: ${chest} cm` : null,
      Number.isFinite(waist) ? `Waist: ${waist} cm` : null,
      Number.isFinite(hip) ? `Hip: ${hip} cm` : null,
      Number.isFinite(height) ? `Height: ${height} cm` : null,
    ].filter(Boolean).join(" • ")
    body.innerHTML = `
      <div class="marcellus-regular">Recommended size: <strong>${size || "—"}</strong></div>
      <div>${details}</div>
      <div class="marcellus-regular">Tip: Update your fit passport for higher confidence.</div>
    `
  }

  if (typeof dialog.showModal === "function") dialog.showModal()
}

function wireFitChecks() {
  const grid = document.getElementById("shop-grid")
  const onClick = (e) => {
    const btn = e.target?.closest?.("button[data-fit]")
    if (!btn) return
    const id = String(btn.getAttribute("data-fit") || "")
    const product = PRODUCTS.find((p) => p.id === id)
    if (!product) return
    openFitDialog(product)
  }
  if (grid) grid.addEventListener("click", onClick)
}

renderGrid()
wireFitChecks()

