import React, { useState, useEffect } from "react";
import { Form, Dropdown, Button, Row, Col, Table } from "react-bootstrap";
import classes from "../../treasureHuntRegistration/index.module.scss";
import ViewProfilePopup from "../UserComponent/ViewProfile/viewProfilePopup";
import EditUser from "../UserComponent/EditUser";
import AddUser from "../UserComponent/AddNewUser";
import ReactPaginate from 'react-paginate';
import profile from "Images/userImg.png";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {imageUrl} from "../../../Helper/Helpers";
import Pagination from "../../../Components/Pagination/Pagination";


const AllTabData = (props) => {

    const { content } = props;

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [isChecked, setIsChecked] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [modalShowView, setModalShowView] = useState(false);
    const [search, setSearch] = useState("");

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    // var itemsPerPage = 4;



    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(content.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(content.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, content]);

    const [modalEditUser, setModalEditUser] = useState(false);
    const [editItem, setEditItem] = useState(null);
    // const [pageNumber, setPageNumber] = useState(1);
    const handlePagination = (offset) => {
        setCurrentItems(content.slice(offset, (offset + itemsPerPage)));
    }
    const handleItemsPerPage = (value) => {
        setItemsPerPage(parseInt(value))
    }

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentItems(
      content.filter(
        (content) =>
          (content.firstName.trim() + " " + content.lastName.trim()).toLowerCase().includes(event.target.value.toLowerCase().trim()) ||
          content.email.toLowerCase().includes(event.target.value.toLowerCase().trim())
      )
    );
    if (event.target.value.trim() === '') {
      props.subAdminAllData();
    }
  };


    return (
        <>
            <div className={classes.tableFilter}>
                <Form >
                    <Row >
                        <Col md={8}>
                            <div className={"d-md-flex"}>
                                <Button variant="filter">
                                    <i className={"fas fa-filter"}></i>
                                    Filter
                                </Button>
                                <Form.Group className={classes.searchForm}>
                                   <Form.Group className={classes.searchForm}>
                                    <Form.Control type="search" placeholder="Search Users by Name, Email or Date" value={searchTerm} onChange={handleSearch}  />
                                </Form.Group>
                                </Form.Group>
                            </div>
                        </Col>
                        {/* <Col md={4} className={"d-md-flex justify-content-end"}>
                            <Button onClick={() => setModalShow(true)}>
                                Add New
                            </Button>
                        </Col> */}
                    </Row>
                </Form>
            </div>
            <Table className="user">
                <thead>
                    <tr>
                        <th>
                            {isChecked ? <Form.Check type="checkbox" onChange={handleSelectAll} /> : <Form.Check type="checkbox" onClick={handleDeselectAll} />}
                        </th>
                        <th> &nbsp;&nbsp;&nbsp;Name</th>
                        <th>Online Status</th>
                        <th>Location</th>
                        <th>Account Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems.map((content) => (
                                <tr key={content.id}>
                                    <td><Form.Check type="checkbox" value={content}
                                        onChange={() => handleCheckboxChange(content)}
                                        checked={selectedItems.includes(content)} />
                                    </td>
                                    <td>
                                        <div className={"d-flex"}>
                                            <div className={classes.userImg}>
                                            {(content.picture)? <img src={imageUrl(content.picture)} width="100%" alt={"img"} /> :  <img src={profile} width="100%" alt={"img"} /> }
                                            </div>
                                            <div className={classes.description}>
                                                <h4 className={"font-16 mb-0"}>{content.firstName + " " + content.lastName}</h4>
                                                <div className={"text-muted text-lowercase"}>{content.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {content.onlineStatus === true
                                            ? <span class={`${classes.tag} ${classes.active}`}>Active</span>
                                            : <span class={`${classes.tag} ${classes.inactive}`}>Inactive</span>
                                        }
                                    </td>
                                    <td>{content.location}</td>
                                    <td>
                                        {content.accountStatus === "active"
                                            ? <span class="text-success"><b>ACTIVE</b></span>
                                            : <span class="text-danger" ><b>DISABLED</b></span>
                                        }
                                    </td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                <i className={"far fa-ellipsis-v fa-fw"}></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/">
                                                    <i className={"fal fa-ban text-white active"}></i>
                                                    {content.accountStatus === "active" ? <p className="m-0 p-0" onClick={() => {
                                                       submitEventForm(content.id)
                                                    }} >Disable User</p> :   <p className="m-0 p-0" onClick={() => {
                                                       submitEventForm(content.id)
                                                    }}> <i class="fa fa-check tick" aria-hidden="true"></i>  Activate User</p>}
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
            <Pagination onPageChange={handlePagination} pageSize={itemsPerPage} totalRecords={content.length} handlePageSize={handleItemsPerPage}/>

            <EditUser
                show={modalEditUser}
                onHide={() => setModalEditUser(false)}
                editItem={editItem}
            />

            <AddUser
                subAdminAllData={props.subAdminAllData}
                show={modalShow}
                onHide={() => setModalShow(false)}

            />

            <ViewProfilePopup
                subAdminAllData={props.subAdminAllData}
                show={modalShowView}
                onHide={() => setModalShowView(false)}
                editItem={editItem}

            />



        </>
    )
}

export default AllTabData;