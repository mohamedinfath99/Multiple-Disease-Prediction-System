
import React, { useState } from "react";
import AdminMenu from "../layout/AdminMenu";
import Layout from "../layout/Layout";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Form, Input, Button, message, Select } from "antd";

const { Option } = Select;

const DiabetesDisease = () => {
    const [diagnosis, setDiagnosis] = useState("");
    const [form] = Form.useForm();

    const onFinish = (values) => {
        // Send a POST request to your API with the input data
        fetch("http://127.0.0.1:5000/api/new/predict_diabetes", {
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


    const handleReset = () => {
        // Reset the form fields
        form.resetFields();
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
                                <h1 className="text-2xl md:text-4xl mb-5 text-center text-uppercase text-gray-800">
                                    Diabetes Disease Prediction
                                </h1>

                                <Form
                                    form={form}
                                    name="patient_data"
                                    onFinish={onFinish}
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 14 }}
                                >
                                    {/* Patient Name */}
                                    <Form.Item
                                        label="Patient Name"
                                        name="patient_name"
                                        rules={[{ required: true, message: 'Please enter patient name!' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    {/* Patient Phone */}
                                    <Form.Item
                                        label="Patient Phone"
                                        name="patient_phone"
                                        rules={[{ required: true, message: 'Please enter patient phone!' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    {/* Patient Address */}
                                    <Form.Item
                                        label="Patient Address"
                                        name="patient_address"
                                        rules={[{ required: true, message: 'Please enter patient address!' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    {/* Gender */}
                                    <Form.Item
                                        label="Gender"
                                        name="gender"
                                        rules={[{ required: true, message: 'Please select gender!' }]}
                                    >
                                        <Select>
                                            <Option value="Female">Female</Option>
                                            <Option value="Male">Male</Option>
                                            <Option value="Other">Other</Option>
                                        </Select>
                                    </Form.Item>

                                    {/* Glucose Level */}
                                    <Form.Item
                                        label="Glucose Level"
                                        name="glucose"
                                        rules={[
                                            { required: true, message: 'Please enter the glucose level!' },
                                        ]}
                                    >
                                        <Input type="number" />
                                    </Form.Item>

                                    {/* Blood Pressure */}
                                    <Form.Item
                                        label="Blood Pressure"
                                        name="blood_pressure"
                                        rules={[
                                            { required: true, message: 'Please enter the blood pressure!' },
                                        ]}
                                    >
                                        <Input type="number" />
                                    </Form.Item>

                                    {/* Skin Thickness */}
                                    <Form.Item
                                        label="Skin Thickness"
                                        name="skin_thickness"
                                        rules={[
                                            { required: true, message: 'Please enter the skin thickness!' },
                                        ]}
                                    >
                                        <Input type="number" />
                                    </Form.Item>

                                    {/* Insulin Level */}
                                    <Form.Item
                                        label="Insulin Level"
                                        name="insulin"
                                        rules={[
                                            { required: true, message: 'Please enter the insulin level!' },
                                        ]}
                                    >
                                        <Input type="number" />
                                    </Form.Item>

                                    {/* BMI (Body Mass Index) */}
                                    <Form.Item
                                        label="BMI (Body Mass Index)"
                                        name="bmi"
                                        rules={[{ required: true, message: 'Please enter the BMI!' }]}
                                    >
                                        <Input type="number" />
                                    </Form.Item>

                                    {/* Diabetes Pedigree Function */}
                                    <Form.Item
                                        label="Diabetes Pedigree Function"
                                        name="diabetes_pedigree_function"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter the diabetes pedigree function!',
                                            },
                                        ]}
                                    >
                                        <Input type="number" />
                                    </Form.Item>

                                    {/* Age */}
                                    <Form.Item
                                        label="Age"
                                        name="age"
                                        rules={[{ required: true, message: 'Please enter the age!' }]}
                                    >
                                        <Input type="number" />
                                    </Form.Item>

                                    {/* Smoking History */}
                                    <Form.Item
                                        label="Smoking History"
                                        name="smoking_history"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select smoking history!',
                                            },
                                        ]}
                                    >
                                        <Select>
                                            <Option value="never">Never</Option>
                                            <Option value="No Info">No Info</Option>
                                            <Option value="current">Current</Option>
                                            <Option value="former">Former</Option>
                                            <Option value="ever">Ever</Option>
                                            <Option value="not current">Not Current</Option>
                                        </Select>
                                    </Form.Item>

                                    <div className="flex justify-center items-center flex-row gap-5">
                                        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                                            <Button type="primary" htmlType="submit">
                                                Submit
                                            </Button>
                                        </Form.Item>

                                        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                                            <Button type="primary" htmlType="button" onClick={handleReset}>
                                                Reset
                                            </Button>
                                        </Form.Item>
                                    </div>

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

export default DiabetesDisease;
