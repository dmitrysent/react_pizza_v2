import React from 'react';

type CatgoriesProps = {
    categoryId: number;
    onClickCategory: (i: number) => void;
}

const Categories: React.FC<CatgoriesProps> = ({onClickCategory, categoryId}) => {

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
      <ul>
        {
          categories.map((item, index) => <li key={item} onClick={() => onClickCategory(index)} className={categoryId === index ? "active" : ''}>{item}</li>)
        }
      </ul>
    </div>
  );
};

export default Categories;