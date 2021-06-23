import { Component } from 'react'
import './index.scss'

class Search extends Component {
    constructor(){
        super()
        this.state = {}
    }

    handleSearch(e){
        const { getDatas } = this.props
        getDatas(e.target.value.trim())
    }

    render(){
        return (
            <div className="search-wrap">
                <div className="search-icon"></div>
                <input className="search-body" placeholder="输入关键字搜索" onChange={this.handleSearch.bind(this)}></input>
            </div>
        )
    }
}

export default Search