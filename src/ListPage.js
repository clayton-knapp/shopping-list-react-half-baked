import { useState, useEffect } from 'react';
import { deleteAllItems, getListItems } from './services/fetch-utils';
import ListItemForm from './ListItemForm';
import ListItem from './ListItem';

export default function ListPage() {
  const [listItems, setShoppingList] = useState([]);

  // on load, call the fetchItems function (remember: useEffect)

  useEffect(() => {
    fetchAndSetItems();
  }, []);
  
  async function fetchAndSetItems() {
    const listItems = await getListItems();
    setShoppingList(listItems);
  }


  async function handleDeleteClick() {
    // delete all items
    await deleteAllItems();

    // then call your fetchItems function to fetch and re-display
    fetchAndSetItems();
  }

  return (
    <div className="list-page">
      <button onClick={handleDeleteClick}>Delete Whole List and Start a New List</button>
      {/* pass fetchItems to the ListItemForm component */}
      <ListItemForm
        fetchAndSetItems={fetchAndSetItems}
      />
      <div className='item-list'>
        {/* map through all the list items and render them here */}
        {
          listItems.map((listItem, i) =>
            <ListItem key={listItem + i} 
              listItem={listItem} 
              fetchAndSetItems={fetchAndSetItems}
            />
          )
        }
      </div>

    </div>
  );
}
