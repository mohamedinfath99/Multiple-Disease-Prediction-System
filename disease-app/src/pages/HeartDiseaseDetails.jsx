import React, { useEffect, useState } from "react";
import AdminMenu from "../layout/AdminMenu";
import Layout from "../layout/Layout";
import { Table, Popconfirm, message } from "antd";

const HeartDiseaseDetails = () => {
    const [heartData, setHeartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/get_all_heart_data");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("Fetched data:", data);
                setHeartData(data.heart_data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = (record) => {
        const dataId = record._id;
        console.log("Record:", record);
        fetch(`http://127.0.0.1:5000/api/delete_heart_data/${dataId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    message.success("Heart data deleted successfully");
                    setHeartData((prevData) =>
                        prevData.filter((item) => item._id !== dataId)
                    );
                } else {
                    message.error("Failed to delete the heart data");
                }
            })
            .catch((error) => {
                console.error("Error deleting heart data:", error);
                message.error("An error occurred while deleting the heart data.");
            });
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "Name",
            key: "Name",
            width: '100px',
        },
        {
            title: "Phone",
            dataIndex: "Phone",
            key: "Phone",
            width: 100,
        },
        {
            title: "Address",
            dataIndex: "Address",
            key: "Address",
            width: 100,
        },
        {
            title: "Diagnosis",
            dataIndex: "Diagnosis",
            key: "Diagnosis",
            width: 100,
        },
        {
            title: "Age",
            dataIndex: "Age",
            key: "Age",
        },
        {
            title: "Chest Pain types",
            dataIndex: "Chest Pain types",
            key: "Chest Pain types",
        },
        {
            title: "Exercise Induced Angina",
            dataIndex: "Exercise Induced Angina",
            key: "Exercise Induced Angina",
        },
        {
            title: "Fasting Blood Sugar",
            dataIndex: "Fasting Blood Sugar",
            key: "Fasting Blood Sugar",
        },
        {
            title: "Maximum Heart Rate",
            dataIndex: "Maximum Heart Rate",
            key: "Maximum Heart Rate",
        },
        {
            title: "Resting Blood Pressure",
            dataIndex: "Resting Blood Pressure",
            key: "Resting Blood Pressure",
        },
        {
            title: "Resting Electrocardiographic",
            dataIndex: "Resting Electrocardiographic",
            key: "Resting Electrocardiographic",
        },
        {
            title: "ST depression induced by exercise",
            dataIndex: "ST depression induced by exercise",
            key: "ST depression induced by exercise",
        },
        {
            title: "Serum Cholestoral",
            dataIndex: "Serum Cholestoral",
            key: "Serum Cholestoral",
        },
        {
            title: "Sex",
            dataIndex: "Sex",
            key: "Sex",
        },
        {
            title: "Slope of the peak exercise ST segment",
            dataIndex: "Slope of the peak exercise ST segment",
            key: "Slope of the peak exercise ST segment",
        },
        {
            title: "Thal",
            dataIndex: "Thal",
            key: "Thal",
        },
        {
            title: "Action",
            dataIndex: "Action",
            key: "Action",
            render: (text, record) => (
                <Popconfirm
                    title="Are you sure you want to delete this record?"
                    onConfirm={() => handleDelete(record)}
                    okText="Yes"
                    cancelText="No"
                >
                    <button className="bg-red-500 text-white font-bold py-2 px-4 rounded">Delete</button>
                </Popconfirm>
            ),
            width: 100,
        },
    ];


    return (
        <div>
            <Layout>
                <div className="container mx-auto px-4 py-8 md:py-16">
                    <div className="md:flex">
                        <div className="md:w-1/4 mb-4 mr-3">
                            <AdminMenu />
                        </div>

                        <div className="items-center justify-center flex-col md:w-3/4 rounded">
                            <div
                                className='flex items-center justify-center rounded'
                                style={{
                                    backgroundColor: "#001529",
                                    height: "60px",
                                    marginBottom: '40px',
                                }}
                            >
                                <h1
                                    className="text-2xl md:text-4xl  text-center text-uppercase "
                                    style={{
                                        fontFamily: 'sans-serif',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Heart DISEASE patient details
                                </h1>
                            </div>

                            <div className="'flex items-center justify-center rounded" style={{ overflowX: 'auto' }}>
                                <Table
                                    dataSource={heartData}
                                    columns={columns}
                                    pagination={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default HeartDiseaseDetails;
