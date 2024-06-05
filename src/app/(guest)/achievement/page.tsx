import React from "react";

const AchievementsPage: React.FC = () => {
  return (
    <div>
      <header style={styles.header}>
        <img src="/images/icon.png" alt="Logo trường" style={styles.logo} />
        <h1>Thành Tựu của Trường THPT Chuyên UIT</h1>
        <p>Nơi Tài Năng Tỏa Sáng và Ước Mơ Trở Thành Hiện Thực</p>
      </header>
      <div style={styles.container}>
        <div style={styles.content}>
          <img
            src="https://armypublicschoolalld.org/Uploads/Achievements/AC00020.jpg"
            alt="Hình ảnh thành tựu"
            style={styles.achievementImage}
          />
          <h1>Kính gửi quý phụ huynh và các em học sinh thân mến,</h1>
          <p>
            Trường THPT Chuyên UIT tự hào về những thành tựu xuất sắc đã đạt
            được trong suốt quá trình phát triển. Những thành tựu này không chỉ
            là minh chứng cho chất lượng giáo dục vượt trội mà còn là động lực
            để chúng tôi không ngừng nỗ lực phấn đấu, vươn lên những tầm cao
            mới.
          </p>

          <h2>Thành Tích Học Thuật</h2>
          <ul>
            <li>
              Học sinh trường THPT Chuyên UIT thường xuyên đạt các giải cao
              trong các kỳ thi học sinh giỏi quốc gia và quốc tế về các môn
              Toán, Lý, Hóa, Sinh, và đặc biệt là Công nghệ Thông tin.
            </li>
            <li>
              Trường có nhiều học sinh đạt huy chương vàng, bạc, đồng trong các
              kỳ thi Olympic quốc tế, tạo dấu ấn mạnh mẽ trong cộng đồng giáo
              dục.
            </li>
          </ul>

          <h2>Thành Tích Nghiên Cứu Khoa Học</h2>
          <ul>
            <li>
              Các dự án nghiên cứu khoa học của học sinh trường THPT Chuyên UIT
              luôn được đánh giá cao, với nhiều giải thưởng tại các cuộc thi
              khoa học kỹ thuật cấp quốc gia và quốc tế.
            </li>
            <li>
              Học sinh trường đã có nhiều bài báo khoa học được đăng trên các
              tạp chí uy tín, đóng góp vào sự phát triển của khoa học công nghệ.
            </li>
          </ul>

          <h2>Hoạt Động Ngoại Khóa và Cộng Đồng</h2>
          <ul>
            <li>
              Trường tổ chức nhiều hoạt động ngoại khóa, giúp học sinh phát
              triển toàn diện về kỹ năng sống, kỹ năng giao tiếp và tinh thần
              đồng đội.
            </li>
            <li>
              Học sinh trường thường xuyên tham gia các hoạt động tình nguyện,
              gây quỹ từ thiện, đóng góp tích cực vào cộng đồng và xã hội.
            </li>
          </ul>

          <h2>Lời Kết</h2>
          <p>
            Trường THPT Chuyên UIT luôn tự hào về những thành tựu mà thầy và trò
            đã đạt được. Chúng tôi tin rằng, với nền tảng vững chắc và sự nỗ lực
            không ngừng, học sinh của trường sẽ tiếp tục gặt hái nhiều thành
            công trong tương lai.
          </p>
          <p>
            Hãy đến và cùng chúng tôi chinh phục những đỉnh cao tri thức, biến
            ước mơ của các em thành hiện thực tại Trường THPT Chuyên UIT.
          </p>
          <p>Trân trọng,</p>
          <p>
            <strong>Ban Giám hiệu Trường THPT Chuyên UIT</strong>
          </p>
        </div>
      </div>
      <footer style={styles.footer}>
        <p>
          Trường THPT Chuyên UIT | Địa chỉ: Khu phố 6, P. Linh Trung, Tp. Thủ
          Đức, Tp. Hồ Chí Minh
        </p>
        <p>
          Điện thoại: (08) 37252002 | Website:{" "}
          <a href="http://www.uit.edu.vn" style={{ color: "#fff" }}>
            www.uit.edu.vn
          </a>
        </p>
      </footer>
    </div>
  );
};

const styles = {
  header: {
    textAlign: "center",
    padding: "50px 0",
    backgroundColor: "#69969C",
    color: "#fff",
  },
  logo: {
    width: "100px",
    marginBottom: "20px",
  },
  container: {
    width: "80%",
    margin: "0 auto",
  },
  content: {
    backgroundColor: "#fff",
    padding: "30px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    marginTop: "30px",
    borderRadius: "8px",
  },
  achievementImage: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  footer: {
    textAlign: "center",
    padding: "20px 0",
    backgroundColor: "#69969C",
    color: "#fff",
    marginTop: "30px",
  },
};

export default AchievementsPage;
