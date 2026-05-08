import React from 'react';
import { MdNorth } from 'react-icons/md';
import styled from 'styled-components';
import type {SimpleCompassProps} from "../types/simpleCompassProps.ts";
import radiansToDegrees from "../functions/radiansToDegrees.ts";

const StyledContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;
`;

type StyledWrapperProps = {
    $angle: number;
};

const size = 300;

const StyledWrapper = styled.div<StyledWrapperProps>`
    border-radius: ${size / 2}px;
    width: ${size}px;
    height: ${size}px;
    color: snow;
    background: grey;
    transform: rotate(${(p) => (p.$angle)}deg);
`;

function SimpleCompass({ mapHeading, setMapHeading }: SimpleCompassProps) {
    const refWrapper = React.useRef<HTMLDivElement>(null);
    const [needleAngle, setNeedleAngle] = React.useState<number>(mapHeading);

    // React to local state needleAngle by reflecting it to caller's state
    React.useEffect(() => {
        setNeedleAngle(mapHeading);
    }, [mapHeading, setMapHeading]);

    const rotate = (evt: React.MouseEvent<SVGElement>) => {
        if (refWrapper?.current) {
            const {left, top} = refWrapper.current.getBoundingClientRect();
            const {clientX, clientY} = evt;

            const xOffset = clientX - left;
            const yOffset = clientY - top;

            const xRadial = (xOffset - size / 2);
            const yRadial = (yOffset - size / 2);

            const degrees = radiansToDegrees(Math.atan2(yRadial, xRadial)) + 450;
            setMapHeading(degrees % 360);
        }
    }

    // Move dial pointer to angle of click point to from North
    const handleClick = (evt: React.MouseEvent<SVGElement>) => {
        rotate(evt);
    };

    // Point north
    const handleDoubleClick = () => {
        setMapHeading(0);
    };

    // Follow mouse drag
    const handleMouseMove = (evt: React.MouseEvent<SVGElement>) => {
        if (evt.buttons === 1) {
            rotate(evt);
        }
    };

    return (
        <StyledContainer>
            <StyledWrapper
                ref={refWrapper}
                $angle={needleAngle}
            >
                <MdNorth
                    style={{height: '100%', width: '100%'}}
                    onClick={handleClick}
                    onDoubleClick={handleDoubleClick}
                    onMouseMove={handleMouseMove}
                />

            </StyledWrapper>
        </StyledContainer>
    );
}

export default SimpleCompass;