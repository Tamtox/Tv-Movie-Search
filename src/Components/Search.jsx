import '../Styles/Search.scss';

function Search(props) {
    return (
        <header id={props.searchResult===null?'searchbarFull':'searchbar'}>
            <form id="search" onSubmit={props.handleSubmit}>
                <input id="searchForm" value={props.value} type="text" placeholder="Movie,TV Show or Person" onChange={props.handleChange}/>
                <input id="searchButton" className="button" type="submit" value="Search"/>
            </form>
        </header>
    )
}
export default Search
