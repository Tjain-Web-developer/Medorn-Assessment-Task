import { nanoid } from 'nanoid';
import React, { useState } from 'react'

const CommentForm = () => {
    const [commentDets, setCommentDets] = useState({
        uName: '',
        uComment: '',
        replies: []
    });
    const [allComments, setallComments] = useState([]);

    let [commentList, setCommentList] = useState(null);

    const submitForm = (e) => {
        e.preventDefault();
        if(commentDets.uName.trim() !== '' && commentDets.uComment.trim() !== ''){
            let date = new Date();
            let commentWithId = {...commentDets, id: nanoid(), date: date.toLocaleDateString(), time: date.toLocaleTimeString()};
            setallComments([...allComments, commentWithId]);
            setCommentDets({
                uName: '',
                uComment: ''
            })
        }else{
            alert("Please fill all the fields");
        }
    }

    const changeHandler = (e) => {
        setCommentDets({...commentDets, [e.target.name]: e.target.value, replies: []});
    }

    const replyHandler = (e) => {
        e.preventDefault();
        if(e.target.uname.value.trim() !== '' && e.target.ureply.value.trim() !== ''){
            let date = new Date();
            let commentId = e.target.getAttribute('uId');

            let addReply = {
                replyAuthor: e.target.uname.value,
                replyMessage: e.target.ureply.value,
                date: date.toLocaleDateString(), 
                time: date.toLocaleTimeString()
            }
            
            let newallComments = allComments.map((commentObj) => {
                if(commentObj.id === commentId){
                    commentObj.replies.unshift(addReply);
                    return commentObj;
                }else return commentObj;
            });

            setallComments(newallComments);
            e.target.reset();
        }else{
            alert("Comments cannot be blank");   
        }

    }
    
    if(allComments.length > 0){
        commentList = allComments.map(e => {
            return <li key={e.id} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                <div className="fw-bold">Name: {e.uName}</div>
                    Comment: {e.uComment}
                    <p className='text-muted'>{e.date} | {e.time}</p>
                    {
                        e.replies.length > 0 && 
                        (
                            e.replies.map((eachReply, id) => (
                                <li key={id} className="list-group-item d-flex justify-content-between align-items-start mb-1 border-0 shadow w-100">
                                    <div className="ms-2 me-auto">
                                    <div className="fw-semibold">Name: {eachReply.replyAuthor}</div>
                                        Reply: {eachReply.replyMessage}
                                    </div>
                                    <p className='ms-5 text-muted'>{eachReply.date} | {eachReply.time}</p>
                                </li>
                            ))
                        )
                    }
                </div>
                <hr />
                <form onSubmit={replyHandler} uId={e.id} className="row g-3 justify-content-center">
                    <div className="col-auto">
                        <input name='uname' type="text"  className="form-control" placeholder="Name"/>
                    </div>
                    <div className="col-auto">
                        <input name='ureply' type="text"  className="form-control" placeholder="Reply"/>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary mb-3">Reply</button>
                    </div>
                </form>
            </li>
        })
    }

  return (
    <div>
        <div>
            <ol className="list-group list-group-numbered">
                {
                    commentList
                    ? commentList
                    : <div className="alert alert-dark">No Comments yet, Be the first one to Comment !!</div>
                }
            </ol>
        </div>
        <form onSubmit={submitForm} className="row g-3 bg-dark justify-content-center position-fixed bottom-0 end-0">
            <div className="col-auto">
                <input name='uName' onChange={changeHandler} value={commentDets.uName} type="text" className="form-control" id="inputPassword2" placeholder="Name"/>
            </div>
            <div className="col-auto">
                <input name='uComment' onChange={changeHandler} value={commentDets.uComment} type="text" className="form-control" id="inputPassword2" placeholder="Comment"/>
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-3">Add Comment</button>
            </div>
        </form>
    </div>
  )
}

export default CommentForm