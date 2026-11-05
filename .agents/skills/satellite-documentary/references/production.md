# Quy chuẩn biên tập và hình ảnh

## Kịch bản → luận điểm → cảnh

Đọc lời thoại ở ngôn ngữ gốc, tóm ý bằng ngôn ngữ làm việc nếu cần; giữ số cue và
timestamp để truy ngược. Phân biệt điều lời thoại khẳng định, minh họa định tính
và số liệu cần nguồn. Nếu kịch bản nói quá (ví dụ "không ai sống" ở vùng vẫn có
cộng đồng), ghi nhận vấn đề, dùng hình mô tả chính xác; không bịa số liệu để hợp thức hóa.

Story beat thường kéo dài 5–15 giây; dùng khoảng này làm gợi ý chứ không quy định.
Đoạn giải thích phức tạp có thể 15–25 giây khi đồ họa liên tục bổ sung thông tin;
đoạn chuyển ý có thể ngắn hơn. Không cắt dồn dập cho đủ số cảnh. Không để nhiều
chục giây chỉ có một ảnh đứng yên hoặc một map được pan lặp lại.

Điểm xuất phát cho số cảnh minh họa mới: ceil(100 × số phút / 23), tối thiểu một
khi có nội dung ngoài map; phim khoảng 23 phút giữ tối thiểu 100. Điều chỉnh theo
luận điểm, mật độ lời thoại và yêu cầu hiện tại. Số cảnh map theo nhu cầu địa lý,
đếm độc lập. Orbit có giải thích vị trí tính vào nhóm địa lý, không tính ảnh minh họa.

## Cảnh map phải giải thích một điều cụ thể

Mỗi scene cần có `claim`, `newVisualInformation`, `comparisonBasis`, `dataSource`,
`camera`, `motion`, `srtCueIds`. Bỏ những trường không áp dụng, không điền giả.
Áp dụng [phân tích ảnh mẫu của người dùng](map-reference-study.md) cho góc máy,
so sánh vùng, highlight và note. Chú thích map được phép theo yêu cầu hiện tại;
không đồng nghĩa với bật phụ đề lời thoại toàn phim.

| Ý lời thoại | Thiết kế thị giác có ý nghĩa |
| --- | --- |
| Vị trí, phạm vi | Định vị từ vùng lớn → đường biên/diện tích hiện dần → giữ mốc |
| Khác biệt hai vùng | Camera/cùng tỉ lệ, mật độ hạt hoặc trường dữ liệu tương ứng |
| Khoảng cách | Đường vẽ theo thời gian + dấu khoảng cách thị giác, đúng hệ tọa độ |
| Luồng di chuyển | Route theo địa lý + hạt/dấu chuyển động có hướng và thời điểm |
| Biến động theo thời gian | Hai trạng thái/before-after, morph hoặc wipe có giải thích |
| Khí hậu/địa hình | Luồng gió/ẩm + địa hình + mặt cắt; không chỉ dùng đèn thành phố |
| Tài nguyên dưới đất | Map định vị → chuyển vào mặt cắt minh họa → trở lại map có thay đổi |

Nhịp trong cảnh: định vị → reveal lớp giải thích → bổ sung/so sánh → kết luận thị
giác → chuyển ý. Tránh overlay xuất hiện ngay tất cả rồi đứng yên. Scan, glow,
pulse và particle là phần phụ trợ, không được thay việc giải thích.

### Nhiều kiểu map, không chỉ nhiều hiệu ứng

Yêu cầu của người dùng: phải vẽ và dựng nhiều kiểu map khác nhau. Một ảnh map
ban đầu được thêm glow, scan, pulse, đổi màu, đường vẽ hoặc zoom chưa đủ để gọi
là một thiết kế cảnh mới. Không dùng cùng template nền và bố cục cho toàn bộ
phim rồi chỉ thay overlay. Tile, dữ liệu địa lý và các lớp dùng chung được tái
sử dụng để bảo đảm tính chính xác; thiết kế cảnh vẫn phải phục vụ luận điểm riêng.

Chọn cách thể hiện theo điều cần giải thích, chẳng hạn:

