# Hành trình Thống nhất Đất nước về mặt Nhà nước (1975–1976)

Trang web bảo tàng tương tác chuyên đề lịch sử, tái hiện sinh động quá trình hoàn thành thống nhất đất nước về mặt nhà nước của dân tộc Việt Nam sau Đại thắng mùa Xuân 1975.

🌐 **GitHub Repository:** [https://github.com/TchPhiTan/lich-su-dang-thong-nhat-1975-1976](https://github.com/TchPhiTan/lich-su-dang-thong-nhat-1975-1976)

---

## 📌 Nội dung chính (6 Mốc lịch sử)

1. **Chương 1 (5/1975):** Bối cảnh lịch sử sau Đại thắng mùa Xuân 1975 — Non sông liền một dải nhưng còn tồn tại hai hình thái nhà nước lâm thời.
2. **Chương 2 (9/1975):** Hội nghị Trung ương Đảng lần thứ 24 — Quyết sách lịch sử đề ra chủ trương và lộ trình hoàn thành thống nhất về mặt nhà nước.
3. **Chương 3 (11/1975):** Hội nghị Hiệp thương chính trị Bắc — Nam tại Sài Gòn — Sự nhất trí hoàn toàn của đại biểu hai miền.
4. **Chương 4 (25/4/1976):** Ngày Tổng tuyển cử toàn quốc — Hơn 23 triệu cử tri (98,77%) nô nức bỏ phiếu bầu Quốc hội chung (kèm bộ phóng sự tư liệu TTXVN).
5. **Chương 5 (24/6 – 3/7/1976):** Kỳ họp thứ nhất Quốc hội khóa VI — Quyết định tên nước **Cộng hòa Xã hội Chủ nghĩa Việt Nam**, phê chuẩn Quốc kỳ, Quốc huy, Quốc ca, Thủ đô Hà Nội và đổi tên Thành phố Sài Gòn — Gia Định thành **Thành phố Hồ Chí Minh**.
6. **Chương 6 (9/1977):** Nước Việt Nam thống nhất gia nhập Liên hợp quốc — Khẳng định vị thế và uy tín quốc tế của Tổ quốc.

---

## 🚀 Tính năng tương tác nổi bật

- **Giao diện Bảo tàng Di sản số:** Gam màu sơn mài cổ điển (`#8B0000`), hổ phách (`#D97706`) và giấy dó (`#FDFBF7`), kết hợp hiệu ứng glassmorphism.
- **Cuộn mượt GSAP ScrollTrigger:** Thanh tiến trình đọc, thanh điều hướng timeline cố định và định vị HUD toạ độ địa lý theo từng mốc lịch sử.
- **Bộ sưu tập ảnh tư liệu TTXVN:** 8 bức ảnh lịch sử về Ngày Tổng tuyển cử 25/4/1976 với lightbox xem chi tiết.
- **Khám phá Biểu tượng Quốc gia:** Xem Quốc huy, Quốc hiệu, Quốc kỳ, bản phổ gốc Quốc ca của nhạc sĩ Văn Cao, cùng ảnh tư liệu Thủ đô Hà Nội và TP. Hồ Chí Minh năm 1976.
- **Hồ sơ Tư liệu & 6 Tem Di sản Lịch sử:** Nhận huy hiệu và tem kỷ niệm khi hoàn thành từng chặng hành trình.
- **Góc trắc nghiệm lịch sử:** Hệ thống câu hỏi củng cố kiến thức và cấp Giấy chứng nhận hoàn thành.
- **Danh sách thành viên thực hiện:** Modal tra cứu thành viên nhóm và mã số sinh viên.

---

## 🛠️ Công nghệ sử dụng

- **HTML5 & CSS3** (Vanilla CSS tối ưu, tách file `style.css` riêng biệt)
- **JavaScript ES6+** (Tách file `main.js`, không phụ thuộc build tool)
- **TailwindCSS CDN**
- **GSAP 3 + ScrollTrigger**
- **Lucide Icons**

---

## 📦 Cấu trúc thư mục

```text
├── index.html          # Trang chủ ứng dụng web
├── style.css           # Toàn bộ mã nguồn định kiểu & animation
├── main.js             # Logic tương tác, GSAP timeline, modal, quiz
├── assets/
│   └── images/         # 22 ảnh tư liệu lịch sử chuẩn hoá
├── .gitignore
└── README.md
```

---

## 🌐 Hướng dẫn Host trên Vercel

1. Đăng nhập [Vercel](https://vercel.com).
2. Chọn **"Add New..."** ➔ **"Project"**.
3. Kết nối tài khoản GitHub và chọn repository `TchPhiTan/lich-su-dang-thong-nhat-1975-1976`.
4. Tại phần **Framework Preset**, chọn **"Other"** (hoặc để mặc định).
5. Nhấn **"Deploy"**. Trang web sẽ được triển khai tự động trong vòng vài giây.
