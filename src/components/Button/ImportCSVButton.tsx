import { Button, Modal  } from "antd";
import { exportToCSV } from "../../utils/exportCSV";
import { DownloadOutlined } from "@ant-design/icons"
import "./ExportCSVButton.sass"
import { useState } from "react";
import Dragger from "antd/lib/upload/Dragger";
import { InboxOutlined, FileExcelOutlined } from '@ant-design/icons';
import useImportExcel from "../../services/mutation/use-import-excel";
import { useUploadFile } from "../../services/mutation/use-upload-file";
import { toast } from "react-toastify";
import queryClient from "../../configs/react-query.config";




const props = {
    name: 'file',
    showUploadList: false,
    accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    height : 200
  }
interface ImportCSVButtonProps {
  typeMode: string;
  page?: number,
  updateMode?: string;

}
export const ImportCSVButton: React.FC<ImportCSVButtonProps> = ({typeMode, page=1, updateMode})=>{
    const [open, setOpen] = useState(false);
  const {mutate : importMutate, isLoading: importIsLoading} = useImportExcel();
  const {mutate, progress, isLoading} = useUploadFile();
  const [fileName, setFileName] =  useState<any>({name: ""});

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
  };

  const handleUpload = async (event:any) => {

    const file = event.file

     if (file) {
       const formData = new FormData();
       // Update the formData object
       formData.append('file', file, file.name);
       console.log(file)
         mutate(formData, {
         onSuccess: (res) => {
          setFileName(res);
         },
         onError(err){
          toast.error("Something went wrong. Please try again");
         }
       });
     }
 };

 const handleImportCSV = (id:number, type: string)=>{
  importMutate({model: type, file: id}, {
    onSuccess: (res) => {
      setOpen(false);
      toast.success("File imported successfully");
      queryClient.invalidateQueries(`${updateMode}-page=${page}`);
    },
    onError(err){
      toast.error("Сheck the data for correctness and try again");
     }
  })
 }
 const handleOk = (e: React.MouseEvent<HTMLElement>) => {
  handleImportCSV(fileName.id, typeMode)
};


    return(
        <>
         <Button type="primary" 
        shape="round"  
        className={"export-btn"} 
        icon={<DownloadOutlined />}
        onClick={showModal}
        >
            Import
        </Button>
         <Modal
            title="Import Excel"
            visible ={open}
            onOk={handleOk}
            onCancel={handleCancel}
      >
        <Dragger 
        {...props}
        customRequest = {handleUpload}
        
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag Excel file</p>
        </Dragger>
        {fileName.name && <span className="file-name"><FileExcelOutlined />{" "}{fileName.name}</span>}
      </Modal>
        </>
    );
}