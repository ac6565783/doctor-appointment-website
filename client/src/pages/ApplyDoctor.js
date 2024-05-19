import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Input, Row, TimePicker, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from "axios";
import moment from 'moment'
const ApplyDoctor = () => {
    const { user } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    //handle form
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                "/api/v1/user/apply-doctor",
                {
                    ...values, userId: user._id,
                    timings: [
                        moment(values.timings[0]).format("HH:mm"),
                        moment(values.timings[1]).format("HH:mm"),
                    ],
                },

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.success);
                navigate("/");
            } else {
                message.error(res.data.success);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Somthing Went Wrrong ");
        }
    };
    return (
        <Layout>
            <h1 className='text-center'>Apply doctor</h1>
            <Form layout='vertical' onFinish={handleFinish} className='m-3'>
                <h6 className=''>personal details:-</h6>
                <Row gutter={20}>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your name' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="last Name" name="lastName" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your name' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="phone" name="phone" required rules={[{ required: true }]}>
                            <Input type='number' placeholder='your phone number' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="email" name="email" required rules={[{ required: true }]}>
                            <Input type='email' placeholder='your email' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="website" name="website" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your website' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="address" name="address" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your address' />
                        </Form.Item>
                    </Col>
                </Row>
                <h6 className=''>proffesional details:-</h6>
                <Row gutter={20}>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="specialization" name="specialization" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your secialization' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="experience" name="experience" required rules={[{ required: true }]}>
                            <Input type='number' placeholder='your experience' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="feesPerConsaltation" name="feesPerConsaltation" required rules={[{ required: true }]}>
                            <Input type='number' placeholder='your feesPerConsaltation' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="timings" name="timings" required rules={[{ required: true }]}>
                            <TimePicker.RangePicker format={"HH:mm"} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}></Col>
                    <Col xs={24} md={24} lg={8}>
                        <button className="btn btn-primary form-btn" type='submit'>submit</button>
                    </Col>

                </Row>

            </Form>
        </Layout>
    )
}

export default ApplyDoctor
