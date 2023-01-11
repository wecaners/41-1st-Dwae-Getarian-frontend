import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BestProduct from './BestProduct';
import './Best.scss';

export default function Best() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://10.58.52.95:3000/product')
      .then(result => result.json())
      .then(data => setItems(data));
  }, []);
  console.log(items);
  return (
    <div className="bestcontainer">
      <div className="bestMain">
        <img
          src="data:image/jpeg;base64,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"
          alt="img"
          className="mainImg"
        />
        <span className="bestFont">BEST</span>
      </div>
      <div className="btnBox">
        <button className="bestBtn">베스트</button>
      </div>
      <div className="bestExplain">
        <p className="LechouBestTitle">Lechou BEST</p>

        {items.map(monster => {
          return (
            <Link
              className="linkStyle"
              key={monster.id}
              to={`/detail/${monster.id}`}
            >
              <BestProduct monster={monster} key={monster.id} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
