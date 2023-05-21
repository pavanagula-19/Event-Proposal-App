import { Box, Pagination } from "@mui/material";
import React, { useState } from "react";
import CardList from "./Cardlist";

const Openpage = (props) => {
  const { children, page, index } = props;
  return (
    <div hidden={page !== index}>
      {page === index && <Box mt={2}>{children}</Box>}
    </div>
  );
};

const PaginationCard = ({ items, pageitems }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = items?.slice(firstCardIndex, lastCardIndex);
  const totalPages = Math.ceil(items?.length / cardsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {items.length === 0 ? (
        <div className="resulttext-container">
          <h3 className="resultText">No result Found...</h3>
        </div>
      ) : (
        <div className="page">
          <div className="pages">
            <Box display={"flex"} justifyContent="start">
              <Openpage page={currentPage} index={currentPage}>
                {currentCards && <CardList items={currentCards} />}
              </Openpage>
            </Box>
          </div>

          <div className="page-num">
            <Pagination
              count={totalPages}
              size="large"
              color="secondary"
              variant="outlined"
              onChange={handlePageChange}
              sx={{
                "Button.MuiPaginationItem-circular.Mui-selected": {
                  bgcolor: "#64A1F5",
                  color: "#ffffff",
                },
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
                marginBottom: "10px",
                width: "100%",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PaginationCard;
