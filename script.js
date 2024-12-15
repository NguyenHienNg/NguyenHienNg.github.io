// Xử lý đăng ký
if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("registerName").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;

        // Lưu thông tin người dùng vào LocalStorage
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);

        alert("Đăng ký thành công! Hãy đăng nhập.");
        window.location.href = "index.html";
    });
}

// Xử lý đăng nhập
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        // Lấy thông tin từ LocalStorage
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
            alert("Đăng nhập thành công!");
            window.location.href = "welcome.html";
        } else {
            alert("Email hoặc mật khẩu không đúng!");
        }
    });
}
