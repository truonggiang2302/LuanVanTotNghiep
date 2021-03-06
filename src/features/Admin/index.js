import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./admin.scss";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import avatar from "../../assets/images/logo/logoGHGym.png";
import logo from "../../assets/images/logo/GHGYMLogo.png";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  RightCircleOutlined,
  UserSwitchOutline,
  AppstoreOutlined,
  BankOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Badge, Button, Dropdown, Layout, Menu } from "antd";
import {
  BellRinging,
  Books,
  Buildings,
  ClockClockwise,
  Coins,
  Gear,
  GearSix,
  MapPinLine,
  Repeat,
  SignOut,
  Translate,
  User,
  UserCircle,
  UsersFour,
  UsersThree,
  UserSwitch,
  Planet,
  CalendarCheck,
  Book,
  ListNumbers,
  IdentificationBadge,
  AlignCenterHorizontal,
  Ticket,
} from "phosphor-react";
import DashboardAdmin from "./Dashboard";
import { Link, NavLink, Outlet, Route, Router, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguageApp } from "../../store/actions";
import { LANGUAGES } from "../../utils/constant";
import { FormattedMessage } from "react-intl";
import flagVie from "../../assets/images/region/vietnam.png";
import flagEng from "../../assets/images/region/united-states.png";
import { getAllCenter, getAllCenterActive } from "./AdminAPI";

