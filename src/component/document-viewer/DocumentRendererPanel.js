import CommentComponent from "../CommentComponent";

export default function DocumentRendererPanel({
                                                  canvasRef,
                                                  setHoverOnCanvas,
                                                  addingMode,
                                                  setComments,
                                                  currentPage,
                                                  file,
                                                  setAddingMode,
                                                  comments
                                              }) {
    return <div className={'vertical overflow-auto center'}
                style={{flexShrink: 1, flexGrow: 1, backgroundColor: '#EFEFEF', position: 'relative'}}
    >
        <div style={{
            position: 'absolute',
            boxShadow: '0px 0px 5px 3px rgba(0,0,0,0.2)',
            marginTop: 10,
            marginBottom: 10
        }}>
            <canvas ref={canvasRef}
                    width={100}
                    height={100}
            />
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            }} onMouseOver={() => setHoverOnCanvas(true)}
                 onMouseLeave={() => setHoverOnCanvas(false)}
                 onClick={onClickCanvas(addingMode, setComments, currentPage, file, setAddingMode)}>
                {comments.filter(comment => comment.page === currentPage).map((comment, index) => {
                    return <CommentComponent key={comment.id} index={index + 1} comment={comment}
                                             canvasRef={canvasRef} setComments={setComments}/>
                })}
            </div>
        </div>
    </div>;
}

function onClickCanvas(addingMode, setComments, currentPage, file, setAddingMode) {
    return (event) => {
        const {offsetX, offsetY} = event.nativeEvent;

        const {width, height} = event.target.getBoundingClientRect();
        if (addingMode) {
            setComments(comments => {
                return [...comments, {
                    y: offsetY / height,
                    x: offsetX / width,
                    page:currentPage,
                    file,
                    comment: '',
                    id: generateUid()
                }]
            });
            setAddingMode(false);
        }
    }
}

function generateUid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = ((Math.random() * 16) | 0), v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
}