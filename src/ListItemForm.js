import { useState } from 'react';
import { createListItem } from './services/fetch-utils';

export default function ListItemForm({ fetchAndSetItems }) {
  // you'll need to track the name and quantity in state
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  async function handleSubmit(e) {
    e.preventDefault();
    
    // make a new list item in supabase using the form values stored in state
    const item = {
      name: name,
      quantity: quantity,
    };
    await createListItem(item);

    // refetch the items using the handler function passed down as a prop
    fetchAndSetItems();

    // clear the name and quantity in state to refresh the form
    setName('');
    setQuantity(1);
  }

  return (
    <div className='new-item-form-container'>
      {/* on submit, call the handleSubmit function */}
      <form
        onSubmit={handleSubmit}
      >
          I need . . . 
        <label>
            Quantity
          {/* on change, update the quantity in state */}
          <input 
            // this should be a controlled input, soi set the value based on state
            value={quantity}
            onChange={(e)=> setQuantity(e.target.value)}
            required 
            type="number" 
            name="quantity"
          />
        </label>
        <label>
            Name
          {/* on change, update the name in state */}
          <input
            // this should be a controlled input, soi set the value based on state 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required 
            name="name" />
        </label>
        <button>Add item</button>
      </form>
    </div>
  );
}
