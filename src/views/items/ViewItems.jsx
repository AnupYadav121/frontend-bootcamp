import React, {  useEffect } from "react";
import PaginationTable from "../../components/util/PaginatedTable";
import axios from "axios";
import {useSelector,useDispatch} from "react-redux"


function ViewItems() {
  const items  = useSelector(state=>state.items)
  const dispatch = useDispatch();

  const baseItemURL = "http://localhost:8080/Home/items";

  useEffect(() => {
    async function setItems() {
      try {
        const response = await axios.get(baseItemURL);
        if (response.status === 200) {
          var itemsFetched = response.data;
          if (itemsFetched !== null && itemsFetched.length > 0) {
            itemsFetched.map((itemFetched) => {
              return (itemFetched.createdOn = new Date(
                itemFetched["created_at"] * 1000
              ).toLocaleDateString());
            });
          } else {
            itemsFetched = [];
          }
          dispatch({
            type: "SET_ITEMS",
            payload: itemsFetched,
          });
        }
      } catch (e) {
        alert(`items could not be fetched due to DB error ${e}`);
      }
    }
    setItems();
  }, [dispatch]);

  return <PaginationTable list={items} tableHeader="item" />;
}

export default ViewItems;
