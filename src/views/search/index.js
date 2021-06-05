import { Component } from 'react'
import './index.css'

class Search extends Component {
    constructor(){
        super()
        this.state = {}
    }

    render(){
        return (
            <div className="search-wrap">
                <div className="search-icon"></div>
                <input className="search-body" placeholder="暂不能搜索"></input>
            </div>
        )
    }
}

export default Search