import React from "react";
import { Card, Typography, Space } from "antd";

const { Title, Paragraph } = Typography;

const GameRules = () => {
    return (
        <div style={{ padding: "50px" }}>
            <Card style={{ borderRadius: "8px", backgroundColor: "#fff" }}>
                <Title level={2}>Game Rules</Title>
                <Paragraph>
                    Two players take turns removing matches from a pile. The game begins with a total of <strong>25 matches</strong>.
                    On their turn, a player can take <strong>1, 2, or 3 matches</strong>. The goal is to ensure that you are the one who has the even number of matches.
                </Paragraph>
                <Paragraph>
                    In the second mode, the game begins with the computer making the first move.
                    Players can customize the parameters of the game, including the total number of matches, how many matches they could take and which game mode (who goes first).
                </Paragraph>
                <Space direction="vertical" style={{ marginTop: "20px" }}>
                    <Title level={4}>How to Play:</Title>
                    <Paragraph>
                        1. Choose your game mode (Player first OR Computer First).
                    </Paragraph>
                    <Paragraph>
                        2. Set the number of matches and matches allowed to take per turn.
                    </Paragraph>
                    <Paragraph>
                        3. Start the game and take turns!
                    </Paragraph>
                </Space>
            </Card>
        </div>
    );
};

export default GameRules;