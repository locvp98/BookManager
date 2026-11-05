# Kiểm tra helper khi tạo skill

Đã thực hiện bằng Remotion 4.0.540 và Chromium trong môi trường Cloud hiện tại,
với composition tổng 12 frame, 128×72, 30 fps, chia hai đoạn 6 frame. Audio master
là WAV 0,4 giây. Đây là smoke test thực có render browser và ffmpeg, không phải
mô phỏng log hoặc ghi sẵn một kết quả thành công.

Kết quả:

- Render hai frame range tuyệt đối [0,6), [6,12), probe và decode từng đoạn đạt.
- Ghép ra một MP4 đủ 12 frame và một audio stream; decode toàn file đạt.
- Xóa final rồi chạy lại: cả hai checkpoint được dùng lại, mtime các chunk giữ nguyên.
- Cố tình làm hỏng chunk thứ hai và xóa final: chunk đầu giữ nguyên, chỉ chunk hai
  được render lại; final sau phục hồi có cùng SHA-256 với final đầu tiên.
- Thay source: fingerprint đổi; helper từ chối dùng final cũ cho nguồn mới khi
  chưa chọn tên output khác hoặc `--overwrite`.
- Yêu cầu đếm sai 11 frame: validator trả lỗi.
- Cú pháp Python, JSON mẫu và liên kết Markdown tương đối đều hợp lệ.

Remotion ở bản được thử có thể báo yuvj420p dù yêu cầu yuv420p do full-range color.
Validator chấp nhận cả hai dạng H.264 8-bit 4:2:0 và yêu cầu pixel format nhất
quán giữa các chunk khi stream-copy.

Smoke test không chứng minh chất lượng cảnh/map cho một phim mới, độ bền của mọi
phiên bản Remotion/browser hay khả năng upload của tài khoản khác. Mỗi dự án vẫn
cần kiểm tra một đoạn đại diện ở độ phân giải thật và kiểm tra nội dung theo SRT.
