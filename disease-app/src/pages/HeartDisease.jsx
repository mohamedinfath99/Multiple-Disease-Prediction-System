
import React, { useEffect, useState } from "react";
import UserMenu from "../layout/UserMenu";
import Layout from "../layout/Layout";
import { Form, Input, Button, message, Modal } from "antd";



const HeartDisease = () => {
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
        fetch("http://127.0.0.1:5000/api/predict_heart", {
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
                                        Heart Disease Prediction
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

                                        <div className='container' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div className='left-column' style={{ flex: 1, padding: '5px' }}>

                                                <Form.Item
                                                    label="Age"
                                                    name="age"
                                                    rules={[{ required: true, message: 'Please enter the age!' }]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>


                                                <Form.Item
                                                    label="Sex"
                                                    name="sex"
                                                    rules={[
                                                        { required: true, message: 'Please enter the sex level!' },
                                                    ]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>


                                                <Form.Item
                                                    label="Chest Pain"
                                                    name="cp"
                                                    rules={[
                                                        { required: true, message: 'Please enter the cp level' },
                                                    ]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>


                                                <Form.Item
                                                    label="Trestbps"
                                                    name="trestbps"
                                                    rules={[
                                                        { required: true, message: 'Please enter the trestbps!' },
                                                    ]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>


                                                <Form.Item
                                                    label="Chol"
                                                    name="chol"
                                                    rules={[
                                                        { required: true, message: 'Please enter the chol details!' },
                                                    ]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>


                                                <Form.Item
                                                    label="Fbs"
                                                    name="fbs"
                                                    rules={[{ required: true, message: 'Please enter the fbs!' }]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>


                                                <Form.Item
                                                    label="Restecg"
                                                    name="restecg"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please enter the restecg!',
                                                        },
                                                    ]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>
                                            </div>

                                            <div style={{ flex: 1, padding: '5px' }}>
                                                <Form.Item
                                                    label="Thalach"
                                                    name="thalach"
                                                    rules={[{ required: true, message: 'Please enter the thalach function!' }]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>



                                                <Form.Item
                                                    label="Exang"
                                                    name="exang"
                                                    rules={[{ required: true, message: 'Please enter the exang function!' }]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>




                                                <Form.Item
                                                    label="Oldpeak"
                                                    name="oldpeak"
                                                    rules={[{ required: true, message: 'Please enter the oldpeak function!' }]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>




                                                <Form.Item
                                                    label="Slope"
                                                    name="slope"
                                                    rules={[{ required: true, message: 'Please enter the slope function!' }]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>




                                                <Form.Item
                                                    label="Ca"
                                                    name="ca"
                                                    rules={[{ required: true, message: 'Please enter the ca function!' }]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>


                                                <Form.Item
                                                    label="Thal"
                                                    name="thal"
                                                    rules={[{ required: true, message: 'Please enter the thal function!' }]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>
                                            </div>
                                        </div>




                                        <div className="flex justify-center items-center flex-row gap-5 mt-5">
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

export default HeartDisease;
