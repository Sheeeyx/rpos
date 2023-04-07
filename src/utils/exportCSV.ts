import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {tagsType} from '../page/FoodAndDining/config/tags'

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';
export const exportToCSV = (csvData:any, fileName:string) => {

    const takeMedia = (data:any)=>{
        const media = data.map((res:any)=> res.file);
      
      
        return media;
        
      }



    const getData = ()=>{
       let  resultData  = [] as any;
       let res = [] as any;

      resultData =  csvData.map((res:any, index: number) =>[...resultData, {
            "Id": res.id,
            "Latitude": res.latitude,
            "Longitude": res.longitude,
            "Name": res.name,
            "Place name": res.place_name,
            "Please note": res.please_note,
            "Review": res.review,
            "Type model": tagsType[res.type_model as keyof unknown],
            "Media": takeMedia(res.files).join(", "),
            "Is favorite": res.is_favorite,
          }])
        

        resultData.map((item:any) =>res.push(...item))
      console.log(res)
         
        
        return res;
      }




    const ws = XLSX.utils.json_to_sheet(getData());
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
}