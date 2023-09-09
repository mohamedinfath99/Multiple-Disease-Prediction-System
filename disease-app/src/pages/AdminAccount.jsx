import React, { useState } from "react";
import AdminMenu from "../layout/AdminMenu";
import Layout from "../layout/Layout";
import { Form, Input, Button, message } from "antd";

const AdminAccount = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        fetch("http://127.0.0.1:5000/edit_user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                if (data.error) {
                    message.error(data.error);
                } else {
                    message.success(data.message);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error:", error);
                message.error("An error occurred while updating user details.");
            });
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
                            <div className='flex items-center justify-center rounded' style={{ backgroundColor: "#001529", height: "60px", marginBottom: '40px' }}>
                                <h1 className="text-2xl md:text-4xl  text-center text-uppercase " style={{ fontFamily: 'sans-serif', fontWeight: 'bold', color: 'white', textTransform: 'uppercase' }}>
                                    Admin Edit Profile
                                </h1>
                            </div>

                            <div className="'flex items-center justify-center rounded" style={{ backgroundColor: '#cfd2df' }}>
                                <Form
                                    form={form}
                                    name="edit_profile"
                                    onFinish={onFinish}
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 14 }}
                                    style={{ paddingTop: "40px" }}
                                >
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Phone Number"
                                        name="phone_number"
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="New Password"
                                        name="password"
                                    >
                                        <Input.Password />
                                    </Form.Item>

                                    <div className="flex justify-center items-center flex-row gap-5">
                                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                            <Button type="primary" htmlType="submit" style={{ background: "#1a0451", width: '100px' }} loading={loading}>
                                                Update
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout >
        </div >
    );
};

export default AdminAccount;


