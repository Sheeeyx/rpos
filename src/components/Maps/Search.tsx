import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import { Select, Form } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useEffect } from "react";

export const  Search = ({ panTo , setLocation, setLocationBySearch, setPlaceName, defaultPlaceName}:any) => {

    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () =>43.6532, lng: () => -79.3832 } as any,
        radius: 100 * 1000,
      },
    });
    
    const handleInput = (value:string) => {
      setValue(value);
    };
  
    const handleSelect = async (address:any) => {
      setValue(address, false);
      clearSuggestions();
      if(setPlaceName!==undefined){
        setPlaceName(address)
      }
  
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        await setLocation({latitude: lat.toString(), longitude: lng.toString()})
        await setLocationBySearch({latitude: lat.toString(), longitude: lng.toString()})
        
        panTo({ lat, lng });
      } catch (error) {
        console.log("😱 Error: ", error);
      }
    };

    useEffect(()=>{
      if(defaultPlaceName){
        setValue(defaultPlaceName);
        setPlaceName(()=>defaultPlaceName)
      }
    }, [])
    console.log(defaultPlaceName)
    return (
      <div className="search">
          <Select
          showSearch
          value={value}
          defaultActiveFirstOption={false}
          showArrow={false}
          getPopupContainer={trigger => trigger.parentNode}
          onSearch={handleInput}
          onChange={handleSelect}
          notFoundContent={null}
          style = {{width: "320px"}}
        >
            {status === "OK" &&
                data.map(({description }, index) => {
                 return <Select key={index} value={description}>{description}</Select>
                }
                )}
            </Select>

          
      </div>
    );
  }