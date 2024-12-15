registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  try {
    // Lấy nội dung hiện tại của Gist
    const getResponse = await fetch(`${GIST_API_URL}/${GIST_ID}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    const gistData = await getResponse.json();
    const users = JSON.parse(gistData.files["users.json"].content || "{}");

    // Kiểm tra nếu email đã tồn tại
    if (users[email]) {
      message.textContent = "Email đã được sử dụng!";
      return;
    }

    // Thêm người dùng mới
    users[email] = { username, password };

    // Ghi lại dữ liệu mới vào Gist
    const updateResponse = await fetch(`${GIST_API_URL}/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        files: {
          "users.json": {
            content: JSON.stringify(users, null, 2),
          },
        },
      }),
    });

    if (updateResponse.ok) {
      message.textContent = "Đăng ký thành công!";
    } else {
      message.textContent = "Đăng ký thất bại!";
    }
  } catch (error) {
    console.error(error);
    message.textContent = "Có lỗi xảy ra trong quá trình đăng ký.";
  }
});
