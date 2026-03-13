const toggleBtn = document.getElementById("theme-toggle")

// Load saved theme
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

// Check if user is already logged in
function checkAccess(targetUrl) {
    const isLoggedIn = localStorage.getItem('stitchSync_token');
    
    if (isLoggedIn) {
        window.location.href = targetUrl;
    } else {
        showLogin();
    }
}

function showLogin() {
    document.getElementById('login-modal').style.display = 'flex';
}

function closeLogin() {
    document.getElementById('login-modal').style.display = 'none';
}

function handleLogin() {
    const email = document.getElementById('email').value;
    // Simple prototype logic: any email works
    if (email.includes('@')) {
        localStorage.setItem('stitchSync_token', 'session_active_123');
        localStorage.setItem('stitchSync_user', email);
        alert("Login Successful. Entering the Mirror...");
        window.location.href = 'mirror.html'; // Redirect to your previous tool
    } else {
        alert("Please enter a valid email.");
    }
}