/* PE Survey 10Y26 - ORION. BẢN XEM TRƯỚC để duyệt nội dung bảng hỏi.
   Bản này KHÔNG có địa chỉ Apps Script, KHÔNG có fetch/POST, KHÔNG dùng localStorage/cookie.
   Câu trả lời (kể cả SĐT) chỉ nằm trong bộ nhớ trang, đóng tab hoặc bấm "Làm lại từ đầu" là mất. */

// ---- LỜI VĂN: bản Creative (noi-dung-trang.md). Chỗ pháp lý chưa chốt ghi [CHƯA CHỐT: ...] ----
const COPY = {
  introTitle: 'Chào bạn! 👋',
  intro: 'ORION muốn nghe bạn kể về bánh snack bim bim mà bạn hay ăn. Khảo sát mất khoảng 10 phút. Không có đúng hay sai, bạn cứ chọn theo ý mình nhé.\n\n🎁 Quà cảm ơn: voucher 50.000 đ, gửi qua tin nhắn SMS sau 3 ngày kể từ ngày bạn làm xong.\n\nĐể nhận quà, bạn lưu ý giúp ORION:\n• Quà chỉ dành cho phiếu trả lời nghiêm túc: đọc kỹ từng câu, trả lời thật lòng.\n• Mỗi số điện thoại chỉ nhận một phần quà. Anh chị em trong nhà dùng chung số của bố mẹ thì chỉ một bạn nhận được quà.',
  startBtn: 'Bắt đầu nào',

  attentionQ: 'Câu này không hỏi về bim bim đâu nhé. Để biết bạn vẫn đang đọc kỹ, hãy chọn "Màu xanh lá".',
  attentionOpts: [
    { v: 'do', l: 'Màu đỏ' }, { v: 'vang', l: 'Màu vàng' },
    { v: 'xanh_la', l: 'Màu xanh lá' }, { v: 'tim', l: 'Màu tím' },
  ],

  phoneLabelMinor: 'Nhập số điện thoại của bố, mẹ hoặc người giám hộ để nhận voucher qua SMS',
  phoneHintMinor: 'Bạn nhờ bố mẹ nhập giúp nhé. Mỗi số điện thoại chỉ nhận quà một lần.',
  phoneLabelAdult: 'Nhập số điện thoại của bạn để nhận voucher qua SMS',
  phoneHintAdult: 'Mỗi số điện thoại chỉ nhận quà một lần.',
  phoneError: 'Số điện thoại chưa đúng. Bạn kiểm tra lại giúp ORION nhé (ví dụ: 0912345678).',

  consentTitle: 'Đồng ý sử dụng số điện thoại',
  consent: '[CHƯA CHỐT: tên pháp nhân] ("ORION") xin phép dùng số điện thoại bạn nhập ở trên như sau:\n• Mục đích: chỉ để gửi voucher quà tặng qua SMS. ORION không dùng số này để quảng cáo hay gọi điện mời mua hàng.\n• Thông tin được lưu: chỉ số điện thoại. Câu trả lời khảo sát chỉ dùng để tổng hợp nghiên cứu, không dùng để nhận diện bạn.\n• Ai được xem: ORION và đơn vị gửi voucher UrBox. Không chia sẻ cho bên nào khác.\n• Lưu bao lâu: đến khi gửi xong voucher, tối đa [CHƯA CHỐT: thời gian lưu SĐT], sau đó xoá.\n• Đáp viên từ 6 đến 18 tuổi: số điện thoại do bố, mẹ hoặc người giám hộ cung cấp, và bố, mẹ hoặc người giám hộ là người tích ô đồng ý thay cho đáp viên.\n• Muốn xoá thông tin: bạn hoặc bố mẹ có thể yêu cầu xem hoặc xoá số điện thoại bất cứ lúc nào qua [CHƯA CHỐT: email/hotline nhận yêu cầu xoá dữ liệu]. ORION sẽ xoá trong vòng [CHƯA CHỐT: số ngày xử lý] ngày làm việc.\n(Theo Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.)',
  consentBoxMinor: 'Tôi là bố, mẹ hoặc người giám hộ của đáp viên. Tôi đã đọc và đồng ý.',
  consentBoxAdult: 'Tôi đã đọc và đồng ý.',
  consentError: 'Bạn cần tích ô đồng ý để ORION gửi được voucher cho bạn.',

  thanksTitle: 'Xong rồi, cảm ơn bạn! 🎉',
  thanks: 'Câu trả lời của bạn giúp ORION làm ra những gói snack ngon hơn. Nếu phiếu hợp lệ, voucher 50.000 đ sẽ được gửi qua SMS tới số điện thoại bạn đã nhập sau 3 ngày. Tin nhắn có thể đến từ UrBox, bạn để ý giúp nhé.',

  stopTitle: 'Cảm ơn bạn đã ghé qua!',
  stop: 'Lần này ORION đang tìm một nhóm bạn có thói quen ăn snack hơi khác một chút, nên khảo sát xin dừng ở đây. Bạn không cần làm gì thêm. Chúc bạn một ngày vui nhé!',

  closedTitle: 'Khảo sát đã đủ người rồi',
  closed: 'Cảm ơn bạn đã quan tâm! ORION đã nhận đủ số bạn tham gia cho đợt này nên khảo sát tạm đóng. Hẹn gặp bạn ở những lần sau nhé.',
};

