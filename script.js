// Hiển thị form Đăng nhập
function showLogin() {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("welcome").style.display = "none";
}

// Hiển thị form Đăng ký
function showRegister() {
    document.getElementById("register-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("welcome").style.display = "none";
}

// Hàm Đăng ký
function register() {
    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    if (!username || !email || !password) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // Lưu thông tin vào localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    showLogin();
}

// Hàm Đăng nhập
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Lấy thông tin từ localStorage
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (email === storedEmail && password === storedPassword) {
        const username = localStorage.getItem("username");
        document.getElementById("welcome-message").innerText = `Chào mừng, ${username}!`;
        document.getElementById("register-form").style.display = "none";
        document.getElementById("login-form").style.display = "none";
        document.getElementById("welcome").style.display = "block";
    } else {
        alert("Thông tin đăng nhập không chính xác!");
    }
}

// Hàm Đăng xuất
function logout() {
    document.getElementById("welcome").style.display = "none";
    showLogin();
}
