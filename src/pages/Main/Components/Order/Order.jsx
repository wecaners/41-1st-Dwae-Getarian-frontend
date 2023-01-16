import React, { useState, useEffect } from 'react';
import './Order.scss';
import OrderedItems from './OrderedItems';
import Nav from '../../../../components/Nav/Nav';

export default function Order() {
  const [form, setForm] = useState({
    address: '',
    phone_number: '',
  });
  const [cart, setCart] = useState([]);
  const [credit, setCredit] = useState([]);
  const onChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    fetch('http://10.58.52.76:3001/order/user', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(result => result.json())
      .then(data => {
        setCart(data.products);
        setCredit(data.payment.user_credit);
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://10.58.52.76:3001/order/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        payment: {
          paymentType: 'voucher',
          totalCost: total,
        },
        deliveryAddress: {
          address: form.address,
          phoneNumber: form.phone_number,
        },
        totalCo2: 500,
        products: cart,
      }),
    }).then(response => response.json());
    alert('결제 성공!');
  };

  const totalP = [0];
  for (let i = 0; i < cart.length; i++) {
    const result = cart[i].price * cart[i].quantity;
    totalP.push(result);
  }
  const sum = totalP.reduce((x, y) => x + y);

  const total = credit - (sum + 3000);
  return (
    <div>
      <Nav />
      <div className="orderPage">
        <div className="infoInput">
          <div className="paymentTitle">
            <span>결제하기</span>
          </div>
          <div className="deliveryInfoTitle">
            <span className="infoTitle">배송지 정보</span>
            <button className="infoBtn">주문 고객과 동일</button>
          </div>

          <form className="orderBox" onSubmit={handleSubmit}>
            <div className="infoContainer">
              <span className="infoTitle">받는 분</span>
              <input className="infoTitleInput" type="text" for="Recipient" />
            </div>
            <div className="infoContainer">
              <label className="infoTitle" for="phone">
                연락처
              </label>
              <input
                type="text"
                name="phone_number"
                onChange={onChange}
                value={form.phone_number}
                className="infoTitleInput"
                placeholder="'-'없이 휴대번호 입력"
              />
            </div>
            <div className="infoContainer">
              <label className="infoTitle" for="address">
                배송지
              </label>
              <input
                name="address"
                onChange={onChange}
                value={form.address}
                className="infoTitleInput"
                type="text"
                placeholder="상세주소 입력"
              />
            </div>
            <div className="saveSpot">
              <input type="checkbox" id="cb1" />
              <label for="cb1">기본배송지로 저장</label>
            </div>
          </form>

          <div className="delivery">
            <p className="deliveryTitle">배송 요청사항</p>
            <input className="deliveryRequest displayNone" type="text" />
          </div>
          <div className="cartBoxinBox">
            <div className="cartBox">
              <div className="cartBoxTitle">
                <span>주문상품</span>
                <span>총{cart.length}건</span>
              </div>

              <div className="cartBoxDetail">
                {cart.map(item => {
                  return <OrderedItems key={item.id} item={item} />;
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="payment2">
          <div className="payment">
            <ul className="pay">
              <li>
                <p>포인트 금액</p>
                <p>{credit}</p>
              </li>
              <li>
                <p>상품 금액</p>
                <p>{sum}원</p>
              </li>
              <li>
                <p>배송비</p>
                <p>3000원</p>
              </li>
            </ul>
            <ul className="total">
              <li className="expectation">결제 예상 금액</li>
              <li className="orderPay">{total}원</li>
            </ul>
            <div onClick={handleSubmit} className="order">
              주문하기
            </div>
          </div>
          {/* <OrderPayment /> */}
        </div>
      </div>
    </div>
  );
}
