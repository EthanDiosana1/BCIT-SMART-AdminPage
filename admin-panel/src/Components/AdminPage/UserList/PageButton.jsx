 export default function PageButton({
    setCurrentPage,
    currentPage,
    totalPages, 
    usersPerPage,
    updateUsers
 })
{

     /**
      * Handles a change in page number.
      * @param newPageNumber the new page number
      */
     function handlePageChange(newPageNumber) {

        // If the new page number is negative,
        // set it to 1
        if(newPageNumber < 1) {
            newPageNumber = 1;
        }

         // Prevent overflow of pages.
         else if(newPageNumber > totalPages) {
            newPageNumber = totalPages;
        }
        
        // Set the current page
        setCurrentPage(newPageNumber);
        
        // Get the users on that page.
        updateUsers(usersPerPage);
     }


    return (
      <div className='pagination'>
        
        <button 
            onClick={() => handlePageChange(1)} 
            disabled={currentPage === 1}>|&lt;
        </button>
        
        <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}>&lt;
        </button>

        <span>Page {currentPage} of {totalPages}</span>
        
        <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}>&gt;
        </button>
        
         <button 
            onClick={() => handlePageChange(totalPages - 1)} 
            disabled={currentPage === totalPages}>&gt;|
         </button>

        <form onSubmit={handlePageChange}>
          <label>
            Jump to page:
            <input
              type="number"
              value={currentPage}
              onChange={e => handlePageChange(e.target.value)}
              min="1"
              max={totalPages}
              step="1"
            />
          </label>
          <button type="submit">Go</button>
        </form>
      </div>
    );
  };
