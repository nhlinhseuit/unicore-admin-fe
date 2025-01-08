//// TODO: Not Complete Actions
//
export const mockNotCompleteActions = [
  {
    id: 1,
    action: "Nhập danh sách sinh viên lớp (lớp thường - lớp TTDN)",
    desc: "Bạn chưa nhập danh sách sinh viên cho các lớp:",
    data: "STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2",
  },
  {
    id: 2,
    action: "Nhập lịch thi giữa kỳ (Lớp thường, lớp đồ án)",
    desc: "Bạn chưa nhập lịch thi giữa kỳ (Lớp thường, lớp đồ án):",
    data: "STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2",
  },
  {
    id: 3,
    action: "Nhập lịch thi cuối kỳ (Lớp thường, lớp đồ án)",
    desc: "Bạn chưa nhập lịch thi cuối kỳ (Lớp thường, lớp đồ án):",
    data: "STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2",
  },
  {
    id: 4,
    action: "Nhập lịch báo cáo & danh sách Hội đồng chấm Khoá luận tốt nghiệp",
    desc: "Bạn chưa nhập lịch báo cáo & danh sách Hội đồng chấm Khoá luận tốt nghiệp:",
    data: "STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2",
  },
  {
    id: 5,
    action: "Nhập lịch báo cáo & danh sách Hội đồng chấm Thực tập doanh nghiệp",
    desc: "Bạn chưa nhập báo cáo & danh sách Hội đồng chấm Thực tập doanh nghiệp:",
    data: "STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2",
  },
];

//// TODO: Annoucements List
//
export const mockAnnouncementLists = [
  {
    _id: "1",
    title: "Đăng ký đề tài đồ án 1 và đồ án 2 học kỳ 1 năm học 2024 - 2025",
    description:
      "Khoa Công nghệ Phần mềm thông báo các sinh viên đăng ký học phần thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025 lớp SE501.P11 và SE501.P11.PMCL cập nhật thông tin thực tập doanh nghiệp vào các file sau...",
    tags: [
      { _id: "1", name: "Thông báo học vụ" },
      { _id: "2", name: "Khoa học - công nghệ" },
    ],
    files: [
      { _id: "1", name: "thong_bao_dinh_kem.docx" },
      { _id: "2", name: "thong_bao_dinh_kem.docx" },
    ],
    author: {
      _id: "2",
      name: "Trần Hạnh Xuân",
      picture: "jane-smith.jpg",
    },
    createdAt: "T2, 22/07/2024 - 09:45",
  },
  {
    _id: "2",
    title: "Đăng ký đề tài đồ án 1 và đồ án 2 học kỳ 1 năm học 2024 - 2025",
    description:
      "Khoa Công nghệ Phần mềm thông báo các sinh viên đăng ký học phần thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025 lớp SE501.P11 và SE501.P11.PMCL cập nhật thông tin thực tập doanh nghiệp vào các file sau...",
    tags: [
      { _id: "1", name: "Thông báo học vụ" },
      { _id: "2", name: "Khoa học - công nghệ" },
      { _id: "3", name: "Khoa học" },
    ],
    files: [
      { _id: "1", name: "thong_bao_dinh_kem.docx" },
      { _id: "2", name: "thong_bao_dinh_kem.docx" },
    ],
    author: {
      _id: "2",
      name: "Trần Hạnh Xuân",
      picture: "jane-smith.jpg",
    },
    createdAt: "T2, 22/07/2024 - 09:45",
  },
  {
    _id: "3",
    title: "Đăng ký đề tài đồ án 1 và đồ án 2 học kỳ 1 năm học 2024 - 2025",
    description:
      "Khoa Công nghệ Phần mềm thông báo các sinh viên đăng ký học phần thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025 lớp SE501.P11 và SE501.P11.PMCL cập nhật thông tin thực tập doanh nghiệp vào các file sau...",
    tags: [
      { _id: "1", name: "Thông báo học vụ" },
      { _id: "2", name: "Khoa học - công nghệ" },
    ],
    files: [
      { _id: "1", name: "thong_bao_dinh_kem.docx" },
      { _id: "2", name: "thong_bao_dinh_kem.docx" },
    ],
    author: {
      _id: "2",
      name: "Trần Hạnh Xuân",
      picture: "jane-smith.jpg",
    },
    createdAt: "T2, 22/07/2024 - 09:45",
  },
];

//
//// TODO: Annoucements Detail List
//
export const mockAnnouncementDetailLists = [
  {
    _id: "1",
    title: "Đăng ký đề tài đồ án 1 và đồ án 2 học kỳ 1 năm học 2024 - 2025",
    description: `Khoa Công nghệ Phần mềm thông báo các sinh viên đăng ký học phần thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025 lớp SE501.P11 và SE501.P11.PMCL cập nhật thông tin thực tập doanh nghiệp vào các file sau từ nay đến ngày 15/09/2024.
      Lớp SE501.P11 
      Lớp SE501.P11.PMCL
      Lưu ý: Sinh viên nào chưa liên hệ được nơi thực tập thì cập nhật vào cột "Nơi thực tập" là "Chưa có".
      Để nắm được các thông tin chi tiết về việc thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025, đề nghị toàn bộ các sinh viên lớp SE501.P11 và SE501.P11.PMCL tham dự SEMINAR HƯỚNG DẪN THỰC TẬP DOANH NGHIỆP KHOA CÔNG NGHỆ PHẦN MỀM cụ thể như sau:
      1. Thời gian: 15h00 thứ sáu ngày 13/09/2024
      2. Hình thức: online trên MS Team với Passcode : r96y1rg
      3. Người trình bày: ThS. Lê Thanh Trọng_Phó Trưởng khoa Công nghệ Phần mềm`,
    tags: [
      { _id: "1", name: "Thông báo học vụ" },
      { _id: "2", name: "Khoa học - công nghệ" },
    ],
    files: [
      { _id: "1", name: "thong_bao_dinh_kem.docx" },
      { _id: "2", name: "thong_bao_dinh_kem.docx" },
    ],
    author: {
      _id: "2",
      name: "Trần Hạnh Xuân",
      picture: "jane-smith.jpg",
    },
    createdAt: "T2, 22/07/2024 - 09:45",
  },
  {
    _id: "2",
    title: "Đăng ký đề tài đồ án 1 và đồ án 2 học kỳ 1 năm học 2024 - 2025",
    description: `Khoa Công nghệ Phần mềm thông báo các sinh viên đăng ký học phần thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025 lớp SE501.P11 và SE501.P11.PMCL cập nhật thông tin thực tập doanh nghiệp vào các file sau từ nay đến ngày 15/09/2024.
      Lớp SE501.P11 
      Lớp SE501.P11.PMCL
      Lưu ý: Sinh viên nào chưa liên hệ được nơi thực tập thì cập nhật vào cột "Nơi thực tập" là "Chưa có".
      Để nắm được các thông tin chi tiết về việc thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025, đề nghị toàn bộ các sinh viên lớp SE501.P11 và SE501.P11.PMCL tham dự SEMINAR HƯỚNG DẪN THỰC TẬP DOANH NGHIỆP KHOA CÔNG NGHỆ PHẦN MỀM cụ thể như sau:
      1. Thời gian: 15h00 thứ sáu ngày 13/09/2024
      2. Hình thức: online trên MS Team với Passcode : r96y1rg
      3. Người trình bày: ThS. Lê Thanh Trọng_Phó Trưởng khoa Công nghệ Phần mềm`,
    tags: [
      { _id: "1", name: "Thông báo học vụ" },
      { _id: "2", name: "Khoa học - công nghệ" },
      { _id: "2", name: "Khoa học" },
    ],
    files: [
      { _id: "1", name: "thong_bao_dinh_kem.docx" },
      { _id: "2", name: "thong_bao_dinh_kem.docx" },
    ],
    author: {
      _id: "2",
      name: "Trần Hạnh Xuân",
      picture: "jane-smith.jpg",
    },
    createdAt: "T2, 22/07/2024 - 09:45",
  },
  {
    _id: "3",
    title: "Đăng ký đề tài đồ án 1 và đồ án 2 học kỳ 1 năm học 2024 - 2025",
    description: `Khoa Công nghệ Phần mềm thông báo các sinh viên đăng ký học phần thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025 lớp SE501.P11 và SE501.P11.PMCL cập nhật thông tin thực tập doanh nghiệp vào các file sau từ nay đến ngày 15/09/2024.
      Lớp SE501.P11 
      Lớp SE501.P11.PMCL
      Lưu ý: Sinh viên nào chưa liên hệ được nơi thực tập thì cập nhật vào cột "Nơi thực tập" là "Chưa có".
      Để nắm được các thông tin chi tiết về việc thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025, đề nghị toàn bộ các sinh viên lớp SE501.P11 và SE501.P11.PMCL tham dự SEMINAR HƯỚNG DẪN THỰC TẬP DOANH NGHIỆP KHOA CÔNG NGHỆ PHẦN MỀM cụ thể như sau:
      1. Thời gian: 15h00 thứ sáu ngày 13/09/2024
      2. Hình thức: online trên MS Team với Passcode : r96y1rg
      3. Người trình bày: ThS. Lê Thanh Trọng_Phó Trưởng khoa Công nghệ Phần mềm`,
    tags: [
      { _id: "1", name: "Thông báo học vụ" },
      { _id: "2", name: "Khoa học - công nghệ" },
    ],
    files: [
      { _id: "1", name: "thong_bao_dinh_kem.docx" },
      { _id: "2", name: "thong_bao_dinh_kem.docx" },
    ],
    author: {
      _id: "2",
      name: "Trần Hạnh Xuân",
      picture: "jane-smith.jpg",
    },
    createdAt: "T2, 22/07/2024 - 09:45",
  },
];

