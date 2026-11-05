# Render, khôi phục và bàn giao

## Trước render

Helper yêu cầu Linux/macOS hoặc WSL, Python 3.9+, Node/npm, Remotion đã cài trong
project, ffmpeg, ffprobe và Chromium/browser tương thích. Khóa checkpoint dùng
`fcntl` của POSIX; không giả định chạy trực tiếp bằng Python Windows được.

Đọc hướng dẫn Remotion hiện có. Xác minh CLI flags bằng phiên bản đã cài; ưu tiên
`npx --no-install remotion`. Kiểm tra composition, frame count, fps, kích thước,
audio/SRT, props, font, cache map, browser, encoder và dung lượng ổ đĩa.

Nguồn phải đóng băng trong lượt render. Không cập nhật source, props, asset hoặc
dependency giữa các chunk. Helper hash `src`, `public`, entry, audio, props,
Remotion config và package/lockfile. Dùng `--fingerprint-path` nếu nguồn ở nơi
khác. Cache mọi URL bên ngoài trước; một URL không bảo đảm nội dung giữ nguyên.

Helper mặc định 30 giây/chunk, 1080p30, H.264 yuv420p CRF 18 preset medium,
concurrency 2. Render một đoạn ngắn có đại diện map nặng và một điểm chuyển cảnh
trước khi chạy hết. Chỉ điều chỉnh concurrency/browser/GPU/preset sau khi đo máy.
Không tự giảm chất lượng để cố làm xong. Không dùng ultrafast và medium lẫn lộn
trong một lượt để chữa lỗi; cấu hình thay đổi phải được xử lý như lượt mới.

## Lệnh và checkpoint

```bash
python3 <skill-root>/scripts/render_resumable.py \
  --project /workspace/<repo>/<video> \
  --entry src/index.ts --composition <CompositionID> \
  --frames <FRAME_COUNT> --fps 30 \
  --audio public/<project-id>/narration.mp3 \
  --output out/<project-id>-1080p30.mp4 \
  --browser /usr/bin/chromium --gl swangle
```

`--frames` là tổng frame composition, không phải giá trị ví dụ của một phim cũ.
Helper dùng [start,end) trong plan và đổi sang `--frames=start-(end-1)` khi gọi
Remotion. Mỗi đoạn giữ frame tuyệt đối, render video-only. Ghép video bằng stream
copy khi thông số nhất quán rồi mux audio gốc một lần. Không dùng `-shortest` để
che thiếu frame, không cắt audio cho khớp video sai.

Helper nhận **một audio master**. Nếu được yêu cầu nhạc/SFX bên cạnh narration,
chuẩn bị master mix đủ thời lượng trước rồi truyền nó qua `--audio`. Không dùng
`--muted` và chỉ mux narration để vô tình bỏ nhạc/SFX đã được duyệt. Nếu chưa có
master mix thì xử lý phần âm thanh trước, không tuyên bố full đã giữ toàn bộ audio.

Mỗi đoạn: `.partial.mp4` → probe + decode đủ frame → đổi tên chính thức → lưu
hash/metadata trong `.ok.json`. Không tin một tệp lớn, log "Rendered" hoặc con số
38% khi container chưa có moov và chưa được kiểm tra.

Chạy lại cùng lệnh tự bỏ qua chunk có fingerprint/hash hợp lệ, chỉ chạy lại chunk
lỗi hoặc chưa xong. Cache nằm trong `out/render-cache/<fingerprint>/`. Không xóa
toàn cache vì một lỗi. Log từng chunk nằm cạnh chunk và được ghi trực tiếp ra
file, tránh `write EPIPE` do pipe terminal đóng.

Khi terminal hoặc môi trường mất kết nối: kiểm tra PID và log có thay đổi rồi mới
quyết định chạy lại; không tạo hai tiến trình ghi vào cùng output/cache. Helper có
khóa ngăn hai lượt đồng thời cùng cache trên máy POSIX. Việc tái chạy an toàn dựa
vào checkpoint đã xác nhận, không phụ thuộc tiến trình cũ còn sống.

Nếu gặp lỗi kiểu MP4 thiếu moov/EPIPE ở một render monolithic cũ, giữ bản raw
trước khi thử sửa, làm trên bản sao. Không áp dụng mẹo SPS/PPS hoặc Annex-B của
phim cũ cho phim mới. Chỉ coi là cứu được sau khi decode và đếm đủ frame liên tục.
Nếu chưa chứng minh được, báo đúng giới hạn, không nói đã cứu thành công.

## Kiểm tra final

```bash
python3 <skill-root>/scripts/video_check.py out/<film>.mp4 \
  --frames <FRAME_COUNT> --fps 30 --width 1920 --height 1080 \
  --audio --sha256 --report out/<film>-validation.json
```