- Vệ tinh ngày/đêm hoặc globe → vị trí, quy mô và mạng lưới đô thị.
- Địa hình có chiều cao, hillshade hoặc góc nghiêng 3D → núi, lưu vực, rào cản.
- Map vector tối giản → đường biên, vùng ảnh hưởng và quan hệ không gian rõ ràng.
- Map mật độ, chấm phân bố hoặc phân vùng dữ liệu → dân số, mưa, đất nông nghiệp;
  chỉ dùng thang đo định lượng khi có dữ liệu hỗ trợ.
- Hai vùng đặt cạnh nhau cùng tỉ lệ, small multiples hoặc hai mốc thời gian →
  so sánh trực tiếp với cùng thước đo, không chỉ đổi màu hai nửa một ảnh nền.
- Map luồng, mạng lưới hoặc tuyến đường → hướng di chuyển, kết nối, phân nhánh.
- Map kết hợp mặt cắt địa hình/địa chất → cơ chế gió, nước và tài nguyên bên dưới.

Danh sách này là lựa chọn theo kịch bản, không phải số kiểu bắt buộc hay thứ tự
luân phiên máy móc. Mỗi cảnh có `mapDesign` ghi kiểu thể hiện, phép chiếu/góc nhìn,
phạm vi, bố cục, lớp dữ liệu, diễn biến và điểm khác biệt với cảnh map trước.
Không tạo trường dữ liệu giả để trang trí. Nếu quay lại cùng vùng hoặc cần giữ
thiết kế liên tục, ghi lý do trong storyboard và phát triển giải thích thật sự.

Trước khi render dài, xem contact sheet toàn bộ cảnh map và các đoạn chuyển động
đại diện. Nếu bỏ hiệu ứng trang trí đi mà các cảnh vẫn chỉ là cùng ảnh, cùng bố
cục và cùng cách giải thích lặp lại, phải thiết kế lại. Đồng thời kiểm tra lớp
giải thích xuất hiện đúng nhịp lời thoại; ảnh chụp tĩnh không đủ chứng minh animation.

### Nghiên cứu ví dụ người dùng cung cấp

Khi người dùng gửi video, link hoặc hình mẫu, xem tài liệu thật trước khi tuyên bố
đã học. Ghi nguồn, timecode/phạm vi đã xem và phần không truy cập được. Với video,
xem diễn biến trước–trong–sau hiệu ứng, không suy chuyển động từ thumbnail.
Phân tích kiểu map, bố cục, dữ liệu, camera, cách vẽ/reveal, so sánh, chuyển cảnh,
độ nét và nhịp dựng. Rút ra nguyên tắc có thể tái sử dụng, rồi cập nhật skill bằng
các chỉ dẫn cụ thể phù hợp với kịch bản mới. Không sao chép tài sản của mẫu khi
chưa có quyền sử dụng. Nếu mẫu chưa được gửi, ghi nhận đang chờ mẫu; không bịa
đặc điểm của mẫu hoặc coi việc nghiên cứu đã hoàn tất.

Kiểm tra các địa danh, khoảng cách và quỹ đạo chiếu lên map. Dùng phép chiếu thích
hợp; không đặt điểm bằng phần trăm ảnh ước lượng nếu đó là thông tin địa lý.
Khi so sánh mật độ/diện tích phải giữ thang đo nhất quán hoặc ghi rõ đây là sơ đồ
trong báo cáo sản xuất. Dữ liệu định tính không giả làm phép đo chính xác.

## Độ nét

- Tính số pixel nguồn trong crop nhỏ nhất tại mức zoom lớn nhất. Crop phải cung
  cấp ít nhất số pixel xuất tương ứng; ưu tiên thêm headroom khoảng 1,5–2×.
- Dùng tile mức zoom phù hợp hoặc render vector ở độ phân giải xuất. Không kéo
  ảnh map nhỏ thành 1080p và thêm sharpen để gọi là độ nét cao.
- Đường biên/route sắc nét bằng SVG/vector, stroke vừa đủ ở 1080p; tránh blur lên
  nền chính. Glow dùng lớp phụ, giữ đường lõi sắc. Cache tile/GeoJSON để render ổn định.
- Không thêm phụ đề lời thoại, chữ vào ảnh minh họa hoặc bốn dấu góc theo mặc định.
  Map được có nhãn địa danh, callout và số liệu ngắn theo yêu cầu người dùng.
  Dựng chữ thành lớp vector/text riêng, đủ tương phản và đọc được trên điện thoại;
  tránh đè địa lý quan trọng, tránh xoay/nghiêng chữ đến mức khó đọc.
  Nội dung chữ bắt buộc theo giấy phép map phải được xử lý hợp pháp: chọn nguồn
  cho phép credit bên ngoài hoặc thỏa thuận cách attribution với người dùng.

