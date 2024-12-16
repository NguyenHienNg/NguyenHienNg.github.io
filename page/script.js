// Mã key đúng
const correctKey = "12345";

// DOM Elements
const keyInput = document.getElementById("key-input");
const submitButton = document.getElementById("submit-key");
const errorMessage = document.getElementById("error-message");
const keySection = document.getElementById("key-section");
const welcomeSection = document.getElementById("welcome-section");

// Xử lý sự kiện khi nhấn nút
submitButton.addEventListener("click", () => {
  const userKey = keyInput.value.trim();

  if (userKey === correctKey) {
    // Ẩn phần nhập key và hiển thị trang chào mừng
    keySection.style.display = "none";
    welcomeSection.style.display = "block";
  } else {
    // Hiển thị lỗi nếu mã key sai
    errorMessage.textContent = "Mã key không đúng. Vui lòng thử lại!";
  }
});
