import { gsap } from "gsap";

export default class Disk {
    constructor(config = {}) {
        this.index = config.index || 0;
        this.radius = config.radius;
    }

    // Hard-coded stroke count per disk. Could probably be more dynamic than that,
    // but it’s hurting my head and too many disks will cause animation performance issues anyway.
    #getStrokeAmount(index) {
        if (index < 1) return 4;
        if (index < 2) return 8;
        if (index < 3) return 16;
        if (index < 6) return 32;
        if (index < 10) return 64;
        if (index < 18) return 128;
        return 256;
    }

    #createStrokes(amount) {
        let strokes = [];

        for (let index = 0; index < amount; index++) {
            const deg = 360 / amount;
            console.log(deg);
            const stroke = document.createElement("span");
            stroke.classList.add("stroke");
            stroke.style.transform = `translateY(-50%) rotate(${deg * index}deg)`;
            strokes.push(stroke);
        }
        return strokes;
    }

    createDisk() {
        const disk = document.createElement("div");
        disk.classList.add("disk");
        disk.style.width = this.radius + "px";
        disk.style.height = this.radius + "px";
        const strokeAmount = this.#getStrokeAmount(this.index);
        disk.append(...this.#createStrokes(strokeAmount));
        return disk;
    }

    animateDisk(diskEl, angle) {
        gsap.timeline({ delay: 2, repeat: -1, repeatDelay: 2 }).to(diskEl, {
            rotate: `+=${angle}`,
            duration: 2,
            ease: "power2.inOut",
            transformOrigin: "50% 50%",
        });
    }
}
