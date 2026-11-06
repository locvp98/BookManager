# Dùng lại cho video tiếp theo

Skill nằm ở `.agents/skills/satellite-documentary/` trong repo. Giữ nguyên cả thư
mục để có hướng dẫn, mẫu và helper; để dùng ở repo khác, sao chép thư mục này vào
`.agents/skills/` của repo đó. Phiên Codex tiếp theo có thể khám phá skill từ repo.
Đây là skill cục bộ trong repo, không phải plugin toàn tài khoản đã được xuất bản.

Ví dụ yêu cầu:

```text
$satellite-documentary
Chủ đề: <chủ đề mới>
Kịch bản: <đường dẫn hoặc nội dung mới>
Audio: <nếu đã có>
SRT: <nếu đã có>
Làm video kiểu vệ tinh theo quy chuẩn skill. Cho tôi preview 40 giây trước.
```

Sau khi yêu cầu xuất full:

```text
$satellite-documentary
Xuất full 1080p 30fps, giữ hiệu ứng và độ nét như preview.
Tạo cảnh theo nội dung mới; số cảnh map độc lập với cảnh minh họa ngoài map.
Render có checkpoint, cập nhật tiến độ thực và bàn giao MP4 đã kiểm tra.
```

Chỉ cần thay chủ đề/kịch bản/audio/SRT. Skill yêu cầu tính lại timeline, scene,
prompt, tọa độ và dữ liệu theo nội dung mới. Các mốc/scene của phim Mỹ trước đây
không được đóng cứng vào skill.

- `SKILL.md`: quy trình dành cho agent.
- `references/production.md`: chất lượng map, phân cảnh, minh họa và chuyển động.
- `references/render-and-delivery.md`: checkpoint, kiểm tra, mạng và link bàn giao.
- `assets/`: mẫu brief và storyboard; phải thay placeholder cho mỗi phim.
- `scripts/render_resumable.py`: render từng đoạn, kiểm tra rồi lưu checkpoint;
  chạy lại cùng lệnh để tiếp tục.
- `scripts/video_check.py`: probe, decode toàn file, đếm khung, audio và SHA-256.
- `references/verification.md`: phạm vi smoke test và kết quả khôi phục checkpoint.

Helper render không tự viết kịch bản, tạo 100 ảnh hay upload. Agent thực hiện các
bước sáng tạo bằng công cụ đang được cấp và chỉ tải lên khi được yêu cầu. Những
phần thiếu công cụ/quyền phải được báo đúng, không thay bằng ảnh cũ hay link workspace.


Cập nhật 2026-11-06: chống lặp **thiết kế map**, kể cả các cảnh khác chương;
kiểm tra mọi cặp map bằng ảnh và chuyển động trước full. Bổ sung họ map vệ tinh
địa hình chân thực theo ảnh mẫu: texture thật, DEM, camera nghiêng và highlight
địa vật đúng tọa độ. Xem `references/map-diversity-review.md` và phần ảnh mẫu mới
trong `references/map-reference-study.md`. Quy tắc là yêu cầu cho các lần dựng
sau; cập nhật skill không tự sửa các cảnh đã xuất trong phim trước.
