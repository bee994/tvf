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
    });

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

// 2. Sorting | Ordering data of HTML table
table_headings.forEach((head, i) => {
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        });

        let sort_asc = !head.classList.contains('asc');
        head.classList.toggle('asc', sort_asc);

        sortTable(i, sort_asc);
    };
});

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
        } else {
            // Handle date values
            const dateA = parseDate(first_row);
            const dateB = parseDate(second_row);

            if (dateA && dateB) {
                first_row = dateA.getTime();
                second_row = dateB.getTime();
            }
        }

        if (first_row < second_row) return sort_asc ? -1 : 1;
        if (first_row > second_row) return sort_asc ? 1 : -1;
        return 0;
    });

    rowsArray.forEach(row => tbody.appendChild(row));
}

function parseDate(dateStr) {
    const parts = dateStr.split(' ');
    if (parts.length === 3) {
        const [month, day, year] = parts;
        return new Date(`${year}-${monthConversion[month]}-${day.replace(',', '')}`);
    }
    return null;
}

const monthConversion = {
    "january": "01",
    "february": "02",
    "march": "03",
    "april": "04",
    "may": "05",
    "june": "06",
    "july": "07",
    "august": "08",
    "september": "09",
    "october": "10",
    "november": "11",
    "december": "12"
};