## Ảnh và video ngoài map

Mỗi cảnh có ý định riêng: không gian, chủ thể, hành động/cơ chế, góc máy, ánh sáng,
tỉ lệ, diễn biến, thời kỳ và những chi tiết không được có. Duy trì art direction
giữa cảnh nhưng không lặp chủ thể/bố cục để kéo dài phim.

Ảnh tạo mới cần prompt "no text, no labels, no watermark, no corner frame" nếu
phù hợp. Kiểm tra ảnh thật sau tạo: tay/máy móc, công trình, biển chữ, logo, tỷ lệ,
địa lý và tính đúng thời kỳ. Nếu không đạt thì tạo/chỉnh lại, không đánh dấu done.
Không cắt một contact sheet thành nhiều cảnh rồi gọi là các ảnh tạo độc lập.

Chuyển động ngoài map phải nhẹ và mượt theo yêu cầu người dùng. Dùng pan/dolly
chậm có tâm chú ý rõ, parallax nhẹ nếu có đủ lớp, ánh sáng hoặc đồ họa cơ chế
chuyển động êm. Với ảnh tĩnh, mức zoom tổng khoảng 1–4% trong một shot là điểm
khởi đầu để xem thử, không phải mức bắt buộc. Điều chỉnh theo thời lượng, crop
và nội dung; không ép mọi ảnh zoom cùng một công thức. Footage đã có chuyển động
phù hợp có thể giữ nguyên camera.

Không shake/jitter, glitch, flash, strobe, snap zoom, spring nảy/overshoot hoặc
đảo hướng đột ngột. Không luân phiên zoom-in/zoom-out máy móc giữa các ảnh,
không reset biến đổi theo từng cue SRT. Tính chuyển động từ frame tuyệt đối hoặc
frame cục bộ liên tục của shot; giữ tốc độ thấp, tăng/giảm tốc mềm và không giật
do làm tròn vị trí từng frame.

Chuyển cảnh chọn cut sạch khi đổi ý hoặc dissolve ngắn, nhẹ khi cần nối cảm xúc;
không mặc định fade từng ảnh ra đen rồi lại fade vào gây nhấp nháy. Kiểm tra
vùng overlap để không lộ nền trống hoặc nhảy crop. Không stretch ảnh, không bịa
chuyển động 3D từ ảnh nếu tạo artifact. Footage chọn đoạn đúng lời thoại, không
loop ngắn lộ rõ. Ghi nguồn/giấy phép và thời lượng clip đã dùng.

Trước render dài, xem clip đúng fps đầu ra gồm nhiều cảnh ngoài map liên tiếp,
cả các điểm nối. Kiểm tra độ mượt camera, nhịp zoom, parallax và dissolve; ảnh
contact sheet không đủ phát hiện giật. Nếu hiệu ứng gây khó chịu, giảm hoặc bỏ
hiệu ứng đó và giữ hình ổn định, không thay bằng một hiệu ứng mạnh khác.

## Kiểm tra trước khi render dài

1. Timeline: toàn audio được phủ bằng cảnh phù hợp, không mất/chồng cue do làm tròn.
2. Asset: đường dẫn tồn tại, ảnh đọc được, đủ độ phân giải, không trùng hash ngoài
   những asset nền/lớp dùng chung được chủ đích cho phép.
3. Story: từng cảnh gắn đúng câu, không tự dùng lại bộ cảnh chủ đề cũ.
4. Map: dữ liệu đúng, mỗi lần trở lại có thêm thông tin; xem ít nhất đầu/giữa/cuối cảnh.
5. Full/preview: giữ hiệu ứng, màu, chuyển cảnh và độ nét đã duyệt; preview nhẹ
   không được dùng làm nguồn low-resolution cho full.
6. Contact sheets: bản nhẹ xem được, timecode và mô tả ở báo cáo, không đốt vào phim.

Không tuyên bố đã "tạo 100 cảnh" chỉ từ 100 dòng manifest. Báo riêng số dự kiến,
đã có tài sản, đã dựng, đã render và đã kiểm tra.
