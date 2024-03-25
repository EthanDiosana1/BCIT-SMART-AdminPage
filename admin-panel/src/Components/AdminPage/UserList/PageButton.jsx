 export default function PageButton({
    setCurrentPage,
     currentPage,
     totalPages, 
      handleJumpToPage,
      setJumpToPage,
       jumpToPage}){

        function handleUp()
        {
          


        }

        function handleDown()
        {
          

        }


    return (
      <div className='pagination'>
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>|&lt;</button>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
        <button onClick={() => setCurrentPage(totalPages - 1)} disabled={currentPage === totalPages}>&gt;|</button>
        <form onSubmit={handleJumpToPage}>
          <label>
            Jump to page:
            <input
              type="number"
              value={jumpToPage}
              onChange={e => setJumpToPage(e.target.value)}
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
