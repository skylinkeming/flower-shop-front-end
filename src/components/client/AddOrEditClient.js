import { useRef, useState } from "react";
import styled from "styled-components";
import { generateBase64FromImage } from "../../util/image";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Config } from "../../util/Constants";
import { axiosErrorHandler } from "../../util/axiosErrorHandler";

const AddOrEditClient = (props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();
  let params = useParams();
  let imagePath = "";

  useEffect(() => {
    if (props.isEdit) {
      axios
        .get(Config.url.API_URL + "/feed/client/" + params.clientId)
        .then((result) => {
          setName(result.data.client.name);
          setPhone(result.data.client.phone);
          setCellPhone(result.data.client.cellPhone);
          setAddress(result.data.client.address);
          setNote(result.data.client.note);
          setPreviewImage(Config.url.API_URL + result.data.client.imageUrl);
        })
        .catch((err) => {
          axiosErrorHandler(err);
          // alert(err.message);
        });
    }
  }, []);

  const checkInfo = () => {
    if (!name) {
      alert("請填入姓名");
      return;
    }
    if (!phone && !cellPhone) {
      alert("請填入電話或手機號碼");
      return;
    }
    if (!address) {
      alert("請填入地址");
      return;
    }
    return true;
  };

  const handleClickEditBtn = async () => {
    if (file) {
      imagePath = await uploadImage();
    }

    axios({
      method: "PUT",
      url: Config.url.API_URL + "/feed/client/" + params.clientId,
      data: {
        name: name,
        phone: phone,
        cellPhone: cellPhone,
        address: address,
        note: note,
        imagePath: imagePath,
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        navigate("/client/" + params.clientId);
      })
      .catch((err) => {
        // alert(err.response.data.message);
        axiosErrorHandler(err);
      });
  };

  const handleClickAddBtn = async () => {
    if (file) {
      imagePath = await uploadImage();
    }

    axios
      .post(
        Config.url.API_URL + "/feed/client",
        {
          name: name,
          phone: phone,
          cellPhone: cellPhone,
          address: address,
          note: note,
          imagePath: imagePath,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        navigate("/client");
      })
      .catch(axiosErrorHandler);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", file);

    const result = await axios({
      method: "POST",
      url: Config.url.API_URL + "/uploadImages",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return result.data.imagePath;
  };

  return (
    <AddClientWrap>
      <main>
        <div className="pageTitle">
          {props.isEdit ? "編輯客戶資料" : "新增客戶資料"}
        </div>
        <div className="addClientForm">
          <div className="title">客戶資料</div>
          <div className="middleInfo">
            <div className="leftInfo">
              <div className="row">
                <label>姓名:</label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="row">
                <label>電話:</label>
                <input
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className="row">
                <label>手機:</label>
                <input
                  value={cellPhone}
                  onChange={(e) => {
                    setCellPhone(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="rightInfo"></div>
          </div>

          <div className="row address">
            <label>地址:</label>
            <input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <div className="row image">
            <label>照片:</label>
            <input
              type="file"
              // value={imageUrl}
              onChange={(e) => {
                generateBase64FromImage(e.target.files[0]).then((b64) => {
                  setPreviewImage(b64);
                });
                setFile(e.target.files[0]);
              }}
              onBlur={() => {}}
            />
          </div>
          <div className="row preview">
            {previewImage && <img src={previewImage} alt="" />}
          </div>
          <div className="row note">
            <label>備註:</label>
            <textarea
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
            />
          </div>
          <div className="btnArea">
            <div
              className="btn add"
              onClick={() => {
                if (!checkInfo()) {
                  return;
                }
                if (props.isEdit) {
                  handleClickEditBtn();
                } else {
                  handleClickAddBtn();
                }
              }}
            >
              {props.isEdit ? "修改" : "新增"}
            </div>
            <div
              className="btn cancel"
              onClick={() => {
                navigate(-1);
              }}
            >
              取消
            </div>
          </div>
        </div>
      </main>
    </AddClientWrap>
  );
};

const AddClientWrap = styled.div`
  display: flex;
  justify-content: center;
  .pageTitle {
    margin-top: 30px;
    font-size: 30px;
    text-align: center;
  }
  .addClientForm {
    font-size: 18px;
    margin: 20px auto 40px auto;
    padding: 20px;
    min-height: 300px;
    font-size: 18px;
    background: white;
    width: 600px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
      0 1px 2px 1px rgb(30 35 90 / 40%);
    @media (max-width: 767px) {
      width: 375px;
    }
    .title {
      font-weight: bold;
      border-bottom: 2px solid rgba(224, 224, 224, 1);
      margin-bottom: 20px;
      padding-bottom: 10px;
      font-size: 20px;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-align-items: flex-end;
      -webkit-box-align: flex-end;
      -ms-flex-align: flex-end;
      align-items: flex-end;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
    }
    .middleInfo {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .row {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      label {
        margin-right: 20px;
        font-weight: bold;
        width: 50px;
        display: inline-block;
        text-align: right;
      }
      input {
        width: 300px;
        height: 40px;
        font-size: 20px;
        padding: 0 10px;
        box-sizing: border-box;
        border: 1px solid gray;
        border-radius: 5px;
        @media (max-width: 767px) {
          width: 250px;
        }
      }
      textarea {
        width: 300px;
        height: 100px;
        font-size: 20px;
        padding: 0 10px;
        box-sizing: border-box;
        border: 1px solid gray;
        padding: 10px;
        border-radius: 5px;
        @media (max-width: 767px) {
          width: 250px;
        }
      }
    }
    .row.image {
      padding-left: 10px;
    }
    .row.preview {
      img {
        width: 180px;
        margin-left: 80px;
      }
    }
    .row.note {
      align-items: flex-start;
      padding-left: 10px;
    }
    .row.address {
      padding-left: 10px;
      input {
        width: 300px;
      }
    }
  }
  .btnArea {
    display: flex;
    font-size: 18px;
    justify-content: center;
    .btn {
      display: inline-block;
      border: 1px solid;
      border-radius: 10px;
      padding: 10px 20px;
      margin-right: 30px;
      font-size: 20px;
      cursor: pointer;
      background: white;
      -webkit-transition: 0.3s;
      transition: 0.3s;
    }
    .btn.add {
      :hover {
        background: #d9fb19;
      }
    }
  }
`;

export default AddOrEditClient;
