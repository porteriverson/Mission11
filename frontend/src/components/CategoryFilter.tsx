import { useEffect, useState } from 'react';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
  setPageNum,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  pageNum: number;
  setPageNum: (pageNum: number) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/Bookstore/Categories'
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching all the books', error);
      }
    };
    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];
    setSelectedCategories(updatedCategories);
    setPageNum(1);
  }

  return (
    <>
      <div className="category-list">
        <h4 className="center">Book Categories</h4>
        <div className="category-filter">
          {categories.map((c) => (
            <div key={c} className="category-item">
              <input
                type="checkbox"
                className="category-checkbox"
                id={c}
                value={c}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={c}>{c}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryFilter;