//
//// TODO: Category
//
export const mockCategoryList = [
  { id: 1, value: "Thông báo - tin tức" },
  { id: 2, value: "Khoa học - Công nghệ" },
  { id: 3, value: "Sự kiện nổi bật" },
];

//
//// TODO: Exercises
//
export const mockPostData = [
  {
    id: "1",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    title: "Bài tập ngày 29/9/2024",
    fileName: "exercise.docx",
    comments: [
      {
        id: "1",
        author: "Huỳnh Hồ Thị Mộng Trinh",
        content: "Các em mau chóng đăng ký nhóm đúng hạn",
      },
      {
        id: "2",
        author: "Lê Thành Lộc",
        content: "Nộp bài trễ được không cô?",
      },
    ],
  },
  {
    id: "2",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    title: "Bài tập ngày 29/9/2024",
    fileName: "exercise.docx",
    comments: [
      {
        id: "1",
        author: "Huỳnh Hồ Thị Mộng Trinh",
        content: "Các em mau chóng đăng ký nhóm đúng hạn",
      },
    ],
  },
  {
    id: "3",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    title: "Bài tập ngày 29/9/2024",
    fileName: "exercise.docx",
    comments: [
      {
        id: "1",
        author: "Huỳnh Hồ Thị Mộng Trinh",
        content: "Các em mau chóng đăng ký nhóm đúng hạn",
      },
    ],
  },
];

//
// TODO: Joined Courses
//
export const mockCourses = [
  {
    id: "SE114.N21.PMCL",
    type: "regular",
    name: "Nhập môn ứng dụng di động",
    semester: "HK1/2024",
    teachers: "Trịnh Văn A, Nguyễn Văn H, +1",
    subCourses: [
      {
        id: "SE114.N21.PMCL",
        type: "LT",
        teacher: "Trịnh Văn A",
      },
      {
        id: "SE114.N21.PMCL.1",
        type: "TH",
        teacher: "Nguyễn Văn H",
      },
      {
        id: "SE114.N21.PMCL.2",
        type: "TH",
        teacher: "Lê Minh T",
      },
    ],
  },
  {
    id: "SE100.N23.PMCL",
    type: "regular",
    name: "Phương pháp phát triển phần mềm hướng đối tượng",
    semester: "HK2/2024",
    teachers: "Nguyễn Hoàng Linh, Nguyễn Văn H",
    subCourses: [
      {
        id: "SE100.N23.PMCL",
        type: "LT",
        teacher: "Trịnh Văn A",
      },
      {
        id: "SE100.N23.PMCL.1",
        type: "TH",
        teacher: "Nguyễn Văn H",
      },
    ],
  },
  {
    id: "SE501.N21.PMCL",
    type: "intern",
    name: "Thực tập doanh nghiệp",
    semester: "HK1/2024",
    teachers: "Nguyễn Ngọc Quí, Trịnh Văn A, Nguyễn Văn H, +12",
    subCourses: [
      {
        id: "SE501.N21.PMCL",
        type: "general",
        teacher: "Lớp chung",
      },
      {
        id: "80001",
        type: "advisor",
        teacher: "Nguyễn Ngọc Quí",
      },
      {
        id: "80002",
        type: "advisor",
        teacher: "Trịnh Văn A",
      },
      {
        id: "80003",
        type: "advisor",
        teacher: "Nguyễn Văn H",
      },
      {
        id: "80004",
        type: "advisor",
        teacher: "Lê Thị B",
      },
      {
        id: "80005",
        type: "advisor",
        teacher: "Phan Minh T",
      },
      {
        id: "80006",
        type: "advisor",
        teacher: "Nguyễn Quốc C",
      },
      {
        id: "80007",
        type: "advisor",
        teacher: "Vũ Minh H",
      },
      {
        id: "80008",
        type: "advisor",
        teacher: "Hoàng Thị N",
      },
      {
        id: "80009",
        type: "advisor",
        teacher: "Trần Văn K",
      },
      {
        id: "80010",
        type: "advisor",
        teacher: "Lý Thiên L",
      },
    ],
  },
  {
    id: "SE121.O21.PMCL",
    type: "project",
    name: "Đồ án 1",
    semester: "HK1/2024",
    teachers: "Nguyễn Ngọc Quí, Trịnh Văn A, Nguyễn Văn H, +12",
    subCourses: [
      {
        id: "SE121.O21.PMCL",
        type: "general",
        teacher: "Lớp chung",
      },
      {
        id: "80001",
        type: "advisor",
        teacher: "Nguyễn Ngọc Quí",
      },
      {
        id: "80002",
        type: "advisor",
        teacher: "Trịnh Văn A",
      },
      {
        id: "80003",
        type: "advisor",
        teacher: "Nguyễn Văn H",
      },
      {
        id: "80004",
        type: "advisor",
        teacher: "Lê Thị B",
      },
      {
        id: "80005",
        type: "advisor",
        teacher: "Phan Minh T",
      },
      {
        id: "80006",
        type: "advisor",
        teacher: "Nguyễn Quốc C",
      },
      {
        id: "80007",
        type: "advisor",
        teacher: "Vũ Minh H",
      },
      {
        id: "80008",
        type: "advisor",
        teacher: "Hoàng Thị N",
      },
      {
        id: "80009",
        type: "advisor",
        teacher: "Trần Văn K",
      },
      {
        id: "80010",
        type: "advisor",
        teacher: "Lý Thiên L",
      },
    ],
  },
];

//
// TODO: CourseID page
//
export const mockPostDataCourseIdPage = [
  {
    id: "1",
    typePost: "report",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    title: "Báo cáo Cuối kỳ ngày 29/9/2024",
    fileName: "Requirements.docx",
    comments: [
      {
        id: "1",
        author: "Huỳnh Hồ Thị Mộng Trinh",
        content: "Các em mau chóng đăng ký nhóm đúng hạn",
      },
      {
        id: "2",
        author: "Lê Thành Lộc",
        content: "Nộp bài trễ được không cô?",
      },
    ],
  },
  {
    id: "2",
    typePost: "exercise",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    title: "Bài tập ngày 29/9/2024",
    fileName: "exercise.docx",
    comments: [
      {
        id: "1",
        author: "Huỳnh Hồ Thị Mộng Trinh",
        content: "Các em mau chóng đăng ký nhóm đúng hạn",
      },
    ],
  },
  {
    id: "3",
    typePost: "exercise",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    title: "Bài tập ngày 29/9/2024",
    fileName: "exercise.docx",
    comments: [
      {
        id: "1",
        author: "Huỳnh Hồ Thị Mộng Trinh",
        content: "Các em mau chóng đăng ký nhóm đúng hạn",
      },
    ],
  },
];

//
// TODO: Create annoucement
//
export const mockCoursesList = [
  { id: 1, value: "SE114.N21.PMCL.1" },
  { id: 2, value: "SE114.N21.PMCL.2" },
  { id: 3, value: "SE100.N23.PMCL.1" },
  { id: 4, value: "SE100.N23.PMCL.2" },
];

//
// TODO: Create exercise
//
export const mockTeacherList = [
  { id: 1, value: "Huỳnh Hồ Thị Mộng Trinh" },
  { id: 2, value: "Nguyễn Thị Thanh Trúc" },
  { id: 3, value: "Đặng Việt Dũng" },
];
export const mockOfficerList = [{ id: 1, value: "Trần Hạnh Xuân" }];

//
// TODO: Mock Db Semester
//
export const mockSemesterList = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
];

//
// TODO: Mock Db Year
//
export const mockYearList = [
  { id: 1, value: 2020 },
  { id: 2, value: 2021 },
  { id: 3, value: 2022 },
  { id: 4, value: 2023 },
  { id: 5, value: 2024 },
  { id: 6, value: 2025 },
];

//
// TODO: Approve Topic Options
//
export const mockApproveTopicOptions = [
  { id: 1, value: "Tất cả" },
  { id: 2, value: "Đã chỉ định giảng viên" },
  { id: 3, value: "Chưa chỉ định giảng viên" },
  { id: 4, value: "Đã từ chối" },
];

//
// TODO: Score Transcript
//
export const mockSubCoursesOfCourseScoreTranscript = [
  { id: 1, value: "Điểm lớp lý thuyết" },
  { id: 2, value: "Điểm lớp thực hành" },
  { id: 3, value: "Điểm tổng kết" },
];
export const mockDataScoreTranscript = [
  {
    STT: "1",
    isDeleted: false,
    data: {
      Nhóm: "STYLLE",
      "Họ và tên": "Nguyễn Hoàng Linh",
      MSSV: "21522289",
      "Quá trình": 9,
      "Giữa kỳ": 8,
      "Thực hành": 8,
      "Cuối kỳ": 10,
      "Điểm trung bình": 8,
    },
  },
  {
    STT: "2",
    isDeleted: false,
    data: {
      Nhóm: "STYLLE",
      "Họ và tên": "Lê Thành Lộc",
      MSSV: "21522289",
      "Quá trình": 9,
      "Giữa kỳ": 8,
      "Thực hành": 8,
      "Cuối kỳ": 10,
      "Điểm trung bình": 8,
    },
  },
  {
    STT: "3",
    isDeleted: false,
    data: {
      Nhóm: "Mern",
      "Họ và tên": "Võ Hữu",
      MSSV: "21522289",
      "Quá trình": 9,
      "Giữa kỳ": 8,
      "Thực hành": 8,
      "Cuối kỳ": 10,
      "Điểm trung bình": 8,
    },
  },
  {
    STT: "4",
    isDeleted: false,
    data: {
      Nhóm: "STYLLE",
      "Họ và tên": "Nguyễn Hoàng Linh",
      MSSV: "21522289",
      "Quá trình": 9,
      "Giữa kỳ": 8,
      "Thực hành": 8,
      "Cuối kỳ": 10,
      "Điểm trung bình": 8,
    },
  },
  {
    STT: "5",
    isDeleted: false,
    data: {
      Nhóm: "STYLLE",
      "Họ và tên": "Lê Thành Lộc",
      MSSV: "21522289",
      "Quá trình": 9,
      "Giữa kỳ": 8,
      "Thực hành": 8,
      "Cuối kỳ": 10,
      "Điểm trung bình": 8,
    },
  },
  {
    STT: "6",
    isDeleted: false,
    data: {
      Nhóm: "Mern",
      "Họ và tên": "Võ Hữu",
      MSSV: "21522289",
      "Quá trình": 9,
      "Giữa kỳ": 8,
      "Thực hành": 8,
      "Cuối kỳ": 10,
      "Điểm trung bình": 8,
    },
  },
];