const { Header, Sider, Content } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const AdminPage = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const navigate = useNavigate();
  const roleId = useSelector((state) => state.user.userInfo.roleId);
  // console.log("check role: ", roleId);
  const [collapsed, setCollapsed] = useState(true);
  const [center, setCenter] = useState([]);
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);
  const handleChangeListStaffs = () => {
    navigate("/admin/manage-staffs");
  };
  const handleChangeCenter = (CenterId, CenterName) => {
    navigate(`/admin/manage-center`);
    localStorage.setItem("CenterId", CenterId.toString());
    // console.log("check center id after change: ", CenterId);
  };
  const handleLogout = () => {
    dispatch(dispatch(actions.processLogout()));
    navigate("/admin-login");
  };
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          icon: <User size={20} color="#171717" weight="fill" />,
          label: <NavLink to="/admin/setting-account">Profile</NavLink>,
        },

        {
          key: "3",
          icon: <SignOut size={20} color="#1d1b1b" weight="fill" />,
          label: "Logout",
          onClick: handleLogout,
        },
      ]}
    />
  );
  const menuDrop = (
    <Menu
      items={[
        {
          key: "1",
          label: <p>uuuuuu</p>,
        },
        {
          key: "2",
          label: <p>Xong review</p>,
          // icon: <SmileOutlined />,
          // disabled: true,
        },
        {
          key: "3",
          label: <p>N??n c?? nhi???u ch????ng tr??nh h??n</p>,
          // disabled: true,
        },
        {
          key: "4",
          label: <p>Test th???</p>,
          // disabled: true,
        },
        {
          key: "5",
          label: <p>N??n c?? th??m m??y ch???y b???</p>,
          // disabled: true,
        },
      ]}
    />
  );
  const handleSettingAccount = () => {
    navigate("/admin/setting-account");
  };
  useEffect(() => {
    try {
      getAllCenterActive(1).then((res) => {
        // console.log("check res: ", res.centers);
        if (res && res.centers.rows.length > 0) {
          setCenter(res.centers.rows);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log("check center: ", center);
  const handleViewListAccount = () => {
    navigate("/admin/view-list-account");
  };
  const handleViewListService = () => {
    navigate("/admin/view-list-service");
  };
  const handleViewListManager = () => {
    navigate("/admin/view-list-manager");
  };
  const handleViewListOrder = () => {
    navigate("/admin/view-list-order");
  };

  const handleViewListSalary = () => {
    navigate("/admin/view-list-salary");
  };
  const handleViewListCenter = () => {
    navigate("/admin/view-list-center");
  };
  const handleViewListDiscount = () => {
    navigate("/admin/view-list-discount");
  };
  const handleViewListSchedule = () => {
    navigate("/admin/view-list-schedule");
  };
  const handleViewListBlog = () => {
    navigate("/admin/view-list-blog");
  };
  return (
    <Layout style={{ height: "100vh" }} className="bgAdmin">
      <Sider trigger={null} collapsible collapsed={collapsed} icon={logo}>
        <NavLink to="/admin" exact={true}>
          <div className="logo" />
        </NavLink>
        {roleId && roleId === 1 && (
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            itemIcon={<RightCircleOutlined />}

            //   getItem(
            //     <FormattedMessage id="admin.manage-gym.manage-account" />,
            //     "sub6",
            //     <UserCircle size={20} color="#f4f1f1" weight="fill" />,
            //     [
            //       getItem("Xem danh s??ch t??i kho???n", "8"),
            //       getItem("T???o t??i kho???n", "10"),
            //       getItem("C???p nh???t t??i kho???n", "11"),
            //     ]
            //   ),

            //   {
            //     key: "12",
            //     // icon: <BellRinging size={20} color="#f4f1f1" weight="fill" />,
            //     icon: <GearSix size={20} color="#f5f5f5" weight="fill" />,
            //     label: <FormattedMessage id="admin.manage-gym.setting" />,
            //   },
            //   getItem(
            //     <FormattedMessage id="admin.manage-gym.languages" />,
            //     "sub7",
            //     <Translate size={20} color="#f4f1f1" weight="fill" />,
            //     [
            //       {
            //         label: "Ti???ng Vi???t",
            //         key: "13",
            //         onClick: () => {
            //           dispatch(changeLanguageApp(LANGUAGES.VI));
            //         },
            //       },
            //       {
            //         label: "English",
            //         key: "14",
            //         onClick: () => {
            //           dispatch(changeLanguageApp(LANGUAGES.EN));
            //         },
            //       },
            //     ]
            //   ),
            // ]}
          >
            <Menu.SubMenu
              icon={<Buildings size={20} weight="bold" color="#fff" />}
              // title={<FormattedMessage id="admin.manage-center" />}
              title="Centers"
            >
              <Menu.SubMenu title="Center">
                {center &&
                  center.length > 0 &&
                  center.map((item, index) => {
                    return (
                      <Menu.Item
                        key={index}
                        onClick={() =>
                          handleChangeCenter(item.id, item.CenterName)
                        }
                      >
                        {item.CenterName}
                      </Menu.Item>
                    );
                  })}
              </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={<UserCircle size={20} weight="bold" color="#fff" />}
              title={<FormattedMessage id="admin.manage-account" />}
            >
              <Menu.Item onClick={handleViewListAccount}>
                Xem danh s??ch t??i kho???n
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={
                <IdentificationBadge size={20} weight="bold" color="#fff" />
              }
              // title="Qu???n l?? Manager of Center"
              title={<FormattedMessage id="admin.manage-manager" />}
            >
              <Menu.Item onClick={handleViewListManager}>
                Xem danh s??ch Manager
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={<Planet size={20} weight="bold" color="#fff" />}
              // title="Qu???n l?? D???ch v???"
              title={<FormattedMessage id="admin.manage-service" />}
            >
              <Menu.Item onClick={handleViewListService}>
                Xem danh s??ch d???ch v???
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={
                <AlignCenterHorizontal size={20} weight="bold" color="#fff" />
              }
              // title="Qu???n l?? Center"
              title={<FormattedMessage id="admin.manage-center" />}
            >
              <Menu.Item onClick={handleViewListCenter}>
                Xem danh s??ch Center
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={<CalendarCheck size={20} weight="bold" color="#fff" />}
              // title="Qu???n l?? L???ch l??m vi???c"
              title={<FormattedMessage id="admin.manage-schedule" />}
            >
              <Menu.Item onClick={handleViewListSchedule}>
                Xem danh s??ch L???ch l??m vi???c trong tu???n
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={<ListNumbers size={20} weight="bold" color="#fff" />}
              title={<FormattedMessage id="admin.manage-order" />}
              // title="Qu???n l?? ????n h??ng"
            >
              <Menu.Item onClick={handleViewListOrder}>
                Xem danh s??ch ????n h??ng
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={<Ticket size={20} weight="bold" color="#fff" />}
              // title="Qu???n l?? Khuy???n m??i"
              title={<FormattedMessage id="admin.manage-discount" />}
            >
              <Menu.Item onClick={handleViewListDiscount}>
                Xem danh s??ch m???c khuy???n m??i
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={<Coins size={20} weight="bold" color="#fff" />}
              title={<FormattedMessage id="admin.manage-salary" />}
              // title="Qu???n l?? M???c l????ng"
            >
              <Menu.Item onClick={handleViewListSalary}>
                Xem danh s??ch m???c l????ng
              </Menu.Item>
            </Menu.SubMenu>
            {/* <Menu.SubMenu
              icon={<Ticket size={20} weight="bold" color="#fff" />}
              title="Qu???n l?? Khuy???n m??i"
              // title={<FormattedMessage id="admin.manage-gym.manage-account" />}
            >
              <Menu.Item onClick={handleViewListDiscount}>
                Xem danh s??ch m???c khuy???n m??i
              </Menu.Item>
            </Menu.SubMenu> */}
            <Menu.SubMenu
              icon={<Book size={20} weight="bold" color="#fff" />}
              title={<FormattedMessage id="admin.manage-blog" />}
              // title="Qu???n l?? Blog"
            >
              <Menu.Item onClick={handleViewListBlog}>
                Xem danh s??ch Blog
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item
              icon={<ClockClockwise size={20} weight="bold" color="#fff" />}
              onClick={handleSettingAccount}
            >
              <FormattedMessage id="admin.account-setting" />
            </Menu.Item>
            <Menu.SubMenu
              icon={<Translate size={20} weight="bold" color="#fff" />}
              title={<FormattedMessage id="admin.manage-languages" />}
            >
              <Menu.Item
                onClick={() => {
                  dispatch(changeLanguageApp(LANGUAGES.VI));
                }}
              >
                Ti???ng vi???t
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  dispatch(changeLanguageApp(LANGUAGES.EN));
                }}
              >
                English
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        )}
        {roleId && roleId === 2 && (
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            itemIcon={<RightCircleOutlined />}
            items={[
              {
                label: "Center",
                key: "21",
                icon: <MapPinLine size={20} color="#eeeee7" weight="fill" />,
                // onClick: handleChangeCenter,
              },

              {
                key: "12",
                // icon: <BellRinging size={20} color="#f4f1f1" weight="fill" />,
                icon: <GearSix size={20} color="#f5f5f5" weight="fill" />,
                label: <FormattedMessage id="admin.account-setting" />,
              },
              getItem(
                <FormattedMessage id="admin.manage-languages" />,
                "sub7",
                <Translate size={20} color="#f4f1f1" weight="fill" />,
                [
                  {
                    label: "Ti???ng Vi???t",
                    key: "13",
                    onClick: () => {
                      dispatch(changeLanguageApp(LANGUAGES.VI));
                    },
                  },
                  {
                    label: "English",
                    key: "14",
                    onClick: () => {
                      dispatch(changeLanguageApp(LANGUAGES.EN));
                    },
                  },
                ]
              ),
            ]}
          />
        )}
      </Sider>
      <Layout className="sitelayout">
        <Header
          className="sitelayoutbackground"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <span>
            {language === LANGUAGES.VI ? (
              <img
                src={flagVie}
                style={{ width: "40px", height: "40px", borderRadius: "6px" }}
              />
            ) : (
              <img
                src={flagEng}
                style={{ width: "40px", height: "40px", borderRadius: "6px" }}
              />
            )}
          </span>
          <span className="notificationAdmin">
            <Badge style={{ zIndex: "9999" }} count={5} size="default">
              <Dropdown overlay={menuDrop}>
                <BellRinging size={26} color="#ffea00" weight="fill" />
              </Dropdown>
            </Badge>
          </span>
          <span className="infoUser">
            <img
              src={userInfo && userInfo.avatar}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "100px",
                paddingRight: "3px",
              }}
            />
            <span>{userInfo && userInfo.fullName}</span> &nbsp;
            <Dropdown overlay={menu} placement={"bottomLeft"} arrow>
              <Button
                style={{ outline: "none", border: "none" }}
                icon={
                  <Gear
                    size={20}
                    color="#c0c0c0"
                    weight="fill"
                    style={{ marginBottom: "8px" }}
                  />
                }
              ></Button>
            </Dropdown>
          </span>
        </Header>
        <Content
          className="sitelayoutbackground"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            maxHeight: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
