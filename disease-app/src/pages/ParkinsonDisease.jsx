
import React, { useEffect, useState } from "react";
import UserMenu from "../layout/UserMenu";
import Layout from "../layout/Layout";
import { Form, Input, Button, message, Modal } from "antd";



const ParkinsonDisease = () => {
    const [diagnosis, setDiagnosis] = useState("");
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        console.log("Diagnosis:", diagnosis);
        if (diagnosis) {
            setModalVisible(true);
        }
    }, [diagnosis]);


    const onFinish = (values) => {
        fetch("http://127.0.0.1:5000/api/predict_parkinsons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("API Response Data:", data);
                setDiagnosis(data.diagnosis);
                console.log("Setting modalVisible to true");
                setModalVisible(true);
            })
            .catch((error) => {
                console.error("Error:", error);
                message.error("An error occurred while making the prediction.");
            });
    };


    const handleReset = () => {
        form.resetFields();
    };


    return (
        <div>
            <Layout>
                <div>
                    <div className="container mx-auto px-4 py-8 md:py-16">
                        <div className="md:flex">
                            <div className="md:w-1/4 mb-4 mr-3">
                                <UserMenu />
                            </div>


                            <div className="items-center justify-center flex-col md:w-3/4 rounded">

                                <div className='flex items-center justify-center rounded' style={{ backgroundColor: "#001529", height: "60px", marginBottom: '40px' }}>
                                    <h1 className="text-2xl md:text-4xl  text-center text-uppercase " style={{ fontFamily: 'sans-serif', fontWeight: 'bold', color: 'white', textTransform: 'uppercase' }}>
                                        Parkinson Disease Prediction
                                    </h1>
                                </div>


                                <div className="'flex items-center justify-center rounded" style={{ backgroundColor: '#cfd2df' }}>


                                    <Form
                                        form={form}
                                        name="patient_data"
                                        onFinish={onFinish}
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                        style={{ paddingTop: "40px" }}
                                    >

                                        <Form.Item
                                            label="Patient Name"
                                            name="patient_name"
                                            rules={[{ required: true, message: 'Please enter patient name!' }]}

                                        >
                                            <Input />
                                        </Form.Item>


                                        <Form.Item
                                            label="Patient Phone"
                                            name="patient_phone"
                                            rules={[{ required: true, message: 'Please enter patient phone!' }]}
                                        >
                                            <Input />
                                        </Form.Item>


                                        <Form.Item
                                            label="Patient Address"
                                            name="patient_address"
                                            rules={[{ required: true, message: 'Please enter patient address!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <br />
                                        <br />


                                        <Form.Item
                                            label="MDVP_Jitter_percent"
                                            name="MDVP_Jitter_percent"
                                            rules={[{ required: true, message: 'Please enter the MDVP_Jitter_percent!' }]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>


                                        <Form.Item
                                            label="MDVP_RAP"
                                            name="MDVP_RAP"
                                            rules={[
                                                { required: true, message: 'Please enter the MDVP_RAP level!' },
                                            ]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>


                                        <Form.Item
                                            label="MDVP_Shimmer"
                                            name="MDVP_Shimmer"
                                            rules={[
                                                { required: true, message: 'Please enter the MDVP_Shimmer level' },
                                            ]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>


                                        <Form.Item
                                            label="MDVP_Shimmer_dB"
                                            name="MDVP_Shimmer_dB"
                                            rules={[
                                                { required: true, message: 'Please enter the MDVP_Shimmer_dB!' },
                                            ]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>


                                        <Form.Item
                                            label="MDVP_APQ"
                                            name="MDVP_APQ"
                                            rules={[
                                                { required: true, message: 'Please enter the MDVP_APQ details!' },
                                            ]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>


                                        <Form.Item
                                            label="MDVP_PPQ"
                                            name="MDVP_PPQ"
                                            rules={[{ required: true, message: 'Please enter the MDVP_PPQ!' }]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>


                                        <Form.Item
                                            label="Shimmer_APQ3"
                                            name="Shimmer_APQ3"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the Shimmer_APQ3!',
                                                },
                                            ]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>


                                        <Form.Item
                                            label="Shimmer_APQ5"
                                            name="Shimmer_APQ5"
                                            rules={[{ required: true, message: 'Please enter the Shimmer_APQ5 function!' }]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>



                                        <div className="flex justify-center items-center flex-row gap-5">
                                            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                                <Button type="primary" htmlType="submit" style={{ background: "#1a0451", width: '100px' }}>
                                                    Submit
                                                </Button>
                                            </Form.Item>

                                            <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                                                <Button type="primary" htmlType="button" style={{ background: "#032b2f", width: '100px' }} onClick={handleReset}>
                                                    Reset
                                                </Button>
                                            </Form.Item>
                                        </div>

                                        <div>
                                            {diagnosis && (
                                                <Modal
                                                    title="Health Status:"
                                                    visible={modalVisible}
                                                    onCancel={() => setModalVisible(false)}
                                                    style={{ marginTop: '200px' }}
                                                    footer={[
                                                        <Button key="close" onClick={() => setModalVisible(false)}>
                                                            Close
                                                        </Button>
                                                    ]}
                                                >
                                                    <div style={{ maxWidth: '600px', marginTop: '20px', fontSize: '18px', fontWeight: '600', textAlign: 'center', lineHeight: '10px' }}>
                                                        <span style={{ color: diagnosis.includes("suffering") ? "red" : "green" }}>
                                                            {diagnosis}
                                                        </span>
                                                    </div>
                                                </Modal>
                                            )}
                                        </div>


                                    </Form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout >
        </div >
    );
};

export default ParkinsonDisease;