//
// TODO: Score Transcript
//
export const mockFileDataTable = [
  {
    STT: 1,
    isDeleted: false,
    data: {
      "Tên file": "Nộp bài tập 27/9/2024.docx",
      "Ngày sửa đổi": "27 tháng 9 năm 2024",
      "Người sửa đổi": "Huỳnh Hồ Thị Mộng Trinh",
    },
  },

  {
    STT: 2,
    isDeleted: false,
    data: {
      "Tên file": "Nộp bài tập 27/9/2024.xlsx",
      "Ngày sửa đổi": "27 tháng 9 năm 2024",
      "Người sửa đổi": "Lê Thành Lộc",
    },
  },
  {
    STT: 3,
    isDeleted: false,
    data: {
      "Tên file": "Nộp bài tập 27/9/2024.pdf",
      "Ngày sửa đổi": "27 tháng 9 năm 2024",
      "Người sửa đổi": "Nguyễn Hoàng Linh",
    },
  },
  {
    STT: 4,
    isDeleted: false,
    data: {
      "Tên file": "Nộp bài tập 27/9/2024.pptx",
      "Ngày sửa đổi": "27 tháng 9 năm 2024",
      "Người sửa đổi": "Lê Thành Lộc",
    },
  },
  {
    STT: 5,
    isDeleted: false,
    data: {
      "Tên file": "Nộp bài tập 27/9/2024.zip",
      "Ngày sửa đổi": "27 tháng 9 năm 2024",
      "Người sửa đổi": "Nguyễn Hoàng Linh",
    },
  },
];

//
// TODO: Centralized exam
//
export const mockCentralizedExam = [
  {
    id: "1",
    name: "Thi giữa kỳ",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    happeningEvent: "Đăng ký nhóm và đề tài báo cáo",
    deadline: "10/09/2024 - 00:00AM",
  },
  {
    id: "2",
    name: "Thi cuối kỳ",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    happeningEvent: "Đăng ký nhóm và đề tài báo cáo",
    deadline: "10/09/2024 - 00:00AM",
  },
];

export const mockHappeningEventRegister = [
  {
    id: "1",
    name: "Đăng ký nhóm",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    deadline: "10/09/2024 - 00:00AM",
  },
  {
    id: "2",
    name: "Đăng ký đề tài",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    deadline: "10/09/2024 - 00:00AM",
  },
];

//
// TODO: Big Exercise List
//
export const mockBigExercisesList = [
  {
    id: "1",
    name: "Seminar giữa kỳ",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    happeningEvent: "Đăng ký nhóm và đề tài báo cáo",
    deadline: "10/09/2024 - 00:00AM",
  },
  {
    id: "2",
    name: "Đồ án cuối kỳ",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    happeningEvent: "Đăng ký nhóm và đề tài báo cáo",
    deadline: "10/09/2024 - 00:00AM",
  },
];

//
// TODO: BigExerciseId Page
//
export const mockPostDataWithReport = [
  {
    id: "1",
    typePost: "report",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    title: "Báo cáo Cuối kỳ ngày 29/9/2024",
    fileName: "Requirements.docx",
    comments: [
      {
        id: "1",
        author: "Huỳnh Hồ Thị Mộng Trinh",
        content: "Các em mau chóng đăng ký nhóm đúng hạn",
      },
      {
        id: "2",
        author: "Lê Thành Lộc",
        content: "Nộp bài trễ được không cô?",
      },
    ],
  },
  {
    id: "2",
    typePost: "exercise",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    title: "Bài tập ngày 29/9/2024",
    fileName: "exercise.docx",
    comments: [
      {
        id: "1",
        author: "Huỳnh Hồ Thị Mộng Trinh",
        content: "Các em mau chóng đăng ký nhóm đúng hạn",
      },
    ],
  },
  {
    id: "3",
    typePost: "exercise",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    title: "Bài tập ngày 29/9/2024",
    fileName: "exercise.docx",
    comments: [
      {
        id: "1",
        author: "Huỳnh Hồ Thị Mộng Trinh",
        content: "Các em mau chóng đăng ký nhóm đúng hạn",
      },
    ],
  },
];

