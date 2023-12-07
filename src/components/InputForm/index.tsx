import React from "react";
import "./index.css";
import { Cascader, InputNumber, Space } from "antd";

const InputForm: React.FC = () => (
  <Space direction="vertical">
    <InputNumber
      addonBefore={
        <Cascader placeholder="weight (kg)" style={{ width: 150 }} />
      }
      defaultValue={48}
    />
    <InputNumber
      addonBefore={<Cascader placeholder="height(m)" style={{ width: 150 }} />}
      defaultValue={150}
    />
  </Space>
);

export default InputForm;
