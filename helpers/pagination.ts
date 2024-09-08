export const pagination = (objectPagination, query, countItems) =>{
    if(query.page){
        objectPagination.currentPage = parseInt(query.page)
    }
    if(query.limit){
        objectPagination.limitItems = parseInt(query.limit)
    }
    objectPagination.skip = (objectPagination.currentPage-1)*objectPagination.limitItems
    objectPagination.totalPages = Math.ceil(countItems/objectPagination.limitItems)
    return objectPagination
}