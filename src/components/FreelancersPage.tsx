import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import { API_BASE_URL } from '../config';
import FreelancerInfo from './FreelancerInfo';
import {SkeletonUserCard} from '../components/Skeleton';
import { Freelancer } from '../models/Freelancer';
import '../css/FreelancersPage.css';


function FreelancersPage() {
    const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        let freelancersApiUrl = `${API_BASE_URL}/users/freelancers/get`;
        let params = {page: page, page_size: 5};
        axios.get(freelancersApiUrl, {params: params})
          .then(function (response) {
            console.log(response);
            let data = response.data;
            setFreelancers(data.freelancers);
            setTotalPages(data.total_pages);
        })
          .catch(function (error) {
            
        })
      }, [page]);
    
      const handlePageClick = (selected: { selected: number }) => {
        const newOffset = console.log(selected);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setPage(selected.selected+1);
      };

    return (
        <div className="freelancers-page container">
            {
              freelancers.length === 0 ? 
                <>{[1,2,3,4,5,6].map((number) => <SkeletonUserCard />)}</>
              :
              freelancers.map(freelancer => <FreelancerInfo {...freelancer}/>)}
              <ReactPaginate className='pagination'
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                // pageRangeDisplayed={1}
                pageCount={totalPages}
                previousLabel="<"
                renderOnZeroPageCount={null}
              />
        </div>
    );
}

export default FreelancersPage;