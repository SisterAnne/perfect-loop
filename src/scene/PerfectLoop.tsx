import {
    blur,
    Circle,
    contrast,
    Grid,
    Latex,
    makeScene2D,
    Node,
} from "@motion-canvas/2d";
import { createSignal, linear } from "@motion-canvas/core";

interface rgbaValue {
    r: number;
    g: number;
    b: number;
    a: number;
}

export default makeScene2D(function* (view) {
    const animationTime = 5;

    // ===== Constant definitions ==============================================

    const maxWidth = 1920;
    const gridSize = 75;

    const time = createSignal(0);

    const boundDiameter = 750;
    const ballCount = 8;
    const ballDiameter = 50;

    const ballColors = [
        { r: 255, g: 0, b: 0, a: 1 }, // Red
        { r: 255, g: 165, b: 0, a: 1 }, // Orange
        { r: 255, g: 255, b: 0, a: 1 }, // Yellow
        { r: 0, g: 128, b: 0, a: 1 }, // Green
        { r: 0, g: 255, b: 255, a: 1 }, // Cyan
        { r: 0, g: 0, b: 255, a: 1 }, // Blue
        { r: 75, g: 0, b: 130, a: 1 }, // Indigo
        { r: 238, g: 130, b: 238, a: 1 }, // Violet
    ];

    // ===== JSX helpers =======================================================

    function createBall(ballNum: number): Node {
        const boundRadius = boundDiameter / 2;
        const theta = (ballNum * Math.PI) / ballCount;
        const phi = (ballNum * Math.PI) / ballCount;

        const posX = createSignal(
            () => Math.cos(time() + phi) * boundRadius * Math.cos(theta)
        );
        const posY = createSignal(
            () => Math.cos(time() + phi) * boundRadius * Math.sin(theta)
        );

        const fill = ballColors[ballNum];

        return (
            <>
                <Circle
                    cache
                    fill={fill}
                    height={ballDiameter}
                    width={ballDiameter}
                    x={posX}
                    y={posY}
                    filters={[blur(10), contrast(0.5)]}
                />
                <Circle
                    cache
                    stroke={fill}
                    lineWidth={10}
                    height={ballDiameter}
                    width={ballDiameter}
                    x={posX}
                    y={posY}
                    filters={[blur(5)]}
                />
                <Circle
                    stroke={"white"}
                    lineWidth={5}
                    height={ballDiameter}
                    width={ballDiameter}
                    x={posX}
                    y={posY}
                    filters={[blur(5)]}
                />
                <Circle
                    fill={fill}
                    lineWidth={5}
                    height={ballDiameter / 2}
                    width={ballDiameter / 2}
                    x={posX}
                    y={posY}
                />
            </>
        );
    }

    function createTheta(ballNum: number, tex: string) {
        const textColorWhite: rgbaValue = { r: 204, g: 204, b: 255, a: 0.8 };
        const blurColor = ballColors[ballNum % ballColors.length];
        const intensity = () => Math.max(0.000001, Math.cos(time() + phi));

        const boundRadius = boundDiameter / 2 + 75;
        const theta = (ballNum * Math.PI) / ballCount;
        const phi = (ballNum * Math.PI) / ballCount;

        const posX = boundRadius * Math.cos(theta);
        const posY = boundRadius * Math.sin(theta);
        const fill = createSignal(
            () =>
                `rgba(${blurColor.r}, ${blurColor.g}, ${
                    blurColor.b
                }, ${intensity()})`
        );

        return (
            <>
                <Latex
                    tex={tex}
                    fill={fill}
                    fontSize={23}
                    x={posX}
                    y={posY}
                    filters={[blur(3)]}
                />
                <Latex
                    tex={tex}
                    fill={`rgba(${textColorWhite.r}, ${textColorWhite.g}, ${textColorWhite.b}, ${textColorWhite.a})`}
                    fontSize={23}
                    x={posX}
                    y={posY}
                />
            </>
        );
    }

    // ===== Scene configuration ===============================================

    view.fill("rgb(0, 0, 23)");
    view.add(
        <>
            {/* Background grid */}
            <>
                <Grid
                    // Cartesian Grid
                    cache
                    width={maxWidth}
                    height={maxWidth}
                    spacing={gridSize}
                    stroke={"#222"}
                    lineWidth={1}
                    filters={[blur(5)]}
                />
                <Grid
                    width={maxWidth}
                    height={maxWidth}
                    spacing={gridSize}
                    stroke={"#333"}
                    lineWidth={1}
                />

                <Grid
                    // Rotated Cartesian Grid
                    cache
                    width={maxWidth}
                    height={maxWidth}
                    spacing={gridSize * Math.SQRT2}
                    stroke={"#222"}
                    lineWidth={1}
                    rotation={45}
                    filters={[blur(5)]}
                />
                <Grid
                    width={maxWidth}
                    height={maxWidth}
                    spacing={gridSize * Math.SQRT2}
                    stroke={"#222"}
                    lineWidth={1}
                    rotation={45}
                />

                <Grid
                    // Origin Plane
                    width={maxWidth}
                    height={maxWidth}
                    spacing={maxWidth}
                    stroke={"#fff"}
                    lineWidth={1}
                />
            </>

            {/* Bounding circle */}
            <>
                <Circle
                    cache
                    stroke={"#ccccff"}
                    height={boundDiameter}
                    width={boundDiameter}
                    lineWidth={2}
                    filters={[blur(5)]}
                />
                <Circle
                    stroke={"#ccccff"}
                    height={boundDiameter}
                    width={boundDiameter}
                    lineWidth={2}
                />
            </>

            {/* Moving balls */}
            <>
                {createBall(0)}
                {createBall(1)}
                {createBall(2)}
                {createBall(3)}
                {createBall(4)}
                {createBall(5)}
                {createBall(6)}
                {createBall(7)}
            </>

            {/* Unit Circle */}
            <>
                {createTheta(0, "\\theta = 0")}
                {createTheta(1, "\\theta = \\frac{15\\pi}{8}")}
                {createTheta(2, "\\theta = \\frac{7\\pi}{4}")}
                {createTheta(3, "\\theta = \\frac{13\\pi}{8}")}
                {createTheta(4, "\\theta = \\frac{3\\pi}{2}")}
                {createTheta(5, "\\theta = \\frac{11\\pi}{8}")}
                {createTheta(6, "\\theta = \\frac{5\\pi}{4}")}
                {createTheta(7, "\\theta = \\frac{9\\pi}{8}")}
                {createTheta(8, "\\theta = \\pi")}
                {createTheta(9, "\\theta = \\frac{7\\pi}{8}")}
                {createTheta(10, "\\theta = \\frac{3\\pi}{4}")}
                {createTheta(11, "\\theta = \\frac{5\\pi}{8}")}
                {createTheta(12, "\\theta = \\frac{\\pi}{2}")}
                {createTheta(13, "\\theta = \\frac{3\\pi}{8}")}
                {createTheta(14, "\\theta = \\frac{\\pi}{4}")}
                {createTheta(15, "\\theta = \\frac{\\pi}{8}")}
            </>
        </>
    );

    // ===== Generators ========================================================

    yield* time(Math.PI * 2, animationTime, linear);
});
