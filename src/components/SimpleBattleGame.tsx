import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Swords, RotateCcw, Heart } from "lucide-react";

const MAX_HP = 100;
const MIN_DAMAGE = 8;
const MAX_DAMAGE = 18;
const ENEMY_DAMAGE_MIN = 5;
const ENEMY_DAMAGE_MAX = 14;

type GameState = "playing" | "won" | "lost";

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const SimpleBattleGame = () => {
  const [playerHp, setPlayerHp] = useState(MAX_HP);
  const [enemyHp, setEnemyHp] = useState(MAX_HP);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [lastDamage, setLastDamage] = useState<{ player?: number; enemy?: number }>({});
  const [message, setMessage] = useState<string | null>(null);

  const reset = useCallback(() => {
    setPlayerHp(MAX_HP);
    setEnemyHp(MAX_HP);
    setGameState("playing");
    setLastDamage({});
    setMessage(null);
  }, []);

  const attack = useCallback(() => {
    if (gameState !== "playing") return;

    const damageToEnemy = randomBetween(MIN_DAMAGE, MAX_DAMAGE);
    const newEnemyHp = Math.max(0, enemyHp - damageToEnemy);
    setEnemyHp(newEnemyHp);
    setLastDamage((prev) => ({ ...prev, enemy: damageToEnemy }));

    if (newEnemyHp <= 0) {
      setGameState("won");
      setMessage("You win!");
      return;
    }

    // Enemy counter-attack
    const damageToPlayer = randomBetween(ENEMY_DAMAGE_MIN, ENEMY_DAMAGE_MAX);
    const newPlayerHp = Math.max(0, playerHp - damageToPlayer);
    setPlayerHp(newPlayerHp);
    setLastDamage((prev) => ({ ...prev, player: damageToPlayer }));
    setTimeout(() => setLastDamage({}), 800);

    if (newPlayerHp <= 0) {
      setGameState("lost");
      setMessage("You were defeated. Try again!");
    }
  }, [gameState, playerHp, enemyHp]);

  return (
    <Card className="p-6 md:p-8 bg-card/80 border-primary/20 max-w-xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-1">
          Quick Battle
        </h2>
        <p className="text-sm text-muted-foreground">
          Click Attack to deal damage. Reduce the enemy to 0 HP to win.
        </p>
      </div>

      {/* Enemy */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-[100px]">
          <Heart className="w-5 h-5 text-destructive shrink-0" aria-hidden />
          <span className="text-sm font-medium text-foreground">Enemy</span>
        </div>
        <div className="flex-1 relative">
          <Progress value={(enemyHp / MAX_HP) * 100} className="h-4 bg-muted [&>div]:bg-destructive/80" />
          <AnimatePresence>
            {lastDamage.enemy != null && (
              <motion.span
                key={lastDamage.enemy}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -20 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-destructive font-bold text-sm"
              >
                -{lastDamage.enemy}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <span className="text-sm font-mono text-muted-foreground w-10 text-right">
          {enemyHp}
        </span>
      </div>

      {/* Player */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-2 min-w-[100px]">
          <Heart className="w-5 h-5 text-primary shrink-0" aria-hidden />
          <span className="text-sm font-medium text-foreground">You</span>
        </div>
        <div className="flex-1 relative">
          <Progress value={(playerHp / MAX_HP) * 100} className="h-4 bg-muted [&>div]:bg-primary" />
          <AnimatePresence>
            {lastDamage.player != null && (
              <motion.span
                key={lastDamage.player}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -20 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-destructive font-bold text-sm"
              >
                -{lastDamage.player}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <span className="text-sm font-mono text-muted-foreground w-10 text-right">
          {playerHp}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <AnimatePresence mode="wait">
          {gameState === "playing" ? (
            <motion.div
              key="attack"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <Button
                size="lg"
                onClick={attack}
                className="glow-cta bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 min-w-[160px]"
              >
                <Swords className="w-5 h-5" />
                Attack
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 w-full"
            >
              <p
                className={`text-lg font-heading font-semibold ${
                  gameState === "won" ? "text-primary" : "text-destructive"
                }`}
              >
                {message}
              </p>
              <Button
                size="lg"
                variant="outline"
                onClick={reset}
                className="gap-2 border-primary/30 hover:bg-primary/10"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default SimpleBattleGame;
