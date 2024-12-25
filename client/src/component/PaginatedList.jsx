import { useState } from "react";
const PaginatedList = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1); // State to track the current page
    const itemsPerPage = 10; // Number of items per page

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Extract the items to display for the current page
    const currentItems = data.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div>
                <h1>Paginated List</h1>
                <ul>
                    {currentItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

                {/* Pagination Controls */}
                <div>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            disabled={currentPage === index + 1} // Disable the current page button
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            );
        </>
    )
}
export default PaginatedList