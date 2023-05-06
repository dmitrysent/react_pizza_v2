import React, {useEffect, useRef} from 'react';
import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";
import Loader from "../components/Loader";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {FilterSliceState, setCategoryId, setCurrentPage, setFilters} from "../redux/slice/filterSlice";
import qs from 'qs'
import {Link, useNavigate} from 'react-router-dom'
import {sortList} from "../components/SortPopup";
import {fetchPizzas, selectPizzaData, selectFilter, SearchPizzaParams} from "../redux/slice/pizzasSlice";
import {useAppDispatch} from "../redux/store";

const Home: React.FC = () => {

    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)

    // const categoryId = useSelector(state => state.filter.categoryId)
    // const sortValue = useSelector(state => state.filter.sort)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isSearch = useRef(false)
    const isMounted = useRef(false)


    // const [categoryId, setCategoryId] = useState(0)
    // const [sortValue, setSortValue] = useState({
    //   name: 'популярности',
    //   sortProperty: 'rating'
    // })
    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const getPizzas = async () => {
        // setIsLoaded(true)

        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sort.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `&category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''


        dispatch(
            fetchPizzas({
                order,
                sortBy,
                category,
                search,
                currentPage: String(currentPage)
            }))
    }

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as  unknown as  SearchPizzaParams
            const sort = sortList.find(obj => obj.sortProperty === params.sortBy)
            dispatch(
                setFilters({
                    searchValue: params.search,
                    currentPage: +params.currentPage,
                    sort: sort || sortList[0],
                    categoryId: +params.category

                })
            )


            isSearch.current = true
        } /*else {
            dispatch(fetchPizzas({} as SearchPizzaParams))
        }*/
    }, [])


    useEffect(() => {
        window.scrollTo(0, 0)

        !isSearch.current && getPizzas()

        isSearch.current = false

    }, [categoryId, sort, searchValue, currentPage])

    useEffect(() => {

        if (isMounted.current) {
            const queryString = qs.stringify({
                sort: sort,
                categoryId,
                currentPage,
            }) as unknown as  SearchPizzaParams

            navigate(`?${queryString}`)
        }

        isMounted.current = true


    }, [categoryId, sort, currentPage])

    const skeletons = [...new Array(8)].map(index => <Loader key={index}/>)

    const pizzas = items.map((pizza: any) => <PizzaBlock  {...pizza}/>
)

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} onClickCategory={(i: number) => dispatch(setCategoryId(i))}/>
                <SortPopup/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ? <div>
                    <h2>Ошибка аргузки данных. </h2>
                    <p>Попробуйте позже</p>
                </div> : <div className="content__items">
                    {
                        status === 'loading' ? skeletons : pizzas
                    }
                </div>
            }

            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;