const KB = 'kb';
const KB_OPT = { v: KB, l: 'Không biết / Không nhớ', excl: true };
const BRANDS = [
  { v: 'tayo', l: 'Tayo' }, { v: 'masita_kobuk', l: 'Masita/Kobuk Chip' },
  { v: 'toonies', l: 'Toonies' }, { v: 'cornchip', l: 'Corn Chip' },
  { v: 'oishi', l: 'Oishi' }, { v: 'poca', l: 'Poca' },
  { v: 'other', l: 'Khác (điền tên)' },
];
const isMinor = a => ['6-9', '10-14', '15-18'].includes(a.s_age);

// ---- BẢNG HỎI: bản team đề xuất, chị đã đồng ý (tin #311). Đúng thứ tự PE_Survey_10Y26.docx ----
const PAGES = [
  { sec: 'Phần 1.1 Sàng lọc', qs: [
    { id: 's_age', code: '1.1 Q1', type: 'single', t: 'Vui lòng cho biết độ tuổi của bạn?', opts: [
      { v: '6-9', l: 'Từ 6 - 9 tuổi' }, { v: '10-14', l: 'Từ 10 - 14 tuổi' },
      { v: '15-18', l: 'Từ 15 - 18 tuổi' }, { v: '19-22', l: 'Từ 19 - 22 tuổi' },
      { v: '>22', l: 'Trên 22 tuổi' }] }],
    stop: a => a.s_age === '>22' },
  { sec: 'Phần 1.1 Sàng lọc', qs: [
    { id: 's_snack', code: '1.1 Q2', type: 'multi', t: 'Bạn vui lòng cho biết những loại snack bạn đã ăn trong vòng 6 tháng qua?', opts: [
      { v: 'khoai_tay', l: 'Snack khoai tây' }, { v: 'bim_bim', l: 'Snack bột/bim bim' },
      { v: 'none', l: 'Không có loại đồ ăn nào trong những loại trên', excl: true }] }],
    stop: a => !(a.s_snack || []).includes('bim_bim') },
  { sec: 'Phần 1.2 Nhãn hiệu', qs: [
    { id: 'b_tom', code: '1.2 Q1', type: 'text', t: 'Khi nhắc đến snack bột/bim bim, bạn nghĩ đến nhãn hiệu nào đầu tiên?' },
    { id: 'b_spont', code: '1.2 Q2', type: 'text', t: 'Khi nhắc đến snack bột/bim bim, bạn còn nghĩ đến nhãn hiệu nào nữa không?', hint: 'Nếu không còn nhãn hiệu nào, ghi "Không".' }] },
  { sec: 'Phần 1.2 Nhãn hiệu', qs: [
    { id: 'b_aware', code: '1.2 Q3', type: 'images', t: 'Vui lòng nhìn vào hình ảnh các nhãn hiệu bánh snack bột/bim bim sau đây, nhãn hiệu nào bạn có biết đến?', hint: 'Chọn được nhiều nhãn hiệu.', opts: [
      { v: 'tayo', l: 'Tayo O', wait: 'bao bì Tayo O' },
      { v: 'kobuk_chip', l: 'Kobuk Chip', wait: 'bao bì Kobuk Chip' },
      { v: 'masita_cu', l: 'Masita', wait: 'bao bì Masita (trước khi đổi tên)' },
      { v: 'toonies', l: 'Toonies', wait: 'bao bì Toonies' },
      { v: 'oishi', l: 'Oishi', wait: 'bao bì Oishi' },
      { v: 'poca', l: 'Poca', wait: 'bao bì Poca' },
      { v: 'none', l: 'Không biết nhãn hiệu nào ở trên', excl: true }] }],
    stop: a => !(a.b_aware || []).some(v => v === 'kobuk_chip' || v === 'masita_cu') },
  { sec: 'Phần 1.2 Nhãn hiệu', qs: [
    { id: 'b_ate6m', code: '1.2 Q4', type: 'multi', t: 'Nhãn hiệu snack bột/bim bim nào bạn đã từng ăn trong 6 tháng qua?', opts: [...BRANDS, KB_OPT], other: 'b_ate6m_other' }] },
  { sec: 'Phần 1.2 Nhãn hiệu', qs: [
    { id: 'b_ate1m', code: '1.2 Q5', type: 'multi', t: 'Nhãn hiệu snack bột/bim bim nào bạn đã từng ăn trong 1 tháng qua?', opts: [...BRANDS, KB_OPT], other: 'b_ate1m_other' }] },
  { sec: 'Phần 2 Nhận biết', qs: [
    { id: 'a_masita_country', code: '2 Q1', type: 'single', t: 'Bạn có biết bánh Masita là thương hiệu của quốc gia nào hay không?', opts: [
      { v: 'co', l: 'Có (điền tên quốc gia)' }, { v: 'khong', l: 'Không' }], textFor: { v: 'co', id: 'a_masita_country_text', ph: 'Tên quốc gia' } },
    { id: 'a_kobuk_country', code: '2 Q2', type: 'single', t: 'Bạn có biết bánh Kobuk Chip là thương hiệu của quốc gia nào hay không?', opts: [
      { v: 'co', l: 'Có (điền tên quốc gia)' }, { v: 'khong', l: 'Không' }], textFor: { v: 'co', id: 'a_kobuk_country_text', ph: 'Tên quốc gia' } }] },
  { sec: 'Phần 2 Nhận biết', qs: [
    { id: 'a_korea_impact', code: '2 Q3', type: 'single', t: 'Việc là một thương hiệu đến từ Hàn Quốc có tác động đến ý định mua hàng của bạn hay không?', opts: [
      { v: 'tich_cuc', l: 'Có, làm tôi muốn mua hơn' }, { v: 'khong', l: 'Không ảnh hưởng' },
      { v: 'tieu_cuc', l: 'Có, làm tôi ít muốn mua hơn' }, KB_OPT] },
    { id: 'a_korea_why', code: '2 Q3', type: 'textarea', t: 'Vì sao?' }] },
  { sec: 'Phần 2 Nhận biết', qs: [
    { id: 'a_rename_known', code: '2 Q4', type: 'single', t: 'Bánh Masita hiện đã đổi tên thành Kobuk Chip. Bạn có biết đến việc đổi tên này hay không?', opts: [
      { v: 'da_biet', l: 'Đã biết từ trước' }, { v: 'chua_biet', l: 'Chưa biết từ trước' }] }] },
  { sec: 'Phần 2 Nhận biết', when: a => a.a_rename_known === 'da_biet', qs: [
    { id: 'a_rename_source', code: '2 Q5', type: 'multi', t: 'Bạn biết thông tin Masita đổi tên thành Kobuk Chip từ đâu?', opts: [
      { v: 'qc_mxh', l: 'Qua quảng cáo/mạng xã hội' }, { v: 'tap_hoa', l: 'Qua tiệm tạp hóa/chủ shop' },
      { v: 'ban_be', l: 'Qua bạn bè, người thân' }, { v: 'other', l: 'Khác (ghi rõ)' }, KB_OPT], other: 'a_rename_source_other' }] },
  { sec: 'Phần 2 Nhận biết', qs: [
    { id: 'a_rename_intent', code: '2 Q6', type: 'single', t: 'Việc đổi tên từ Masita sang Kobuk Chip có làm thay đổi ý định mua hàng của bạn hay không?', opts: [
      { v: 'hung_thu', l: 'Cảm thấy hứng thú hơn và muốn mua nhiều hơn' },
      { v: 'van_mua', l: 'Vẫn mua và sử dụng bình thường như trước đây' },
      { v: 'khong_anh_huong', l: 'Bình thường. Không có ảnh hưởng gì tới tôi' },
      { v: 'xa_la', l: 'Cảm thấy xa lạ và ít muốn mua hơn trước / Sẽ đổi hãng khác' }, KB_OPT] }] },
  { sec: 'Phần 2 Thói quen', qs: [
    { id: 'u_occasion', code: '2 Thói quen Q1', type: 'multi', t: 'Bạn hãy cho biết bạn thường ăn bánh bột/bim bim vào những dịp nào?', hint: 'Chọn được nhiều dịp.', other: 'u_occasion_other', opts: [
      { h: 'Kết nối với người khác' },
      { v: 'game_ban', l: 'Khi chơi game với bạn bè' }, { v: 'gap_ban', l: 'Khi gặp gỡ với bạn bè' }, { v: 'hen_ho', l: 'Khi đi hẹn hò bên ngoài' },
      { h: 'Tiệc tùng/lễ hội' },
      { v: 'tiec', l: 'Trong bữa tiệc với bạn bè' },
      { h: 'Hoạt động ngoài trời/thể thao' },
      { v: 'du_lich', l: 'Khi đi du lịch' }, { v: 'the_thao', l: 'Trong và sau khi tập thể thao' }, { v: 'da_ngoai', l: 'Khi đi dã ngoại/leo núi' },
      { h: 'Giải trí' },
      { v: 'game_nha', l: 'Khi chơi game ở nhà' }, { v: 'giai_tri_nha', l: 'Khi giải trí ở nhà (coi phim, đọc sách, chơi cờ...)' }, { v: 'rap', l: 'Khi coi phim ở rạp' },
      { h: 'Học bài' },
      { v: 'hoc_nha', l: 'Khi học bài ở nhà' }, { v: 'hoc_ngoai', l: 'Khi học bài ở ngoài' }, { v: 'giai_lao_hoc', l: 'Trong giờ giải lao ngắn khi đi học' },
      { v: 'truoc_hoc', l: 'Trước khi đi học' }, { v: 'sau_trua_hoc', l: 'Sau giờ nghỉ trưa (để quay lại học)' }, { v: 'tan_hoc', l: 'Sau khi tan học' },
      { h: 'Làm việc' },
      { v: 'lam_mot_minh', l: 'Khi làm việc một mình (công ty/ở nhà/quán...)' }, { v: 'lam_cung', l: 'Khi làm việc cùng người khác' },
      { v: 'giai_lao_lam', l: 'Trong giờ giải lao ngắn khi đi làm' }, { v: 'truoc_lam', l: 'Trước khi đi làm' },
      { v: 'sau_trua_lam', l: 'Sau giờ nghỉ trưa (để quay lại làm việc)' }, { v: 'tan_lam', l: 'Sau khi tan làm' },
      { h: 'Khác' },
      { v: 'other', l: 'Khác, vui lòng ghi rõ' }, KB_OPT] }] },
  { sec: 'Phần 2 Thói quen', qs: [
    { id: 'attn', code: 'Câu kiểm tra chú ý', type: 'single', t: COPY.attentionQ, opts: COPY.attentionOpts }] },
  { sec: 'Phần 2 Thói quen', qs: [
    { id: 'u_channel', code: '2 Thói quen Q2', type: 'multi', t: 'Khi mua bánh bột/bim bim trong 1 tháng qua, bạn thường mua bánh bột/bim bim ở những kênh nào? Vui lòng cho biết tất cả những kênh bạn thường mua bánh bột/bim bim trong vòng 1 tháng qua? [MA]', other: 'u_channel_other', opts: [
      { v: 'cho', l: 'Chợ truyền thống' }, { v: 'tap_hoa', l: 'Cửa hàng tạp hóa' },
      { v: 'sieu_thi', l: 'Siêu thị/đại siêu thị (Big C, Co.opmart, Lotte, Aeon, Go!, v.v.)' },
      { v: 'cvs', l: 'Cửa hàng tiện lợi (Circle K, GS25, Ministop, 7-Eleven, FamilyMart, v.v.)' },
      { v: 'mini', l: 'Siêu thị mini (Bách Hóa Xanh, WinMart+, Co.op Food, v.v.)' },
      { v: 'tmdt', l: 'Sàn thương mại điện tử (Shopee, TikTok, Lazada, Tiki...)' },
      { v: 'mxh', l: 'Mạng xã hội (Facebook, Instagram...)' },
      { v: 'other', l: 'Khác, ghi rõ' }, KB_OPT] },
    { id: 'u_freq', code: '2 Thói quen Q3', type: 'single', t: 'Xin cho biết tần suất bạn ăn bánh bột/bim bim trong 1 tháng qua là như thế nào?', opts: [
      { v: 'hang_ngay', l: 'Hàng ngày' }, { v: '2_3_ngay', l: '2-3 ngày một lần' }, { v: '4_5_ngay', l: '4-5 ngày một lần' },
      { v: 'hang_tuan', l: 'Hàng tuần' }, { v: '2_3_tuan', l: '2-3 tuần một lần' }, { v: 'thang', l: 'Mỗi tháng một lần' },
      { v: 'it_hon', l: 'Ít hơn một tháng một lần' }, KB_OPT] }] },
  { sec: 'Phần 2.1 Trưng bày', qs: [
    { id: 'd_shelf_tt', code: '2.1 Q1', type: 'shelf', t: 'Vui lòng nhìn hình ảnh và cho biết bạn thích cách sắp xếp kệ hàng của nhãn hiệu nào hơn?', hint: 'Kệ hàng ở tiệm tạp hóa.',
      imgs: [{ l: 'Kobuk Chip', wait: 'kệ Kobuk Chip ở tiệm tạp hóa' }, { l: 'Oishi', wait: 'kệ Oishi ở tiệm tạp hóa' }], why: 'd_shelf_tt_why' }] },
  { sec: 'Phần 2.1 Trưng bày', qs: [
    { id: 'd_shelf_cvs', code: '2.1 Q2', type: 'shelf', t: 'Vui lòng nhìn hình ảnh và cho biết bạn thích cách sắp xếp kệ hàng của nhãn hiệu nào hơn?', hint: 'Kệ hàng ở cửa hàng tiện lợi/siêu thị mini.',
      imgs: [{ l: 'Kobuk Chip', wait: 'kệ Kobuk Chip ở CVS/siêu thị mini' }, { l: 'Oishi', wait: 'kệ Oishi ở CVS/siêu thị mini' }], why: 'd_shelf_cvs_why' }] },
  { sec: 'Phần 2.2 Khuyến mãi', qs: [
    { id: 'p_promo', code: '2.2 Q1', type: 'rating', t: 'Xin bạn cho biết câu nào sau đây diễn tả đúng nhất cảm nhận chung của bạn về các chương trình khuyến mãi của từng nhãn hiệu bánh bột/bim bim sau? [Vui lòng chọn 1 đáp án phù hợp nhất]',
      rows: [{ id: 'p_promo_bapbo', l: 'Bánh snack Kobuk Chip Bắp Bơ' }, { id: 'p_promo_gacay', l: 'Bánh snack Kobuk Chip Gà cay' }, { id: 'p_promo_4x', l: 'Bánh snack 4 lớp 4X vị Bắp bơ' }] }] },
  { sec: 'Phần 2.2 Khuyến mãi', qs: [
    { id: 'p_rank', code: '2.2 Q2', type: 'rank', t: 'Sau đây là một số hình thức khuyến mãi cho sản phẩm bánh bột/bim bim. Bạn hãy xếp hạng 3 hình thức khuyến mãi mà bạn thích nhất trong danh sách sau đây?', hint: 'Trong đó, 1 – Yêu thích nhất, 2 – Yêu thích thứ nhì, 3 – Yêu thích thứ ba', other: 'p_rank_other', opts: [
      { v: 'giam_gia', l: 'Giảm % hoặc giá trị tiền mặt ngay tại điểm bán (Ví dụ: Giảm 10% khi mua 2 sản phẩm)' },
      { v: 'coupon', l: 'Phiếu giảm giá dùng cho lần mua sau (Ví dụ: Coupon 20k cho lần mua kế tiếp)' },
      { v: 'goi_tiet_kiem', l: 'Mua gói tiết kiệm: Mua 2 tặng 1, Mua 3 giá 2 (Ví dụ: Combo snack 3 gói giá 2)' },
      { v: 'tang_trong_luong', l: 'Tặng thêm dung tích hoặc trọng lượng (Ví dụ: Tặng thêm 20% dung tích)' },
      { v: 'qua_kem', l: 'Tặng quà kèm theo khi mua hàng (Ví dụ: Mua sữa tắm tặng bông tắm)' },
      { v: 'dung_thu', l: 'Cho dùng thử sản phẩm mới (Ví dụ: Phát mẫu tại siêu thị)' },
      { v: 'mua_x_tang_y', l: 'Mua X sản phẩm tặng Y (Ví dụ: Mua 2 tặng 1)' },
      { v: 'combo', l: 'Kết hợp 2 sản phẩm (cùng/khác brand) (Ví dụ: Mua snack tặng nước uống)' },
      { v: 'quay_thuong', l: 'Mua hàng nhập mã quay thưởng (Ví dụ: Trúng iPhone khi mua bánh)' },
      { v: 'cao_tem', l: 'Cào tem, mở nắp hoặc quét QR biết kết quả (Ví dụ: Cào trúng xe máy)' },
      { v: 'tich_diem', l: 'Tích điểm qua app hoặc hóa đơn (Ví dụ: Đổi quà khi đủ điểm)' },
      { v: 'other', l: 'Khác, vui lòng ghi rõ' }] }] },
  { sec: 'Phần 3 Thông tin', qs: [
    { id: 'dm_region', code: '3 Q1', type: 'single', t: 'Bạn đang sinh sống ở khu vực nào?', opts: [
      { v: 'hcm', l: 'TP. Hồ Chí Minh' }, { v: 'hn', l: 'Hà Nội' }, { v: 'khac', l: 'Khu vực khác (ghi rõ)' }],
      textFor: { v: 'khac', id: 'dm_region_other', ph: 'Tỉnh/thành phố' } },
    { id: 'dm_gender', code: '3 Q2', type: 'single', t: 'Giới tính của bạn?', opts: [{ v: 'nam', l: 'Nam' }, { v: 'nu', l: 'Nữ' }] }] },
  { sec: 'Nhận quà', last: true, qs: [{ id: 'phone', code: 'SĐT', type: 'phone' }, { id: 'consent', code: 'Ô đồng ý', type: 'consent' }] },
];

