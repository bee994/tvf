const search = document.querySelector('.input-group input'),
    table_rows = document.querySelectorAll('tbody tr'),
    table_headings = document.querySelectorAll('thead th');

// 1. Searching for specific data of HTML table
search.addEventListener('input', searchTable);

function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    })

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

// 2. Sorting | Ordering data of HTML table

table_headings.forEach((head, i) => {
    let sort_desc = true;
    head.onclick = () => {
        table_headings.forEach(head => {
            head.classList.remove('active', 'asc', 'desc');
        });
        head.classList.add('active');
        if (sort_desc) {
            head.classList.add('desc');
        } else {
            head.classList.add('asc');
        }
        
        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        })

        sortTable(i, sort_desc);
        sort_desc = !sort_desc;
    }
})

function sortTable(column, sort_desc) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_desc ? (first_row < second_row ? -1 : 1) : (first_row < second_row ? 1 : -1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}

// The rest of your code remains the same.
function sortTable(column, sort_asc) {
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

        if (first_row < second_row) return sort_asc ? -1 : 1;
        if (first_row > second_row) return sort_asc ? 1 : -1;
        return 0;
    });

    rowsArray.forEach(row => tbody.appendChild(row));
}
