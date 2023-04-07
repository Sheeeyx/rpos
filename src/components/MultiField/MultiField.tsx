import { Button, Col, Input, Row } from "antd";
import FormItem from "antd/lib/form/FormItem";
import React, { useEffect, useState } from "react";

const { TextArea } = Input;

interface MultiFieldTypes {
    label: string;
    setValue?: any,
    defaultValue?: Array<string>
   
    
}
const MultiField: React.FC<MultiFieldTypes> = ({setValue, defaultValue }) => {

   
    const [formValues, setFormValues] = useState(defaultValue || [{}]);
    
    const addFormFields = () => {   
        setFormValues([...formValues,{}]);
    };

    const removeFormFields = (i: any) => {
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1); 
        setFormValues(newFormValues);
        setValue(newFormValues)
    };

    const changeFormFields = (e:any, index: number)=>{
        const value = e.target.value
        const newFormValues = [...formValues] as any;
        const obj = newFormValues[index];
        obj["name"] = value;
        setFormValues(newFormValues);
        setValue(newFormValues);
        console.log(newFormValues, 'newFormValues')
    }

    const changeUrlFields = (e:any, index: number)=>{
        const value = e.target.value
        const newFormValues = [...formValues] as any;
        const obj = newFormValues[index];
        obj["link"] = value;
        setFormValues(newFormValues);
        setValue(newFormValues);
        console.log(newFormValues, 'newFormValues')
    }

    useEffect(()=>{
        if(defaultValue!==undefined){
            setValue(formValues);
        }
    }, [])
    console.log(formValues,'form')
    return (
        <div>
            {formValues.map((element:any, index) => {
                return(
                <div className="form-inline" key={index}>
                    <Row style={{alignItems: 'start', gap: 12 }}>
                        <Col span={7} style={{marginBottom: 12}}>
                            <FormItem label={"Name"}>
                                    <Input
                                        defaultValue={element && element.name}
                                        onChange = {(event)=>changeFormFields(event, index)}
                                        required/>
                            </FormItem>
                        </Col>
                        <Col span={7} style={{marginBottom: 12}}>
                            <FormItem label={"URL"}>
                                <Input
                                    defaultValue={element && element.link}
                                    onChange = {(event)=>changeUrlFields(event, index)}
                                    required/>
                            </FormItem>
                        </Col>

                        {index ? (
                            <Col span={7} style={{marginTop:"32px"}}>
                                <Button
                                    type="default"
                                    size="large"
                                    onClick={()=>removeFormFields(index)}
                                >
                                    Remove
                                </Button>
                            </Col>
                        ) : null}
                    </Row>
                </div>
                )
         })}
            <div className="button-section">
                <Button type="default" size="large" onClick={addFormFields}>
                    + Add
                </Button>
            </div>
        </div>
    );
};

export default MultiField;
