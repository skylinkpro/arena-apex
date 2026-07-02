import { useRef, useEffect, useCallback } from "react";

const useSoundEffects = () => {
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        // Initialize AudioContext on first user interaction or mount if allowed
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
            audioContextRef.current = new AudioContextClass();
        }

        return () => {
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close().catch(console.error);
            }
        }
    }, []);

    const playOscillator = useCallback((freq: number, type: OscillatorType, duration: number, gainValue: number = 0.1) => {
        if (!audioContextRef.current) return;

        // Resume context if suspended (browser autoplay policy)
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }

        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gainNode.gain.setValueAtTime(gainValue, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    }, []);

    const playHover = useCallback(() => {
        // High pitched, short bleep
        playOscillator(800, 'sine', 0.05, 0.05);
    }, [playOscillator]);

    const playClick = useCallback(() => {
        // Mechanical click sound
        // Two oscillators for a complex tone
        playOscillator(400, 'square', 0.1, 0.05);
        setTimeout(() => playOscillator(600, 'sawtooth', 0.05, 0.03), 10);
    }, [playOscillator]);

    const playSuccess = useCallback(() => {
        // Ascending arpeggio
        const now = audioContextRef.current?.currentTime || 0;
        setTimeout(() => playOscillator(440, 'sine', 0.2, 0.1), 0);
        setTimeout(() => playOscillator(554.37, 'sine', 0.2, 0.1), 100);
        setTimeout(() => playOscillator(659.25, 'sine', 0.4, 0.1), 200);
    }, [playOscillator]);

    return { playHover, playClick, playSuccess };
};

export default useSoundEffects;
