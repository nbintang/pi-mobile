import axios from "axios";
const TOKEN =
  "JEES_DAN_TEES_NOMOR_SATU_DI_SELURUH_DUNIA-52cb4c3764a300242d8a978341e1fdef7809c5d54bd1dcf8741f30864bca25a5";

  
const model = axios.create({
  baseURL: "https://bxntang-pi-cnn-model.hf.space/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default model;
