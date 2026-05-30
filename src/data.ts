import { Project, Benefit, WhyReason, ContactInfo } from './types';

export const contactData: ContactInfo = {
  phone: '0359622268',
  phoneDisplay: '0359 622 268',
  facebookUrl: 'https://www.facebook.com/ta.quang95',
  zaloGroupUrl: 'https://zalo.me/g/quangbds', // fallbacks to typical structure or standard user shortlink zalo.quangbds.com
  zaloChatUrl: 'https://zalo.me/0359622268'
};

export const benefitsData: Benefit[] = [
  {
    id: 'b1',
    title: 'Phân tích dự án rõ ràng',
    description: 'Bóc tách ưu và nhược điểm từng dự án. Đưa ra góc nhìn sâu sắc về dòng tiền và tiềm năng khai thác thực tế.',
    iconName: 'LineChart'
  },
  {
    id: 'b2',
    title: 'Tư vấn căn theo nhu cầu',
    description: 'Lựa chọn phương án dựa trên mục đích thực: mua để ở lâu dài, đầu tư dòng tiền, tích sản hay tối ưu cho thuê.',
    iconName: 'Home'
  },
  {
    id: 'b3',
    title: 'Cập nhật chính sách mới',
    description: 'Cung cấp trực tiếp quỹ căn ngoại giao độc quyền, bảng giá nội bộ, tiến độ thi công và chương trình hỗ trợ ngân hàng mới nhất.',
    iconName: 'FileText'
  },
  {
    id: 'b4',
    title: 'Đồng hành sau giao dịch',
    description: 'Hỗ trợ trọn vẹn từ lúc ký hợp đồng, đóng tiền, nhận nhà, làm sổ đỏ đến khi setup khai thác cho thuê hay chuyển nhượng.',
    iconName: 'ShieldCheck'
  }
];

export const projectsData: Project[] = [
  {
    id: 'p1',
    name: 'Masteri Grand Coast',
    status: 'active',
    description: 'Tòa căn hộ cao cấp hàng đầu tại Ocean City. Thiết kế ban công kính tràn cực đại, phóng tầm mắt ngắm trọn kỳ quan biển hồ nhân tạo.',
    location: 'Phân khu cao cấp - Ocean City',
    developer: 'Masterise Homes',
    highlights: ['Vị trí tâm điểm kết nối', 'Tiện ích chuẩn resort 5 sao', 'Bàn giao full nội thất cao cấp liền tường'],
    image: 'https://i.postimg.cc/j5S88J22/V03-CT05-OVERVIEW-02.jpg',
    ctaText: 'Nhận tư vấn dự án',
    priceEstimate: 'Từ ~65 triệu/m²'
  },
  {
    id: 'p2',
    name: 'Masteri Era Landmark',
    status: 'active',
    description: 'Kế thừa sự trọn vẹn trong dịch vụ quản lý quốc tế của Masterise Homes. Bản giao hưởng kiến trúc độc đáo, thiết kế kính Low-E sang trọng.',
    location: 'Tâm điểm Ocean Park 1',
    developer: 'Masterise Homes',
    highlights: ['Kính Low-E sang trọng', 'Dịch vụ Masteri Property Management', 'Tiềm năng cho thuê vượt trội'],
    image: 'https://i.postimg.cc/g0dRBxkt/phan-khu-the-flow-masteri-era-landmark-background.jpg',
    ctaText: 'Xem thông tin chi tiết',
    priceEstimate: 'Từ ~70 triệu/m²'
  },
  {
    id: 'p3',
    name: 'MASTERI TRINITY SQUARE',
    status: 'sold-out',
    description: 'Dự án đã phân phối thành công, đã hoàn thiện và bàn giao đúng cam kết vững vàng cho chủ sở hữu.',
    location: 'Ocean Park',
    developer: 'Masterise Homes',
    highlights: ['Bàn giao đúng tiến độ', 'Đã đi vào hoạt động', 'Tính thanh khoản rất lớn'],
    image: 'https://i.postimg.cc/3r6GQSxL/masteri-trinity-square.jpg',
    ctaText: 'Đã hoàn thành phân phối'
  },
  {
    id: 'p4',
    name: 'Lumière SpringBay',
    status: 'sold-out',
    description: 'Tuyệt tác sống xanh chuẩn quốc tế kiến tạo phong cách sống thời thượng bậc nhất. Đã đóng bảng hàng chuyển nhượng sôi động.',
    location: 'Vị trí ôm trọn Biển Hồ',
    developer: 'Masterise Homes / Vinhomes',
    highlights: ['Thiết kế đột phá', 'Hệ thống lọc khí tươi thông minh', 'Cảnh quan chuẩn xanh Singapore'],
    image: 'https://i.postimg.cc/bJ5Z8rpc/Phoi-canh-Lumiere-Spring-Bay.jpg',
    ctaText: 'Đã bán hết'
  }
];

export const reasonsData: WhyReason[] = [
  {
    id: 'r1',
    title: 'Nhiều năm thực chiến bán căn hộ chung cư',
    text: 'Từng trực tiếp tư vấn và giao dịch hàng trăm căn hộ cao cấp tại Ocean Park, nắm rõ đặc thù thiết kế và cấu trúc pháp lý.',
    highlightText: 'Thực chiến'
  },
  {
    id: 'r2',
    title: 'Am hiểu sâu sắc thị trường Ocean Park',
    text: 'Phân tích đa chiều về dự án của Vinhomes & Masterise Homes từ thiết kế dự toán dòng tiền, ưu nhược điểm từng tòa/từng căn.',
    highlightText: 'Am hiểu sâu'
  },
  {
    id: 'r3',
    title: 'Tư vấn nhu cầu thực - Không áp khách',
    text: 'Nói KHÔNG với tư vấn sặc mùi mồi chài hay chốt ảo. Tôi lắng nghe mong muốn, khả năng tài chính và tìm căn khớp chuẩn 100%.',
    highlightText: 'Chữ Tâm hàng đầu'
  },
  {
    id: 'r4',
    title: 'Dựng dòng tiền chi tiết - Đọc vị chính sách chính xác',
    text: 'Tính toán chính xác mọi phương án: Vay ngân hàng ưu đãi lãi suất, thanh toán tiến độ hay thanh toán sớm để chiết khấu tối đa.',
    highlightText: 'Chuyên môn cao'
  },
  {
    id: 'r5',
    title: 'Đồng hành cùng khách trọn vẹn vòng đời dự án',
    text: 'Không dừng lại khi nhận hoa hồng, tôi đồng hành hỗ trợ mọi thủ tục bàn giao, cho thuê, sang nhượng của quý khách.',
    highlightText: 'Đồng hành dài lâu'
  }
];
