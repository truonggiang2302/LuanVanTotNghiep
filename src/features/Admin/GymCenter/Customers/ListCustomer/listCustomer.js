import React, { useCallback, useEffect, useState } from "react";
import classes from "./styles.module.scss";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { LicenseManager } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { Gear } from "phosphor-react";
import frameworkcomponents from "./path";
import { getAllCustomerOfCenter } from "../CusAPI";
import { useSelector } from "react-redux";
LicenseManager.setLicenseKey(
  "For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-15_August_2020_[v2]_MTU5NzQ0NjAwMDAwMA==9aa5b7bf868ec5d39dc5cb979372325b"
);

const ListCustomer = (props) => {
  const [rowData] = useState([
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
  ]);
  console.log("check search value: ", props.searchValue);
  const [columnDefs] = useState([
    {
      field: "setting",
      flex: 0,
      // headerName: "Setting",
      cellRenderer: "settingRenderer",
    },

    {
      field: "Customer",
      flex: 2,
      // width: 215,
      // headerName: "PT",
      // type: "rightAligned",
      cellRenderer: "staffRenderer",
    },
    {
      field: "phone",
      // width: 215,
      // headerName: "Phone",
      // type: "rightAligned",
      cellRenderer: "phoneRenderer",
    },
    {
      field: "email",
      // width: 215,
      // headerName: "Email",
      // type: "rightAligned",
      cellRenderer: "emailRenderer",
    },
    {
      field: "address",
      // width: 215,
      // headerName: "Address",
      // type: "rightAligned",
      cellRenderer: "addressRenderer",
    },
  ]);
  const [gridApiCustomer, setGridApiCustomer] = useState();
  const IdCenter = useSelector((state) => state.user.userInfo);
  console.log(IdCenter);
  const CenterId = localStorage.getItem("CenterId");
  const serverSideDatasource = useCallback(() => {
    console.log("check cuurent salon:", CenterId);
    return {
      getRows: function (params) {
        // loading?.classList.remove("hidden");
        let page = 1;
        page = params.request.endRow / 10;
        try {
          //FOR FILTER PURPOSE
          getAllCustomerOfCenter(
            parseInt(CenterId),
            props.searchValue,
            parseInt(page)
          )
            .then((res) => {
              // console.log("check res cus of center: ", res);
              const data = res.customerOfCenter;
              if (data && data.rows.length > 0) {
                const lastRow = () => {
                  if (parseInt(data.totalPage) <= 1) return data.count;
                  else if (page <= parseInt(data.totalPages) - 2) return -1;
                  else return data.count;
                };
                // call the success callback
                setTimeout(() => {
                  params.successCallback(data.rows, lastRow());
                }, 500);
                // loading?.classList.add("hidden");
              } else {
                params.api.showNoRowsOverlay();
              }
            })
            .catch(() => {
              params.api.showLoadingOverlay();
            });
        } catch (error) {}
      },
    };
  }, [CenterId, props.searchValue]);
  const gridOptions = {
    rowSelection: "single",
    rowModelType: "serverSide",
    rowBuffer: 0,
    cacheBlockSize: 10,
    cacheOverflowSize: 1,
    maxConcurrentDatasourceRequests: 1,
    infiniteInitialRowCount: 10,
    maxBlocksInCache: 1000,
  };
  const agOverLaytheme =
    '<span class="ag-overlay-loading-center">No rows to show</span>';
  useEffect(() => {
    if (gridApiCustomer) {
      const newDataSource = serverSideDatasource();
      gridApiCustomer.setServerSideDatasource(newDataSource);
    }
  }, [serverSideDatasource, props.searchValue]);

  const onGridReady = (params) => {
    params.api.showLoadingOverlay();
    setGridApiCustomer(params.api);
    const dataSourceAll = serverSideDatasource();
    params.api.setServerSideDatasource(dataSourceAll);
  };
  const defaultColDef = {
    resizable: true,
    flex: 1,
    minWidth: 100,
  };

  return (
    <div
      className={classes.agThemeAlpineStaffs}
      style={{
        height: 501,
        width: "100%",
        padding: "0 20px",
      }}
    >
      <AgGridReact
        defaultColDef={defaultColDef}
        headerHeight={80}
        columnDefs={columnDefs}
        gridOptions={gridOptions}
        rowHeight={73}
        overlayLoadingTemplate={agOverLaytheme}
        frameworkComponents={frameworkcomponents}
        onGridReady={onGridReady}
        // suppressContextMenu={true}
      />
    </div>
  );
};
export default ListCustomer;
