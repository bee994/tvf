function sortTable(column, sort_asc = true) {
    const tbody = document.querySelector('tbody');
    const rowsArray = Array.from(table_rows);

    rowsArray.sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.trim().toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.trim().toLowerCase();

        // Handle numeric values
        if (!isNaN(first_row) && !isNaN(second_row)) {
            first_row = parseFloat(first_row);
            second_row = parseFloat(second_row);
        }

        // Handle date values
        const dateA = Date.parse(first_row);
        const dateB = Date.parse(second_row);
        if (!isNaN(dateA) && !isNaN(dateB)) {
            first_row = dateA;
            second_row = dateB;
        }

        if (first_row < second_row) return sort_asc ? -1 : 1; // Ascending order
        if (first_row > second_row) return sort_asc ? 1 : -1; // Ascending order
        return 0;
    });

    rowsArray.forEach(row => tbody.appendChild(row));
}
