class StyledTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    set data(value) {
        this._data = value;
        this.render();
    }

    get data() {
        return this._data;
    }

    render() {
        if (!this._data) {
            this.shadowRoot.innerHTML = '<p>No data provided</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'styled-table';

        // Load styles
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://github.com/gpotenza80/Custom_Table/blob/main/styles.css';
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(table);

        // Create header row
        const header = table.createTHead();
        const headerRow = header.insertRow(0);
        Object.keys(this._data[0]).forEach(key => {
            const cell = document.createElement('th');
            cell.appendChild(document.createTextNode(key));
            headerRow.appendChild(cell);
        });

        // Create data rows
        const tbody = table.createTBody();
        this._data.forEach(rowData => {
            const row = tbody.insertRow();
            Object.values(rowData).forEach(cellData => {
                const cell = row.insertCell();
                cell.appendChild(document.createTextNode(cellData));
            });
        });
    }
}

customElements.define('com-sample-styledtable', StyledTable);
