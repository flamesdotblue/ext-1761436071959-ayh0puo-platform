import React, { useEffect, useRef } from 'react';

export default function GameCanvas() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Spielfeld-Konfiguration
    const rows = 12;
    const cols = 6;
    const cellSize = 60; // 6 * 60 = 360, 12 * 60 = 720

    const player = { x: 2, y: 6, color: 'blue', trail: [] };
    const enemy = { x: 3, y: 6, color: 'red', trail: [] };

    const playerGoal = [{ x: 2, y: -1 }, { x: 3, y: -1 }];
    const enemyGoal = [{ x: 2, y: 12 }, { x: 3, y: 12 }];

    let playerTurn = true; // true = Spieler, false = Gegner

    function drawGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx.strokeStyle = '#bdbdbd';
          ctx.lineWidth = 1;
          ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
      }
    }

    function drawUnit(unit) {
      ctx.fillStyle = unit.color;
      ctx.fillRect(unit.x * cellSize + 5, unit.y * cellSize + 5, cellSize - 10, cellSize - 10);
      ctx.fillStyle = unit.color + '99';
      unit.trail.forEach((pos) => {
        ctx.fillRect(pos.x * cellSize + 5, pos.y * cellSize + 5, cellSize - 10, cellSize - 10);
      });
    }

    function drawGoals() {
      ctx.fillStyle = 'lightblue';
      playerGoal.forEach((pos) => {
        // Sichtbarer Bereich beschränken, falls das Tor außerhalb liegt
        const vy = Math.max(pos.y, 0);
        if (vy >= 0 && vy < rows) {
          ctx.fillRect(pos.x * cellSize + 5, vy * cellSize + 5, cellSize - 10, cellSize - 10);
        }
      });

      ctx.fillStyle = 'pink';
      enemyGoal.forEach((pos) => {
        const vy = Math.min(pos.y, rows - 1);
        if (vy >= 0 && vy < rows) {
          ctx.fillRect(pos.x * cellSize + 5, vy * cellSize + 5, cellSize - 10, cellSize - 10);
        }
      });
    }

    function draw() {
      drawGrid();
      drawGoals();
      drawUnit(player);
      drawUnit(enemy);
    }

    function isBlocked(x, y) {
      if (x < 0 || x >= cols || y < 0 || y >= rows) return true;
      if (player.trail.some((pos) => pos.x === x && pos.y === y)) return true;
      if (enemy.trail.some((pos) => pos.x === x && pos.y === y)) return true;
      return false;
    }

    function resetGame() {
      player.x = 2;
      player.y = 6;
      player.trail = [];
      enemy.x = 3;
      enemy.y = 6;
      enemy.trail = [];
      playerTurn = window.confirm('Wer beginnt? OK = Spieler, Abbrechen = Gegner');
      draw();
    }

    function move(unit, dx, dy) {
      if (!playerTurn && unit === player) return;
      if (playerTurn && unit === enemy) return;

      const newX = unit.x + dx;
      const newY = unit.y + dy;

      if (isBlocked(newX, newY)) {
        const winner = unit === player ? 'Gegner' : 'Spieler';
        setTimeout(() => {
          window.alert(winner + ' gewinnt!');
          resetGame();
        }, 50);
        return;
      }

      unit.trail.push({ x: unit.x, y: unit.y });
      unit.x = newX;
      unit.y = newY;

      // Tor-Prüfung
      if (unit === player && enemyGoal.some((pos) => pos.x === unit.x && pos.y === unit.y)) {
        setTimeout(() => {
          window.alert('Spieler gewinnt!');
          resetGame();
        }, 50);
      }
      if (unit === enemy && playerGoal.some((pos) => pos.x === unit.x && pos.y === unit.y)) {
        setTimeout(() => {
          window.alert('Gegner gewinnt!');
          resetGame();
        }, 50);
      }

      draw();
      playerTurn = !playerTurn;
    }

    const keyMap = {
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      q: [-1, -1],
      e: [1, -1],
      z: [-1, 1],
      c: [1, 1],
    };

    function handleKeyDown(e) {
      if (!playerTurn) return;
      const dir = keyMap[e.key];
      if (dir) {
        move(player, dir[0], dir[1]);
      }
    }

    function aiMove() {
      // Simple AI: try to move towards player's goal (y decreasing)
      if (playerTurn) return;
      const directions = [
        [0, -1],
        [1, -1],
        [-1, -1],
        [1, 0],
        [-1, 0],
        [0, 1],
        [1, 1],
        [-1, 1],
      ];
      for (let i = 0; i < directions.length; i++) {
        const [dx, dy] = directions[i];
        const nx = enemy.x + dx;
        const ny = enemy.y + dy;
        if (!isBlocked(nx, ny)) {
          move(enemy, dx, dy);
          break;
        }
      }
    }

    // Store state for potential future extensions
    stateRef.current = { move, draw, resetGame, aiMove };

    draw();

    window.addEventListener('keydown', handleKeyDown);

    // Gegner macht automatisch seinen Zug, wenn er dran ist
    const interval = setInterval(() => {
      if (!playerTurn) {
        aiMove();
      }
    }, 350);

    // Startzustand wählen
    setTimeout(() => resetGame(), 0);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="game" className="w-full">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h3 className="text-xl font-semibold">Spielfeld</h3>
          <p className="text-sm text-neutral-400">Erreiche das gegnerische Tor, ohne dich zu blockieren.</p>
        </div>
        <button
          onClick={() => stateRef.current && stateRef.current.resetGame()}
          className="px-3 py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-neutral-200 transition"
        >
          Neu starten
        </button>
      </div>
      <div className="w-full flex justify-center">
        <canvas
          ref={canvasRef}
          width={360}
          height={720}
          className="bg-neutral-100 rounded-xl border border-white/10 shadow-2xl"
        />
      </div>
    </div>
  );
}
