import "./style.scss";
import Disk from "./disk";
import { gsap } from "gsap";

const amount = 20;
const baseRadius = 30;
const step = 100; //
const isAnimated = true;
const disks = new DocumentFragment();

let animatedIndex = 0; // counts how many animated disks we’ve done

// Creates the full set of disks based on the "amount" variable.
for (let index = 0; index < amount; index++) {
    const radius = baseRadius + step * index;

    // Create the disk.
    const diskInstance = new Disk({ radius, index });
    const disk = diskInstance.createDisk();

    // Attach GSAP animation to it.
    // Only uneven-indexed disks are animated, alternating between clockwise and counterclockwise rotation.
    if (index % 2 !== 0 && isAnimated) {
        const angle = animatedIndex % 4 === 0 ? 45 : -45;
        diskInstance.animateDisk(disk, angle);
        animatedIndex++;
    }

    // Apply z-index + add it to the disk collection.
    disk.style.zIndex = amount - index;
    disks.append(disk);
}

// Get the disk container and inject all disks into it.
const wrapper = document.querySelector("#wrapper");
wrapper.append(disks);
