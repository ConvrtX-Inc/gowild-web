import classes from "../index.module.scss";
import React, { useState, useEffect } from 'react';
import { Table, Form, Dropdown, Button, Row, Col } from "react-bootstrap";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';


const TermsAndConditions = () => {

    const [content, setContent] = useState([]);
    const [isLoader, setIsLoader] = useState(false);


    const guidlinessTermsData = async () => {
        await AuthService.getMethod(ENDPOINT.admin_guidelines.terms_conditions)
            .then((res) => {
                setContent(res.data.data);
                setIsLoader(true);
                // console.log(res.data.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };

    const handleChange = event => {
        // 👇️ update textarea value
        setContent(event.target.value);
        console.log(event.target.value);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        return await AuthService.postMethod(ENDPOINT.admin_guidelines.terms_conditions)
            .then((res) => {
                setContent(res.data);
                //setIsLoader(true);
                console.log(event.current.value);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    }




    useEffect(() => {
        guidlinessTermsData();
        setIsLoader(true);

    }, []);



    // convert date format to month / day / year
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [month, day, year].join('/');
    }

    /* A constant that is used to format the date. */
    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };


    if (!isLoader) {
        return (
            <div className='loader'>
                <h3>Loading...</h3>
            </div>
        );
    }



    return (
        <>
            <Row>
                {
                    content.filter(item => {
                        return item.type === "termsAndConditions" ? true : false;
                    }).map((content) => {
                        return (
                            <>
                                <Col md={8}>
                                    <div className={classes.editSection}>
                                        <Form >
                                            <Form.Group className={`${classes.formGroup} mb-3`}>
                                                <textarea>
                                                    {content.description}
                                                </textarea>

                                            </Form.Group>
                                            <Form.Group>
                                                <Button variant={"dark"} onClick={handleSubmit}> Save </Button>
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className={classes.logBox}>
                                        <h4>  {(new Date()).toLocaleDateString('en-US', DATE_OPTIONS)} </h4>
                                        <div className={"text-muted font-12"}>Update Logs</div>
                                        <ul className={classes.logList}>
                                            <li>
                                                <div className={classes.box}>
                                                    <time className={"d-block"}>
                                                        {(formatDate(content.updatedDate))}
                                                    </time>

                                                    <div>Term &amp; Conditions - Updated!</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={classes.box}>
                                                    <time className="d-block">
                                                        {(formatDate(content.createdDate))}
                                                    </time>
                                                    <div>FAQ</div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                            </>
                        )
                    })
                }
            </Row>
        </>
    )
}

export default TermsAndConditions;