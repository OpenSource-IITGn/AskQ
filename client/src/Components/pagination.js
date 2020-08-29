import React, { useState } from 'react';
import { Pagination } from 'rsuite';

function CustomPagination(props) {
    const { active, onPageChange } = props
    const [activePage, setActivePage] = useState(active);

    const handleSelect = (eventKey) => {
        setActivePage(eventKey)
        onPageChange(eventKey)
    }
    return (
        <div>
            <Pagination
                prev
                last
                next
                first
                pages={5}
                size="lg"
                activePage={activePage}
                onSelect={handleSelect}
            />
        </div>
    )
}


export default CustomPagination;