// components/PhaserGame.tsx
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import MyPhaserScene from "@/components/game/PhaserScene";

const PhaserGame: React.FC = () => {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        scene: MyPhaserScene,
        parent: 'phaser-container',
        physics: {
          default: 'arcade', // Enable arcade physics
          arcade: {
            gravity: {x: 0, y: 0 }, // Optional: Set gravity (adjust as needed)
            debug: false, // Optional: Enable debug mode for physics
          },
        },
      });
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div id="phaser-container"/>;
};

export default PhaserGame;
