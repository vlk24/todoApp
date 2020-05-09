import React from "react"
import "./post-list-item.css"

export class PostListItem extends React.Component {
    render() {
        const { label, important, like, onDelete, onToggleImportant, onToggleLike} = this.props
        let classNames = "app-list-item d-flex justify-content-between"
        if (important) {
            classNames += " important"
        }
        if (like) {
            classNames += " like"
        }
        return (
            <div className={classNames}>
                <span
                onClick={onToggleLike}
                className="app-list-item-label">
                    {label}
                </span>
                <div className="d-flex justify-content-center align-items-center">
                    <button onClick={onToggleImportant} className="btn-star btn-sm">
                        <i className="fa fa-star"></i>
                    </button>
                    <button
                     onClick={onDelete}
                     className="btn-trash btn-sm"
                     >
                        <i className="fa fa-trash-o"></i>
                    </button>
                    <i className="fa fa-heart"></i>
                </div>
            </div>
        )
    }
}



