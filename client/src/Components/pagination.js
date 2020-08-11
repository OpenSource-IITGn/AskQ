import React, { useState } from 'react';
import { Pagination } from 'rsuite';

function CustomPagination(props) {
    const [activePage, setActivePage] = useState(5);

    const handleSelect = (eventKey) => {
        setActivePage(eventKey)
    }
    return (
        <div>
            <Pagination
                prev
                last
                next
                first
                size="lg"
                pages={10}
                activePage={activePage}
                onSelect={handleSelect}
            />
        </div>
    )
}


export default CustomPagination;