import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import styles from './MenuList.module.css';

const serverIp = process.env.REACT_APP_SPRING_BOOT_IP;
const serverPort = process.env.REACT_APP_SPRING_BOOT_PORT;
const authToken = 'YOUR_AUTH_TOKEN';

const MenuList = () => {
  const [menu, setMenu] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(9);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchMenu();
  }, [page]);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`http://${serverIp}:${serverPort}/out/menu?page=${page}&size=${size}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      console.log(response.data);
      setMenu(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("There was an error fetching the menu!", error);
    }
  };

  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.sidebarContainer}>
        {/* 사이드바 컨텐츠 */}
      </div>
      <div className={styles.menuGridContainer}>
        <h1>추천 메뉴</h1>
        <div className={styles.menuGrid}>
          {menu.map(item => (
            <div key={item.buggerId} className={styles.menuItem}>
              <img src={`http://${serverIp}:${serverPort}/out/images/${item.imgServerName}`} alt={item.buggerName} className={styles.menuImage} />
              <h2>{item.buggerName}</h2>
              <p>{item.buggerPrice}원</p>
            </div>
          ))}
        </div>
        <ReactPaginate
          previousLabel={"이전"}
          nextLabel={"다음"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          subContainerClassName={styles.pagesPagination}
          activeClassName={styles.active}
        />
      </div>
    </div>
  );
};

export default MenuList;