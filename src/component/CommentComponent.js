import {useEffect, useRef, useState} from "react";
import {FiSave} from "react-icons/fi";
import {FaUndo} from "react-icons/fa";
import {BiEdit} from "react-icons/bi";

export default function CommentComponent({index, comment, setComments, canvasRef}) {
    const [editMode, setEditMode] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const textAreaRef = useRef();
    useEffect(() => {
        if (editMode) {
            textAreaRef.current.focus();
        }
    }, [editMode]);

    function onSaveChanges() {
        const {width, height} = textAreaRef.current.getBoundingClientRect();
        setEditMode(false);
        setComments(oldComments => {
            const text = textAreaRef.current.value;
            const commentIndex = oldComments.indexOf(comment);
            oldComments.splice(commentIndex, 1, {...comment, width, height, comment: text});
            return [...oldComments];
        });
    }

    return <div style={{
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: 'green',
        top: (comment.y * canvasRef.current.height) - 10,
        left: (comment.x * canvasRef.current.width) - 10,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        lineHeight: 8,
        fontSize: 8,
        boxShadow: '0px 2px 3px 1px rgba(0,0,0,0.1)'
    }}>{index}
        <div style={{width: 1, height: 1, position: 'relative', bottom: -5, right: -5}}>
            <div className={'vertical'}
                 style={{position: 'absolute'}}>
                <textarea ref={textAreaRef} style={{
                    height: comment?.height || 50,
                    width: comment?.width || 200,
                    resize: editMode ? 'both' : 'none',
                    boxSizing: "border-box"
                }} disabled={!editMode}
                          readOnly={!editMode}
                          onMouseOver={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                          defaultValue={comment.comment}
                />
                <div className={'horizontal'}
                     style={{position: 'absolute', opacity: isHovered ? 1 : editMode ? 1 : 0, right: -15, top: -20}}
                     onMouseOver={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}>
                    {editMode &&
                    <>
                        <button className={'comment-component-button hover'} onClick={onSaveChanges}><FiSave size={16}/>
                        </button>
                        <button className={'comment-component-button hover'} style={{marginLeft: 2}}
                                onClick={() => setEditMode(false)}>
                            <FaUndo size={16}/></button>
                    </>
                    }

                    {!editMode &&

                    <button className={'comment-component-button hover'}
                            onClick={() => setEditMode(true)}><BiEdit
                        size={16}/></button>

                    }
                </div>
            </div>
        </div>
    </div>;
}
