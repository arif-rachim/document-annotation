import {IoAddCircle} from "react-icons/io5";
import {FaFilePdf} from "react-icons/fa";
import {useRef,useState} from "react";

export default function PageSelector({onChange,setBusy}) {
    const [files,setFiles] = useState([]);
    const inputFileRef = useRef();
    return <div className={'vertical'}>
        {/*This is the header information */}
        <div className={'horizontal p-1 '}>
            <input type="text" placeholder={'Search Document'} className={'grow shadow-1'}/>
            <button className={'mL-2 hover shadow-1'} onClick={() => {
                inputFileRef.current.click();
            }}>
                <div className={'horizontal center '}>
                    <IoAddCircle size={24}/>
                    <div className={'mL-2'}>Add Document</div>
                </div>
            </button>
            <div style={{display: 'none'}}>
                <input ref={inputFileRef} type={"file"} onChange={onFileSelected(setFiles)}/>
            </div>
        </div>
        {/* This is the body of the page */}
        <div className={'horizontal wrap'}>
            {files.map((file,index) => {
                return <div key={index} className={'vertical center mL-2 mT-1 border p-1 r-1 hover shadow-1'} onClick={() => onChange(file)}>
                    <FaFilePdf size={45}/>
                    <div style={{fontSize:13}}>{file.name}</div>
                </div>
            })}

        </div>
    </div>
}

function onFileSelected(setFiles) {
    return function onChangeHandler(event){
        const file = event.target.files[0];
        setFiles(old => {
            return [...old,file];
        })
    }
}