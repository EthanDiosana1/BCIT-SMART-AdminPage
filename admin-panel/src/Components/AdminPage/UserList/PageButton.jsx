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
      * @param {number} newPageNumber the new page number
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


    /**
   * Handles the input change event.
   * Prevents non-numerical input and sets the current page to the input's value.
   * @param {Event} event - The change event from the input field.
   */
  const handleInputChange = (event) => {
    let pageNumber = Number(event.target.value);
    if(pageNumber < 1) {
      pageNumber = 1;
    }
    setCurrentPage(pageNumber);
  };

  /**
   * Handles the form submission.
   * Prevents the default form submission behavior and uses the input value to change the page.
   * @param {Event} event - The form submission event.
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    handlePageChange(currentPage); // Pass the current page value to the page change handler
  };

  return (
    <div className='pagination'>
      <button 
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        |&lt;
      </button>

      <button 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      <span>Page {currentPage} of {totalPages}</span>

      <button 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>

      <button 
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        &gt;|
      </button>

      <form onSubmit={handleFormSubmit}>
        <label>
          Jump to page:
          <input
            type="number"
            value={currentPage}
            onChange={handleInputChange}
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
