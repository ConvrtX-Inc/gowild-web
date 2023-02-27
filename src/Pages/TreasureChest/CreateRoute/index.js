import {React, useState, useEffect, useRef, useCallback} from "react";
import PageTitle from "../../../Components/Pagetitle";
import { Button, Col, Form, Row } from "react-bootstrap";
import map1 from "Images/map1.jpg";
import rectangle from "Images/Rectangle.png";
import img2 from "Images/chestcpAsset .png";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import RouteMap from "../../RoutelistPage/RouteMap";



const CreateTreasure = () => {

    const navigate = useNavigate();
    const [val, setVal] = useState([]);

    const [file, setFile] = useState([]);
    const [formData, setFormData] = useState({});
    const [uploadFile, setUploadFile] = useState({});
    const [uploadFiles, setUploadFiles] = useState({});
    const [startingPoint, setStartingPoint] = useState({
        lat: 0,
        lng: 0,
    });
    const [markers, setMarkers] = useState([]);
    const [fields, setFields] = useState([{ sponsor: '', file: null, imgLink: '' }]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);

    const addMarker = useCallback(
        (lat, lng) => {

            setMarkers([{
                position: {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng),
                },
                color: "black"
            }]);
        },
        [markers]
    );
    useEffect(() => {
        if (formData.longitude && formData.latitude) {
            addMarker(formData.latitude, formData.longitude)
        }

    }, [formData]);
    useEffect(() => {
        console.log('fields', fields)
        console.log('id', id)
    },[fields, id]);
    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setFormData((prevalue) => {
            return {
                ...prevalue,   // Spread Operator
                [name]: value
            }
        })

    }


    const submitForm = async (event) => {
        event.preventDefault();
            const eventDateTime = moment(`${formData.date} ${formData.time}`, "YYYY-MM-DD HH:mm:ss.SSS");
            const eventDateTimeUtc = eventDateTime.utc().format();
            // const eventDateTime = moment.utc(`${formData.date} ${formData.time}::11.111`).format("YYYY-MM-DD HH:mm:ss.SSS");

            const dataObj = {
            "title": formData.title,
            "description": formData.description,
            "location": {
            "latitude": JSON.parse(formData.latitude),
            "longitude": JSON.parse(formData.longitude)
            },
            "eventDate": eventDateTimeUtc,
            "eventTime": formData.time,
            "no_of_participants": formData.number,
            "picture": formData.picture
            }
            await AuthService.postMethod(`${ENDPOINT.treasure_chests.listing}`, true, dataObj).then(async (res) => {
                setId(res.data.id)
                const dataArray = new FormData();
                dataArray.append("file", uploadFile.uploadFile);
                await AuthService.postMethod(`${ENDPOINT.treasure_chests.update_picture}${res.data.id}/update-picture`, true, dataArray, false, true).then(async (res) => {
                }).catch((err) => {
                    swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
                });
                for (const sponsor of fields) {
                    const linkObj = {
                        "treasure_chest": res.data.id,
                        "link": sponsor.sponsor,
                    }
                    await AuthService.postMethod(`${ENDPOINT.admin_sponsor.sponsor}`, true, linkObj).then(async (resData) => {

                        if (sponsor.imgLink) {
                            const dataArray1 = new FormData();
                            dataArray1.append("file", sponsor.imgLink);
                            await AuthService.postMethod(`${ENDPOINT.admin_sponsor.sponsor_img}${resData.data.id}/update-image`, true, dataArray1, false, true).then(async (res) => {
                            }).catch((err) => {
                                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
                            });
                        }

                    }).catch((err) => {
                        swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
                    });
                }
            }).catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });

        toast.success('Form data submitted successfully', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigate('/treasure-chests-list');
    };
    function uploadSingleFile(e) {
        setUploadFile({ uploadFile: e.target.files[0] })
        console.log("uploadFile", e.target.files[0])

        let ImagesArray = Object.entries(e.target.files).map((e) =>
            URL.createObjectURL(e[1])
        );
        setFile([...file, ...ImagesArray]);
    }

    //   add input field
    function deleteFile(e) {
        const s = file.filter((item, index) => index !== e);
        setFile(s);
    }

    const handleAddField = () => {
        setFields([...fields, { sponsor: '', file: null, imgLink: '' }]);
        setShow(true);
    };
    const handleRemoveField = index => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };

    const handleChanges = (index, event) => {
        const newFields = [...fields];
        if (event.target.name === 'file') {
            newFields[index][event.target.name] = URL.createObjectURL(event.target.files[0]);
            newFields[index]['imgLink'] = event.target.files[0];
        } else {
            newFields[index][event.target.name] = event.target.value;
        }
        setFields(newFields);
    };
    return (
        <>
            <PageTitle title="Treasure Chest" />
            <section className={"section treasure_chests"}>
                <Form onSubmit={submitForm}>
                    <Row>
                        <Col md={4}>

                            <Form.Group>
                                <Form.Label><b>Title</b></Form.Label>
                                <Form.Control type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="First On The List" />
                                <Form.Label><b>Description</b></Form.Label>
                                <Form.Control as="textarea" type="text"
                                    name="description"
                                    required
                                    value={formData.description}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="Write something here ..." />
                                <Form.Label><b>Treasure Location</b></Form.Label>
                                <Form.Control type="text"
                                    name="latitude"
                                    required
                                    value={formData.latitude}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="65.5234°" />
                                <Form.Control type="text"
                                    name="longitude"
                                    required
                                    value={formData.longitude}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="1.12378°" />
                            </Form.Group>

                        </Col>
                        <Col md={8}>
                            <div className={"img-box"}>
                                <RouteMap
                                    startingPoint={startingPoint}
                                    travelMode={"WALKING"}
                                    markers={markers}
                                />
                            </div>
                        </Col>

                        <Col md={12}>
                            <div className={"pt-5"}>
                            </div>
                            <Row>
                                <Col md={12}>
                                    <Row>
                                        <Col md={4}>
                                            <Row>
                                                <Col md={12}>
                                                    <Form.Group>
                                                        <Form.Label className="mt-1"><b>Sponsors</b></Form.Label>
                                                        <Form.Group className="mt-2">

                                                            <div>
                                                                {fields.map((formData, index) => (
                                                                    <div key={index}>
                                                                        <div className="d-flex">
                                                                            {formData.file ? <img src={formData.file} width="10%" alt="Preview" /> : ""}
                                                                            <input
                                                                                type="text"
                                                                                name="sponsor"
                                                                                required
                                                                                value={formData.sponsor}
                                                                                // onChange={handleChange}
                                                                                className={"mb-1 ms-2 mb-md-2"} placeholder="🔗 www.redbull.com"
                                                                                onChange={event => handleChanges(index, event)}
                                                                                style={{ marginBottom: '0px !important' }}
                                                                            />

                                                                        </div>
                                                                        <div className="d-flex my-2">
                                                                            <p className="sponser">
                                                                                <button>add <br /> image  <input
                                                                                    type="file"
                                                                                    className="fileCss"
                                                                                    name="file"
                                                                                    onChange={event => handleChanges(index, event)}
                                                                                // style={{ display: 'none' }} ref={fileInputRef}
                                                                                /></button>

                                                                            </p>
                                                                            <input
                                                                                type="text"
                                                                                name="file"
                                                                                required
                                                                                value={formData.file}
                                                                                // onChange={handleChange}
                                                                                className={"mb-1 ms-2 mb-md-2"} placeholder="🔗Link" style={{ marginBottom: '0px !important' }}
                                                                                onChange={event => handleChanges(index, event)}
                                                                            />
                                                                            {show ? <button className="deleteButton" onClick={() => handleRemoveField(index)}>X</button> : ""}
                                                                        </div>

                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <p className="mb-0 float-right addMore" onClick={handleAddField}>Add more</p>

                                                        </Form.Group>

                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md={4}>
                                            <Row>
                                                <Col md={12}>
                                                    <Form.Group style={{ width: "90%" }}>
                                                        <Form.Label><b>Event Date</b></Form.Label>
                                                        <Form.Group>
                                                            <Form.Control type="date"
                                                                name="date"
                                                                value={formData.date}
                                                                onChange={handleChange}
                                                                className={"mb-1"}  style={{ textTransform: 'uppercase' }} />
                                                        </Form.Group>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={12}>
                                                    <Form.Group className="mt-3" style={{ width: "90%" }}>
                                                        <Form.Label><b>Time</b></Form.Label>
                                                        <Form.Control type="time"
                                                            name="time"
                                                            required
                                                            value={formData.time}
                                                            onChange={handleChange}
                                                            className={"mb-3"} />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={12}>
                                                    <Form.Group className="mt-3" style={{ width: "90%" }}>
                                                        <Form.Label><b>Number of participants</b></Form.Label>
                                                        <Form.Control type="number"
                                                            name="number"
                                                            min="1"
                                                            //  max="20"
                                                            value={formData.number}
                                                            onChange={handleChange}
                                                            pattern="[0-9]*"
                                                             inputMode="numeric"
                                                            className={"mb-3"} placeholder="200" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md={4}>
                                            <Row>
                                                <Col md={12}>
                                                    <Form.Label className="d-flex "><b>Upload Augmented Reality</b></Form.Label>
                                                    <label className={"treasureChest_img"} htmlFor="upload">
                                                        <img src={img2} width="85%" alt="" />
                                                    </label>
                                                    <Form.Label className="d-flex mt-4 mb-0 "><b>Upload Thumbnail</b></Form.Label>
                                                    <label className={"fileUpload v2 mb-0"} htmlFor="upload-photo">
                                                        <Form.Control
                                                            type="file"
                                                            name="file"
                                                            id={"upload-photo"}
                                                            // value={formData.picture}
                                                            disabled={file.length === 1}
                                                            className="mt-4"
                                                            // onChange={handleChange}
                                                            onChange={uploadSingleFile}
                                                        />
                                                        {/* <span>Attach images of thumbnail</span> */}
                                                    </label>
                                                    {/* preview image */}
                                                    <div className="form-group previewBox">
                                                        {file.length > 0 &&
                                                            file.map((item, index) => {
                                                                return (
                                                                    <div className={"preview"} key={item}>
                                                                        <img src={item} alt="" />
                                                                        <Button type="button" onClick={() => deleteFile(index)}>
                                                                            <i className={"fal fa-times"}></i>
                                                                        </Button>
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={12} className="d-flex justify-content-center">
                                    <Form.Group className="text-center" style={{ width: "58%" }}>
                                        <Button type="submit" className={"w-50 my-4 m-auto text-center"}>Submit</Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>



            </section>
        </>
    )
}

export default CreateTreasure;