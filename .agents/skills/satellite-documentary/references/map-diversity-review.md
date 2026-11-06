# Cổng kiểm tra chống lặp map

## Khi nào bị coi là lặp

Khác tệp, ID, hash hay câu thoại không đủ chứng minh khác cảnh. Coi là trùng thiết
kế khi hình đọc lên vẫn cùng bố cục, phạm vi, góc/cỡ cảnh và cách giải thích, dù
đã đổi màu, nhãn, marker, pulse, glow, hạt, đường vẽ hoặc zoom nhẹ. Cảnh cách nhau
nhiều phút vẫn phải đối chiếu. Không tái dùng clip đã xuất, loop hoặc đảo chiều
chuyển động để lấp thời lượng. Mỗi lần hiện map phải giúp hiểu một điều mới.

Tái dùng tile, DEM và GeoJSON là hợp lý để giữ địa lý đúng; tái dùng dữ liệu không
phải tái dùng cảnh. Cùng vùng có thể xuất hiện nhiều lần khi câu hỏi mới đòi hỏi
bố cục và diễn biến giải thích mới. Giữ ngôn ngữ màu/nhãn nhất quán không phải lỗi.

## Thiết kế trước render

Mỗi `mapDesign` ghi: họ map; phạm vi/cỡ cảnh; phép chiếu; góc camera đầu/cuối;
bố cục; lớp dữ liệu; cơ chế animation; note; thông tin mới; các cảnh gần giống và
khác biệt cụ thể. Không chỉ ghi “khác cảnh trước”.

Với một cảnh trở lại vùng đã có, yêu cầu cả hai:

1. Luận điểm hoặc bằng chứng mới khớp các cue hiện tại.
2. Thay đổi có ý nghĩa ở ít nhất hai trục thiết kế: phạm vi/cỡ cảnh, hình học/
   góc nhìn, bố cục so sánh, lớp dữ liệu có nội dung, hoặc cơ chế giải thích.

Đổi màu/chữ/nhịp glow hay dịch camera rất ít không tính là trục mới. Đạt hai
trục vẫn phải xem hình thật; không biến quy tắc này thành cách hợp thức hóa lặp.
Một diễn biến liên tục cần giữ cùng camera nên nằm trong một shot nhiều beat,
không chia thành nhiều scene để làm tăng số lượng. Đoạn tổng kết phải tổng hợp/
đối chiếu bằng bố cục mới, không phát lại map trước.

## Duyệt toàn bộ, không chỉ kiểm tra hash

1. Trước render full, xuất ảnh tại khoảng 10%, 50%, 90% của **mọi** cảnh map,
   và frame ở mức zoom/địa hình cao nhất. Lập contact sheet nhẹ, ID/timecode ở
   báo cáo bên ngoài video. Ảnh duyệt phải từ source mới nhất; sửa scene xong
   phải cập nhật ảnh, không dùng contact sheet cũ để tuyên bố đã đạt.
2. Xem cả theo timeline lẫn gom nhóm cùng vùng/họ map/bố cục. Đối chiếu mọi cặp
   để phát hiện lặp cách xa nhau. Chỉ đánh dấu cặp đã xem thực sự; có thể dùng
   perceptual similarity để gợi ý, không lấy ngưỡng tự động làm kết luận.
3. Ghi `map-diversity-review.json`: ID/source fingerprint; các cặp đã đối chiếu;
   cặp nghi lặp; lý do; quyết định sửa; trạng thái kiểm lại; vị trí ảnh/clip làm
   bằng chứng. Tổng số cặp là n×(n−1)/2, không ghi hoàn tất khi chưa xem hết.
4. Xem clip đúng fps của mọi cảnh map và điểm nối để kiểm tra animation, nhịp,
   độ mượt, geo anchoring, occlusion, label collision và độ nét. Ảnh tĩnh không
   chứng minh camera/animation khác nhau hoặc mượt.
5. Cảnh nghi lặp ở trạng thái `needs-redesign`, chưa được tính đạt. Thiết kế lại
   bằng dữ liệu/góc/cơ chế phù hợp lời thoại, xuất lại proof rồi duyệt lại các
   cặp liên quan. Không chữa bằng thêm note hoặc hiệu ứng trang trí.
6. Chỉ bắt đầu full khi mọi map đã duyệt, mọi cặp đã đối chiếu, không còn mục
   chưa giải quyết. Sau ghép full, kiểm lại bản xuất tại các scene/timecode này;
   hash/đủ frame/giải mã đạt không chứng minh thiết kế không lặp.

Báo thật số đã duyệt/chưa duyệt, cảnh bị đánh dấu và cảnh đã sửa. Nếu công cụ
không cho xem clip hoặc thiếu dữ liệu thì giữ trạng thái pending và báo phần
thiếu; không tự đánh dấu đạt. Không yêu cầu người dùng duyệt thay công việc QA.