// ---- TRẠNG THÁI: chỉ trong bộ nhớ trang ----
const S = { i: -1, ans: {}, hist: [] };
const $app = document.getElementById('app');

function h(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (k === 'class') e.className = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) e.setAttribute(k, v === true ? '' : v);
  }
  for (const k of kids.flat()) if (k != null) e.append(k.nodeType ? k : document.createTextNode(k));
  return e;
}

// Tô đỏ các chỗ [CHƯA CHỐT: ...] để chị thấy ngay
function rich(text) {
  return String(text).split(/(\[CHƯA CHỐT:[^\]]*\])/).filter(Boolean)
    .map(p => p.startsWith('[CHƯA CHỐT') ? h('span', { class: 'pending' }, p) : document.createTextNode(p));
}

const pageVisible = p => !p.when || p.when(S.ans);
function setProgress(pct) {
  document.getElementById('progress').style.width = (pct != null ? pct : (S.i < 0 ? 0 : Math.round((S.i / PAGES.length) * 100))) + '%';
}

function reset() {
  S.i = -1; S.ans = {}; S.hist = [];
  setProgress(0); window.scrollTo(0, 0);
  boot();
}
const resetBtn = () => h('button', { class: 'reset', onclick: reset }, 'Làm lại từ đầu');

// ---- MÀN HÌNH ĐẦU, DỪNG, CẢM ƠN ----
function screen(title, text, btn, note) {
  $app.innerHTML = '';
  const c = h('div', { class: 'card' }, h('h2', {}, title), h('p', {}, text));
  if (btn) c.append(btn);
  if (note) c.append(h('div', { class: 'note' }, note));
  $app.append(c);
  if (S.i >= 0) $app.append(resetBtn());
}

