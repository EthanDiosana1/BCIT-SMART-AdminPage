import React, { useState, useEffect } from 'react';

 export default function PageButton({
    setCurrentPage,
    currentPage,
    totalPages, 
    usersPerPage,
    updateUsers
 })
{

  // local state for managing the input field's value
  const [inputValue, setInputValue] = useState(currentPage.toString());

  // Effect to update local input value when currentPage changes externally
  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

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
        setCurrentPage(newPageNumber);// Set the current page
        updateUsers(usersPerPage);// Get the users on that page.
        setInputValue(newPageNumber.toString()); // update the input value to reflect the current page
     }

    /**
   * Handles the input change event.
   * Prevents non-numerical input and sets the current page to the input's value.
   * @param {Event} event - The change event from the input field.
   */

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value); // immediately updated the local input state
  };

  const validateAndChangePage = (value) => {
    const pageNumber = Number(value);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      updateUsers(usersPerPage);
    }
  };

  /**
   * Handles the form submission.
   * Prevents the default form submission behavior and uses the input value to change the page.
   * @param {Event} event - The form submission event.
   */
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    validateAndChangePage(inputValue);
  };

  const handleBlur = () => {
    validateAndChangePage(inputValue);
  };

  useEffect(() => {
    const pageNumber = Number(inputValue);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber); // Update only if it's a valid page number
    }
  }, [inputValue, totalPages, setCurrentPage]);

  return (
    <div className='pagination'>
      <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>|&lt;</button>
      <button onClick={() => handlePageChange(currentPage - 1)}disabled={currentPage === 1}>&lt;</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={() => handlePageChange(currentPage + 1)}disabled={currentPage === totalPages}>&gt;</button>
      <button onClick={() => handlePageChange(totalPages)}disabled={currentPage === totalPages}>&gt;|</button>
      
      <form onSubmit={handleFormSubmit}>
        <label>
          Jump to page:
          <input
           
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            min="1"
            max={totalPages.toString()}
            step="1"
          />
        </label>
      </form>
    </div>
  );
  }


