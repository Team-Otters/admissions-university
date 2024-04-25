"use-client";

const FormWish: React.FC = () => {
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="col-sm-4 modal1">
        <form>
          <div className="form-group">
            <label for="idMa">Id mã giảm giá</label>
            <input name="idMa" onChange={handleChange} value={formState.idMa} />
          </div>
          <div className="form-group">
            <label for="phanTram">Phần trăm</label>
            <input
              name="phanTram"
              onChange={handleChange}
              type="number"
              value={formState.phanTram}
            />
          </div>
          <div className="form-group">
            <label for="thoiGianBatDau">Thời gian bắt đầu</label>
            <input
              name="thoiGianBatDau"
              onChange={handleChange}
              type="date"
              value={formState.thoiGianBatDau}
            />
          </div>
          <div className="form-group">
            <label htmlFor="thoiGianKetThuc">Thời gian kết thúc</label>
            <input
              name="thoiGianKetThuc"
              onChange={handleChange}
              type="date"
              value={formState.thoiGianKetThuc}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dichVuApDung">Dịch vụ áp dụng</label>
            <textarea
              name="dichVuApDung"
              onChange={handleChange}
              value={formState.dichVuApDung}
            />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btnSummit" onClick={handleSubmit}>
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};