function boot() {
  const btn = h('button', { class: 'primary', onclick: () => go(0) }, COPY.startBtn);
  screen(COPY.introTitle, COPY.intro, btn);
  $app.append(h('button', { class: 'reset', onclick: () => {
    S.i = 0; screen(COPY.closedTitle, COPY.closed, null, 'Xem trước: màn hình này chỉ hiện khi khảo sát đã đủ 100 phiếu.');
  } }, 'Xem màn hình "Khảo sát đã đủ người"'));
}

// ---- VẼ TỪNG LOẠI CÂU ----
function optRow(type, name, o, checked, onchange) {
  const inp = h('input', { type, name, value: o.v });
  inp.checked = checked;
  const row = h('label', { class: 'opt' + (checked ? ' on' : '') }, inp, h('span', {}, o.l));
  inp.addEventListener('change', onchange);
  return row;
}
const wait = what => h('div', { class: 'ph-wait' }, '[Chờ hình: ' + what + ']');

function renderQ(q) {
  const A = S.ans;
  const box = h('div', { class: 'card', 'data-q': q.id });
  if (q.code) box.append(h('div', { class: 'qcode' }, q.code));
  if (q.t) box.append(h('p', { class: 'q-title' }, q.t));
  if (q.hint) box.append(h('p', { class: 'q-hint' }, q.hint));
  const redraw = () => box.replaceWith(renderQ(q));

  if (q.type === 'single') {
    q.opts.forEach(o => {
      box.append(optRow('radio', q.id, o, A[q.id] === o.v, () => { A[q.id] = o.v; redraw(); }));
      if (q.textFor && q.textFor.v === o.v && A[q.id] === o.v) {
        const t = h('input', { type: 'text', placeholder: q.textFor.ph, value: A[q.textFor.id] || '' });
        t.addEventListener('input', () => { A[q.textFor.id] = t.value; });
        box.append(h('div', { class: 'sub' }, t));
      }
    });
  }

  if (q.type === 'multi') {
    const cur = A[q.id] || [];
    q.opts.forEach(o => {
      if (o.h) return box.append(h('div', { class: 'group-h' }, o.h));
      box.append(optRow('checkbox', q.id, o, cur.includes(o.v), e => {
        let v = (A[q.id] || []).slice();
        if (e.target.checked) {
          v = o.excl ? [o.v] : v.filter(x => !q.opts.find(p => p.v === x && p.excl)).concat(o.v);
        } else v = v.filter(x => x !== o.v);
        A[q.id] = v; redraw();
      }));
      if (o.v === 'other' && q.other && cur.includes('other')) {
        const t = h('input', { type: 'text', placeholder: 'Ghi rõ', value: A[q.other] || '' });
        t.addEventListener('input', () => { A[q.other] = t.value; });
        box.append(h('div', { class: 'sub' }, t));
      }
    });
  }

  if (q.type === 'text' || q.type === 'textarea') {
    const t = q.type === 'text' ? h('input', { type: 'text', value: A[q.id] || '' }) : h('textarea', {}, A[q.id] || '');
    t.addEventListener('input', () => { A[q.id] = t.value; });
    box.append(t);
  }

  if (q.type === 'images') {
    const cur = A[q.id] || [];
    const grid = h('div', { class: 'imgs' });
    q.opts.filter(o => o.wait).forEach(o => {
      const on = cur.includes(o.v);
      grid.append(h('div', { class: 'imgcard' + (on ? ' on' : ''), role: 'checkbox', 'aria-checked': on ? 'true' : 'false', tabindex: '0',
        onclick: () => { const v = (A[q.id] || []).filter(x => x !== 'none'); A[q.id] = on ? v.filter(x => x !== o.v) : v.concat(o.v); redraw(); } },
        wait(o.wait), h('div', { class: 'cap' }, o.l)));
    });
    box.append(grid);
    const none = q.opts.find(o => o.excl);
    box.append(h('div', { style: 'margin-top:10px' }, optRow('checkbox', q.id, none, cur.includes(none.v), e => { A[q.id] = e.target.checked ? [none.v] : []; redraw(); })));
  }

  if (q.type === 'shelf') {
    const pair = h('div', { class: 'pair' });
    q.imgs.forEach(m => pair.append(h('figure', {}, wait(m.wait), h('figcaption', {}, m.l))));
    box.append(pair);
    [{ v: 'kobuk', l: 'Kobuk Chip' }, { v: 'oishi', l: 'Oishi' }, KB_OPT].forEach(o =>
      box.append(optRow('radio', q.id, o, A[q.id] === o.v, () => { A[q.id] = o.v; redraw(); })));
    if (A[q.id] && A[q.id] !== KB) {
      const t = h('textarea', { placeholder: 'Vì sao?' }, A[q.why] || '');
      t.addEventListener('input', () => { A[q.why] = t.value; });
      box.append(h('p', { class: 'q-title', style: 'margin-top:10px' }, 'Vì sao?'), t);
    }
  }

  if (q.type === 'rating') {
    box.append(h('div', { class: 'legend' }, '1 Hoàn toàn không thích · 2 Hơi không thích · 3 Không ghét cũng không thích (Bình thường) · 4 Khá thích · 5 Rất thích · KB Không biết'));
    q.rows.forEach(r => {
      const sc = h('div', { class: 'scale' });
      ['1', '2', '3', '4', '5', KB].forEach(v => {
        const inp = h('input', { type: 'radio', name: r.id, value: v });
        inp.checked = A[r.id] === v;
        inp.addEventListener('change', () => { A[r.id] = v; redraw(); });
        sc.append(h('label', { class: A[r.id] === v ? 'on' : '' }, inp, v === KB ? 'KB' : v));
      });
      box.append(h('div', { class: 'rate' }, h('div', { class: 'rl' }, r.l), sc));
    });
  }

  if (q.type === 'rank') {
    [1, 2, 3].forEach(n => {
      const key = q.id + n;
      const sel = h('select', {}, h('option', { value: '' }, '-- Hạng ' + n + ' --'),
        q.opts.map(o => h('option', { value: o.v, selected: A[key] === o.v }, o.l)));
      sel.addEventListener('change', () => { A[key] = sel.value; redraw(); });
      box.append(h('p', { class: 'q-title', style: 'margin:10px 0 4px' }, 'Hạng ' + n), sel);
    });
    if ([1, 2, 3].some(n => A[q.id + n] === 'other')) {
      const t = h('input', { type: 'text', placeholder: 'Ghi rõ hình thức khác', value: A[q.other] || '' });
      t.addEventListener('input', () => { A[q.other] = t.value; });
      box.append(h('div', { style: 'margin-top:8px' }, t));
    }
  }

  if (q.type === 'phone') {
    const minor = isMinor(A);
    box.append(h('p', { class: 'q-title' }, minor ? COPY.phoneLabelMinor : COPY.phoneLabelAdult));
    box.append(h('p', { class: 'q-hint' }, minor ? COPY.phoneHintMinor : COPY.phoneHintAdult));
    // autocomplete=off: trình duyệt không ghi nhớ số đã gõ
    const t = h('input', { type: 'tel', inputmode: 'numeric', autocomplete: 'off', placeholder: '09xxxxxxxx', value: A.phone || '' });
    t.addEventListener('input', () => { A.phone = t.value; });
    box.append(t);
    box.append(h('div', { class: 'note' }, 'Xem trước: số gõ vào đây không được lưu hay gửi đi đâu.'));
  }

  if (q.type === 'consent') {
    const minor = isMinor(A);
    box.append(h('p', { class: 'q-title' }, COPY.consentTitle));
    box.append(h('div', { class: 'consent' }, rich(COPY.consent)));
    box.append(optRow('checkbox', 'consent', { v: '1', l: minor ? COPY.consentBoxMinor : COPY.consentBoxAdult }, A.consent === true, e => { A.consent = e.target.checked; redraw(); }));
  }
  return box;
}

