import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, InputNumber, Radio, Form as AntForm, Card, Divider, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const GameSettings = ({ n, m, setN, setM, playerGoFirst, setPlayerGoFirst }) => {
    const navigate = useNavigate()

    return (
        <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
            <Card
                style={{
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                }}
                title={
                    <div style={{ textAlign: "center", color: "#001529" }}>
                        <h2>Game Settings</h2>
                    </div>
                }
            >
                <Formik
                    initialValues={{ n, m, playerGoFirst }}
                    onSubmit={(values) => {
                        setN(values.n);
                        setM(values.m);
                        setPlayerGoFirst(values.playerGoFirst);
                        navigate('/game', { state: { m: values.m, totalMatches: values.n, playerGoFirst: values.playerGoFirst } });
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <AntForm.Item label="Number of Matches (n)">
                                <Field name="n">
                                    {({ field }) => (
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <InputNumber
                                                {...field}
                                                min={1}
                                                max={50}
                                                value={values.n}
                                                onChange={(val) => setFieldValue("n", val)}
                                                style={{ marginRight: "10px" }}
                                            />
                                            <Tooltip title="This determines the base number of matches">
                                                <InfoCircleOutlined style={{ color: "#1890ff" }} />
                                            </Tooltip>
                                            <span style={{ marginLeft: "10px" }}>
                                                Total Matches: <strong>{2 * values.n + 1}</strong>
                                            </span>
                                        </div>
                                    )}
                                </Field>
                            </AntForm.Item>

                            <Divider />

                            <AntForm.Item label="Matches per Turn (m)">
                                <Field name="m">
                                    {({ field }) => (
                                        <InputNumber
                                            {...field}
                                            min={1}
                                            max={10}
                                            value={values.m}
                                            onChange={(val) => setFieldValue("m", val)}
                                            style={{ width: "100%" }}
                                        />
                                    )}
                                </Field>
                            </AntForm.Item>

                            <Divider />

                            <AntForm.Item label="Who Goes First?">
                                <Field name="playerGoFirst">
                                    {({ field }) => (
                                        <Radio.Group
                                            {...field}
                                            value={values.playerGoFirst}
                                            onChange={(e) => setFieldValue("playerGoFirst", e.target.value)}
                                        >
                                            <Radio value={true}>Player</Radio>
                                            <Radio value={false}>Computer</Radio>
                                        </Radio.Group>
                                    )}
                                </Field>
                            </AntForm.Item>

                            <Divider />

                            <div style={{ textAlign: "center", marginTop: "20px" }}>
                                <Button type="primary" htmlType="submit" size="large" style={{ width: "100%" }}>
                                    Start Game
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
};

export default GameSettings;