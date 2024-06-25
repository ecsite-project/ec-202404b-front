import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Button } from './ui/button';

const colors = [
  'Black',
  'White',
  'Brown',
  'Golden',
  'Gray',
  'Red',
  'Cream',
  'Fawn',
  'Blue',
];
const breeds = [
  'Shiba Inu',
  'Labrador Retriever',
  'German Shepherd',
  'Golden Retriever',
  'Bulldog',
  'Poodle',
  'Beagle',
  'Chihuahua',
  'Dachshund',
];
export const SearchBox = ({
  defaultValues,
}: {
  defaultValues: {
    minPrice: number;
    maxPrice: number;
    colorList: string[];
    breed: string | null;
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
      <div className="max-w-5xl mx-auto flex flex-col bg-white rounded-2xl p-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>絞り込み</AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-around ">
                <div className="flex flex-col">
                  <div>
                    <input
                      className="text-right text-xl"
                      type="number"
                      name="min"
                      value={minPrice}
                      onChange={(e) =>
                        setMinPrice(Number.parseInt(e.target.value))
                      }
                    />
                    円～
                    <input
                      className="text-right text-xl"
                      type="number"
                      name="max"
                      value={maxPrice}
                      onChange={(e) =>
                        setMaxPrice(Number.parseInt(e.target.value))
                      }
                    />
                    円
                    <Slider
                      id="priceSlider"
                      className="my-10"
                      onValueChange={handleChange}
                      max={50_0000}
                      min={50_000}
                      step={10_000}
                      value={[minPrice, maxPrice]}
                    />
                  </div>
                  <div>
                    <Select
                      name="breed"
                      defaultValue={defaultValues.breed ?? ''}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="種類" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          className={defaultValues.breed ? '' : 'hidden'}
                          value="null"
                        >
                          なし
                        </SelectItem>
                        {breeds.map((breed) => (
                          <SelectItem value={breed}>{breed}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="border-8 border-pink-100 rounded-xl px-8 py-4">
                  <ul>
                    {colors.map((color) => (
                      <li className="my-2">
                        <CheckboxWithText
                          text={color}
                          id={color}
                          name="color"
                          value={color}
                          checked={defaultValues.colorList.includes(color)}
                        ></CheckboxWithText>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button className="mt-4 w-full" type="submit">
                検索
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </form>
  );
};

export function CheckboxWithText({
  text,
  id,
  value,
  name,
  checked,
}: {
  text: string;
  id: string;
  name: string;
  value: string;
  checked: boolean;
}) {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id={id} name={name} value={value} defaultChecked={checked} />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {text}
        </label>
      </div>
    </div>
  );
}
