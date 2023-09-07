
import React, { useState } from "react";
import AdminMenu from "../layout/AdminMenu";
import Layout from "../layout/Layout";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Form, Input, Button, message } from "antd";

const ParkinsonDisease = () => {
    const [diagnosis, setDiagnosis] = useState("");
    const [form] = Form.useForm();

    const onFinish = (values) => {
        // Send a POST request to your API with the input data
        fetch("http://127.0.0.1:5000/api/predict_diabetes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((response) => response.json())
            .then((data) => {
                setDiagnosis(data.diagnosis);
                message.success(data.diagnosis);
            })
            .catch((error) => {
                console.error("Error:", error);
                message.error("An error occurred while making the prediction.");
            });
    };

    return (
        <div>
            <NavBar showLinks={false} />

            <Layout>
                <div>
                    <div className="container mx-auto px-4 py-8 md:py-16">
                        <div className="md:flex">
                            <div className="md:w-1/4 mb-4 mr-3">
                                <AdminMenu />
                            </div>

                            <div className="md:w-3/4 p-4 md:p-8 rounded bg-gray-200">
                                <div className="text-gray-800 rounded h-20 mb-8" style={{ backgroundColor: '#757777' }}>
                                    <h1 className="text-2xl md:text-4xl mb-5 text-center  text-uppercase  " >
                                        Parkinson Disease Prediction
                                    </h1>
                                </div>

                                <Form
                                    form={form}
                                    name="patient_data"
                                    onFinish={onFinish}

                                >
                                    <Form.Item
                                        label="Patient Name"
                                        name="patient_name"
                                        rules={[{ required: true, message: "Please enter patient name!" }]}
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Patient Phone"
                                        name="patient_phone"
                                        rules={[{ required: true, message: "Please enter patient phone!" }]}
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Patient Address"
                                        name="patient_address"
                                        rules={[{ required: true, message: "Please enter patient address!" }]}
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <div className="flex justify-between">
                                        <div className="w-1/2 pr-2">

                                        </div>
                                    </div>


                                    <Form.Item
                                        label="Number of Pregnancies"
                                        name="pregnancies"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the number of pregnancies!",
                                            },
                                        ]}
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 5 }}
                                    >
                                        <Input type="number" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Glucose Level"
                                        name="glucose"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the glucose level!",
                                            },
                                        ]}
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 5 }}
                                    >
                                        <Input type="number" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Blood Pressure"
                                        name="blood_pressure"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the blood pressure!",
                                            },
                                        ]}
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 5 }}
                                    >
                                        <Input type="number" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Skin Thickness"
                                        name="skin_thickness"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the skin thickness!",
                                            },
                                        ]}
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 5 }}
                                    >
                                        <Input type="number" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Insulin Level"
                                        name="insulin"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the insulin level!",
                                            },
                                        ]}
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 5 }}
                                    >
                                        <Input type="number" />
                                    </Form.Item>

                                    <Form.Item
                                        label="BMI (Body Mass Index)"
                                        name="bmi"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the BMI!",
                                            },
                                        ]}
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 5 }}
                                    >
                                        <Input type="number" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Diabetes Pedigree Function"
                                        name="diabetes_pedigree_function"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the diabetes pedigree function!",
                                            },
                                        ]}
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 5 }}
                                    >
                                        <Input type="number" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Age"
                                        name="age"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the age!",
                                            },
                                        ]}
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 5 }}
                                    >
                                        <Input type="number" />
                                    </Form.Item>


                                    <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>

                                </Form>

                                {diagnosis && (
                                    <div className="text-center mt-4">
                                        <p>{diagnosis}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

            <Footer />
        </div>
    );
};

export default ParkinsonDisease;