//
// TODO: BigExerciseId ListTopic
//
// export const mockTopicDataTable = [
//   {
//     type: "topic",
//     STT: 1,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng hẹn hò",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả":
//         "Kết nối người dùng với những người có sở thích tương tự Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Một ứng dụng áp dụng phiếu giảm giá tự động để đảm bảo cung cấp phiếu giảm giá và giảm giá cho khách hàng",
//     },
//   },
//   {
//     type: "topic",
//     STT: 2,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng chia sẻ hình ảnh",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Nơi người dùng có thể đăng tải và chia sẻ hình ảnh",
//     },
//   },
//   {
//     type: "topic",
//     STT: 3,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng đặt hàng và giao đồ ăn",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả":
//         "Một ứng dụng áp dụng phiếu giảm giá tự động để đảm bảo cung cấp phiếu giảm giá và giảm giá cho khách hàng",
//     },
//   },
//   {
//     type: "topic",
//     STT: 4,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng nhà thông minh",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Giúp người dùng xây dựng một ngôi nhà thông minh và tiện lợi",
//     },
//   },
//   {
//     type: "topic",
//     STT: 5,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng học ngôn ngữ",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả":
//         "Một nền tảng giúp người dùng học các ngôn ngữ mới thông qua bài tập và trò chơi",
//     },
//   },
//   {
//     type: "topic",
//     STT: 6,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng ghi chú",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Giúp người dùng ghi lại và tổ chức các ghi chú của mình",
//     },
//   },
//   {
//     type: "topic",
//     STT: 7,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng quản lý tài chính cá nhân",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Giúp người dùng theo dõi chi tiêu và lập kế hoạch ngân sách",
//     },
//   },
//   {
//     type: "topic",
//     STT: 8,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng chia sẻ xe",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Kết nối người dùng có nhu cầu di chuyển với các tài xế gần đó",
//     },
//   },
//   {
//     type: "topic",
//     STT: 9,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng chăm sóc sức khỏe",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả":
//         "Theo dõi các chỉ số sức khỏe và cung cấp các bài tập luyện tập cá nhân hóa",
//     },
//   },
//   {
//     type: "topic",
//     STT: 10,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng nấu ăn",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Chia sẻ công thức nấu ăn và gợi ý món ăn hàng ngày",
//     },
//   },
//   {
//     type: "topic",
//     STT: 11,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng kết nối bạn bè",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả":
//         "Giúp người dùng tìm kiếm và kết nối với bạn bè có sở thích chung",
//     },
//   },
//   {
//     type: "topic",
//     STT: 12,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng học tập trực tuyến",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Cung cấp các khóa học trực tuyến về nhiều lĩnh vực khác nhau",
//     },
//   },
//   {
//     type: "topic",
//     STT: 13,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng đặt phòng khách sạn",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Đặt phòng khách sạn với giá ưu đãi và nhiều tùy chọn tiện ích",
//     },
//   },
//   {
//     type: "topic",
//     STT: 14,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng theo dõi thể dục",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Giúp người dùng theo dõi các hoạt động thể dục và sức khỏe",
//     },
//   },
//   {
//     type: "topic",
//     STT: 15,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng thời tiết",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Cập nhật thời tiết hiện tại và dự báo thời tiết trong tuần",
//     },
//   },
//   {
//     type: "topic",
//     STT: 16,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng quản lý dự án",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Giúp nhóm lên kế hoạch và theo dõi tiến độ công việc của dự án",
//     },
//   },
//   {
//     type: "topic",
//     STT: 17,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng nhắn tin tức thời",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Cho phép người dùng gửi tin nhắn văn bản và gọi video miễn phí",
//     },
//   },
//   {
//     type: "topic",
//     STT: 18,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng quản lý tài liệu",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Giúp người dùng lưu trữ, tìm kiếm và chia sẻ tài liệu",
//     },
//   },
//   {
//     type: "topic",
//     STT: 19,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng tìm việc làm",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả":
//         "Cung cấp thông tin tuyển dụng và kết nối ứng viên với nhà tuyển dụng",
//     },
//   },
//   {
//     type: "topic",
//     STT: 20,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng đọc sách điện tử",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Một nền tảng để người dùng tải và đọc sách điện tử",
//     },
//   },
//   {
//     type: "topic",
//     STT: 21,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng nghe nhạc trực tuyến",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Cho phép người dùng nghe và chia sẻ nhạc trực tuyến",
//     },
//   },
//   {
//     type: "topic",
//     STT: 22,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng mua sắm trực tuyến",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Cung cấp các sản phẩm đa dạng và giao hàng tận nơi",
//     },
//   },
//   {
//     type: "topic",
//     STT: 23,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng đặt lịch khám bệnh",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Đặt lịch hẹn với bác sĩ và quản lý thông tin sức khỏe cá nhân",
//     },
//   },
//   {
//     type: "topic",
//     STT: 24,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng quản lý thời gian",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Giúp người dùng lập lịch và theo dõi các nhiệm vụ hàng ngày",
//     },
//   },
//   {
//     type: "topic",
//     STT: 25,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng đồ họa",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Một công cụ thiết kế cho người dùng tạo ảnh và video đồ họa",
//     },
//   },
//   {
//     type: "topic",
//     STT: 26,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng hẹn hò",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Kết nối người dùng với những người có sở thích tương tự",
//     },
//   },
//   {
//     type: "topic",
//     STT: 27,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng học lập trình",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả":
//         "Hướng dẫn người dùng học các ngôn ngữ lập trình qua các bài tập thực hành",
//     },
//   },
//   {
//     type: "topic",
//     STT: 28,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng podcast",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Cung cấp các kênh podcast đa dạng về nhiều chủ đề",
//     },
//   },
//   {
//     type: "topic",
//     STT: 29,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng từ điển trực tuyến",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Cho phép người dùng tra từ điển và học từ mới",
//     },
//   },
//   {
//     type: "topic",
//     STT: 30,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng thực tế ảo",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Giúp người dùng trải nghiệm các môi trường thực tế ảo",
//     },
//   },
//   {
//     type: "topic",
//     STT: 31,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng quản lý nhân sự",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả":
//         "Quản lý thông tin và hiệu suất làm việc của nhân viên trong công ty",
//     },
//   },
//   {
//     type: "topic",
//     STT: 32,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng đồ họa",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Một công cụ thiết kế cho người dùng tạo ảnh và video đồ họa",
//     },
//   },
//   {
//     type: "topic",
//     STT: 33,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng chia sẻ hình ảnh",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Nơi người dùng có thể đăng tải và chia sẻ hình ảnh",
//     },
//   },
//   {
//     type: "topic",
//     STT: 34,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng đặt hàng và giao đồ ăn",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả":
//         "Một ứng dụng áp dụng phiếu giảm giá tự động để đảm bảo cung cấp phiếu giảm giá và giảm giá cho khách hàng",
//     },
//   },
//   {
//     type: "topic",
//     STT: 35,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng nhà thông minh",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Giúp người dùng xây dựng một ngôi nhà thông minh và tiện lợi",
//     },
//   },
//   {
//     type: "topic",
//     STT: 36,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng học ngôn ngữ",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả":
//         "Một nền tảng giúp người dùng học các ngôn ngữ mới thông qua bài tập và trò chơi",
//     },
//   },
//   {
//     type: "topic",
//     STT: 37,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng ghi chú",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Giúp người dùng ghi lại và tổ chức các ghi chú của mình",
//     },
//   },
//   {
//     type: "topic",
//     STT: 38,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng quản lý tài chính cá nhân",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Giúp người dùng theo dõi chi tiêu và lập kế hoạch ngân sách",
//     },
//   },
//   {
//     type: "topic",
//     STT: 39,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng chia sẻ xe",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Kết nối người dùng có nhu cầu di chuyển với các tài xế gần đó",
//     },
//   },
//   {
//     type: "topic",
//     STT: 40,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng chăm sóc sức khỏe",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả":
//         "Theo dõi các chỉ số sức khỏe và cung cấp các bài tập luyện tập cá nhân hóa",
//     },
//   },
//   {
//     type: "topic",
//     STT: 41,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng nấu ăn",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Chia sẻ công thức nấu ăn và gợi ý món ăn hàng ngày",
//     },
//   },
//   {
//     type: "topic",
//     STT: 42,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng kết nối bạn bè",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả":
//         "Giúp người dùng tìm kiếm và kết nối với bạn bè có sở thích chung",
//     },
//   },
//   {
//     type: "topic",
//     STT: 43,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng học tập trực tuyến",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Cung cấp các khóa học trực tuyến về nhiều lĩnh vực khác nhau",
//     },
//   },
//   {
//     type: "topic",
//     STT: 44,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng đặt phòng khách sạn",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Đặt phòng khách sạn với giá ưu đãi và nhiều tùy chọn tiện ích",
//     },
//   },
//   {
//     type: "topic",
//     STT: 45,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng theo dõi thể dục",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Giúp người dùng theo dõi các hoạt động thể dục và sức khỏe",
//     },
//   },
//   {
//     type: "topic",
//     STT: 46,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng thời tiết",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Cập nhật thời tiết hiện tại và dự báo thời tiết trong tuần",
//     },
//   },
//   {
//     type: "topic",
//     STT: 47,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng quản lý dự án",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Giúp nhóm lên kế hoạch và theo dõi tiến độ công việc của dự án",
//     },
//   },
//   {
//     type: "topic",
//     STT: 48,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng nhắn tin tức thời",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Cho phép người dùng gửi tin nhắn văn bản và gọi video miễn phí",
//     },
//   },
//   {
//     type: "topic",
//     STT: 49,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng quản lý tài liệu",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Giúp người dùng lưu trữ, tìm kiếm và chia sẻ tài liệu",
//     },
//   },
//   {
//     type: "topic",
//     STT: 50,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng tìm việc làm",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả":
//         "Cung cấp thông tin tuyển dụng và kết nối ứng viên với nhà tuyển dụng",
//     },
//   },
//   {
//     type: "topic",
//     STT: 51,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng đọc sách điện tử",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Một nền tảng để người dùng tải và đọc sách điện tử",
//     },
//   },
//   {
//     type: "topic",
//     STT: 52,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng nghe nhạc trực tuyến",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Cho phép người dùng nghe và chia sẻ nhạc trực tuyến",
//     },
//   },
//   {
//     type: "topic",
//     STT: 53,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
//       "Tên đề tài tiếng Việt": "Ứng dụng mua sắm trực tuyến",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Cung cấp các sản phẩm đa dạng và giao hàng tận nơi",
//     },
//   },
//   {
//     type: "topic",
//     STT: 54,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Huỳnh Tuấn Anh",
//       "Tên đề tài tiếng Việt": "Ứng dụng đặt lịch khám bệnh",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Đặt lịch hẹn với bác sĩ và quản lý thông tin sức khỏe cá nhân",
//     },
//   },
//   {
//     type: "topic",
//     STT: 55,
//     isDeleted: false,
//     data: {
//       "GV phụ trách": "Nguyễn Thị Thanh Trúc",
//       "Tên đề tài tiếng Việt": "Ứng dụng quản lý thời gian",
//       "Tên đề tài tiếng Anh": "English name for topic",
//       "Mô tả": "Giúp người dùng lập lịch và theo dõi các nhiệm vụ hàng ngày",
//     },
//   },
// ];

export const mockTopicDataTable = [
  {
    STT: "1",
    type: "topic",
    isDeleted: false,
    data: {
      "Mã nhóm": "1",
      "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      MSSV: [],
      "Họ và tên": [],
      SĐT: [],
      "Mã đề tài": "1",
      "Tên đề tài tiếng Việt": "Ứng dụng hẹn hò",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả":
        "Kết nối người dùng với những người có sở thích tương tự Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Một ứng dụng áp dụng phiếu giảm giá tự động để đảm bảo cung cấp phiếu giảm giá và giảm giá cho khách hàng",
    },
  },
  {
    STT: "2",
    type: "topic",
    isDeleted: false,
    data: {
      "Mã nhóm": "2",
      "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      MSSV: ["21522289", "21522289"],
      "Họ và tên": ["Lê Thành Lộc", "Huỳnh Hồ Thị Mộng Trinh"],
      SĐT: ["0378060972", "0378060972"],
      "Mã đề tài": "2",
      "Tên đề tài tiếng Việt": "Ứng dụng chia sẻ hình ảnh",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả":
        "Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh",
    },
  },
  {
    STT: "3",
    type: "topic",
    isDeleted: false,
    data: {
      "Mã nhóm": "3",
      "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      MSSV: [],
      "Họ và tên": [],
      SĐT: [],
      "Mã đề tài": "3",
      "Tên đề tài tiếng Việt": "Ứng dụng nhà thông minh",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả": "Giúp người dùng xây dựng một ngôi nhà thông minh và tiện lợi",
    },
  },
  {
    STT: "4",
    type: "topic",
    isDeleted: false,
    data: {
      "Mã nhóm": "4",
      "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      MSSV: ["21522289"],
      "Họ và tên": ["Võ Hữu Xike"],
      SĐT: ["0378060972"],
      "Mã đề tài": "4",
      "Tên đề tài tiếng Việt": "Ứng dụng ghi chú",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả": "Giúp người dùng ghi lại và tổ chức các ghi chú của mình",
    },
  },
];

