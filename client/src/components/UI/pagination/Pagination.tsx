import React, {FC} from 'react';
import './Pagination.css';

interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    pages: number[];
}

const Pagination: FC<PaginationProps> = ({page, setPage, pages}) => {
    if (pages.length > 1) {
        return (
            <div className='pagination'>
                {pages.map(p =>
                    <p
                        key={p}
                        className={`pagination__item ${page === p + 1 && 'pagination__item_selected'}`}
                        onClick={() => setPage(p + 1)}
                    >
                        {p + 1}
                    </p>
                )}
            </div>
        );
    }
};

export default Pagination;