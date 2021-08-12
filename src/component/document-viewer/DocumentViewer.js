import {useEffect, useRef, useState} from "react";
import {
    IoAddCircle,
} from "react-icons/io5";
import Header from "./Header";
import DocumentRendererPanel from "./DocumentRendererPanel";


export default function DocumentViewer({file, onClose, setBusy}) {
    const [documentReady, setDocumentReady] = useState();
    const [pdf, setPdf] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [showComments, setShowComments] = useState(false);
    const [addingMode, setAddingMode] = useState(false);
    const [hoverOnCanvas, setHoverOnCanvas] = useState(false);
    const [zoom, setZoom] = useState(1.5);
    const [comments, setComments] = useState([]);
    const canvasRef = useRef();

    // i know what im doing, i dont need lint to tell me what i should do.
    // eslint-disable-next-line
    useEffect(fileEffect(file, setPdf, setDocumentReady), [file]);
    // eslint-disable-next-line
    useEffect(pdfCurrentPageOrZoomChangeEffect(pdf, setBusy, currentPage, zoom, canvasRef, setDocumentReady), [pdf, currentPage, zoom, setBusy]);
    // eslint-disable-next-line
    useEffect(addingModeHoverOnCanvasChangeEffect(addingMode, hoverOnCanvas), [addingMode, hoverOnCanvas]);

    return <div className={'documentViewer vertical'} style={{top: documentReady ? 0 : '-100%'}}>
        <div className={'vertical overflow-auto height-full'}>
            <div className={'vertical overflow-auto height-full'}>
                <Header onClose={onClose}
                        setCurrentPage={setCurrentPage}
                        pdf={pdf}
                        currentPage={currentPage}
                        setZoom={setZoom}
                        setShowComments={setShowComments}
                />
                <div className={'horizontal grow overflow-auto'}
                     style={{height: 'calc(100% - 52px)', width: '100vw'}}>
                    <DocumentRendererPanel
                        canvasRef={canvasRef}
                        setHoverOnCanvas={setHoverOnCanvas}
                        addingMode={addingMode}
                        setComments={setComments}
                        currentPage={currentPage}
                        file={file}
                        setAddingMode={setAddingMode}
                        comments={comments}
                    />
                    <AddCommentsButton setAddingMode={setAddingMode}/>
                    {showComments &&
                    <CommentsPanel comments={comments}/>
                    }
                </div>
            </div>
        </div>
    </div>
}




function fileEffect(file, setPdf, setDocumentReady) {
    return () => {
        if (file === null || file === undefined) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = async function () {
            const typedarray = new Uint8Array(this.result);
            const loadingTask = () => window.pdfjsLib.getDocument(typedarray).promise;
            const pdf = await loadingTask();
            setPdf(pdf);
        };
        fileReader.readAsArrayBuffer(file);
        return () => setDocumentReady(false);
    };
}

function pdfCurrentPageOrZoomChangeEffect(pdf, setBusy, currentPage, zoom, canvasRef, setDocumentReady) {
    return () => {
        if (pdf === null || pdf === undefined) {
            return;
        }
        (async () => {
            setBusy(true);
            const page = await pdf.getPage(currentPage);
            const scale = zoom;
            const viewport = page.getViewport({scale});
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderTask = () => page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
            await renderTask();
            setBusy(false);

            setDocumentReady(true);
        })();
    };
}




function addingModeHoverOnCanvasChangeEffect(addingMode, hoverOnCanvas) {
    return () => {
        if (addingMode && hoverOnCanvas) {
            document.body.style.cursor = 'copy';
        }
        return () => {
            document.body.style.cursor = 'auto';
        }
    };
}




function CommentsPanel({comments}) {
    return <div className={'vertical'}
                style={{width: 300, backgroundColor: '#EFEFEF', height: '100%', overflow: 'auto'}}>
        <div className={'vertical p-1'} style={{fontSize: 16}}>
            {comments.map((comment, index) => {
                return <div className={'horizontal border p-1 mB-1 shadow-1'}
                            style={{backgroundColor: '#FFFFFF', borderRadius: 3}}>
                    <div style={{fontWeight: 'bold', fontSize: 12, paddingTop: 3}}>{index + 1}</div>
                    <div className={'grow mL-2'}>
                        {comment.comment}</div>
                </div>
            })}
        </div>
    </div>;
}



function AddCommentsButton({setAddingMode}) {
    return <div className={'vertical'}
                style={{width: 1, height: '100%', position: 'relative', backgroundColor: '#EFEFEF'}}>
        <button className={'mR-1 hover shadow-2 mL-2 bc-white'} onClick={() => {
            setAddingMode(old => !old);
        }} style={{right: 25, bottom: 25, position: 'absolute'}}>
            <div className={'horizontal center'}>
                <IoAddCircle size={24}/>
                <div className={'mL-2'} style={{whiteSpace: "nowrap"}}>Add Comments</div>
            </div>
        </button>
    </div>;
}