Check gồm H.264 8-bit 4:2:0 (yuv420p hoặc yuvj420p nếu Remotion xuất full-range), dimensions/fps, thời lượng, audio, decode toàn bộ,
số frame giải mã, mã thoát và SHA-256 nếu được yêu cầu. Kiểm tra thêm bằng mắt
các ranh giới chunk và cảnh, xem full frame ở chỗ map zoom, nghe điểm nối audio.
ffmpeg decode thành công chỉ xác nhận tính phát được, không chứng minh cảnh bám
đúng lời thoại hay hình đẹp. Báo cáo hai việc riêng.

Đối chiếu profile, pixel format, fps và timebase trước stream-copy. Nếu phải ghép
đoạn cứu từ render khác, chuẩn hóa đoạn lệch rồi kiểm tra lại. Thử decode cuối
toàn phim. Nên có faststart, đủ audio, không mất frame cuối, không có đoạn đen do
tài sản chưa load. Không tuyên bố có phụ đề/chữ bị loại nếu chưa kiểm tra hình.

## Tiến độ thật

- Tiền kỳ: cue đã đọc, scene đã lập, tài sản mới đã tạo/đạt, scene map đã dựng/đạt.
- Render: verified frames / total frames, tương ứng mm:ss / tổng video. Chunk
  đang chạy có thể có tiến độ riêng theo log Remotion, không tính thành verified.
- Mux/QA: báo riêng sau khi render đủ; render 100% chưa có nghĩa file cuối đã đạt.
- Upload: byte/total và phản hồi dịch vụ. Không gọi lệnh lỗi/kết thúc là thành công.
- Nếu log đứng, kiểm tra timestamp/PID/CPU; báo đang kiểm tra thay vì tăng % giả.

## Mạng, sandbox và thông tin xác thực

Nếu chạy trong managed Cloud, dùng skill cloud runtime và kiểm tra policy hiện
hành. Giữ proxy và TLS. Lỗi `Failed to connect to proxy` chưa chứng minh proxy
Cloud chết: sandbox có thể chặn socket (ví dụ Python báo EPERM).

Nếu môi trường cho phép, thử lại **cùng lệnh qua đúng proxy** bằng cơ chế cấp quyền
mạng/`require_escalated` được hỗ trợ. Đây không phải bỏ proxy. Không đoán rằng
GH_TOKEN hỏng từ `gh auth status` khi request còn bị sandbox chặn; thử đúng quyền
rồi đọc lỗi thật. Chỉ báo token không hợp lệ khi có phản hồi xác thực đủ bằng chứng.
Nếu auto-review từ chối, không lách; nêu đúng hành động và lý do bị từ chối.

Không đổi route, tắt proxy, lấy secret ra stdout, gửi token vào chat hoặc đổi Git
host để né policy. Nếu environment starting, chờ đúng ID; unavailable thì báo
không truy cập được, không tuyên bố file đã mất hoặc đã được phục hồi.

## Bàn giao thật

Ưu tiên một MP4 qua Drive, release/hosting hoặc kênh người dùng đã cấp. Tìm công
cụ hiện có thực sự hỗ trợ upload; gắn tag plugin không đảm bảo công cụ đã được cấp,
một connector chỉ đọc không đủ để tải lên. Không hướng dẫn nút UI chưa nhìn thấy.

Giới hạn dịch vụ/plan có thể đổi: kiểm tra tại thời điểm upload. Nếu phải chia ZIP
vì giới hạn 2 GB/tệp, dùng split ZIP không nén lại MP4, giữ tên `.z01`/`.zip`. Sau
tạo, ghép kiểm tra bằng `zip -s 0 split.zip --out combined.zip`, dùng `unzip -t`
và SHA-256 nội dung giải nén so với MP4 nguồn. `unzip` bản cũ thường không đọc
trực tiếp split ZIP; đừng gọi lỗi đó là bằng chứng archive hỏng.

GitHub + LFS: xác minh `.gitattributes`, LFS object còn cục bộ, mỗi phần dưới giới
hạn plan, dung lượng/quota và quyền ghi. Stage đúng các file bàn giao. Fetch trước
push; nếu remote có thay đổi, dùng worktree riêng trên remote tip và chỉ mang
phần bàn giao sang. Không force push hay ghi đè xóa file có chủ đích của người dùng.
Không bao gồm thay đổi source ngoài phạm vi chỉ vì muốn push một file video.

Sau push/upload xác minh revision/asset và URL tải thật. Với Git LFS, HEAD/range
request phải trả nội dung có dung lượng tương ứng, không phải pointer khoảng
130 byte. Link `media.githubusercontent.com/media/<owner>/<repo>/<commit>/<path>`
cần đúng commit và quyền truy cập. Kiểm tra HTTP status, content type, size; không
in signed credentials. Nếu link cần login, nói rõ điều kiện truy cập.

Không gọi `/workspace/...` là link tải ra thiết bị: nó có thể chỉ mở file viewer.
Chỉ nói hoàn tất bàn giao sau khi có link tải được kiểm tra. Với archive: đưa đủ
link mọi phần và hướng dẫn đặt cùng thư mục, mở `.zip` bằng ZArchiver/7-Zip để
ra **một MP4 đầy đủ**. Nhắc dung lượng trống cần cho archive + MP4 nếu có ích.
