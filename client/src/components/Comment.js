import React from 'react';
import './stylesheets/Comment.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function Comment({ author, authorId, content, date }) {
    const userId = localStorage.getItem("userId");

    return (
        <div className="comment">
            <div className="comment__header">
                <span className="comment__author">
                    { author }
                </span>
                <span className="comment__date">
                    { date }
                </span>
                {
                    Number(userId) === authorId ?
                        (
                            <span className="comment__icons">
                                <DeleteIcon />
                                <EditIcon className="comment__editIcon" />
                            </span>
                        )
                        : null
                }
            </div>
            <div className="comment__content">
                { content }
            </div>
        </div>
    );
}

export default Comment;
