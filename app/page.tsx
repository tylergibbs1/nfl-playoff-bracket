'use client';

import { useState } from 'react';

interface Game {
  team1: string;
  team2: string;
  score1?: number;
  score2?: number;
  winner?: string;
  overtime?: boolean;
}

const bracketData = {
  afc: {
    wildcard: [
      { team1: "Patriots (2)", team2: "Chargers (7)", score1: 16, score2: 3, winner: "Patriots" },
      { team1: "Bills (6)", team2: "Jaguars (3)", score1: 27, score2: 24, winner: "Bills" },
      { team1: "Texans (5)", team2: "Steelers (4)", score1: 30, score2: 6, winner: "Texans" },
    ],
    divisional: [
      { team1: "Broncos (1)", team2: "Bills (6)", score1: 33, score2: 30, winner: "Broncos", overtime: true },
      { team1: "Patriots (2)", team2: "Texans (5)", score1: 28, score2: 16, winner: "Patriots" },
    ],
    championship: {
      team1: "Broncos (1)",
      team2: "Patriots (2)",
      time: "3:00 PM ET, CBS"
    }
  },
  nfc: {
    wildcard: [
      { team1: "Bears (2)", team2: "Packers (7)", score1: 31, score2: 27, winner: "Bears" },
      { team1: "49ers (6)", team2: "Eagles (3)", score1: 23, score2: 19, winner: "49ers" },
      { team1: "Rams (5)", team2: "Panthers (4)", score1: 34, score2: 31, winner: "Rams" },
    ],
    divisional: [
      { team1: "Seahawks (1)", team2: "49ers (6)", score1: 41, score2: 6, winner: "Seahawks" },
      { team1: "Rams (5)", team2: "Bears (2)", score1: 20, score2: 17, winner: "Rams", overtime: true },
    ],
    championship: {
      team1: "Seahawks (1)",
      team2: "Rams (5)",
      time: "6:30 PM ET, Fox"
    }
  }
};

function GameCard({ game, round }: { game: Game; round: string }) {
  const isWinner1 = game.winner?.includes(game.team1.split('(')[0].trim());
  const isWinner2 = game.winner?.includes(game.team2.split('(')[0].trim());
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-3 border border-gray-700 hover:border-gray-600 transition-all">
      <div className="text-xs text-gray-400 mb-2 font-semibold uppercase">{round}</div>
      <div className={`flex justify-between items-center mb-2 ${isWinner1 ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
        <span>{game.team1}</span>
        <span className="text-lg">{game.score1}</span>
      </div>
      <div className={`flex justify-between items-center ${isWinner2 ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
        <span>{game.team2}</span>
        <span className="text-lg">{game.score2}</span>
      </div>
      {game.overtime && (
        <div className="text-xs text-yellow-400 mt-2 font-semibold">OVERTIME</div>
      )}
    </div>
  );
}

function ChampionshipCard({ team1, team2, time, conference }: { team1: string; team2: string; time: string; conference: string }) {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-6 border-2 border-blue-500 shadow-lg">
      <div className="text-center mb-4">
        <div className="text-sm text-blue-300 font-semibold uppercase tracking-wide">{conference} Championship</div>
        <div className="text-xs text-gray-300 mt-1">Today - {time}</div>
      </div>
      <div className="space-y-3">
        <div className="bg-gray-800/50 rounded p-3 text-center">
          <div className="text-lg font-bold text-white">{team1}</div>
        </div>
        <div className="text-center text-2xl text-gray-400">VS</div>
        <div className="bg-gray-800/50 rounded p-3 text-center">
          <div className="text-lg font-bold text-white">{team2}</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedConference, setSelectedConference] = useState<'AFC' | 'NFC' | 'both'>('both');

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            NFL Playoff Bracket 2025-26
          </h1>
          <p className="text-gray-400">Conference Championships - January 25, 2026</p>
          <p className="text-sm text-gray-500 mt-1">Super Bowl LX • Feb 8 • Levi's Stadium</p>
        </header>

        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedConference('both')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              selectedConference === 'both'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Both
          </button>
          <button
            onClick={() => setSelectedConference('AFC')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              selectedConference === 'AFC'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            AFC
          </button>
          <button
            onClick={() => setSelectedConference('NFC')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              selectedConference === 'NFC'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            NFC
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AFC */}
          {(selectedConference === 'AFC' || selectedConference === 'both') && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-red-500">AFC</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-300">Wild Card Round</h3>
                {bracketData.afc.wildcard.map((game, idx) => (
                  <GameCard key={idx} game={game} round={`Wild Card ${idx + 1}`} />
                ))}
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-300">Divisional Round</h3>
                {bracketData.afc.divisional.map((game, idx) => (
                  <GameCard key={idx} game={game} round={`Divisional ${idx + 1}`} />
                ))}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-300">Conference Championship</h3>
                <ChampionshipCard 
                  team1={bracketData.afc.championship.team1}
                  team2={bracketData.afc.championship.team2}
                  time={bracketData.afc.championship.time}
                  conference="AFC"
                />
              </div>
            </div>
          )}

          {/* NFC */}
          {(selectedConference === 'NFC' || selectedConference === 'both') && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-500">NFC</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-300">Wild Card Round</h3>
                {bracketData.nfc.wildcard.map((game, idx) => (
                  <GameCard key={idx} game={game} round={`Wild Card ${idx + 1}`} />
                ))}
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-300">Divisional Round</h3>
                {bracketData.nfc.divisional.map((game, idx) => (
                  <GameCard key={idx} game={game} round={`Divisional ${idx + 1}`} />
                ))}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-300">Conference Championship</h3>
                <ChampionshipCard 
                  team1={bracketData.nfc.championship.team1}
                  team2={bracketData.nfc.championship.team2}
                  time={bracketData.nfc.championship.time}
                  conference="NFC"
                />
              </div>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Built with Next.js & Tailwind CSS</p>
        </footer>
      </div>
    </main>
  );
}
