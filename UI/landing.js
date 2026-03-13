const toggleBtn = document.getElementById("theme-toggle")

if(localStorage.getItem("theme") === "dark"){
document.body.classList.add("dark-mode")
toggleBtn.textContent = "☀️"
}

toggleBtn.addEventListener("click", ()=>{

document.body.classList.toggle("dark-mode")

if(document.body.classList.contains("dark-mode")){
localStorage.setItem("theme","dark")
toggleBtn.textContent="☀️"
}else{
localStorage.setItem("theme","light")
toggleBtn.textContent="🌙"
}

})

const getStartedBtn = document.getElementById("get-started")
const roleDialog = document.getElementById("role-dialog")

if (getStartedBtn && roleDialog) {
    getStartedBtn.addEventListener("click", () => {
        if (typeof roleDialog.showModal === "function") {
            roleDialog.showModal()
            return
        }
        window.location.href = "signup.html"
    })
}
