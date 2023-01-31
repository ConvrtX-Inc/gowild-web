import React, { useState, useEffect } from "react";
import { Table, Form, Row, Col, Button, Dropdown } from "react-bootstrap";
import classes from "../../treasureHuntRegistration/index.module.scss";
import AuthService from "../../../services/auth.service";
import { ENDPOINT } from "../../../config/constants";
import swal from "sweetalert";
import ReactPaginate from 'react-paginate';
import profile from "Images/userImg.png";
import accessHeader from "services/headers/access-header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewProfilePopup from "../UserComponent/ViewProfile/viewProfilePopup";



const ActiveTabData = (props) => {

    const { content } = props;

    const [selectedItems, setSelectedItems] = useState([]);
    const [isChecked, setIsChecked] = useState(true);
    
    const [modalShow, setModalShow] = useState(false);
    const [modalShowView, setModalShowView] = useState(false);
    const [search, setSearch] = useState("");

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [modalEditUser, setModalEditUser] = useState(false);
    const [editItem, setEditItem] = useState(null);
    // const [pageNumber, setPageNumber] = useState(1);
    // const itemsPerPage = 3;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(content.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(content.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, content]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % content.length;
        setItemOffset(newOffset);
    };

    const handleRowsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value))
    };

    const submitEventForm = async (id) => {
        // console.log("1233"+id);
        return  AuthService.postMethod(`${ENDPOINT.sub_admin.active_inactive}${id}/status`, true)
            .then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message);
                }
                 props.subAdminAllData()
                console.log(res);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });

    };


  // chekbox select all
  const handleCheckboxChange = (content) => {
    if (selectedItems.includes(content)) {
      setSelectedItems(selectedItems.filter((i) => i !== content));
    } else {
      setSelectedItems([...selectedItems, content]);
    }
  };

  const handleSelectAll = () => {
    setSelectedItems(content);
    setIsChecked(!isChecked);
  }

  const handleDeselectAll = () => {
    setSelectedItems([]);
    setIsChecked(!isChecked);
  };
    

    return (
        <>
            <div className={classes.tableFilter}>
                <Form>
                    <Row>
                        <Col md={8}>
                            <div className={"d-md-flex"}>
                                <Button variant="filter">
                                    <i className={"fal fa-filter"}></i>
                                    Filter
                                </Button>
                                <Form.Group className={classes.searchForm}>
                                    <Form.Control type="search" placeholder="Search Users by Name or Email" onChange={(e) => setSearch(e.target.value)} />
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th colSpan={0}>
                        {isChecked ? <Form.Check type="checkbox" onChange={handleSelectAll} /> : <Form.Check type="checkbox" onClick={handleDeselectAll} />}
                        </th>
                        <th> &nbsp;&nbsp;&nbsp;Name</th>
                        <th>Online status</th>
                        <th>Username</th>
                        <th>account Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems.filter((row) =>
                            !search.length || row.firstName.toString().toLowerCase().includes(search.toString().toLowerCase()) ||
                            row.lastName.toString().toLowerCase().includes(search.toString().toLowerCase()) ||
                            row.email.toString().toLowerCase().includes(search.toString().toLowerCase())).map((content) => (
                                <tr>
                                    <td><Form.Check type="checkbox" value={content}
                                        onChange={() => handleCheckboxChange(content)}
                                        checked={selectedItems.includes(content)} />
                                    </td>
                                    <td>
                                        <div className={"d-flex"}>
                                            <div className={classes.userImg}>
                                            {(content.picture)? <img src={"https://api.gowild.appscorridor.com" + content.picture} width="100%" alt={"img"} /> :  <img src={profile} width="100%" alt={"img"} /> }
                                            </div>
                                            <div className={classes.description}>
                                                <h4 className={"font-16 mb-0"}>{content.firstName +" "+ content.lastName}</h4>
                                                <div className={"text-muted"}>{content.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {content.onlineStatus === true
                                            ? <span className={`${classes.tag} ${classes.active}`}>Active</span>
                                            : <span className={`${classes.tag} ${classes.inactive}`}>Inactive</span>
                                        }
                                    </td>
                                    <td>{content.location}</td>
                                    <td>
                                        {content.accountStatus === "active"
                                            ? <span class="text-success"><b>ACTIVE</b></span>
                                            : <span class="text-danger"><b>DISABLED</b></span>
                                        }
                                    </td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                <i className={"far fa-ellipsis-v fa-fw"}></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/">
                                                    <i className={"fal fa-ban bg-warning text-white"}></i>
                                                    {content.accountStatus === "active" ? <p className="m-0 p-0" onClick={() => {
                                                        submitEventForm(content.id)
                                                    }}>Disable User</p> : <p className="m-0 p-0" onClick={() => {
                                                        submitEventForm(content.id)
                                                    }}>Active User</p>}
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#/" onClick={
                                                    () => {
                                                        setModalShowView(true)
                                                        setEditItem(content)
                                                    }
                                                }>
                                                    <i className={"fal fa-user bg-dark text-white"}></i>
                                                    View Profile
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </Table>
            <div className="result_pagination">
                <span> Rows per page: &nbsp; </span>
                <select onChange={handleRowsPerPageChange} value={itemsPerPage}>
                    <option>{currentItems.length}</option>
                    {/* {currentItems.length === 4 ? null  :<option value={4}>4</option>} */}
                    <option value={5}>5</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={75}>75</option>
                </select> <i className="fa fa-sort-desc" aria-hidden="true"></i>

                <span className="mx-5"> {currentItems.length} - {content.length} of {content.length} </span>
                {/* <span className="mx-5"> {pageCount-1} - {currentItems.length}  of {content.length} </span> */}
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="  >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    rowsPerPage={itemsPerPage}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName="active"

                />
            </div>

            <ViewProfilePopup
                show={modalShowView}
                onHide={() => setModalShowView(false)}
                editItem={editItem}

            />

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default ActiveTabData;