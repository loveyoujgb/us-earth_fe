import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useInputs from "../../hooks/useInputs";
import { useDispatch, useSelector } from "react-redux";
import { postProof } from "../../redux/modules/proofsSlice";
import { useNavigate, useParams } from "react-router-dom";
import ProofForm from "./ProofForm";
import { certifyReset, __getCommunityDetail } from "../../redux/modules/communitySlice";
import isLogin from "../../lib/isLogin";
import IsLoginModal from "../Modals/IsLoginModal";
import imageCompression from "browser-image-compression";
import ErrorModal from "../Modals/ErrorModal";

const CommunityProofForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const { isLoading,error } = useSelector((state) => state.proofs);

  const [inputData, inputOnChangeHandler, inputReset] = useInputs({
    title: "",
    content: "",
  });

  const { title, content } = inputData;
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);

  /* ---------------------------------- 사진 업로드 ---------------------------------- */
  const [files, setFiles] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [isPhotoMessage, setIsPhotoMessage] = useState("");
  const [isPhoto, setIsPhoto] = useState(true);
  const [upLoading, setUploading] = useState(100);

  const addImageFile = async (e) => {
    const acceptImageFiles = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    let arry = [];
    setIsPhotoMessage("");
    if (e.target.files.length + previewImg.length < 6) {
      for (let i = 0; i < e.target.files.length; i++) {
        if (acceptImageFiles.includes(e.target.files[i].type)) {
          if (e.target.files[i].size < 21000000) {
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
              onProgress: (data) => {
                console.log(data);
                setUploading(data);
              },
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
      setIsPhotoMessage("최대 5장까지 등록 가능합니다.");
      setIsPhoto(false);
    }
    if (arry?.length > 0) {
      setIsPhotoMessage(`추가한 ${arry}번째 파일이 너무 큽니다. 20MB미만의 파일만 업로드 됩니다.`);
    }
  };

  // X버튼 클릭 시 이미지 삭제
  const deleteImageFile = (img, index) => {
    setIsPhotoMessage("");
    setPreviewImg(previewImg.filter((file, id) => id !== index));
    setFiles(files.filter((file, id) => id !== index));
  };

  /* -------------------------------- 빈값 확인 모달 -------------------------------- */
  const [okModal, setOkModal] = useState(false);
  const [okModalTitle, setOkModalTitle] = useState("");

  const okModalOnOff = () => {
    setOkModal(!okModal);
  };

  const [block, setBlock] = useState(false);
  const submitHandler = async () => {
    let formData = new FormData();
    if (title.trim() !== "" && content.trim() !== "" && files.length !== 0) {
      const dataSet = {
        title: title.trim(),
        content: content.trim(),
      };
      // if (files.length > 0) {
      //   console.log(files);
      //   files.map((file) => formData.append("multipartFile", file));
      // }
      formData.append("dto", new Blob([JSON.stringify(dataSet)], { type: "application/json" }));
      console.log(dataSet);
      await dispatch(postProof({ communityId: param.communityId, formData: formData })).then((response) => {
        console.log(response);
        if (!response.error) {
          navigate(`/community/detail/${param.communityId}`);
        }
      });
      dispatch(certifyReset())
    }
    setBlock(false);
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
    upLoading: upLoading,
    okModal: okModal,
    okModalTitle: okModalTitle,
    okModalOnOff: okModalOnOff,
    block,
    block,
  };

  if (isLoading) {
    return <>작성중 이미지</>;
  }

  if (error) {
    return <ErrorModal error={error} />;
  }

  return (
    <>
      {isLogin() ? null : <IsLoginModal />}
      <ProofForm ProofFormData={ProofFormData} />
    </>
  );
};

export default CommunityProofForm;
