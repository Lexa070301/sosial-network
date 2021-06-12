import classes from "./Paginator.module.css";
import React, {useState} from "react";


let Paginator = ({totalItemsCount, pageSize, onPageChange, currentPage, portionSize}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionsCount = Math.ceil(pagesCount / portionSize);
  let [portionsNumber, setPortionsNumber] = useState(Math.floor(currentPage / portionSize) + 1);
  let leftBorder = (portionsNumber - 1) * portionSize + 1;
  let rightBorder = portionsNumber * portionSize;

  let back = () => {
    setPortionsNumber(portionsNumber - 1)
  }

  let next = () => {
    setPortionsNumber(portionsNumber + 1)
  }

  return (
      <div>
        {portionsNumber > 1 &&
        <button onClick={back}>prev</button>
        }
        {
          pages.filter(p => p >= leftBorder && p <= rightBorder).map(page => {
            return (
                <span onClick={() => onPageChange(page)}
                      key={page}
                      style={{"margin": "3px"}}
                      className={currentPage === page ? classes.selectedPage : ""}>
                  {page}
                </span>
            )
          })
        }
        {portionsNumber < portionsCount &&
        <button onClick={next}>next</button>
        }
      </div>
  )
}

export default Paginator
