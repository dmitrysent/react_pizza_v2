import React, {useCallback, useRef, useState} from 'react';
import styles from './Search.module.scss'
import debounce from 'lodash.debounce'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setSearchValue} from "../../redux/slice/filter/slice";

const Search: React.FC = () => {
  const dispatch = useDispatch()

  const {searchValue} = useSelector((state: RootState) => state.filter)

  const [value, setValue] = useState('')

  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    }, 1000), [],
  )

  const onClickClear = (event: React.MouseEvent<SVGSVGElement>) => {
    console.log(event)
    dispatch(setSearchValue(''));
    setValue('')
    inputRef.current?.focus();
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  return (
    <div className={styles.root}>
      <svg className={styles.icon} version="1.1" xmlns="http://www.w3.org/2000/svg"
           x="0px" y="0px" width="612.08px" height="612.08px" viewBox="0 0 612.08 612.08">
        <path d="M237.927,0C106.555,0,0.035,106.52,0.035,237.893c0,131.373,106.52,237.893,237.893,237.893
		c50.518,0,97.368-15.757,135.879-42.597l0.028-0.028l176.432,176.433c3.274,3.274,8.48,3.358,11.839,0l47.551-47.551
		c3.274-3.274,3.106-8.703-0.028-11.838L433.223,373.8c26.84-38.539,42.597-85.39,42.597-135.907C475.82,106.52,369.3,0,237.927,0z
		 M237.927,419.811c-100.475,0-181.918-81.443-181.918-181.918S137.453,55.975,237.927,55.975s181.918,81.443,181.918,181.918
		S338.402,419.811,237.927,419.811z"/>
      </svg>

      <input value={value}
             ref={inputRef}
          onChange={onChangeInput}
             className={styles.input}
             placeholder='Начать поиск...'/>
      {searchValue && (
        <svg onClick={onClickClear} className={styles.clearIcon} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
             x="0px" y="0px"
             viewBox="0 0 371.23 371.23">
            <polygon points="371.23,21.213 350.018,0 185.615,164.402 21.213,0 0,21.213 164.402,185.615 0,350.018 21.213,371.23
              185.615,206.828 350.018,371.23 371.23,350.018 206.828,185.615 "/>

            </svg>
      )}

    </div>

  )
};

export default Search;