// ---- KIỂM TRA ĐỦ Ô (giống bản thật, để chị thấy câu báo lỗi) ----
const normPhone = p => { let d = String(p || '').replace(/\D/g, ''); if (d.startsWith('84')) d = '0' + d.slice(2); return d; };
function missing(q) {
  const A = S.ans, filled = v => v != null && String(v).trim() !== '';
  switch (q.type) {
    case 'single': return !A[q.id] || (q.textFor && A[q.id] === q.textFor.v && !filled(A[q.textFor.id]));
    case 'multi': return !(A[q.id] || []).length || ((A[q.id] || []).includes('other') && !filled(A[q.other]));
    case 'images': return !(A[q.id] || []).length;
    case 'text': case 'textarea': return !filled(A[q.id]);
    case 'shelf': return !A[q.id] || (A[q.id] !== KB && !filled(A[q.why]));
    case 'rating': return q.rows.some(r => !A[r.id]);
    case 'rank': {
      const v = [1, 2, 3].map(n => A[q.id + n]);
      return v.some(x => !x) || new Set(v).size < 3 || (v.includes('other') && !filled(A[q.other]));
    }
    case 'phone': return !/^0[35789]\d{8}$/.test(normPhone(A.phone));
    case 'consent': return A.consent !== true;
  }
  return false;
}
const MSG = { rank: 'Vui lòng chọn đủ 3 hạng, không trùng nhau.', phone: COPY.phoneError, consent: COPY.consentError };

