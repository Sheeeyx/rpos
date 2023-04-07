import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Wsiwyg.sass"


const Wsiwyg = ({value, onChange}:any)=>(

    <ReactQuill 
        value = {value} 
        onChange = {onChange} />

)

export default Wsiwyg;
