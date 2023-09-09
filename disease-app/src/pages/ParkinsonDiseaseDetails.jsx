import React, { useEffect, useState } from "react";
import AdminMenu from "../layout/AdminMenu";
import Layout from "../layout/Layout";
import { Table, Popconfirm, message } from "antd";

const ParkinsonDiseaseDetails = () => {
    const [parkinsonData, setParkinsonData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/get_all_parkinson_data"); // Updated API endpoint
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("Fetched data:", data); // Log the data to verify the structure
                setParkinsonData(data.parkinsons_data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            title: "Name",
            dataIndex: "Name",
            key: "Name",
            width: 200,
        },
        {
            title: "Address",
            dataIndex: "Address",
            key: "Address",
            width: 200,
        },
        {
            title: "Phone",
            dataIndex: "Phone",
            key: "Phone",
            width: 200,
        },
        {
            title: "Diagnosis",
            dataIndex: "Diagnosis",
            key: "Diagnosis",
            width: 200,
            render: (text) => {
                return (
                    <span style={{ color: text.includes("suffering") ? "red" : "green" }}>
                        {text}
                    </span>
                );
            },
        },
        {
            title: "MDVP_APQ",
            dataIndex: "MDVP_APQ",
            key: "MDVP_APQ",
        },
        {
            title: "MDVP_Jitter_percent",
            dataIndex: "MDVP_Jitter_percent",
            key: "MDVP_Jitter_percent",
        },
        {
            title: "MDVP_PPQ",
            dataIndex: "MDVP_PPQ",
            key: "MDVP_PPQ",
        },
        {
            title: "MDVP_RAP",
            dataIndex: "MDVP_RAP",
            key: "MDVP_RAP",
        },
        {
            title: "MDVP_Shimmer",
            dataIndex: "MDVP_Shimmer",
            key: "MDVP_Shimmer",
        },
        {
            title: "MDVP_Shimmer_dB",
            dataIndex: "MDVP_Shimmer_dB",
            key: "MDVP_Shimmer_dB",
        },
        {
            title: "Shimmer_APQ3",
            dataIndex: "Shimmer_APQ3",
            key: "Shimmer_APQ3",
        },
        {
            title: "Shimmer_APQ5",
            dataIndex: "Shimmer_APQ5",
            key: "Shimmer_APQ5",
        },
        {
            title: "Action",
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


    const handleDelete = (record) => {
        // Implement the delete logic as in your original code
        // ...
    };

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
                                    PARKINSON'S DISEASE Patient Details
                                </h1>
                            </div>

                            <div className="'flex items-center justify-center rounded" style={{ overflowX: 'auto' }}>
                                <Table
                                    dataSource={parkinsonData}
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

export default ParkinsonDiseaseDetails;
