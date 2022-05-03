// Game specific object system.

import * as PIXI from "pixi.js";
import { GameInstance } from "../game";
import { AbstractScene } from "../game/scenes/Scene";
import { CycloidParticleObject } from "./CycloidParticleObject";
import { LinearParticleObject } from "./LinearParticleObject";

const PARTICLE_SIZE_VARIANCE = 20;
const MIN_PARTICLE_SIZE = 10;
const VELOCITY_X_VARIANCE = 200;
const MIN_VELOCITY_X = -100;
const VELOCITY_Y_VARIANCE = 20;
const MIN_VELOCITY_Y = 10;

export class MixedParticleShowerSystem {
    particles: CycloidParticleObject[];
    elapsedRef: number;
    lastFeedingTime: number;
    scene: AbstractScene
    constructor(scene: AbstractScene, elapsed: number) {
        this.scene = scene;
        this.particles = [];
        this.elapsedRef = elapsed;
        this.lastFeedingTime = 0;
        this.feed();
    }
    feed() {
        const newParticles = [];
        for(let i = 0; i < 5; i++) {
            const size = Math.random() * PARTICLE_SIZE_VARIANCE + MIN_PARTICLE_SIZE;
            const flip = Math.random() > 0.5 ? 1 : -1;
            const confettiType = Math.floor(Math.random() * 3) + 1;
            const particle = new CycloidParticleObject(
                this.elapsedRef,
                `particle-${i}`,
                Math.random() * 800,
                -200,
                size,
                size,
                Math.random() * VELOCITY_X_VARIANCE + MIN_VELOCITY_X,
                Math.random() * VELOCITY_Y_VARIANCE + MIN_VELOCITY_Y,
                flip,
                GameInstance().resources[`confetti-${confettiType}`].texture
            );
            newParticles.push(particle);
        }
        for(let i = 0; i < 5; i++) {
            const size = Math.random() * PARTICLE_SIZE_VARIANCE + MIN_PARTICLE_SIZE;
            const flip = Math.random() > 0.5 ? 1 : -1;
            const confettiType = Math.floor(Math.random() * 3) + 1;
            const vy = MIN_VELOCITY_Y + Math.random() * VELOCITY_Y_VARIANCE;
            const vx = Math.random () * 2 * vy - vy;
            const particle = new LinearParticleObject(
                this.elapsedRef,
                `particle-${i}`,
                Math.random() * 800,
                -200,
                size,
                size,
                vx,
                vy,
                flip,
                GameInstance().resources[`confetti-${confettiType}`].texture
            );
            newParticles.push(particle);
        }
        this.particles.push(...newParticles);
        newParticles.forEach((particle: CycloidParticleObject) => {
            this.scene.add(particle);
        });
    }
    update(delta: number, elapsed: number) {
        console.log(`${elapsed}, ${this.lastFeedingTime}`);
        if (elapsed - this.lastFeedingTime > 100) {
            this.feed();
            this.lastFeedingTime = elapsed;
        }
        this.particles.forEach((particle: CycloidParticleObject) => {
            particle.update(delta, elapsed);
        });
    }
}