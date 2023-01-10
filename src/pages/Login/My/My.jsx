import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './My.scss';
import MyProducts from './MyProducts';

export default function My() {
  const [productList, setProductList] = useState([]);
  const [myUserList, setMyUserList] = useState({});

  useEffect(() => {
    fetch('./data/mypageProductData.json')
      .then(response => response.json())
      .then(result => setProductList(result));
  }, []);

  useEffect(() => {
    fetch('./data/mypageUserData.json')
      .then(response => response.json())
      .then(data => setMyUserList(data));
  }, []);

  return (
    <div className="my-page-wrapper">
      <div className="title-container">
        <div className="my-main-title">
          <h2 className="title">마이페이지</h2>
        </div>
      </div>
      <nav className="item-list-wrapper">
        <ul className="item-list">
          <Link className="link-item" to="/orderReservation">
            <li className="item">주문/예약관리</li>
          </Link>
          <Link className="link-item" to="/activityList">
            <li className="item">활동내역</li>
          </Link>
          <Link className="link-item" to="/benefits">
            <li className="item">나의 혜택</li>
          </Link>
          <Link className="link-item">
            <li className="item">정보관리</li>
          </Link>
          <Link className="link-item">
            <li className="item">고객센터</li>
          </Link>
        </ul>
      </nav>
      <div className="my-info">
        <div className="box1">
          <div className="inner1">
            <img
              className="my-logo"
              src="https://www.osulloc.com/kr/ko/static_cdj/images/mypage/grade_welcome.png"
              alt="마이페이지 로고"
            />
            <div className="text">
              <span className="text1">{myUserList.name}님의 회원등급은</span>
              <br />
              <span className="text2">{myUserList.grade}입니다.</span>
            </div>
          </div>
          <div className="button-container">
            <button className="benefit-button"> 나의 혜택 보기</button>
          </div>
        </div>
        <div className="box2">
          <div className="inner2">
            <ul className="point-list">
              <li className="point-item">
                <Link to="/">
                  <p className="right-box-text1">보유 쿠폰</p>
                  <p className="right-box-text2">{myUserList.coupon}장</p>
                </Link>
              </li>
              <li className="point-item">
                <Link to="/">
                  <p className="right-box-text1">뷰티포인트</p>
                  <p className="right-box-text2">{myUserList.point}P</p>
                </Link>
              </li>
              <li className="point-item">
                <Link to="/">
                  <p className="right-box-text1">찻잎포인트</p>
                  <p className="right-box-text2">{myUserList.chapoint}P</p>
                </Link>
              </li>
              <li className="point-item">
                <Link to="/">
                  <p className="right-box-text1">선물함</p>
                  <p className="right-box-text2">{myUserList.present}개</p>
                </Link>
              </li>
              <li className="point-item">
                <Link to="/">
                  <p className="right-box-text1">다다일상</p>
                  <p className="right-box-text2">{myUserList.dada}</p>
                </Link>
              </li>
              <li className="point-item">
                <Link to="/">
                  <p className="right-box-text1">후기관리</p>
                  <p className="right-box-text2">{myUserList.review}개</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <section className="recent">
        <h3 className="recent-title">최근 주문내역</h3>
        <div className="item-list-container">
          <ul className="item-lists">
            <li className="recent-item">
              <p className="recent-item-text-1">{myUserList.order}</p>
              <p className="recent-item-text-2">주문접수</p>
            </li>
            <li className="recent-item">
              <p className="recent-item-text-1">{myUserList.payment}</p>
              <p className="recent-item-text-2">결제완료</p>
            </li>
            <li className="recent-item">
              <p className="recent-item-text-1">{myUserList.productready}</p>
              <p className="recent-item-text-2">상품준비</p>
            </li>
            <li className="recent-item">
              <p className="recent-item-text-1">{myUserList.shipping}</p>
              <p className="recent-item-text-2">배송중</p>
            </li>
            <li className="recent-item">
              <p className="recent-item-text-1">
                {myUserList.shippingcomplete}
              </p>
              <p className="recent-item-text-2">배송완료</p>
            </li>
          </ul>
        </div>
        <div className="recent-history">
          <p className="recent-history-content"> 내역이 없습니다. </p>
        </div>
        <div className="recent-more-btn-container">
          <button className="recent-more-btn">더 보기</button>
        </div>
      </section>
      <section className="liked-product">
        <h3 className="liked-product-title">찜하기</h3>
        <div className="liked-product-container">
          <div className="liked-product-content">
            <img
              className="liked-product-img"
              src="https://www.osulloc.com/kr/ko/static_cdj/images/mypage/no_list_img.png"
              alt="찜상품"
            />
            <p className="liked-product-text">찜한 상품이 없습니다.</p>
          </div>
        </div>
      </section>
      <section className="history">
        <h3 className="history-title">히스토리</h3>
        <div className="product-list-container">
          <div className="history-product-box">
            {productList.map(product => {
              return (
                <MyProducts
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
