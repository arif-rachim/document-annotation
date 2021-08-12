import {IoCaretBack, IoCaretForward, IoCloseCircleOutline, IoPlaySkipBack, IoPlaySkipForward} from "react-icons/io5";
import {FiZoomIn, FiZoomOut} from "react-icons/fi";
import {BiCommentDetail} from "react-icons/bi";

export default function Header({onClose, setCurrentPage, pdf, currentPage, setZoom, setShowComments}) {
    return <div className={'horizontal center header'}>
        <div className={'icon pT-1 mL-2'} onClick={() => onClose()}>
            <IoCloseCircleOutline size={26}/>
        </div>

        <div className={'grow'}/>
        <div className={'icon pT-1'} onClick={onNavigate('first', setCurrentPage, pdf)}>
            <IoPlaySkipBack size={26}/>
        </div>
        <div className={'icon pT-1'} onClick={onNavigate('prev', setCurrentPage, pdf)}>
            <IoCaretBack size={30}/>
        </div>
        <div className={'horizontal center'}>
            <input type="text" style={{width: 40, textAlign: 'center', paddingLeft: 5, paddingRight: 5}}
                   value={currentPage} onChange={() => {
            }}/>
            <div className={'divider'}>{'/'}</div>
            <input style={{width: 40, textAlign: 'center', paddingLeft: 5, paddingRight: 5}}
                   defaultValue={pdf?.numPages} disabled={true}/>
        </div>
        <div className={'icon pT-1'} onClick={onNavigate('next', setCurrentPage, pdf)}>
            <IoCaretForward size={35}/>
        </div>
        <div className={'icon pT-1'} onClick={onNavigate('last', setCurrentPage, pdf)}>
            <IoPlaySkipForward size={30}/>
        </div>
        <div className={'grow'}/>
        <div className={'icon pT-1'} onClick={onZoom(+1, setZoom)}>
            <FiZoomIn size={26}/>
        </div>
        <div className={'icon pT-1'} onClick={onZoom(-1, setZoom)}>
            <FiZoomOut size={26}/>
        </div>
        <div className={'icon pT-1 mL-2 mR-1'} onClick={() => {
            setShowComments(old => !old);
        }}>
            <BiCommentDetail size={26}/>
        </div>
    </div>;
}



function onZoom(increment, setZoom) {
    return event => setZoom(value => value + (0.1 * increment));
}

function onNavigate(action, setCurrentPage, pdf) {
    return () => {
        switch (action) {
            case 'first': {
                setCurrentPage(1);
                break;
            }
            case 'prev': {
                setCurrentPage((old) => {
                    if (old > 1) {
                        return old - 1;
                    }
                    return old;
                })
                break;
            }
            case 'next': {
                setCurrentPage((old) => {
                    if (old < pdf?.numPages) {
                        return old + 1;
                    }
                    return old;
                })
                break;
            }
            default: {
                setCurrentPage(pdf?.numPages);
                break;
            }
        }
    }
}