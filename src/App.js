import { HashRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { Layout } from "antd";

import GameRules from "./components/GameRules";
import GameSettings from "./components/GameSettings";
import GamePage from "./components/GamePage";
import Navigation from "./components/Navigation";

import './css/index.css'

const { Header, Content } = Layout;

function App() {
    const [n, setN] = useState(12);
    const [m, setM] = useState(3);
    const [playerGoFirst, setPlayerGoFirst] = useState(true);

    return (
        <HashRouter>
            <Layout className="emoji-background" style={{ minHeight: "100vh" }}>
                <Header style={{ backgroundColor: "#001529" }}>
                    <div style={{ color: "#fff", fontSize: "24px", fontWeight: "bold", display: "inline-block" }}>
                        Match Game
                    </div>
                    <Navigation />
                </Header>
                <Content style={{ padding: "50px" }}>
                    <Routes>
                        <Route path="/" element={<GameRules />} />
                        <Route path="/game" element={<GamePage />} />
                        <Route
                            path="/game-settings"
                            element={
                                <GameSettings
                                    n={n}
                                    m={m}
                                    setN={setN}
                                    setM={setM}
                                    playerGoFirst={playerGoFirst}
                                    setPlayerGoFirst={setPlayerGoFirst}
                                />
                            }
                        />
                    </Routes>
                </Content>
            </Layout>
        </HashRouter>
    );
}

export default App;