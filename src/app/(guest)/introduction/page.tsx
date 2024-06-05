import React from 'react';

const IntroductionPage: React.FC = () => {
  return (
    <div>
      <header style={styles.header}>
        <img src="/images/icon.png" alt="Logo trường" style={styles.logo} />
        <h1>Trường THPT Chuyên UIT</h1>
        <p>Lựa Chọn Hoàn Hảo Cho Hành Trình Kiến Thức Của Bạn</p>
      </header>
      <div style={styles.container}>
        <div style={styles.content}>
          <img src="https://tuyensinh.uit.edu.vn/sites/default/files/uploads/files/dai-hoc-uit-3.jpg" alt="Hình ảnh trường" style={styles.schoolImage} />
          <h1>Kính gửi quý phụ huynh và các em học sinh thân mến,</h1>
          <p>Trong hành trình tìm kiếm một ngôi trường lý tưởng để khơi nguồn tri thức và phát triển toàn diện, trường THPT Chuyên UIT tự hào là một điểm đến đáng tin cậy, mang đến môi trường học tập hiện đại và thân thiện.</p>
          <h2>Giới thiệu về trường</h2>
          <p>Trường THPT Chuyên UIT, trực thuộc Đại học Công nghệ Thông tin - Đại học Quốc gia TP. Hồ Chí Minh, là một trong những ngôi trường chuyên hàng đầu về lĩnh vực Công nghệ Thông tin tại Việt Nam. Được thành lập vào năm 2006, trường đã và đang khẳng định vị thế của mình với nhiều thành tích nổi bật trong giáo dục và nghiên cứu khoa học.</p>
          <h2>Cơ sở vật chất hiện đại</h2>
          <p>Trường THPT Chuyên UIT được trang bị cơ sở vật chất hiện đại với các phòng học thông minh, phòng thí nghiệm tiên tiến và thư viện đa dạng tài liệu. Học sinh sẽ có cơ hội tiếp cận với công nghệ tiên tiến, giúp nâng cao khả năng thực hành và nghiên cứu khoa học.</p>
          <h2>Đội ngũ giảng viên chất lượng</h2>
          <p>Đội ngũ giảng viên tại trường THPT Chuyên UIT đều là những chuyên gia hàng đầu trong lĩnh vực giáo dục và Công nghệ Thông tin. Với phương pháp giảng dạy sáng tạo, nhiệt huyết và tận tâm, thầy cô không chỉ truyền đạt kiến thức mà còn khơi dậy đam mê học tập, sáng tạo của từng học sinh.</p>
          <h2>Chương trình học tập đa dạng</h2>
          <p>Trường cung cấp chương trình học tập chuyên sâu về các môn Toán, Lý, Hóa, Sinh và đặc biệt là Công nghệ Thông Tin. Ngoài ra, học sinh còn được tham gia các khóa học kỹ năng mềm, ngoại ngữ và các hoạt động ngoại khóa phong phú, giúp phát triển toàn diện cả về kiến thức lẫn kỹ năng sống.</p>
          <h2>Môi trường học tập năng động</h2>
          <p>Môi trường học tập tại trường THPT Chuyên UIT luôn khuyến khích sự sáng tạo và đổi mới. Học sinh được tham gia các câu lạc bộ, đội nhóm nghiên cứu và các cuộc thi học thuật trong nước và quốc tế, tạo nên một cộng đồng học tập năng động và sáng tạo.</p>
          <h2>Thành tích nổi bật</h2>
          <p>Trải qua nhiều năm phát triển, học sinh của trường THPT Chuyên UIT đã đạt nhiều thành tích xuất sắc trong các kỳ thi quốc gia và quốc tế. Đây chính là minh chứng cho chất lượng giáo dục vượt trội và sự nỗ lực không ngừng của thầy và trò nhà trường.</p>
          <h2>Lời kết</h2>
          <p>Trường THPT Chuyên UIT tự hào là nơi ươm mầm những tài năng trẻ, giúp các em học sinh tự tin bước vào tương lai với hành trang kiến thức vững vàng và kỹ năng sống phong phú. Chúng tôi luôn chào đón các em học sinh và quý phụ huynh đến thăm quan, tìm hiểu và trở thành một phần của đại gia đình THPT Chuyên UIT.</p>
          <p>Hãy đến và cùng chúng tôi trải nghiệm một môi trường học tập tuyệt vời, nơi mà mọi ước mơ và hoài bão của các em sẽ được chắp cánh bay xa!</p>
          <p>Trân trọng,</p>
          <p><strong>Ban Giám hiệu Trường THPT Chuyên UIT</strong></p>
        </div>
      </div>
      <footer style={styles.footer}>
        <p>Trường THPT Chuyên UIT | Địa chỉ: Khu phố 6, P. Linh Trung, Tp. Thủ Đức, Tp. Hồ Chí Minh</p>
        <p>Điện thoại: (08) 37252002 | Website: <a href="http://www.uit.edu.vn" style={{ color: '#fff' }}>www.uit.edu.vn</a></p>
      </footer>
    </div>
  );
};

const styles = {
  header: {
    textAlign: 'center',
    padding: '50px 0',
    backgroundColor: '#69969C',
    color: '#fff'
  },
  logo: {
    width: '100px',
    marginBottom: '20px'
  },
  container: {
    width: '80%',
    margin: '0 auto'
  },
  content: {
    backgroundColor: '#fff',
    padding: '30px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginTop: '30px',
    borderRadius: '8px'
  },
  schoolImage: {
    width: '100%',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  footer: {
    textAlign: 'center',
    padding: '20px 0',
    backgroundColor: '#69969C',
    color: '#fff',
    marginTop: '30px'
  }
};

export default IntroductionPage;
