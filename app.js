const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const message = document.getElementById("message");

// URL Gist hoặc API GitHub để lưu dữ liệu người dùng
const GIST_API_URL = "https://api.github.com/gists";
const GIST_ID = "d68bc5f344e22800e0e4f0b946e57bc5"; // Gist ID của bạn
const GITHUB_TOKEN = "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"; // Token cá nhân của bạn

// Lưu người dùng mới
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  if (!username || !email || !password) {
    message.textContent = "Vui lòng điền đầy đủ thông tin.";
    return;
  }

  try {
    // Lấy dữ liệu hiện tại từ Gist
    const response = await fetch(`${GIST_API_URL}/${GIST_ID}`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    });

    if (!response.ok) {
      throw new Error("Không thể lấy dữ liệu từ Gist");
    }

    const data = await response.json();
    const users = JSON.parse(data.files["users.json"].content || "{}");

    // Kiểm tra xem email đã tồn tại chưa
    if (users[email]) {
      message.textContent = "Email đã được sử dụng. Vui lòng chọn email khác.";
      return;
    }

    // Thêm người dùng mới
    users[email] = { username, password };

    // Gửi yêu cầu cập nhật Gist
    const updateResponse = await fetch(`${GIST_API_URL}/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        files: {
          "users.json": {
            content: JSON.stringify(users, null, 2), // Lưu dữ liệu người dùng mới
          },
        },
      }),
    });

    if (updateResponse.ok) {
      message.textContent = "Đăng ký thành công!";
    } else {
      throw new Error("Không thể cập nhật Gist");
    }
  } catch (error) {
    console.error(error);
    message.textContent = "Đăng ký thất bại. Kiểm tra lại mã hoặc kết nối mạng.";
  }
});

// Đăng nhập
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch(`${GIST_API_URL}/${GIST_ID}`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    });

    if (!response.ok) {
      throw new Error("Không thể lấy dữ liệu từ Gist");
    }

    const data = await response.json();
    const users = JSON.parse(data.files["users.json"].content || "{}");

    if (users[email] && users[email].password === password) {
      window.location.href = "welcome.html";
    } else {
      message.textContent = "Email hoặc mật khẩu không đúng!";
    }
  } catch (error) {
    console.error(error);
    message.textContent = "Đăng nhập thất bại. Kiểm tra lại mã hoặc kết nối mạng.";
  }
});
