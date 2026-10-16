import { useRef } from "react";
import { Mesh, type Group } from "three";
import { PresentationControls } from "@react-three/drei";
import gsap from "gsap";

import MacbookModel16 from "../models/Macbook-16.jsx";
import MacbookModel14 from "../models/Macbook-14.jsx";
import { useGSAP } from "@gsap/react";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

interface ModelSwitcherProps {
    scale: number;
    isMobile: boolean;
}

interface ControlsConfig {
    snap: boolean;
    speed: number;
    zoom: number;
    azimuth: [number, number];
    config: {
        mass: number;
        tension: number;
        friction: number;
    };
}

const fadeMeshes = (group: Group | null, opacity: number): void => {
    if (!group) return;

    group.traverse((child) => {
        if (child instanceof Mesh) {
            const material = child.material;

            if (Array.isArray(material)) {
                return;
            }

            material.transparent = true;
            gsap.to(material, { opacity, duration: ANIMATION_DURATION });
        }
    });
};

const moveGroup = (group: Group | null, x: number): void => {
    if (!group) return;

    gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};

export default function ModelSwitcher({ scale, isMobile }: ModelSwitcherProps) {
    const SCALE_LARGE_DESKTOP = 0.08;
    const SCALE_LARGE_MOBILE = 0.05;

    const smallMackbookRef = useRef<Group | null>(null);
    const largeMackbookRef = useRef<Group | null>(null);

    const showLargeMacbook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

    useGSAP(() => {
        if(showLargeMacbook) {
            moveGroup(smallMackbookRef.current, -OFFSET_DISTANCE);
            moveGroup(largeMackbookRef.current, 0);

            fadeMeshes(smallMackbookRef.current, 0);
            fadeMeshes(largeMackbookRef.current, 1);
        } else {
            moveGroup(smallMackbookRef.current, 0);
            moveGroup(largeMackbookRef.current, OFFSET_DISTANCE);

            fadeMeshes(smallMackbookRef.current, 1);
            fadeMeshes(largeMackbookRef.current, 0);
        }
    }, [scale]);

    const controlsConfig: ControlsConfig = {
        snap: true,
        speed: 1,
        zoom: 1,
        azimuth: [-Infinity, Infinity],
        config: { mass: 1, tension: 0, friction: 26 },
    };

    return (
        <>
            <PresentationControls {...controlsConfig}>
                <group ref={largeMackbookRef} >
                    <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
                </group>
            </PresentationControls>

            <PresentationControls {...controlsConfig}>
                <group ref={smallMackbookRef} >
                    <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
                </group>
            </PresentationControls>
        </>
  );
}