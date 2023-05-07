import React from 'react';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

type CategoriesProps = {
    categoryId: number;
    onClickCategory: (i: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({onClickCategory, categoryId}) => {

    useWhyDidYouUpdate('Categories', {onClickCategory, categoryId} )
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

export default React.memo(Categories);