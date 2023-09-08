
import React, { useState } from "react";
import AdminMenu from "../layout/AdminMenu";
import Layout from "../layout/Layout";
import { Form, Input, Button, message } from "antd";

const HeartDisease = () => {
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
                                <AdminMenu />
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


                                        <Form.Item
                                            label="Age"
                                            name="age"
                                            rules={[{ required: true, message: 'Please enter the age!' }]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>


                                        <Form.Item
                                            label="BMI"
                                            name="bmi"
                                            rules={[
                                                { required: true, message: 'Please enter the bmi level!' },
                                            ]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>


                                        <Form.Item
                                            label="Insulin"
                                            name="insulin"
                                            rules={[
                                                { required: true, message: 'Please enter the insulin level' },
                                            ]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>


                                        <Form.Item
                                            label="Glucose Level"
                                            name="glucose"
                                            rules={[
                                                { required: true, message: 'Please enter the glucose level!' },
                                            ]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>


                                        <Form.Item
                                            label="Pregnancies"
                                            name="pregnancies"
                                            rules={[
                                                { required: true, message: 'Please enter the pregnancies details!' },
                                            ]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>


                                        <Form.Item
                                            label="Skin Thickness"
                                            name="skin_thickness"
                                            rules={[{ required: true, message: 'Please enter the skin thickness!' }]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>


                                        <Form.Item
                                            label="Blood Pressure"
                                            name="blood_pressure"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the blood pressure!',
                                                },
                                            ]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>


                                        <Form.Item
                                            label="Diabetes Pedigree"
                                            name="diabetes_pedigree_function"
                                            rules={[{ required: true, message: 'Please enter the diabetes pedigree function!' }]}
                                        >
                                            <Input type="number" />
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

                                        <div >
                                            {diagnosis && (
                                                <div className="text-center mt-6 flex items-center justify-center" style={{ backgroundColor: '#25a9ac', height: '40px' }}>
                                                    <p style={{ fontSize: '24px', textTransform: 'uppercase' }}>{diagnosis}</p>
                                                </div>
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
