# Thiết kế map từ sáu ảnh mẫu người dùng

## Phạm vi quan sát

Nguồn: sáu ảnh Hokkaido người dùng đính kèm trong hội thoại ngày 2026-11-05,
theo thứ tự gửi. Đây là ảnh tĩnh, không có video/timecode. Phân tích được bố cục,
cỡ cảnh và các lớp đồ họa; các chuyển động bên dưới là phương án dựng đề xuất,
không phải chuyển động đã quan sát. Nội dung chữ/số trong ảnh chỉ là tham khảo
thiết kế, chưa được kiểm chứng để dùng làm dữ kiện của phim mới.

## Những nguyên tắc rút ra

| Ảnh | Thiết kế quan sát được | Cách áp dụng theo kịch bản mới |
| --- | --- | --- |
| 1 | Map vùng rộng, Hokkaido tô cam trong suốt, viền sáng, note diện tích | Định vị trước, vẽ biên rồi tô vùng; hiện note diện tích khi lời thoại nói đến quy mô. Giữ lõi viền sắc, glow vừa phải. |
| 2 | Hình Hokkaido đặt lên một vùng khác của Nhật để so sánh | Tách một bản sao vector để di chuyển và đối chiếu; giữ vị trí gốc làm mốc. So sánh diện tích dùng phép chiếu phù hợp và cùng tỉ lệ diện tích, không kéo giãn hình cho khớp. Phân biệt hình so sánh với vị trí địa lý thật bằng kiểu viền/callout. |
| 3 | Globe Đông Á, marker Sapporo, nhãn vĩ độ | Cho thấy quan hệ toàn cầu trước khi vào vùng: orbit nhẹ hoặc dolly-in đến marker. Nhãn gắn tọa độ thật; chỉ dùng vĩ độ khi lời thoại cần giải thích nó. |
| 4 | Cảnh toàn đảo riêng, note luận điểm lớn trên nền tối | Có thể dùng một note kết luận ngắn ở nhịp chốt ý. Dùng khoảng trống hợp lý, không để bảng chữ chiếm cảnh hay lặp lại nguyên lời thoại. |
| 5 | Cận một phần đảo, marker địa phương và note dân số | Đi từ toàn vùng vào vị trí cụ thể, reveal marker rồi callout. Số liệu phải có năm/nguồn trong hồ sơ sản xuất; không tự lấy số trong mẫu cho chủ đề khác. |
| 6 | Map chuyên đề, mảng xanh, biên trắng, icon nông nghiệp/chăn nuôi/cá và số liệu nổi bật | Vẽ lớp dữ liệu theo từng ý narration, bổ sung icon từng nhóm. Phân biệt vùng dữ liệu thật với ký hiệu định tính; số liệu phải nêu đúng phạm vi, đơn vị, năm và cách tính. |

## Biên đạo camera và animation

- Lập shot list map theo câu hỏi: định vị ở đâu → quy mô bao nhiêu → so với đâu →
  vùng nào có đặc điểm gì → trường hợp địa phương → kết luận. Thứ tự thay theo
  kịch bản, không bê nguyên chuỗi Hokkaido vào mọi phim.
- Dùng cỡ cảnh globe, lục địa/quốc gia, vùng và địa phương. Xen nhìn thẳng để đọc
  dữ liệu với nhìn nghiêng/góc thấp để thấy địa hình. Đổi góc vì thông tin cần thấy,
  giữ mốc định hướng; không quay xoay chỉ để tạo cảm giác nhiều cảnh.
- Ghi camera đầu/cuối, tâm chú ý, zoom, bearing, pitch và khoảng giữ hình trong
  storyboard. Trên globe/địa hình dùng camera thật khi cần phối cảnh; không giả
  góc 3D bằng cách nghiêng một ảnh thấp phân giải rồi phóng lớn.
- Camera tăng/giảm tốc mượt, dừng đủ để người xem đọc note. Không rung, snap zoom,
  đổi hướng liên tiếp hoặc reset chuyển động đột ngột. Nếu là cut có chủ đích,
  bố cục shot mới phải rõ và chuyển cảnh không tạo flash đen.
- Animation giải thích có trình tự: định vị → trace biên/tô vùng → marker/route →
  note hoặc so sánh → giữ kết luận. Chọn các bước phù hợp, không bật tất cả cùng lúc.
- Marker, polygon và route bám hệ tọa độ khi camera di chuyển. Note dùng neo địa lý
  hoặc leader line và bố trí tránh va chạm. Nhãn cần đọc được nên dùng billboard
  hoặc lớp màn hình khi góc map quá nghiêng; không bị kéo méo theo texture map.
