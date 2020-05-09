import React from "react"
import AppHeader from "../app-header/"
import SearchPanel from "../search-panel/"
import PostStatusFilter from "../post-status-filter/"
import PostList from "../post-list/"
import PostAddForm from "../post-add-form/"
import "./app.css"
import styled from "styled-components"
const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`
export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    label: "going to learn react",
                    important: true,
                    like:false,
                    id: 1,
                },
                {
                    label: "Hello",
                    important: true,
                    like:false,
                    id: 2
                },
                {
                    label: "I am no mistaken",
                    important: false,
                    like:false,
                    id: 3
                },
            ],
            term:"",
            filter:"all"
        };
        this.deleteItem = this.deleteItem.bind(this)
        this.addItem = this.addItem.bind(this)
        this.onToggleImportant = this.onToggleImportant.bind(this)
        this.onToggleLike = this.onToggleLike.bind(this)
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
        this.onFilterSelect = this.onFilterSelect.bind(this)
        this.maxId = 4

    }
    deleteItem(id) {

        this.setState(({ data }) => {
            const newData = data.filter(elem => elem.id !== id)
            return { data: newData }
        })
    }
    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            like:false,
            id: this.maxId++
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem]
            return { data: newArr }
        })
    }
    onToggleImportant(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem=>elem.id===id)
            const old = data[index]
            const newItem = {...old, important:!old.important}
            const newArr = [...data.slice(0,index), newItem,...data.slice(index+1)]
            return{data:newArr}
        })
    }
    onToggleLike(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem=>elem.id===id)
            const old = data[index]
            const newItem = {...old, like:!old.like}
            const newArr = [...data.slice(0,index), newItem,...data.slice(index+1)]
            return{data:newArr}
        })
    }
    searchPost(items,term){
        if(term.length===0){
            return items
        }
        return items.filter(item=>item.label.indexOf(term)>-1)
    }
    onUpdateSearch(term){
        this.setState({term})
    }
    filterPost(items, filter){
        if(filter==="like"){
            return items.filter(item=>item.like)
        }
        return items

    }
    onFilterSelect(filter){
        this.setState({filter})
    }

    render() {
         const {data,term,filter} = this.state 
        const liked = data.filter(elem=>elem.like).length
        const allPosts = data.length
        const visiblePost = this.filterPost(this.searchPost(data,term), filter)
        return (
            <AppBlock>
                <AppHeader liked={liked} allPosts={allPosts} />
                <div className="search-panel d-flex">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                     filter={filter}
                     onFilterSelect={this.onFilterSelect}
                     />
                </div>
                <PostList
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLike={this.onToggleLike}
                    posts={visiblePost}
                />
                <PostAddForm
                    onAdd={this.addItem}
                />
            </AppBlock>
        )
    }
}