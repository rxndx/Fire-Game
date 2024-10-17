import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Typography, Divider, Row, Col, notification, Card, Progress } from "antd";
import { SmileOutlined, FireOutlined, MehOutlined, ReloadOutlined } from "@ant-design/icons";

import { makeComputerMove } from "../utils/gameLogic";

const { Title, Text } = Typography;

const openNotification = (message, icon) => {
    notification.open({
        message: message,
        icon: icon,
    });
};

const GamePage = () => {
    const location = useLocation();

    const { m, playerGoFirst, totalMatches } = location.state;
    const startedMatches = 2 * totalMatches + 1;

    const [matches, setMatches] = useState(startedMatches);
    const [playerTurn, setPlayerTurn] = useState(playerGoFirst);
    const [playerMatches, setPlayerMatches] = useState(0);
    const [computerMatches, setComputerMatches] = useState(0);
    const [win, setWin] = useState(null);

    const resetGame = () => {
        setMatches(startedMatches);
        setPlayerTurn(playerGoFirst);
        setPlayerMatches(0);
        setComputerMatches(0);
        setWin(null);
    };

    const takeMatches = useCallback(
        (amount) => {
            if (matches <= 0 || amount > matches) return;

            const matchesLeft = matches - amount;
            setMatches(matchesLeft);

            if (playerTurn) {
                setPlayerMatches((prev) => prev + amount);
                openNotification(`You took ${amount} match${amount > 1 ? 'es' : ''}!`, <SmileOutlined style={{ color: '#108ee9' }} />);
            } else {
                setComputerMatches((prev) => prev + amount);
                openNotification(`Computer took ${amount} match${amount > 1 ? 'es' : ''}!`, <MehOutlined style={{ color: '#f5222d' }} />);
            }

            setPlayerTurn(!playerTurn);
        },
        [matches, playerTurn]
    );

    const handleWin = useCallback(() => {
        if (matches === 0) {
            const playerWins = playerMatches % 2 === 0;
            setWin(playerWins);
            openNotification(playerWins ? "You Win!" : "Computer Wins!", playerWins ? <SmileOutlined /> : <MehOutlined />);
        }
    }, [matches, playerMatches]);

    useEffect(() => {
        if (matches === 0) {
            handleWin();
            return;
        }

        if (!playerTurn) {
            const timer = setTimeout(() => {
                takeMatches(makeComputerMove(matches, m, computerMatches));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [matches, playerTurn, takeMatches, m, computerMatches, handleWin]);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <Title level={2}><FireOutlined /> Match Game</Title>
            <Card bordered={false} style={{ backgroundColor: '#f0f2f5' }}>
                <Text type="secondary">Total Matches Left: {matches}</Text>
                <Progress percent={(matches / startedMatches) * 100} showInfo={false} strokeColor="#52c41a" />
            </Card>

            <Divider />

            <Row justify="center" gutter={[16, 16]}>
                {[...Array(matches)].map((_, index) => (
                    <Col key={index}>
                        <FireOutlined style={{ fontSize: '24px', color: '#fa541c' }} />
                    </Col>
                ))}
            </Row>

            {win !== null && (
                <Title level={3} style={{ color: win ? '#52c41a' : '#f5222d' }}>
                    {win ? "You Win!" : "Computer Wins!"}
                </Title>
            )}

            <Divider />

            {playerTurn ? (
                <>
                    <Title level={4}>Your Turn</Title>
                    {[...Array(Math.min(m, matches))].map((_, index) => (
                        <Button
                            key={index}
                            type="primary"
                            onClick={() => takeMatches(index + 1)}
                            style={{ margin: "5px" }}
                        >
                            Take {index + 1} Match{index + 1 > 1 ? "es" : ""}
                        </Button>
                    ))}
                </>
            ) : (
                <Title level={4}>Computer's Turn...</Title>
            )}

            <Divider />

            <Row justify="center">
                <Col>
                    <Card title="Player Matches" bordered={false}>
                        <Text>{playerMatches}</Text>
                    </Card>
                </Col>
                <Col>
                    <Card title="Computer Matches" bordered={false}>
                        <Text>{computerMatches}</Text>
                    </Card>
                </Col>
            </Row>

            <Button
                type="dashed"
                icon={<ReloadOutlined />}
                onClick={resetGame}
                style={{ marginTop: '20px' }}
            >
                Reset Game
            </Button>
        </div>
    );
};

export default GamePage;