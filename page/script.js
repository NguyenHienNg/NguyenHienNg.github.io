// Mã key hợp lệ
const validKey = "12345"; // Thay "12345" bằng mã key bạn muốn

document.getElementById("submitKey").addEventListener("click", function () {
    const userKey = document.getElementById("keyInput").value;

    if (userKey === validKey) {
        // Chuyển sang trang chào mừng
        window.location.href = "welcome.html";
    } else {
        // Hiển thị thông báo lỗi
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.textContent = "Mã key không hợp lệ. Vui lòng thử lại!";
    }
});