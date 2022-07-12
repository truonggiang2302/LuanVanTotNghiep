import React from "react";
import { message, Steps } from "antd";
import "antd/dist/antd.css";
import "./PaymentPage.scss";
import momo from "../../../../assets/images/logo/momo.png";
import stripe from "../../../../assets/images/logo/stripe.png";
import StripeCheckout from "react-stripe-checkout";
import { NavLink, useLocation } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import HomeFooter from "../../../../pages/HomePage/HomeFooter";
import "../../../../pages/HomePage/HomePage.scss";
import { useState } from "react";
import moment from "moment";
import NumberFormat from "react-number-format";
import { useEffect } from "react";
import { handleGetDetailOrder, handlePayWithStripe } from "./paymentAPI";
import { handleGetDetailCustomer } from "../../../Admin/GymCenter/Customers/CustomerDetail/CusDetailAPI";
import { handleGetDetailService } from "../../../Admin/ManageOrder/orderAPI";
const { Step } = Steps;
const PaymentPage = () => {
  // const location: Location & {
  //   state?: { name: string };
  // } = useLocation();
  const { state } = useLocation();
  const [detailCus, setDetailCus] = useState();
  const [detailOrder, setDetailOrder] = useState();
  const [detailService, setDetailService] = useState();
  console.log("check info pay: ", state);
  const [token, setToken] = useState();
  const onToken = (token) => {
    console.log("stripe", token);
    if (token) {
      setToken(token.id);
    }
  };
  useEffect(() => {
    try {
      handlePayWithStripe(
        token,
        detailOrder.amount,
        detailOrder.id,
        detailOrder.ReservationId,
        detailOrder.CustomerId,
        detailOrder.Status,
        detailOrder.createdAt,
        detailCus.CustomerEmail,
        "BOOKING AT GHGYM",
        "YOUR QR CODE"
      ).then((res) => {
        console.log("check paymnent with stripe: ", res);
      });
    } catch (error) {
      console.log(error);
    }
  }, [token]);
  useEffect(() => {
    try {
      handleGetDetailOrder(state.item.id)
        .then((res) => {
          console.log("check order detail: ", res.order);
        })
        .catch((error) => {
          message.error(error);
        });
      handleGetDetailCustomer(state.item.CustomerId)
        .then((res) => {
          if (res.cusDetail) {
            setDetailCus(res.cusDetail);
          }
        })
        .catch((error) => {
          message.error(error);
        });
      handleGetDetailService(state.item.ServiceId)
        .then((res) => {
          if (res.serviceDetail) {
            setDetailService(res.serviceDetail);
          }
        })
        .catch((error) => message.error(error));
    } catch (error) {
      console.log(error);
    }
  }, [state]);
  return (
    <div className="PaymentBg">
      <div className="containerPayment">
        <div className="backToHome">
          <NavLink to="/" className="backtoHome">
            <ArrowLeft size={24} color="#292829" weight="duotone" />
            <div className="textBackToHome">Back to home</div>
          </NavLink>
        </div>
        <div className="titlePage">
          <div className="thisIsPayment">Payment Page</div>
          <div className="step">
            <Steps current={0}>
              <Step title="Bước 1" description="Chọn phương thức" />
              <Step title="Bước 2" description="Quét QR" />
              <Step title="Bước 3" description="Hoàn thành" />
            </Steps>
          </div>
        </div>
        <div className="pageContent">
          <div className="cusOrder">
            <div className="orderTitle">Thông tin đơn hàng</div>
            <div className="content">
              <div className="leftContent">
                <div className="itemTitle">Mã giao dịch</div>
                <div className="itemContent">A651HVH1641</div>
                <div className="itemTitle">Khách hàng</div>
                <div className="itemContent">{state.item.CustomerName}</div>
              </div>
              <div className="rightContent">
                <div className="itemTitle">Dịch vụ đăng ký</div>
                <div className="itemContent">
                  {detailService?.ServiceName}
                  <img
                    src={detailService?.ServiceImage}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "7px",
                    }}
                  />
                </div>

                <div className="itemTitle">Khung giờ</div>
                <div className="itemContent">
                  {moment(state.item.StartTime).format(
                    "dddd,DD-MM-YYYY H-mm A"
                  )}
                </div>
              </div>
            </div>
            <div className="total">
              Total :{" "}
              <NumberFormat
                value={state.item.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />{" "}
              {"VND"}
            </div>
          </div>
          <div className="methodPayment">
            <div className="methodTiltle">Phương thức thanh toán</div>
            <div className="methodChoose">Chọn 1 phương thức thanh toán :</div>
            <div className="imgMethod">
              {/* <img className="momo" src={momo}></img>
                            <img className="stripe" src={stripe}></img> */}
              <div className={"momo"}></div>
              <StripeCheckout
                name={state.item.CustomerName}
                image={detailCus?.CustomerImage}
                description="Thanks for payment booking "
                amount={1000} //se sua lai giong vs gia that de v de test
                email={detailCus?.CustomerEmail}
                token={onToken}
                stripeKey={`pk_test_51LJw5FAZSrSS1g1Fw8sCcbkbuIwnq43uVQ6v4yt4oOCz4uViqITYPQAek49w0y5kZX6yE2qjYeF0IQeGmKCRRjD900uiS52NeK`}
                currency="VND"
              >
                <div className={"stripe"}></div>
              </StripeCheckout>
            </div>
          </div>
          <button className="btn-pay">Thanh toán</button>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};
export default PaymentPage;