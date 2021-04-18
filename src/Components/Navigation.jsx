import '../Styles/Navigation.scss';

function Navigation(props) {
    return (
        <section id="navbar" >
            {props.currentPage===1?<button className="button-nav" disabled>First Page</button>:<button className="button-nav" onClick={props.goToFirstPage}>First Page</button>}
            {props.currentPage===1?<button className="button-nav" disabled>Previous</button>:<button className="button-nav" onClick={props.goToPreviousPage}>Previous</button>}
            <div id="currentPage">{`Page: ${props.currentPage}`}</div>
            {props.currentPage===props.totalPages?<button className="button-nav" disabled>Next</button>:<button className="button-nav" onClick={props.goToNextPage}>Next</button>}
            {props.currentPage===props.totalPages?<button className="button-nav" disabled>Last Page</button>:<button className="button-nav" onClick={props.goToLastPage}>Last Page</button>}
        </section>
    )
}
export default Navigation