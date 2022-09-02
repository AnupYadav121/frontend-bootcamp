import React, { useState } from "react";
import ViewItems from "./ViewItems";
import Heading from "../../components/util/Heading";
import AddItem from "./AddItem";
import Button from "../../components/util/Button";
import "./item.css";
import axios from "axios";
import SearchBox from "../../components/util/SearchBox";
import anchors from "../../anchors/Anchors";
import { useSelector, useDispatch } from "react-redux";
import { addMyItem, setMyItems } from "../../actions/actions";

function Item() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(true);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const itemAnchor = anchors["itemAnchor"];

  function saveItem(item) {
    const baseItemURL = "http://localhost:8080/Home/item";

    async function saveItemDB() {
      const dummyItem = {};
      dummyItem.name = item["name"];
      dummyItem.price = parseInt(item["price"]);
      dummyItem.description = item["description"];

      try {
        const responseItem = await axios.post(
          baseItemURL,
          JSON.stringify(dummyItem)
        );
        if (responseItem.status === 200) {
          dispatch(addMyItem(item));
        }
      } catch (e) {
        alert(
          `item could not be added due to invalid details provided with error ${e}`
        );
      }
    }
    saveItemDB();

    setIsFormSubmitted(true);
  }

  function formInitiated() {
    setIsFormSubmitted(false);
  }

  async function setItemsView(field, key) {
    if (key.length === 0) {
      async function setItems() {
        try {
          const baseItemURL = "http://localhost:8080/Home/items";
          const response = await axios.get(baseItemURL);
          if (response.status === 200) {
            const itemsFetched = response.data;
            itemsFetched.map((itemFetched) => {
              return (itemFetched.createdOn = new Date(
                itemFetched["created_at"] * 1000
              ).toLocaleDateString());
            });
            dispatch(setMyItems(itemsFetched));
          }
        } catch (e) {
          alert(`items could not be fetched due to DB error ${e}`);
        }
      }
      setItems();
    } else {
      try {
        var baseItemURL = "http://localhost:8080/Home/item/GetBy";
        baseItemURL += field.charAt(0).toUpperCase() + field.slice(1) + "?";
        baseItemURL += field;
        baseItemURL += "=";
        baseItemURL += key;

        const response = await axios.get(baseItemURL);
        if (response.status === 200 && response.data !== null) {
          const itemsFetched = response.data;
          itemsFetched.map((itemFetched) => {
            return (itemFetched.createdOn = new Date(
              itemFetched["createdAt"] * 1000
            ).toLocaleDateString());
          });
          dispatch(setMyItems(itemsFetched));
        }
        if (response.data === null) {
          dispatch(setMyItems([]));
        }
      } catch (e) {
        alert(
          `customers search results could not be fetched due to backend error ${e}`
        );
      }
    }
  }

  const headingContent = isFormSubmitted ? "Items" : "New Item";

  return (
    <div className="item">
      <div className="item-header">
        {<Heading headingContent={headingContent}></Heading>}
        {isFormSubmitted && (
          <Button
            buttonContent="New Item"
            iconButton="+"
            buttonCall={formInitiated}
          ></Button>
        )}
      </div>
      <div>
        {isFormSubmitted && (
          <SearchBox getSearchResults={setItemsView} fields={itemAnchor} />
        )}
      </div>
      <div className="item-view-control">
        {isFormSubmitted ? (
          <ViewItems items={items}></ViewItems>
        ) : (
          <AddItem addItem={saveItem}></AddItem>
        )}
      </div>
    </div>
  );
}

export default Item;