//
// TODO: BigExerciseId Register topic
//
export const mockDataStudentRegisterTopic = [
  {
    STT: "1",
    type: "topic",
    isDeleted: false,
    data: {
      "Mã nhóm": "1",
      "Mã đề tài": "1",
      "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      MSSV: ["21522289"],
      "Họ và tên": ["Nguyễn Hoàng Linh"],
      SĐT: ["0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng hẹn hò",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả":
        "Kết nối người dùng với những người có sở thích tương tự Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Một ứng dụng áp dụng phiếu giảm giá tự động để đảm bảo cung cấp phiếu giảm giá và giảm giá cho khách hàng",
    },
  },
  {
    STT: "2",
    type: "topic",
    isDeleted: false,
    data: {
      "Mã nhóm": "2",
      "Mã đề tài": "2",
      "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      MSSV: ["21522289", "21522289"],
      "Họ và tên": ["Lê Thành Lộc", "Huỳnh Hồ Thị Mộng Trinh"],
      SĐT: ["0378060972", "0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng chia sẻ hình ảnh",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả":
        "Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh",
    },
  },
  {
    STT: "3",
    type: "topic",
    isDeleted: false,
    data: {
      "Mã nhóm": "3",
      "Mã đề tài": "3",
      "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      MSSV: ["21522289", "21522289"],
      "Họ và tên": ["Nguyễn Tiến Vĩ", "Nguyễn Vĩ"],
      SĐT: ["0378060972", "0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng nhà thông minh",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả": "Giúp người dùng xây dựng một ngôi nhà thông minh và tiện lợi",
    },
  },
  {
    STT: "4",
    type: "topic",
    isDeleted: false,
    data: {
      "Mã nhóm": "4",
      "Mã đề tài": "4",
      "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      MSSV: ["21522289"],
      "Họ và tên": ["Võ Hữu Xike"],
      SĐT: ["0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng ghi chú",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả": "Giúp người dùng ghi lại và tổ chức các ghi chú của mình",
    },
  },
];

//
// TODO: BigExerciseId Approve topic
//
export const mockDataAllAppproveTopic = [
  {
    STT: "1",
    isDeleted: false,
    data: {
      "Trạng thái": "Đã chỉ định giảng viên",
      "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      "Mã nhóm": "1",
      "Mã đề tài": "1",
      MSSV: ["21522289"],
      "Họ và tên": ["Nguyễn Hoàng Linh"],
      SĐT: ["0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng hẹn hò",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả":
        "Kết nối người dùng với những người có sở thích tương tự Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Một ứng dụng áp dụng phiếu giảm giá tự động để đảm bảo cung cấp phiếu giảm giá và giảm giá cho khách hàng",
    },
  },
  {
    STT: "2",
    isDeleted: false,
    data: {
      "Trạng thái": "Chưa chỉ định giảng viên",
      "GV phụ trách": "Huỳnh Tuấn Anh",
      "Mã nhóm": "2",
      "Mã đề tài": "2",
      MSSV: ["21522289", "21522289"],
      "Họ và tên": ["Lê Thành Lộc", "Huỳnh Hồ Thị Mộng Trinh"],
      SĐT: ["0378060972", "0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng chia sẻ hình ảnh",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả":
        "Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh",
    },
  },
  {
    STT: "3",
    isDeleted: false,
    data: {
      "Trạng thái": "Đã từ chối",
      "GV phụ trách": "Huỳnh Tuấn Anh",
      "Mã nhóm": "3",
      "Mã đề tài": "3",
      MSSV: ["21522289"],
      "Họ và tên": ["Nguyễn Hoàng Linh"],
      SĐT: ["0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng đặt hàng và giao đồ ăn",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả":
        "Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh",
    },
  },
  {
    STT: "4",
    isDeleted: false,
    data: {
      "Trạng thái": "Đã chỉ định giảng viên",
      "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      "Mã nhóm": "4",
      "Mã đề tài": "4",
      MSSV: ["21522289", "21522289"],
      "Họ và tên": ["Lê Thành Lộc", "Huỳnh Hồ Thị Mộng Trinh"],
      SĐT: ["0378060972", "0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng nhà thông minh",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả": "Giúp người dùng xây dựng một ngôi nhà thông minh và tiện lợi",
    },
  },
  {
    STT: "5",
    isDeleted: false,
    data: {
      "Trạng thái": "Chưa chỉ định giảng viên",
      "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      "Mã nhóm": "5",
      "Mã đề tài": "5",
      MSSV: ["21522289"],
      "Họ và tên": ["Nguyễn Hoàng Linh"],
      SĐT: ["0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng học ngôn ngữ",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả": "Giúp người dùng xây dựng một ngôi nhà thông minh và tiện lợi",
    },
  },
  {
    STT: "6",
    isDeleted: false,
    data: {
      "Trạng thái": "Đã từ chối",
      "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      "Mã nhóm": "6",
      "Mã đề tài": "6",
      MSSV: ["21522289", "21522289"],
      "Họ và tên": ["Lê Thành Lộc", "Huỳnh Hồ Thị Mộng Trinh"],
      SĐT: ["0378060972", "0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng ghi chú",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả": "Giúp người dùng ghi lại và tổ chức các ghi chú của mình",
    },
  },
];
export const mockDataAssignedTopic = [
  {
    STT: "1",
    isDeleted: false,
    data: {
      "Trạng thái": "Đã chỉ định giảng viên",
      "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      "Mã nhóm": "1",
      "Mã đề tài": "1",
      MSSV: ["21522289"],
      "Họ và tên": ["Nguyễn Hoàng Linh"],
      SĐT: ["0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng hẹn hò",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả":
        "Kết nối người dùng với những người có sở thích tương tự Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Một ứng dụng áp dụng phiếu giảm giá tự động để đảm bảo cung cấp phiếu giảm giá và giảm giá cho khách hàng",
    },
  },
  {
    STT: "2",
    isDeleted: false,
    data: {
      "Trạng thái": "Đã chỉ định giảng viên",
      "GV phụ trách": "Huỳnh Tuấn Anh",
      "Mã nhóm": "2",
      "Mã đề tài": "2",
      MSSV: ["21522289", "21522289"],
      "Họ và tên": ["Lê Thành Lộc", "Huỳnh Hồ Thị Mộng Trinh"],
      SĐT: ["0378060972", "0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng chia sẻ hình ảnh",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả":
        "Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh",
    },
  },
  {
    STT: "3",
    isDeleted: false,
    data: {
      "Trạng thái": "Đã chỉ định giảng viên",
      "GV phụ trách": "Huỳnh Tuấn Anh",
      "Mã nhóm": "3",
      "Mã đề tài": "3",
      MSSV: ["21522289"],
      "Họ và tên": ["Nguyễn Hoàng Linh"],
      SĐT: ["0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng đặt hàng và giao đồ ăn",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả":
        "Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh",
    },
  },
];
export const mockDataNotAssignedTopic = [
  {
    STT: "1",
    isDeleted: false,
    data: {
      "Trạng thái": "Chưa chỉ định giảng viên",
      "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      "Mã nhóm": "1",
      "Mã đề tài": "1",
      MSSV: ["21522289"],
      "Họ và tên": ["Nguyễn Hoàng Linh"],
      SĐT: ["0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng hẹn hò",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả":
        "Kết nối người dùng với những người có sở thích tương tự Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Một ứng dụng áp dụng phiếu giảm giá tự động để đảm bảo cung cấp phiếu giảm giá và giảm giá cho khách hàng",
    },
  },
  {
    STT: "2",
    isDeleted: false,
    data: {
      "Trạng thái": "Chưa chỉ định giảng viên",
      "GV phụ trách": "Huỳnh Tuấn Anh",
      "Mã nhóm": "2",
      "Mã đề tài": "2",
      MSSV: ["21522289", "21522289"],
      "Họ và tên": ["Lê Thành Lộc", "Huỳnh Hồ Thị Mộng Trinh"],
      SĐT: ["0378060972", "0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng chia sẻ hình ảnh",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả":
        "Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh",
    },
  },
  {
    STT: "3",
    isDeleted: false,
    data: {
      "Trạng thái": "Chưa chỉ định giảng viên",
      "GV phụ trách": "Huỳnh Tuấn Anh",
      "Mã nhóm": "3",
      "Mã đề tài": "3",
      MSSV: ["21522289"],
      "Họ và tên": ["Nguyễn Hoàng Linh"],
      SĐT: ["0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng đặt hàng và giao đồ ăn",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả":
        "Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh",
    },
  },
];
export const mockDataRefuseTopic = [
  {
    STT: "1",
    isDeleted: false,
    data: {
      "Trạng thái": "Đã từ chối",
      "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      "Mã nhóm": "1",
      "Mã đề tài": "1",
      MSSV: ["21522289"],
      "Họ và tên": ["Nguyễn Hoàng Linh"],
      SĐT: ["0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng hẹn hò",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả":
        "Kết nối người dùng với những người có sở thích tương tự Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Một ứng dụng áp dụng phiếu giảm giá tự động để đảm bảo cung cấp phiếu giảm giá và giảm giá cho khách hàng",
    },
  },
  {
    STT: "2",
    isDeleted: false,
    data: {
      "Trạng thái": "Đã từ chối",
      "GV phụ trách": "Huỳnh Tuấn Anh",
      "Mã nhóm": "2",
      "Mã đề tài": "2",
      MSSV: ["21522289", "21522289"],
      "Họ và tên": ["Lê Thành Lộc", "Huỳnh Hồ Thị Mộng Trinh"],
      SĐT: ["0378060972", "0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng chia sẻ hình ảnh",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả":
        "Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh",
    },
  },
  {
    STT: "3",
    isDeleted: false,
    data: {
      "Trạng thái": "Đã từ chối",
      "GV phụ trách": "Huỳnh Tuấn Anh",
      "Mã nhóm": "3",
      "Mã đề tài": "3",
      MSSV: ["21522289"],
      "Họ và tên": ["Nguyễn Hoàng Linh"],
      SĐT: ["0378060972"],
      "Tên đề tài tiếng Việt": "Ứng dụng đặt hàng và giao đồ ăn",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Mô tả":
        "Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh",
    },
  },
];

//
// TODO: Exercise Post item
//
export const mockSubmissionPost = {
  submissionNumber: 60,
  totalNumber: 62,
  lateTime: "2 ngày 12 tiếng",
  columnGrade: "Quá trình",
};

//
// TODO: Big Exercise Id Page
//
export const mockGradeColumnPercent = {
  "Quá trình": 20,
  "Giữa kỳ": 30,
  "Cuối kỳ": 50,
};

//
// TODO: Big Exercise Id Page
//
export const mockPostDataGradingDetail = [
  {
    id: "1",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    title: "Bài tập 1",
    fileName: "exercise.docx",
    scoreDetail: {
      "Bài nộp": "NHL_Bài 1.docx",
      Điểm: 9,
      "Góp ý": "Bài làm sai sót nhiều",
      "Tỉ lệ điểm": 33,
    },
  },
  {
    id: "2",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    title: "Bài tập 2",
    fileName: "exercise.docx",
    scoreDetail: {
      "Bài nộp": "NHL_Bài 1.docx",
      Điểm: 8,
      "Góp ý": "Bài làm tốt",
      "Tỉ lệ điểm": 33,
    },
  },
  {
    id: "3",
    creator: "Huỳnh Hồ Thị Mộng Trinh",
    createdAt: "29/8/2024 7:23AM",
    title: "Bài tập 3",
    fileName: "exercise.docx",
    scoreDetail: {
      "Bài nộp": "NHL_Bài 1.docx",
      Điểm: 10,
      "Góp ý": "",
      "Tỉ lệ điểm": 34,
    },
  },
];

//
// TODO: Steps create report
//
export const mockStepsCreateReport = [
  { id: 1, title: "Bước 1", desc: "Thêm lịch báo cáo" },
  { id: 2, title: "Bước 2", desc: "Thông tin báo cáo đồ án" },
];

//
// TODO: Student list in 1 course
//
export const mockDataImportStudentList = [
  {
    type: "student",
    STT: "1",
    isDeleted: false,
    data: {
      MSSV: "21520062",
      "Tài khoản": "21520062",
      "Mật khẩu": "1",
      "Họ và tên": "Hoàng Đức Mạnh",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "hoangducmanh254@gmail.com",
      SDT: "0889952504",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "2",
    isDeleted: false,
    data: {
      MSSV: "21520112",
      "Tài khoản": "21520112",
      "Mật khẩu": "1",
      "Họ và tên": "Nguyễn Thị Phương Tiên",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "nguyenthiphuongtien12e@gmail.com",
      SDT: "0908953203",
      "Giới tính": "Nữ",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "3",
    isDeleted: false,
    data: {
      MSSV: "21520144",
      "Tài khoản": "21520144",
      "Mật khẩu": "1",
      "Họ và tên": "Nguyễn Văn Hoàng Anh",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "gokudeptrai1@gmail.com",
      SDT: "0985274643",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "4",
    isDeleted: false,
    data: {
      MSSV: "21520166",
      "Tài khoản": "21520166",
      "Mật khẩu": "1",
      "Họ và tên": "Trần Minh Chính",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "minhchinhtran03@gmail.com",
      SDT: "0968134049",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "5",
    isDeleted: false,
    data: {
      MSSV: "21520230",
      "Tài khoản": "21520230",
      "Mật khẩu": "1",
      "Họ và tên": "Trần Thanh Hiền",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "tranthanhhien123bt@gmail.com",
      SDT: "0398285020",
      "Giới tính": "Nữ",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "6",
    isDeleted: false,
    data: {
      MSSV: "21520249",
      "Tài khoản": "21520249",
      "Mật khẩu": "1",
      "Họ và tên": "Hồ Trung Hưng",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "trunghungcd569@gmail.com",
      SDT: "0786963122",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "7",
    isDeleted: false,
    data: {
      MSSV: "21520276",
      "Tài khoản": "21520276",
      "Mật khẩu": "1",
      "Họ và tên": "Đoàn Tấn Khang",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "doank3442@gmail.com",
      SDT: "0356955354",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "8",
    isDeleted: false,
    data: {
      MSSV: "21520316",
      "Tài khoản": "21520316",
      "Mật khẩu": "1",
      "Họ và tên": "Nguyễn Huỳnh Phúc Lâm",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "nguyenphuclam105@gmail.com",
      SDT: "0394610491",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "9",
    isDeleted: false,
    data: {
      MSSV: "21520321",
      "Tài khoản": "21520321",
      "Mật khẩu": "1",
      "Họ và tên": "Bùi Thế Liêm",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "liembuithe3@gmail.com",
      SDT: "0879283260",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "10",
    isDeleted: false,
    data: {
      MSSV: "21520327",
      "Tài khoản": "21520327",
      "Mật khẩu": "1",
      "Họ và tên": "Trần Lê Yến Linh",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "yenlinhtranle@gmail.com",
      SDT: "0849494228",
      "Giới tính": "Nữ",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "11",
    isDeleted: false,
    data: {
      MSSV: "21520340",
      "Tài khoản": "21520340",
      "Mật khẩu": "1",
      "Họ và tên": "Trần Thị Tuyết Mai",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "tranthituyetmai1903@gmail.com",
      SDT: "0394833746",
      "Giới tính": "Nữ",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "12",
    isDeleted: false,
    data: {
      MSSV: "21520387",
      "Tài khoản": "21520387",
      "Mật khẩu": "1",
      "Họ và tên": "Lê Hà Phan",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "nhimtjofc@gmail.com",
      SDT: "0967860868",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "13",
    isDeleted: false,
    data: {
      MSSV: "21520392",
      "Tài khoản": "21520392",
      "Mật khẩu": "1",
      "Họ và tên": "Phạm Minh Phát",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "phatphamlqdhsch@gmail.com",
      SDT: "0398298722",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "14",
    isDeleted: false,
    data: {
      MSSV: "21520405",
      "Tài khoản": "21520405",
      "Mật khẩu": "1",
      "Họ và tên": "Phan Ngọc Phước",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "phanngocphuoc8@gmail.com",
      SDT: "0899229788",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "15",
    isDeleted: false,
    data: {
      MSSV: "21520455",
      "Tài khoản": "21520455",
      "Mật khẩu": "1",
      "Họ và tên": "Phan Tuấn Thành",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "thanhphantuan1110@gmail.com",
      SDT: "0707414980",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "16",
    isDeleted: false,
    data: {
      MSSV: "21520465",
      "Tài khoản": "21520465",
      "Mật khẩu": "1",
      "Họ và tên": "Nguyễn Huỳnh Phúc Thịnh",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "phuclam1005@gmail.com",
      SDT: "0931301807",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "17",
    isDeleted: false,
    data: {
      MSSV: "21520478",
      "Tài khoản": "21520478",
      "Mật khẩu": "1",
      "Họ và tên": "Lương Lê Duy Tiến",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "dangkhoa141003@gmail.com",
      SDT: "0938275259",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "18",
    isDeleted: false,
    data: {
      MSSV: "21520519",
      "Tài khoản": "21520519",
      "Mật khẩu": "1",
      "Họ và tên": "Lê Thanh Tuấn",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "thanhtuanuitk16@gmail.com",
      SDT: "0702290135",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "19",
    isDeleted: false,
    data: {
      MSSV: "21520536",
      "Tài khoản": "21520536",
      "Mật khẩu": "1",
      "Họ và tên": "Trần Ngọc Nhật Vy",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "vv0320nt@gmail.com",
      SDT: "0813474749",
      "Giới tính": "Nữ",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
  {
    type: "student",
    STT: "20",
    isDeleted: false,
    data: {
      MSSV: "21520607",
      "Tài khoản": "21520607",
      "Mật khẩu": "1",
      "Họ và tên": "Lâm Gia Bảo",
      "Lớp sinh hoạt": "PMCL2021.2",
      Email: "lamgiabao1039@gmail.com",
      SDT: "0932870398",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/2003",
    },
  },
];

//
// TODO: Teacher list in 1 course
//
export const mockDataImportTeacherList = [
  {
    type: "teacher",
    STT: "1",
    isDeleted: false,
    data: {
      "Mã cán bộ": "80001",
      "Tài khoản": "manhhd",
      "Mật khẩu": "1",
      "Họ và tên": "Hoàng Đức Mạnh",
      "Học vị": "Th.S",
      "Hướng nghiên cứu": "Các hệ thống thông minh",
      "Quan tâm tìm hiểu": "Quy trình, công nghệ phát triển game, phần mềm",
      Email: "hoangducmanh254@gmail.com",
      SDT: "0889952504",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/1995",
    },
  },
  {
    type: "teacher",
    STT: "2",
    isDeleted: false,
    data: {
      "Mã cán bộ": "80002",
      "Tài khoản": "tienntp",
      "Mật khẩu": "1",
      "Họ và tên": "Nguyễn Thị Phương Tiên",
      "Học vị": "T.S",
      "Hướng nghiên cứu":
        "Quy trình, phương pháp phát triển phần mềm (Agile,Scrum, XP,..), bài toán tối ưu trong quản lý ",
      "Quan tâm tìm hiểu":
        "Công nghệ lập trình Web, Open Source liên quan đến hướng nghiên cứu quản lý dự án, CRM/ERP, CMS,..",
      Email: "nguyenthiphuongtien12e@gmail.com",
      SDT: "0908953203",
      "Giới tính": "Nữ",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/1995",
    },
  },
  {
    type: "teacher",
    STT: "3",
    isDeleted: false,
    data: {
      "Mã cán bộ": "80003",
      "Tài khoản": "anhnvh",
      "Mật khẩu": "1",
      "Họ và tên": "Nguyễn Văn Hoàng Anh",
      "Học vị": "Th.S",
      "Hướng nghiên cứu": "Các hệ thống thông minh",
      "Quan tâm tìm hiểu": "Quy trình, công nghệ phát triển game, phần mềm",
      Email: "gokudeptrai1@gmail.com",
      SDT: "0985274643",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/1995",
    },
  },
  {
    type: "teacher",
    STT: "4",
    isDeleted: false,
    data: {
      "Mã cán bộ": "80004",
      "Tài khoản": "chinhtm",
      "Mật khẩu": "1",
      "Họ và tên": "Trần Minh Chính",
      "Học vị": "Th.S",
      "Hướng nghiên cứu":
        "Quy trình, phương pháp phát triển phần mềm (Agile,Scrum, XP,..), bài toán tối ưu trong quản lý ",
      "Quan tâm tìm hiểu":
        "Công nghệ lập trình Web, Open Source liên quan đến hướng nghiên cứu quản lý dự án, CRM/ERP, CMS,..",
      Email: "minhchinhtran03@gmail.com",
      SDT: "0968134049",
      "Giới tính": "Nam",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/1995",
    },
  },
  {
    type: "teacher",
    STT: "5",
    isDeleted: false,
    data: {
      "Mã cán bộ": "80005",
      "Tài khoản": "hientt",
      "Mật khẩu": "1",
      "Họ và tên": "Trần Thanh Hiền",
      "Học vị": "Th.S",
      "Hướng nghiên cứu": "Các hệ thống thông minh",
      "Quan tâm tìm hiểu": "Quy trình, công nghệ phát triển game, phần mềm",
      Email: "tranthanhhien123bt@gmail.com",
      SDT: "0398285020",
      "Giới tính": "Nữ",
      "Địa chỉ": "Thôn 2, EaNam, EaH’Leo, Đăk Lăk",
      "Ngày sinh": "26/09/1995",
    },
  },
];

//
//// TODO: Query exact student Id from db
//
export const mockDbStudent = [
  {
    id: "21522289",
    name: "Nguyễn Hoàng Linh",
    class: "SE502.N21",
  },
  {
    id: "21521087",
    name: "Lê Thành Lộc",
    class: "SE502.N21",
  },
  {
    id: "21521632",
    name: "Võ Hữu",
    class: "SE502.N25",
  },
];

//
//// TODO: Courses List from Db
//
export const mockDbCourses = [
  {
    STT: 1,
    "Mã lớp": "IT002.O21.CLC",
    "Tên môn học": "Lập trình hướng đối tượng",
  },
  {
    STT: 2,
    "Mã lớp": "IT003.O21.CLC",
    "Tên môn học": "Cấu trúc dữ liệu và giải thuật",
  },
  {
    STT: 3,
    "Mã lớp": "IT004.O21.CLC",
    "Tên môn học": "Cơ sở dữ liệu",
  },
  {
    STT: 4,
    "Mã lớp": "IT005.O21.CLC",
    "Tên môn học": "Hệ điều hành",
  },
  {
    STT: 5,
    "Mã lớp": "IT006.O21.CLC",
    "Tên môn học": "Mạng máy tính",
  },
  {
    STT: 6,
    "Mã lớp": "IT007.O21.CLC",
    "Tên môn học": "Phân tích thiết kế hệ thống",
  },
  {
    STT: 7,
    "Mã lớp": "IT008.O21.CLC",
    "Tên môn học": "Công nghệ phần mềm",
  },
  {
    STT: 8,
    "Mã lớp": "IT009.O21.CLC",
    "Tên môn học": "Trí tuệ nhân tạo",
  },
];

//
//// TODO: Data Officer Permissions in Setting course
//
export const mockDataOfficerPermissions = [
  {
    name: "Trần Hạnh Xuân",
    email: "xuanth@uit.edu.vn",
    permissions: {
      activityTracking: true,
      createExercise: true,
      createAnnouncement: true,
      createBigExercise: true,
    },
  },
  {
    name: "Nguyễn Văn A",
    email: "anv@uit.edu.vn",
    permissions: {
      activityTracking: true,
      createExercise: true,
      createAnnouncement: true,
      createBigExercise: true,
    },
  },
];
export const mockDataOfficerDepartmentPermissions = [
  {
    name: "Trần Hạnh Xuân",
    email: "xuanth@uit.edu.vn",
    permissions: {
      manageAcademicStaff: true,
      manageLecturers: true,
      manageStudents: true,
      manageSubjects: true,
      manageClasses: true,
      manageFacultyAnnouncements: true,
      manageAnnouncementCategories: true,
      manageClassStudents: true,
      manageExamSchedules: true,
      manageBigExercisesAnnouncements: true,
      manageProjectProposalSchedules: true,
      manageProjectProposals: true,
      manageProjectGroups: true,
      assignSupervisors: true,
      manageReportSchedules: true,
      submitFeedbackForms: true,
      enterFinalScores: true,
      adjustGradingFormula: true,
      adjustRoundingRules: true,
    },
  },
  {
    name: "Nguyễn Văn A",
    email: "anv@uit.edu.vn",
    permissions: {
      manageAcademicStaff: true,
      manageLecturers: true,
      manageStudents: true,
      manageSubjects: true,
      manageClasses: true,
      manageFacultyAnnouncements: true,
      manageAnnouncementCategories: true,
      manageClassStudents: true,
      manageExamSchedules: true,
      manageBigExercisesAnnouncements: true,
      manageProjectProposalSchedules: true,
      manageProjectProposals: true,
      manageProjectGroups: true,
      assignSupervisors: true,
      manageReportSchedules: true,
      submitFeedbackForms: true,
      enterFinalScores: true,
      adjustGradingFormula: true,
      adjustRoundingRules: true,
    },
  },
];

//
// TODO: Thesis Course Review
//
export const mockThesisReviewTopic = [
  {
    id: "1",
    isReviewd: 0,
    nameTopic:
      "Nghiên cứu giải thuật khuyến nghị và kĩ thuật livestream ứng dụng vào hệ thống thương mại điện tử",
    supervisor: ["Đỗ Thị Thanh Tuyền", "Nguyễn Tấn Toàn"],
    studentIds: ["20521785", "20521761"],
    studentNames: ["Đặng Hồ Anh Quân", "Lê Hoàng Phúc"],
    council: "Hội đồng 1",
    councilInfo: "8h00 sáng thứ 3 ngày 30/07/2024 tại phòng E4.1",
    reviewTeacher: "Đỗ Trọng Hợp",
  },
  {
    id: "2",
    isReviewd: 1,
    nameTopic: "Ứng dụng chia sẻ hình ảnh",
    supervisor: ["Huỳnh Hồ Thị Mộng Trinh"],
    studentIds: ["21522289", "21521087"],
    studentNames: ["Nguyễn Hoàng Linh", "Lê Thành Lộc"],
    council: "Hội đồng 1",
    councilInfo: "8h00 sáng thứ 3 ngày 30/07/2024 tại phòng E4.1",
    reviewTeacher: "Đỗ Thị Thanh Tuyền",
  },
  {
    id: "3",
    isReviewd: 0,
    nameTopic:
      "Nghiên cứu các thuật toán và ứng dụng phát triển Game 3D với hệ thống AI NPC",
    supervisor: ["Nguyễn Thị Xuân Hương", "Nguyễn Thị Thanh Trúc"],
    studentIds: ["20521785", "20521761"],
    studentNames: ["Đặng Hồ Anh Quân", "Lê Hoàng Phúc"],
    council: "Hội đồng 2",
    councilInfo: "8h00 sáng thứ 3 ngày 30/07/2024 tại phòng E4.2",
    reviewTeacher: "Nguyễn Thị Thanh Trúc",
  },
  {
    id: "4",
    isReviewd: 0,
    nameTopic: "Thiết kế hệ thống hỏi đáp về du lịch",
    supervisor: ["Nguyễn Đình Hiển", "Huỳnh Tuấn Anh"],
    studentIds: ["21522289", "21521087"],
    studentNames: ["Nguyễn Hoàng Linh", "Lê Thành Lộc"],
    council: "Hội đồng 2",
    councilInfo: "8h00 sáng thứ 3 ngày 30/07/2024 tại phòng E4.2",
    reviewTeacher: "Đỗ Trọng Hợp",
  },
  {
    id: "5",
    isReviewd: 1,
    nameTopic: "Thiết kế hệ thống hỏi đáp về du lịch",
    supervisor: ["Đỗ Thị Thanh Tuyền", "Đỗ Thị Thanh Tuyền"],
    studentIds: ["20520727", "20521318"],
    studentNames: ["Lê Hoàng Quý", "Huỳnh Trung Hiếu"],
    council: "Hội đồng 2",
    councilInfo: "8h00 sáng thứ 3 ngày 30/07/2024 tại phòng E4.2",
    reviewTeacher: "Đỗ Thị Thanh Tuyền",
  },
];

export const mockThesisReviewCouncils = [
  {
    id: "1",
    council: "Hội đồng 1",
    councilInfo: "8h00 sáng thứ 3 ngày 30/07/2024 tại phòng E4.1",
    numberOfCompletedGradingTopic: 30,
    numberOfTopic: 30,
    president: "Đỗ Trọng Hợp",
    secretary: "Đỗ Thị Thanh Tuyền",
    member: "Nguyễn Thị Thanh Trúc",
  },
  {
    id: "2",
    council: "Hội đồng 2",
    councilInfo: "8h00 sáng thứ 3 ngày 30/07/2024 tại phòng E4.1",
    numberOfCompletedGradingTopic: 20,
    numberOfTopic: 30,
    president: "Đỗ Thị Thanh Tuyền",
    secretary: "Đỗ Trọng Hợp",
    member: "Nguyễn Thị Thanh Trúc",
  },
  {
    id: "3",
    council: "Hội đồng 3",
    councilInfo: "8h00 sáng thứ 3 ngày 30/07/2024 tại phòng E4.2",
    numberOfCompletedGradingTopic: 0,
    numberOfTopic: 30,
    president: "Nguyễn Thị Thanh Trúc",
    secretary: "Đỗ Trọng Hợp",
    member: "Đỗ Thị Thanh Tuyền",
  },
  {
    id: "4",
    council: "Hội đồng 4",
    councilInfo: "8h00 sáng thứ 3 ngày 30/07/2024 tại phòng E4.2",
    numberOfCompletedGradingTopic: 30,
    numberOfTopic: 30,
    president: "Đỗ Trọng Hợp",
    secretary: "Nguyễn Thị Thanh Trúc",
    member: "Đỗ Thị Thanh Tuyền",
  },
  {
    id: "5",
    council: "Hội đồng 5",
    councilInfo: "8h00 sáng thứ 3 ngày 30/07/2024 tại phòng E4.2",
    numberOfCompletedGradingTopic: 12,
    numberOfTopic: 30,
    president: "Đỗ Thị Thanh Tuyền",
    secretary: "Nguyễn Thị Thanh Trúc",
    member: "Đỗ Trọng Hợp",
  },
];

export const mockInternReviewCouncils = [
  {
    id: "1",
    council: "Hội đồng 1",
    councilInfo: "8h00 sáng thứ 3 ngày 30/07/2024 tại phòng E4.1",
    numberOfCompletedGradingForStudents: 30,
    numberOfStudents: 30,
    president: "Đỗ Trọng Hợp",
    secretary: "Đỗ Thị Thanh Tuyền",
    member: "Nguyễn Thị Thanh Trúc",
  },
  {
    id: "2",
    council: "Hội đồng 2",
    councilInfo: "8h00 sáng thứ 3 ngày 30/07/2024 tại phòng E4.1",
    numberOfCompletedGradingForStudents: 20,
    numberOfStudents: 30,
    president: "Đỗ Thị Thanh Tuyền",
    secretary: "Đỗ Trọng Hợp",
    member: "Nguyễn Thị Thanh Trúc",
  },
  {
    id: "3",
    council: "Hội đồng 3",
    councilInfo: "8h00 sáng thứ 3 ngày 30/07/2024 tại phòng E4.2",
    numberOfCompletedGradingForStudents: 0,
    numberOfStudents: 30,
    president: "Nguyễn Thị Thanh Trúc",
    secretary: "Đỗ Trọng Hợp",
    member: "Đỗ Thị Thanh Tuyền",
  },
  {
    id: "4",
    council: "Hội đồng 4",
    councilInfo: "8h00 sáng thứ 3 ngày 30/07/2024 tại phòng E4.2",
    numberOfCompletedGradingForStudents: 30,
    numberOfStudents: 30,
    president: "Đỗ Trọng Hợp",
    secretary: "Nguyễn Thị Thanh Trúc",
    member: "Đỗ Thị Thanh Tuyền",
  },
  {
    id: "5",
    council: "Hội đồng 5",
    councilInfo: "8h00 sáng thứ 3 ngày 30/07/2024 tại phòng E4.2",
    numberOfCompletedGradingForStudents: 12,
    numberOfStudents: 30,
    president: "Đỗ Thị Thanh Tuyền",
    secretary: "Nguyễn Thị Thanh Trúc",
    member: "Đỗ Trọng Hợp",
  },
];

export const mockThesisTopicGradeInCouncil = [
  {
    STT: "1",
    data: {
      "Mã nhóm": "1",
      MSSV: ["21522289"],
      "Họ và tên": ["Nguyễn Hoàng Linh"],
      "Tên đề tài tiếng Việt": "Ứng dụng hẹn hò",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Phản biện": "8",
      "Hướng dẫn": "9",
      "Chủ tịch": "8",
      "Thư ký": "9",
      "Ủy viên": "9",
      "Điểm tổng": "9.2",
    },
  },
  {
    STT: "2",
    data: {
      "Mã nhóm": "2",
      MSSV: ["21522289", "21522289"],
      "Họ và tên": ["Lê Thành Lộc", "Huỳnh Hồ Thị Mộng Trinh"],
      "Tên đề tài tiếng Việt": "Ứng dụng chia sẻ hình ảnh",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Phản biện": "",
      "Hướng dẫn": "9",
      "Chủ tịch": "8",
      "Thư ký": "9",
      "Ủy viên": "8",
      "Điểm tổng": "",
    },
  },
  {
    STT: "3",
    data: {
      "Mã nhóm": "3",
      MSSV: ["21522289", "21522289"],
      "Họ và tên": ["Nguyễn Tiến Vĩ", "Nguyễn Vĩ"],
      "Tên đề tài tiếng Việt": "Ứng dụng nhà thông minh",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Phản biện": "8",
      "Hướng dẫn": "9",
      "Chủ tịch": "8",
      "Thư ký": "9",
      "Ủy viên": "9",
      "Điểm tổng": "9.2",
    },
  },
  {
    STT: "4",
    data: {
      "Mã nhóm": "4",
      MSSV: ["21522289"],
      "Họ và tên": ["Võ Hữu Xike"],
      "Tên đề tài tiếng Việt": "Ứng dụng ghi chú",
      "Tên đề tài tiếng Anh": "English name for topic",
      "Phản biện": "8",
      "Hướng dẫn": "9",
      "Chủ tịch": "8",
      "Thư ký": "9",
      "Ủy viên": "9",
      "Điểm tổng": "9.2",
    },
  },
];

export const mockThesisReviewTicket = [
  {
    STT: "1",
    data: {
      "Mã nhóm": "1",
      MSSV: ["21522289"],
      "Họ và tên": ["Nguyễn Hoàng Linh"],
      "Tên đề tài tiếng Việt": "Ứng dụng hẹn hò",
      "Tên đề tài tiếng Anh": "English name for topic",
      "GV phản biện": "Huỳnh Hồ Thị Mộng Trinh",
      "Phản biện": "8",
      "GV hướng dẫn": "Nguyễn Thị Thanh Trúc",
      "Hướng dẫn": "9",
    },
  },
  {
    STT: "2",
    data: {
      "Mã nhóm": "2",
      MSSV: ["21522289", "21522289"],
      "Họ và tên": ["Lê Thành Lộc", "Huỳnh Hồ Thị Mộng Trinh"],
      "Tên đề tài tiếng Việt": "Ứng dụng chia sẻ hình ảnh",
      "Tên đề tài tiếng Anh": "English name for topic",
      "GV phản biện": "Nguyễn Thị Thanh Trúc",
      "Phản biện": "",
      "GV hướng dẫn": "Nguyễn Trịnh Đông",
      "Hướng dẫn": "9",
    },
  },
  {
    STT: "3",
    data: {
      "Mã nhóm": "3",
      MSSV: ["21522289", "21522289"],
      "Họ và tên": ["Nguyễn Tiến Vĩ", "Nguyễn Vĩ"],
      "Tên đề tài tiếng Việt": "Ứng dụng nhà thông minh",
      "Tên đề tài tiếng Anh": "English name for topic",
      "GV phản biện": "Đặng Việt Dũng",
      "Phản biện": "8",
      "GV hướng dẫn": "Nguyễn Thị Thanh Trúc",
      "Hướng dẫn": "9",
    },
  },
  {
    STT: "4",
    data: {
      "Mã nhóm": "4",
      MSSV: ["21522289"],
      "Họ và tên": ["Võ Hữu Xike"],
      "Tên đề tài tiếng Việt": "Ứng dụng ghi chú",
      "Tên đề tài tiếng Anh": "English name for topic",
      "GV phản biện": "Huỳnh Hồ Thị Mộng Trinh",
      "Phản biện": "8",
      "GV hướng dẫn": "Đặng Việt Dũng",
      "Hướng dẫn": "9",
    },
  },
];

//
// TODO: Intern Review Detail
//
export const mockInternReviewDetail = [
  {
    STT: "1",
    data: {
      MSSV: "21522289",
      "Họ và tên": "Nguyễn Hoàng Linh",
      "Vị trí thực tập": "Mobile Devloper",
      "Công ty thực tập": "iZOTA",
      "Chủ tịch": "8",
      "Thư ký": "9",
      "Ủy viên": "9",
      "Điểm tổng": "9.2",
    },
  },
  {
    STT: "2",
    data: {
      MSSV: "21521087",
      "Họ và tên": "Lê Thành Lộc",
      "Vị trí thực tập": "Frontend Devloper",
      "Công ty thực tập": "Phúc Long",
      "Chủ tịch": "8",
      "Thư ký": "9",
      "Ủy viên": "9",
      "Điểm tổng": "9.2",
    },
  },
  {
    STT: "3",
    data: {
      MSSV: "21522289",
      "Họ và tên": "Võ Hữu",
      "Vị trí thực tập": "Mobile Devloper",
      "Công ty thực tập": "DevOps",
      "Chủ tịch": "8",
      "Thư ký": "9",
      "Ủy viên": "9",
      "Điểm tổng": "9.2",
    },
  },
  {
    STT: "4",
    data: {
      MSSV: "21522289",
      "Họ và tên": "Nguyễn Tiến Vĩ",
      "Vị trí thực tập": "Mobile Devloper",
      "Công ty thực tập": "Korea",
      "Chủ tịch": "8",
      "Thư ký": "9",
      "Ủy viên": "9",
      "Điểm tổng": "9.2",
    },
  },
];

//
// TODO: Intern Review
//
export const mockInternReviewTopic = [
  {
    id: "1",
    name: "Mobile Developer - iZOTA",
    supervisor: "Nguyễn Ngọc Quí",
    studentId: "21522289",
    studentName: "Nguyễn Hoàng Linh",
    reportAt: "29/8/2024 7:23AM",
  },
  {
    id: "2",
    name: "DevOps Engineer - BOSCH",
    supervisor: "Nguyễn Ngọc Quí",
    studentId: "21521087",
    studentName: "Lê Thành Lộc",
    reportAt: "29/8/2024 7:23AM",
  },
];