// ---- ĐIỀU HƯỚNG ----
function go(i) {
  S.i = i; setProgress(); window.scrollTo(0, 0);
  const p = PAGES[i];
  $app.innerHTML = '';
  $app.append(h('div', { class: 'muted', style: 'margin-bottom:8px;font-size:13px' }, p.sec));
  p.qs.forEach(q => $app.append(renderQ(q)));
  const err = h('div', { class: 'err' });
  const back = S.hist.length ? h('button', { class: 'ghost', onclick: () => go(S.hist.pop()) }, 'Quay lại') : null;
  if (p.last) {
    // Nút Gửi tắt hẳn. Nút phụ chỉ kiểm ô rồi hiện màn cảm ơn, không gửi gì.
    const send = h('button', { class: 'primary', disabled: true, title: 'Bản xem trước: không gửi phiếu' }, 'Gửi phiếu (tắt ở bản xem trước)');
    const view = h('button', { class: 'ghost', onclick: () => {
      const bad = p.qs.find(missing);
      if (bad) { err.textContent = MSG[bad.type]; return; }
      setProgress(100);
      screen(COPY.thanksTitle, COPY.thanks, null, 'Xem trước: phiếu KHÔNG được gửi. Bản thật sẽ hiện màn này sau khi bấm Gửi phiếu.');
    } }, 'Xem màn cảm ơn');
    $app.append(err, h('div', { class: 'nav' }, back, send), h('div', { class: 'nav' }, view));
  } else {
    const next = h('button', { class: 'primary', onclick: () => onNext(err) }, 'Tiếp tục');
    $app.append(err, h('div', { class: 'nav' }, back, next));
  }
  $app.append(resetBtn());
}

function onNext(err) {
  const p = PAGES[S.i];
  const bad = p.qs.find(missing);
  if (bad) { err.textContent = MSG[bad.type] || 'Bạn vui lòng trả lời đầy đủ câu hỏi.'; return; }
  if (p.stop && p.stop(S.ans)) return screen(COPY.stopTitle, COPY.stop, null, 'Xem trước: dừng khảo sát ở câu ' + p.qs[0].code + '.');
  let j = S.i + 1;
  while (j < PAGES.length && !pageVisible(PAGES[j])) j++;
  S.hist.push(S.i); go(j);
}

boot();
