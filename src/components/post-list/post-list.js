import React from "react"
import PostListItem from "../post-list-item/"
import { ListGroup } from 'reactstrap';
import "./post-list.css"


export const PostList = ({ posts, onDelete, onToggleImportant, onToggleLike}) => {
   
    const elements = posts.map(item => {
        const {id, ...itemProps}=item
        return (
            <li key={id} className="list-group-item">
                <PostListItem 
                onToggleImportant={()=>{onToggleImportant(id)}}
                onToggleLike={()=>{onToggleLike(id)}}
                onDelete={()=>{onDelete(id)}}  
                {...itemProps} />
            </li>
        )
    }
    )
    return (
        <ListGroup className="app-list">
            {elements}
        </ListGroup>
    )
}