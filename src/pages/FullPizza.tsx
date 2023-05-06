import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    title: string,
    price: string
  }>()
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get('https://629b6df0656cea05fc391ca2.mockapi.io/items/' + id)
        setPizza(data)
      } catch (error) {
        console.log(error)
        navigate('/')
      }
    }

    fetchPizza()
  }, [])

  if(!pizza) {
    return <>Загрузка...</>
  }

  return (
    <div className={'container'}>
      <img src={pizza.imageUrl} alt=""/>
      <h2>{pizza.title}</h2>
      <p>{pizza.price}</p>
    </div>
  );
};

export default FullPizza;