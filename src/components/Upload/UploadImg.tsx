//@ts-nocheck
import React, { useState }  from 'react';
import {DeleteOutlined} from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { Progress, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import {useUploadFile} from "../../services/mutation/use-upload-file"
import "./UploadImg.sass"

const { Dragger } = Upload;

const props = {
  name: 'file',
  showUploadList: false,
  accept: "image/*" ,
  style : {
    width: 400,
    marginBottom: 14
  },
  height : 180
}






const UploadImg =  ({setImgIdList, files = [], onesType = false, cropSize, type}:any)=> {



	const [imgList, setImgList] = useState(files);


  const {mutate, progress, isLoading} = useUploadFile();


  const handleUpload = async (event:any) => {

     const file = event.file

      if (file) {
        const formData = new FormData();
        
        // Update the formData object
        formData.append('file', file, file.name);
        
          mutate(formData, {
          onSuccess: (res) => {
            setImgIdList((prevList)=> prevList ? [...prevList, res.id] : []);
            setImgList((prevList)=>[...prevList, res])
          },
        });
      }
  };


  const handleRemove = (index:number, ImgId: number)=>{
      const newImgList = [...imgList];

      newImgList.splice(index, 1);

      setImgList([...newImgList]);
      

      if(newImgList.length>0){
        setImgIdList([])
        newImgList.map((img)=> setImgIdList((prevList)=> prevList ? [...prevList, img.id] : []));
        ;

      }else{
        setImgIdList([]);
      }

  }

    return (
      <>
        {onesType &&  imgList.length===1 ? null :
        <>
        {cropSize && type!=="gif" ? <ImgCrop 
          aspect = {cropSize}
          >
          <Dragger 
          {...props}
          height = '180px'
          customRequest =  {handleUpload}
          
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file</p>
          </Dragger>
         
          </ImgCrop>
        :  
        <Dragger 
        {...props}
        customRequest =  {handleUpload}
        
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file</p>
        </Dragger>
        }
        {isLoading &&
        <div style={{ width: 300, marginBottom: 10 }}>
          <Progress percent={progress} size="small"/>
        </div>}
        </>
        
          
        }
          <div className='imgs-container'>
        {imgList.length > 0 && 
          imgList.map((img, index)=>
            <div className='imgs-item'>
            <img className='user-img' src = {img?.file || (img?.isArray() && img[index]?.file)} alt = "img" />
            <div className='imgs-item-hover'>
                <DeleteOutlined  style={{fontSize: 18}} onClick = {()=>handleRemove(index, img.id)}/>
            </div>
            </div>
          )
        }
    </div>
      </>
      
    );
}

export default UploadImg;