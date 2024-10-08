import React, { useState } from "react";
import "./index.scss";
import ImgCrop from "antd-img-crop";

import { Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

const UploadImage: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://anhvufood.vn/wp-content/uploads/hinh-nen-con-meo.jpg",
    },
  ]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div className="upload-file">
      <ImgCrop rotationSlider>
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>
      <div className="upload-file-header">
        <div className="upload-file-heading">Phạm Hoàn</div>
        <div className="upload-file-id">ID: B19DCVT150</div>
      </div>
    </div>
  );
};

export default UploadImage;
