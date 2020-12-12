import React from 'react';
import './stylesheets/Comment.css';

function Comment({ author, content, date }) {


    return (
        <div className="comment">
            <div className="comment__header">
                <span className="comment__author">
                    { author }
                </span>
                <span className="comment__date">
                    { date }
                </span>
            </div>
            <div className="comment__content">
                { content }
            </div>
        </div>
    );
}

export default Comment;
