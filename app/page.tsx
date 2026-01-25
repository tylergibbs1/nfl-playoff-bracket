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
    <div className="bg-card border border-border p-4 mb-3 hover:border-accent-orange transition-colors duration-200">
      <div className="spec-tag mb-3">{round}</div>
      
      <div className={`flex justify-between items-center mb-2 transition-colors ${
        isWinner1 ? 'text-accent-orange' : 'text-foreground'
      }`}>
        <span className="font-medium">{game.team1}</span>
        <span className="font-mono text-2xl font-bold">{game.score1}</span>
      </div>
      
      <div className="w-full h-px bg-border my-2" />
      
      <div className={`flex justify-between items-center transition-colors ${
        isWinner2 ? 'text-accent-orange' : 'text-foreground'
      }`}>
        <span className="font-medium">{game.team2}</span>
        <span className="font-mono text-2xl font-bold">{game.score2}</span>
      </div>
      
      {game.overtime && (
        <div className="mt-3 pt-2 border-t border-border">
          <span className="spec-tag text-accent-orange">OVERTIME</span>
        </div>
      )}
    </div>
  );
}

function ChampionshipCard({ team1, team2, time, conference }: { team1: string; team2: string; time: string; conference: string }) {
  return (
    <div className="bg-card border-2 border-accent-orange p-6">
      <div className="text-center mb-6">
        <div className="spec-tag text-accent-orange mb-2">{conference} CHAMPIONSHIP</div>
        <div className="font-mono text-xs uppercase tracking-spec-wide text-muted-foreground">{time}</div>
        <div className="spec-rule-accent mx-auto mt-4" />
      </div>
      
      <div className="space-y-4">
        <div className="bg-muted border border-border p-4 text-center hover:border-accent-orange transition-colors">
          <div className="text-lg font-semibold uppercase tracking-spec-normal text-foreground">{team1}</div>
        </div>
        
        <div className="text-center">
          <span className="font-mono text-2xl font-bold text-muted-foreground">VS</span>
        </div>
        
        <div className="bg-muted border border-border p-4 text-center hover:border-accent-orange transition-colors">
          <div className="text-lg font-semibold uppercase tracking-spec-normal text-foreground">{team2}</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedConference, setSelectedConference] = useState<'AFC' | 'NFC' | 'both'>('both');

  return (
    <main className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <span className="spec-tag block mb-4">NFL PLAYOFF TRACKER</span>
          
          <h1 className="text-4xl md:text-6xl font-semibold uppercase tracking-spec-wide text-foreground mb-4">
            2025-26 SEASON
          </h1>
          
          <div className="spec-rule-accent mx-auto mb-6" />
          
          <div className="font-mono text-xs uppercase tracking-spec-wide text-muted-foreground">
            Conference Championships — January 25, 2026
          </div>
          <div className="font-mono text-xs uppercase tracking-spec-wide text-muted-foreground mt-1">
            Super Bowl LX • Feb 8 • Levi's Stadium
          </div>
        </header>

        {/* Conference Toggle */}
        <div className="flex justify-center gap-0 mb-12 border border-border w-fit mx-auto">
          <button
            onClick={() => setSelectedConference('both')}
            className={`px-8 py-3 font-mono text-xs uppercase tracking-spec-wide font-medium transition-all ${
              selectedConference === 'both'
                ? 'bg-accent-orange text-white'
                : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Both
          </button>
          <div className="w-px bg-border" />
          <button
            onClick={() => setSelectedConference('AFC')}
            className={`px-8 py-3 font-mono text-xs uppercase tracking-spec-wide font-medium transition-all ${
              selectedConference === 'AFC'
                ? 'bg-accent-orange text-white'
                : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            AFC
          </button>
          <div className="w-px bg-border" />
          <button
            onClick={() => setSelectedConference('NFC')}
            className={`px-8 py-3 font-mono text-xs uppercase tracking-spec-wide font-medium transition-all ${
              selectedConference === 'NFC'
                ? 'bg-accent-orange text-white'
                : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            NFC
          </button>
        </div>

        {/* Bracket Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AFC */}
          {(selectedConference === 'AFC' || selectedConference === 'both') && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-semibold uppercase tracking-spec-normal text-foreground mb-2">
                  AFC
                </h2>
                <div className="spec-rule mb-6" />
              </div>
              
              <div className="mb-8">
                <h3 className="font-mono text-sm uppercase tracking-spec-wide text-muted-foreground mb-4">
                  Wild Card Round
                </h3>
                {bracketData.afc.wildcard.map((game, idx) => (
                  <GameCard key={idx} game={game} round={`WILD CARD ${idx + 1}`} />
                ))}
              </div>

              <div className="mb-8">
                <h3 className="font-mono text-sm uppercase tracking-spec-wide text-muted-foreground mb-4">
                  Divisional Round
                </h3>
                {bracketData.afc.divisional.map((game, idx) => (
                  <GameCard key={idx} game={game} round={`DIVISIONAL ${idx + 1}`} />
                ))}
              </div>

              <div>
                <h3 className="font-mono text-sm uppercase tracking-spec-wide text-muted-foreground mb-4">
                  Conference Championship
                </h3>
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
              <div className="mb-8">
                <h2 className="text-3xl font-semibold uppercase tracking-spec-normal text-foreground mb-2">
                  NFC
                </h2>
                <div className="spec-rule mb-6" />
              </div>
              
              <div className="mb-8">
                <h3 className="font-mono text-sm uppercase tracking-spec-wide text-muted-foreground mb-4">
                  Wild Card Round
                </h3>
                {bracketData.nfc.wildcard.map((game, idx) => (
                  <GameCard key={idx} game={game} round={`WILD CARD ${idx + 1}`} />
                ))}
              </div>

              <div className="mb-8">
                <h3 className="font-mono text-sm uppercase tracking-spec-wide text-muted-foreground mb-4">
                  Divisional Round
                </h3>
                {bracketData.nfc.divisional.map((game, idx) => (
                  <GameCard key={idx} game={game} round={`DIVISIONAL ${idx + 1}`} />
                ))}
              </div>

              <div>
                <h3 className="font-mono text-sm uppercase tracking-spec-wide text-muted-foreground mb-4">
                  Conference Championship
                </h3>
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

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="text-center">
            <div className="font-mono text-xs uppercase tracking-spec-wide text-muted-foreground">
              Built with Next.js & Tailwind CSS
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
