import { Button } from "antd";
import { exportToCSV } from "../../utils/exportCSV";
import { DownloadOutlined } from "@ant-design/icons"
import "./ExportCSVButton.sass"




export const ExportCSVButton = ({data, name}:any)=>{
    console.log(data)
    return(
        <Button type="primary" 
        shape="round"  
        className={"export-btn"} 
        icon={<DownloadOutlined />}
        onClick={(e) => exportToCSV(data, name)}
        >
            Export
        </Button>
    );
}