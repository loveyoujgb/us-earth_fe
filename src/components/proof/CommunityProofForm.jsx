import React, { useCallback, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useInputs from "../../hooks/useInputs";
import { useDispatch, useSelector } from "react-redux";
import { postProof } from "../../redux/modules/proofsSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ProofForm from "./ProofForm";
import { certifyReset } from "../../redux/modules/communitySlice";
import Cookies from "universal-cookie";
import isLogin from "../../lib/isLogin";
import IsLoginModal from "../../pages/IsLoginModal";
import OkModal from "../Modals/OkModal";
import imageCompression from "browser-image-compression";

const CommunityProofForm = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const { dateStatus, participant } = useSelector((state) => state.community.communityDetail);
  const [inputData, inputOnChangeHandler, inputReset] = useInputs({
    title: "",
    content: "",
  });

  const { title, content } = inputData;
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      inputReset();
    };
  }, []);

  /* ---------------------------------- 사진 업로드 ---------------------------------- */
  const [files, setFiles] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [isPhotoMessage, setIsPhotoMessage] = useState("");
  const [isPhoto, setIsPhoto] = useState(true);

  const addImageFile = async (e) => {
    const acceptImageFiles = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    let arry = [];
    setIsPhotoMessage("");
    if (e.target.files.length + previewImg.length < 6) {
      for (let i = 0; i < e.target.files.length; i++) {
        if (acceptImageFiles.includes(e.target.files[i].type)) {
          if (e.target.files[i].size < 210000) {
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
              type: "image/gif",
            };
            try {
              const compressedFile = await imageCompression(e.target.files[i], options);
              let reader = new FileReader();
              reader.readAsDataURL(compressedFile);
              reader.onloadend = () => {
                const previewImgUrl = reader.result;
                setPreviewImg((previewImg) => [...previewImg, { imgUrl: previewImgUrl }]);
              };
              const convertedBlobFile = new File([compressedFile], e.target.files[i].name, { type: e.target.files[i].type, lastModified: Date.now() });
              setFiles((files) => [...files, convertedBlobFile]);
            } catch (error) {
              console.log(error);
            }
          } else {
            arry.push(`${i + 1}`);
          }
        } else {
          setIsPhotoMessage("지원하지 않는 파일 형식입니다.");
        }
      }
    } else {
      setIsPhotoMessage("사진은 5장까지만 등록 가능합니다.");
      setIsPhoto(false);
    }
    if (arry?.length > 0) {
      setIsPhotoMessage(`추가한 ${arry}번째 파일이 너무 큽니다. 20MB미만의 파일만 업로드 됩니다.`);
    }
  };
  console.log(files);
  console.log(previewImg);

  // X버튼 클릭 시 이미지 삭제
  const deleteImageFile = (img, index) => {
    setIsPhotoMessage("");
    setPreviewImg(previewImg.filter((file, id) => id !== index));
    setFiles(files.filter((file, id) => id !== index));
  };

  const submitHandler = async () => {
    let formData = new FormData();
    if (title === "") {
    } else if (content === "") {
      alert("내용을 입력해 주세요");
    } else if (files.length === 0) {
      alert("사진을 추가해 주세요");
    } else {
      const dataSet = {
        ...inputData,
      };
      if (files.length > 0) {
        console.log(files);
        files.map((file) => formData.append("multipartFile", file));
      }
      formData.append("dto", new Blob([JSON.stringify(dataSet)], { type: "application/json" }));
      console.log(dataSet);
      await dispatch(postProof({ communityId: param.communityId, formData: formData }));
      dispatch(certifyReset());
      navigate(`/community/detail/${param.communityId}`);
    }
  };

  const ProofFormData = {
    files: files,
    previewImg: previewImg,
    isPhotoMessage: isPhotoMessage,
    inputOnChangeHandler: inputOnChangeHandler,
    title: title,
    content: content,
    submitHandler: submitHandler,
    deleteImageFile: deleteImageFile,
    addImageFile: addImageFile,
    submitButton: "등록",
  };

  return (
    <>
      {isLogin() ? null : <IsLoginModal />}
      <ProofForm ProofFormData={ProofFormData} />
    </>
  );
};

export default CommunityProofForm;
