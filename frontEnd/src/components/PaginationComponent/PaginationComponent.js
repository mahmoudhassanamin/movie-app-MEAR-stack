import { useEffect,useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const numberOfPaginationPages = 4;
let start
let end

function PaginationComponent({getAnotherPage,activePage,searchCondition}) {
    
    const paginationControls =(e)=>{
        let op="+"
        let allItems = []
        if(e.name === "prev" ){
            if (start === 1) {
                return
            }
            op="-"
        }
        start = eval(`start ${op} numberOfPaginationPages`)
        end = eval(`end ${op} numberOfPaginationPages`)
        for (let i = start ; i <= end; i++) {
            allItems.push(<Pagination.Item onClick={() => { getAnotherPage(i,searchCondition) }} key={i} active={i === activePage} >{i}</Pagination.Item>)
        }
        setPagination([...allItems])
    }
    const [pagination, setPagination] = useState([]);
    const generatePagination=()=>{
        let allItems = []
        for (let i = start; i <= end; i++) {
            allItems.push(<Pagination.Item onClick={() => { getAnotherPage(i,searchCondition) }} key={i} active={i === activePage} >{i}</Pagination.Item>)
        }
        setPagination([...allItems])
    }
    useEffect(()=>{
        start = 1
        end=numberOfPaginationPages
        generatePagination()
    },[])

    useEffect(()=>{
        generatePagination()
    },[activePage,searchCondition])
    return (
        <Pagination >
            <Pagination.Prev onClick={e => { e.name = "prev"; paginationControls(e) }} />
                {pagination}
            <Pagination.Next onClick={e => { e.name = "next"; paginationControls(e) }} />
        </Pagination>
    )
}

export default PaginationComponent






// pagesLimit = res.data.total_pages
                