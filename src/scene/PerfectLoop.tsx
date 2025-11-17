import { makeScene2D } from "@motion-canvas/2d";
import { createSignal, linear } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const animationTime = 5;

    // ===== Constant definitions ==============================================

    const time = createSignal(0);

    // ===== Scene configuration ===============================================

    view.fill("rgb(0, 0, 23)");

    // ===== Generators ========================================================

    yield* time(0, 0).to(Math.PI * 2, animationTime, linear);
});
