import DocumentViewer from "./component/document-viewer/DocumentViewer";
import PageSelector from "./component/PageSelector";
import {useState} from "react";
import { SpinnerCircular } from 'spinners-react';

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isBusy,setBusy] = useState(false);
    return <div className={'vertical'}
                style={{position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden'}}>
        <PageSelector onChange={setSelectedFile} setBusy={setBusy}/>
        <DocumentViewer file={selectedFile} onClose={() => setSelectedFile(null)} setBusy={setBusy}/>
        <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',display:isBusy?'flex':'none',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
            <SpinnerCircular size={200} secondaryColor={'#ccc'} thickness={50} speed={150} />
        </div>
    </div>
}

export default App;
