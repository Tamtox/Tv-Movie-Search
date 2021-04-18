import React from "react";
import './Styles/App.scss'
import Search from './Components/Search';
import Navigation from './Components/Navigation';
import DisplayMulti from './Components/DisplayMulti';
import axios from "axios";
import DisplaySingle from "./Components/DisplaySingle";
// import Navigation from './Components/Navigation';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      currentSearch:'',
      input:'',
      currentPage:1,
      totalPages:0,
      displayMode:'',
      searchResult:null,
      detailedItem:0
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://api.themoviedb.org/3/search/multi?api_key=0c41051adf6133d8a64f8e95027fd642&language=en-US&query=${this.state.input}&page=1&include_adult=false`)
    .then(res=>{
      this.setState({
        searchResult:res.data,
        totalPages:res.data.total_pages
      })
      console.log(this.state.searchResult)
    })
    .then(res=>{
      this.setState({
        currentSearch:this.state.input,
      })
      this.setState({
        displayMode:true,
        input:''
      })
    })
    .catch(err=>{
      console.log(err)
    })
  }
  goToFirstPage = () => {
    axios.get(`https://api.themoviedb.org/3/search/multi?api_key=0c41051adf6133d8a64f8e95027fd642&language=en-US&query=${this.state.currentSearch}&page=1&include_adult=false`)
    .then(res=>{
      this.setState({
        searchResult:res.data,
        currentPage:1
      })
      console.log(this.state.searchResult)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  goToLastPage = () => {
    axios.get(`https://api.themoviedb.org/3/search/multi?api_key=0c41051adf6133d8a64f8e95027fd642&language=en-US&query=${this.state.currentSearch}&page=${this.state.totalPages}&include_adult=false`)
    .then(res=>{
      this.setState({
        searchResult:res.data,
        currentPage:this.state.totalPages
      })
      console.log(this.state.searchResult)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  goToNextPage = () => {
    axios.get(`https://api.themoviedb.org/3/search/multi?api_key=0c41051adf6133d8a64f8e95027fd642&language=en-US&query=${this.state.currentSearch}&page=${this.state.currentPage+1}&include_adult=false`)
    .then(res=>{
      this.setState({
        searchResult:res.data,
        currentPage:this.state.currentPage+1
      })
      console.log(this.state.searchResult)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  goToPreviousPage = () => {
    axios.get(`https://api.themoviedb.org/3/search/multi?api_key=0c41051adf6133d8a64f8e95027fd642&language=en-US&query=${this.state.currentSearch}&page=${this.state.currentPage-1}&include_adult=false`)
    .then(res=>{
      this.setState({
        searchResult:res.data,
        currentPage:this.state.currentPage-1
      })
      console.log(this.state.searchResult)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  handleChange = (event) => {
    this.setState({
      input:event.target.value
    })
  }
  toggleDetailed = (index) => {
    this.setState({
      displayMode: !this.state.displayMode,
      detailedItem:index
    })
  }
  toggleMulti = () => {
    this.setState({
      displayMode: !this.state.displayMode
    })
  }
  render() {
    let display = null;
    if(this.state.displayMode === true) {
      display = (
        <main id="mainMulti">
          <section id="displayMulti">
            {
              this.state.searchResult.results.map((item,index)=>{
                if(item.media_type === 'person') {
                  return <DisplayMulti key={index} title={item.name} image={item.profile_path} toggleDetailed={()=>this.toggleDetailed(index)}/>
                }
                else {
                  if(item.title === undefined) {
                    return <DisplayMulti key={index} title={item.name} image={item.poster_path} toggleDetailed={()=>this.toggleDetailed(index)}/>
                  }
                  else {
                    return <DisplayMulti key={index} title={item.title} image={item.poster_path} toggleDetailed={()=>this.toggleDetailed(index)}/>
                  }
                }
              })
            }
          </section>
          <Navigation currentPage={this.state.currentPage} totalPages={this.state.totalPages} goToFirstPage={this.goToFirstPage} goToLastPage={this.goToLastPage} goToNextPage={this.goToNextPage} goToPreviousPage={this.goToPreviousPage}/>
        </main>
      )
    }
    else if(this.state.displayMode === false) {
      display = (
        <main id="mainSingle">
          <DisplaySingle profile={this.state.searchResult.results[this.state.detailedItem]} toggleMulti={this.toggleMulti} />
        </main>
      )
    }
    return (
      <div className='app'>
        <Search value={this.state.input} handleChange={this.handleChange} handleSubmit={this.handleSubmit} searchResult={this.state.searchResult}/>
        {display}
      </div>
    );
  }
}
export default App;
