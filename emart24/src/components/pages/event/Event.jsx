import React, { useEffect, useState } from 'react';
import EventList from './EventList';
import style from "./Event.module.css";

function Event() {
  const [eventList, setEventList] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/events/1`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setEventList(data);
    })
  },[]);

  return ( 
    <div className='container'>
      <p className={style.comment}>이벤트가 진행되는 상품을 확인하세요 ☺️ </p>
        <section>
          <ul>
            <li>1+1 발렌타인 이벤트</li>
            <li>졸업 축하 이벤트</li>
            <li>이마트 30주년 이벤트</li>
          </ul>
        </section>
        <ul className={style.eventProductList}>
          {
            eventList && eventList.eventProductList.map( eventProduct => (
              <EventList key={eventProduct.id} product={eventProduct.productId} />
            ))
          }
        </ul>
      </div>
   );
}

export default Event;