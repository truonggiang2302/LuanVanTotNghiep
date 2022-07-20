import React, { useState, useEffect } from "react";
import { getServiceDetail } from "./cusBookingAPI";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const ListCusBooking = (props) => {
    const [serviceDetail, setServiceDetail] = useState();
    const [noserviceDetail, setNoServiceDetail] = useState(false);
    const [, setServiceDetailLoading] = useState(true)
    const [item, setItem] = useState(props.data)
    const navigate = useNavigate();
    useEffect(() => {
        getServiceDetail(props.data.ServiceId).then((response) => {
            if (response.serviceDetail) {
                setServiceDetail(response.serviceDetail);
                setNoServiceDetail(false);
            } else {
                setNoServiceDetail(true);
            }
        })
            .catch(() => {
                setNoServiceDetail(true);
            })
            .finally(() => {
                setServiceDetailLoading(false);
            });
    }, []);
    const handlePay = () => {
        console.log("booking id: ", item);
        navigate("/payment-page", { state: { item } });
    };
    return (
        <>
            {props.data.Status === "CANCELED" ? "" :
                (props.data.Status === "PENDING" ?
                    <div className="Center">
                        <div className="centerInfo">
                            <div className="info">

                                <p className={"infoCus"}>Khách hàng : {props.data.CustomerName} </p>
                                <p className={"infoCus"}>Ngày bắt đầu : {moment(props.data.StartTime).format("DD-MM-YYYY")}    </p>
                                <p className={"infoCus"}>Ngày kết thúc : {moment(props.data.EndTime).format("DD-MM-YYYY")} </p>

                            </div>
                            <div className="infoService">
                                <p className={"textNameCenter"}>Dịch vụ đăng ký : {serviceDetail?.ServiceName} </p>
                                <p className={"textNameCenter"}>Huấn luyện viên : {props.data.PTName}</p>
                                <p className={"textNameCenter"}>Trạng thái : {props.data.Status}</p>
                            </div>
                            <div className="detailInfo">

                                <span className="lineDetailInfo"></span>
                                <button className="buttonDeniend" onClick={() => props.cancel(props.data.id, props.data.ScheduleId)} >Từ chối</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="Center">
                        <div className="centerInfo">
                            <div className="info">

                                <p className={"infoCus"}>Khách hàng : {props.data.CustomerName} </p>
                                <p className={"infoCus"}>Ngày bắt đầu : {moment(props.data.StartTime).format("DD-MM-YYYY")}    </p>
                                <p className={"infoCus"}>Ngày kết thúc : {moment(props.data.EndTime).format("DD-MM-YYYY")} </p>

                            </div>
                            <div className="infoService">
                                <p className={"textNameCenter"}>Dịch vụ đăng ký : {serviceDetail?.ServiceName} </p>
                                <p className={"textNameCenter"}>Huấn luyện viên : {props.data.PTName}</p>
                                <p className={"textNameCenter"}>Trạng thái : {props.data.Status}</p>
                            </div>
                            <div className="detailInfo">
                                <button className="buttonAccept" onClick={() => handlePay()} >Thanh toán</button>
                                <span className="lineDetailInfo"></span>
                                <button className="buttonDeniend" onClick={() => props.cancel(props.data.id, props.data.ScheduleId)} >Từ chối</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
export default ListCusBooking;