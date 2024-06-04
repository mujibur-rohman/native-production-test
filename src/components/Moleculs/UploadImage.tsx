import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

// Function to convert a file to a base64 string
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// Component for uploading images
function UploadImage({ onChange, value = [] }: { onChange: (file: UploadFile[]) => void; value: UploadFile[] }) {
  const [previewOpen, setPreviewOpen] = useState(false); // State to control preview visibility
  const [previewImage, setPreviewImage] = useState(""); // State to store the preview image URL
  const [fileList, setFileList] = useState<UploadFile[]>(value); // State to store the list of uploaded files

  // Function to handle image preview
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // Function to handle changes in the file list
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList, file }) => {
    setFileList(newFileList);
    onChange(newFileList);
  };

  // Upload button component
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      {/* Upload component */}
      <Upload accept="image/*" action={process.env.NEXT_PUBLIC_UPLOAD_URL} listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleChange}>
        {fileList.length >= 8 ? null : uploadButton} {/* Limit to 8 files */}
      </Upload>
      {previewImage && (
        // Image preview component
        <Image
          alt="Product Image"
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
}

export default UploadImage;