- Hiệu ứng mạnh nhờ phân cấp màu, tương phản, đường biên và reveal đúng nhịp.
  Không dùng blur nền, glow dày hoặc hạt dày để che map. Không có khung bốn góc.

## Note trên map

Người dùng hiện cho phép note trên map. Dùng tên địa danh, giá trị + đơn vị,
thước đo so sánh, chú giải ngắn hoặc một câu chốt ý thật ngắn khi cần. Ngôn ngữ
theo brief/narration. Tạo text riêng với font có đủ glyph; không nhờ ảnh AI vẽ chữ.
Không bật phụ đề lời thoại hoặc tự thêm chữ vào các ảnh minh họa ngoài map.

## Kiểm tra khi dựng

Mỗi cảnh ghi kiểu map, mục đích, góc/cỡ cảnh, dữ liệu, camera, animation và note.
Xem contact sheet để phát hiện lặp bố cục; xem clip chuyển động để phát hiện giật
camera, nhãn trôi/va nhau và reveal sai nhịp narration. Kiểm tra độ nét ở zoom
lớn nhất và khả năng đọc note trên preview điện thoại. Nếu các cảnh vẫn cùng ảnh,
cùng góc và cùng bố cục chỉ đổi hiệu ứng, thiết kế lại phần đó.


<a id="anh-mau-dia-hinh-chan-thuc-2026-11-06"></a>
## Ảnh mẫu địa hình chân thực — 2026-11-06

Nguồn: ảnh Hokkaido người dùng đính kèm khi yêu cầu cập nhật skill ngày 2026-11-06.
Ảnh tĩnh cho thấy nền vệ tinh tự nhiên, biển xanh đậm có chi tiết đáy biển, góc
nhìn nghiêng toàn đảo, địa hình có cảm giác nổi, và một dải núi trung tâm–đông nam
được làm nổi bằng màu nâu vàng, sống núi sáng trắng. Không có khung bốn góc.
Không thể xác định từ ảnh tĩnh nguồn tile/DEM, mức phóng đại chiều cao, hay cách
camera/highlight chuyển động; không khẳng định đã xem animation của mẫu.

Cách dựng được đề xuất cho phim mới:

- Giữ texture tự nhiên rõ ở cỡ xuất, dùng nguồn vệ tinh hợp lệ và DEM phù hợp
  zoom. Thể hiện sườn núi bằng ánh sáng/đổ bóng tiết chế; giữ bờ biển, thung lũng,
  đồng bằng và tương quan địa lý đọc được. Không tối/blur nền để che thiếu nét.
- Khi cần chiều cao/phối cảnh thật, dựng mesh từ DEM, drape texture cùng hệ tọa
  độ, dùng camera 3D thật. Có thể dùng hillshade 2D cho cảnh nhìn thẳng nhưng ghi
  đúng loại; không giả mesh bằng cách nghiêng hoặc bóp méo một ảnh raster.
- Tách vùng núi cần giải thích bằng mask/geometry địa lý có nguồn; highlight
  nâu vàng bán trong suốt, lõi biên/sống núi sắc và viền sáng mảnh. Không tạo
  sống núi giả, không cho glow trắng dày nuốt chi tiết hoặc coi mask tùy ý là dữ liệu.
- Nếu cường điệu chiều cao để dễ đọc, ghi hệ số trong hồ sơ và note ngắn khi
  người xem có thể hiểu đó là tỉ lệ thật. Không bịa cao độ/vị trí đỉnh núi.
- Đề xuất nhịp: định vị → dolly/orbit nhẹ đến góc nhìn rõ dãy núi → reveal lần
  lượt vùng/sống núi → bổ sung đường gió, lưu vực, tuyến vượt núi hoặc note theo
  lời thoại → giữ hình để đọc. Đây là phương án, không phải animation quan sát
  từ ảnh. Các lớp bám tọa độ, kiểm tra occlusion và nhãn không xuyên địa hình.
- Cảnh tiếp theo về cùng vùng phải đổi cách chứng minh: cận thung lũng, góc ngang
  rào cản, mặt cắt, lưu vực hoặc đối chiếu hai sườn. Không quay lại cùng toàn đảo
  chỉ đổi vùng sáng hoặc góc nghiêng vài độ rồi tính là thiết kế mới.

Mẫu này bổ sung một họ map chân thực vào bộ lựa chọn; lựa chọn mỗi shot theo
kịch bản, không áp cùng một ảnh/góc/highlight cho mọi luận điểm hoặc sao chép
nguyên tài sản mẫu. Duyệt độ nét ở zoom lớn nhất và clip chuyển động thực.
