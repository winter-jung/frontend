import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchIcon = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('./Search.jsx'); // GET 방식으로 검색 페이지 이동
  };

  return (
    <button onClick={handleClick} style={{ fontSize: '24px', background: 'none', border: 'none' }}>
      <img src="/public/search.svg" alt="search" />
    </button>
  );
};

export default SearchIcon;
