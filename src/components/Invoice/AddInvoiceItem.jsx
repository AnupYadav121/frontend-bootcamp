import React, { useState} from "react";
import {useSelector} from "react-redux";

function AddInvoiceItem(props) {
  const items = useSelector(state => state.items)
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchKey, setSearchKey] = useState("");

  const [itemCount, setItemCount] = useState(1);

  const [itemDetails, setItemDetails] = useState(
    `${items[0].id} ${items[0].name}`
  );

  const countValues = [];
  for (let count = 1; count <= 10; count++) {
    countValues.push(count);
  }

  const handleChangeDetails = (e) => {
    const { value } = e.target;
    setItemDetails(value);
  };

  const handleChangeCount = (e) => {
    const { value } = e.target;
    setItemCount(value);
  };

  const handleSubmit = () => {
    const itemID = itemDetails.substring(0, itemDetails.indexOf(" "));
    const itemWithID = items.filter((item) => {
      return item.id === parseInt(itemID);
    });
    props.onSubmit(itemCount, itemWithID[0]);
  };

  const handleChangeSearchKey = (e) => {
    const { value } = e.target;
    setSearchKey(value);
    if (value.length >= 0) {
      const filteredItemsNew = items.filter((item) => {
        return item.name.includes(value) === true;
      });
      setFilteredItems(filteredItemsNew);
    }
  };

  return (
    <div className="invoice-item-form">
      <div className="add-item-1">
        <label htmlFor="itemSearchKey"></label>
        <input
          type="text"
          id="itemSearchKey"
          placeholder="Item Search Key"
          value={searchKey}
          onChange={handleChangeSearchKey}
          required
        ></input>
      </div>

      <div className="add-item-2">
        <select
          name="itemSelect"
          id="itemSelect"
          value={itemDetails}
          onChange={handleChangeDetails}
        >
          {filteredItems.map((item, index) => {
            return (
              <option key={index}>
                {item.id} {item.name}
              </option>
            );
          })}
        </select>
        <p className="error">{props.error}</p>
      </div>

      <div className="add-item-3">
        <label htmlFor="itemCount">Item Count</label>
        <select
          name="itemCount"
          id="itemCount"
          onChange={handleChangeCount}
          value={itemCount}
        >
          {countValues.map((count, index) => {
            return (
              <option value={count} key={index}>
                {count}
              </option>
            );
          })}
        </select>
      </div>

      <div className="add-item-4">
        <button onClick={handleSubmit}>Add Item</button>
        <button onClick={props.onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default AddInvoiceItem;
