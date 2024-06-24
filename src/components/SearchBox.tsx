import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

// color, price, breed,
const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white'];
const breeds = ['poodle', 'bulldog', 'beagle', 'pug', 'shiba'];
export const SearchBox = ({
  defaultValues,
}: {
  defaultValues: {
    minPrice: number;
    maxPrice: number;
    colorList: string[];
    breedId: string | null;
  };
}) => {
  const [minPrice, setMinPrice] = useState(defaultValues.minPrice);
  const [maxPrice, setMaxPrice] = useState(defaultValues.maxPrice);

  const handleChange = (value: any) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  return (
    <form method="get">
      <input
        className="text-right"
        type="number"
        name="min"
        value={minPrice}
        onChange={(e) => setMinPrice(Number.parseInt(e.target.value))}
      />
      円～
      <input
        className="text-right"
        type="number"
        name="max"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number.parseInt(e.target.value))}
      />
      円
      <Slider
        id="priceSlider"
        onValueChange={handleChange}
        max={50_0000}
        min={50_000}
        step={10_000}
        value={[minPrice, maxPrice]}
      />
      <ul>
        {colors.map((color) => (
          <li>
            <label>
              <input type="checkbox" name="color" value={color} />
              {color}
            </label>
          </li>
        ))}
      </ul>
      <select name="breed">
        <option value="">種類</option>
        {breeds.map((breed) => (
          <option value={breed}>{breed}</option>
        ))}
      </select>
      <br />
      <button type="submit">検索</button>
    </form>
  );
};
