import React, { useEffect, useState } from "react";
import AdminMenu from "../layout/AdminMenu";
import Layout from "../layout/Layout";
import { Table, Popconfirm, message } from "antd";



const ParkinsonDiseaseDetails = () => {

    const [diabetesData, setDiabetesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/get_all_diabetes_data");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("Fetched data:", data); // Log the data to verify the structure
                setDiabetesData(data.diabetes_data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const handleDelete = (record) => {
        const dataId = record._id; // Assuming _id is the correct identifier
        console.log("Record:", record); //
        fetch(`http://127.0.0.1:5000/api/delete_diabetes_data/${dataId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    message.success("Diabetes data deleted successfully");
                    setDiabetesData((prevData) =>
                        prevData.filter((item) => item._id !== dataId)
                    );
                } else {
                    message.error("Failed to delete the diabetes data");
                }
            })
            .catch((error) => {
                console.error("Error deleting diabetes data:", error);
                message.error("An error occurred while deleting the diabetes data.");
            });
    };




    const columns = [
        {
            title: "Name",
            dataIndex: "Name",
            key: "Name",
            width: 100,
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
            title: "Age",
            dataIndex: "Age",
            key: "Age",
        },
        {
            title: "BMI",
            dataIndex: "BMI",
            key: "BMI",
        },
        {
            title: "Glucose",
            dataIndex: "Glucose",
            key: "Glucose",
        },
        {
            title: "Blood Pressure",
            dataIndex: "BloodPressure",
            key: "BloodPressure",
        },
        {
            title: "Diabetes Pedigree Function",
            dataIndex: "DiabetesPedigreeFunction",
            key: "DiabetesPedigreeFunction",
        },
        {
            title: "Insulin",
            dataIndex: "Insulin",
            key: "Insulin",
        },
        {
            title: "Pregnancies",
            dataIndex: "Pregnancies",
            key: "Pregnancies",
        },
        {
            title: "Skin Thickness",
            dataIndex: "SkinThickness",
            key: "SkinThickness",
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
                                    DIABETES DISEASE patient details
                                </h1>
                            </div>

                            <div className="'flex items-center justify-center rounded" style={{ overflowX: 'auto' }}>
                                <Table
                                    dataSource={diabetesData}
                                    columns={columns}
                                    pagination={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout >
        </div >
    );
};

export default ParkinsonDiseaseDetails;
