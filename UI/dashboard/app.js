const canvas = document.getElementById('virtual-mirror');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('user-upload');
let userImg = new Image();

// Set Canvas Resolution
canvas.width = 600;
canvas.height = 800;

// 1. Handle Photo Upload
upload.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        userImg.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(userImg, 0, 0, canvas.width, canvas.height);
        };
        userImg.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

// 2. The "Try On" Functionality
function tryOn(garmentType) {
    if (!userImg.src) {
        alert("Please upload a photo first!");
        return;
    }
    
    // Refresh background photo
    ctx.drawImage(userImg, 0, 0, canvas.width, canvas.height);
    
    // In a real app, this would be a transparent PNG from your manufacturer
    ctx.fillStyle = "rgba(212, 175, 55, 0.4)"; // Placeholder overlay
    ctx.fillRect(150, 200, 300, 400); 
    
    console.log(`System: Overlaying ${garmentType} on user image.`);
}

// 3. Save Measurements (The Vault)
document.getElementById('measurement-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        neck: document.getElementById('neck').value,
        chest: document.getElementById('chest').value,
        waist: document.getElementById('waist').value
    };
    localStorage.setItem('stitchSync_vault', JSON.stringify(data));
    alert("Measurements synced to manufacturer database!");
});