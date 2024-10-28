import dynamic from 'next/dynamic';
import React from 'react';

const PhaserGame = dynamic(() => import("@/components/game/PhaserGame"), { ssr: false });

const Game: React.FC = () => {
    return (
        <div>
            <h1>Phaser Game</h1>
            <PhaserGame />
        </div>
    )
}

export default Game;