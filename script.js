// ==========================================
// NEXA — AI HUB TIKTOK ENGINE
// ==========================================


// ------------------------------------------
// ELEMENTS
// ------------------------------------------

const scenes =
    document.querySelectorAll(".scene");

const progressBar =
    document.querySelector(".progress-bar");

const exportBtn =
    document.querySelector("#exportBtn");

const exportStatus =
    document.querySelector("#exportStatus");


// ------------------------------------------
// VIDEO SETTINGS
// ------------------------------------------

const SCENE_DURATION = 5000;

const TOTAL_DURATION =
    scenes.length * SCENE_DURATION;


// ------------------------------------------
// STATE
// ------------------------------------------

let currentScene = 0;

let playbackTimer = null;


// ------------------------------------------
// SHOW SCENE
// ------------------------------------------

function showScene(index) {

    scenes.forEach(scene => {

        scene.classList.remove("active");

    });

    scenes[index].classList.add("active");
}


// ------------------------------------------
// NORMAL PLAYBACK
// ------------------------------------------

function startVideo() {

    currentScene = 0;

    showScene(0);

    clearInterval(playbackTimer);


    playbackTimer =
        setInterval(() => {

            currentScene++;

            if (
                currentScene >=
                scenes.length
            ) {

                currentScene = 0;
            }

            showScene(currentScene);

        }, SCENE_DURATION);
}


// Start preview
startVideo();


// ==========================================
// EXPORT PLAYBACK
// ==========================================

function playForExport() {

    const start =
        performance.now();


    function frame(time) {

        const elapsed =
            time - start;


        // ------------------------------
        // Scene
        // ------------------------------

        const sceneIndex =
            Math.floor(
                elapsed /
                SCENE_DURATION
            );


        if (
            sceneIndex <
                scenes.length &&
            sceneIndex !==
                currentScene
        ) {

            currentScene =
                sceneIndex;

            showScene(
                currentScene
            );
        }


        // ------------------------------
        // Progress
        // ------------------------------

        const progress =
            Math.min(
                elapsed /
                TOTAL_DURATION,
                1
            );


        progressBar.style.width =
            `${progress * 100}%`;


        // ------------------------------
        // Continue
        // ------------------------------

        if (
            elapsed <
            TOTAL_DURATION
        ) {

            requestAnimationFrame(
                frame
            );

        } else {

            progressBar.style.width =
                "100%";
        }
    }


    requestAnimationFrame(frame);
}


// ==========================================
// EXPORT WEBM
// ==========================================

exportBtn.addEventListener(
    "click",
    async () => {

        try {

            // --------------------------------
            // Stop normal preview
            // --------------------------------

            clearInterval(
                playbackTimer
            );


            currentScene = 0;

            showScene(0);

            progressBar.style.width =
                "0%";


            exportBtn.textContent =
                "SELECT TAB";


            exportStatus.textContent =
                "Choose this browser tab";


            // --------------------------------
            // Capture browser tab
            // --------------------------------

            const stream =
                await navigator
                    .mediaDevices
                    .getDisplayMedia({

                        video: {

                            frameRate: 30,

                            width: {
                                ideal: 1080
                            },

                            height: {
                                ideal: 1920
                            }
                        },

                        audio: false
                    });


            // --------------------------------
            // Pick WebM codec
            // --------------------------------

            let mimeType =
                "video/webm;codecs=vp9";


            if (
                !MediaRecorder
                    .isTypeSupported(
                        mimeType
                    )
            ) {

                mimeType =
                    "video/webm;codecs=vp8";
            }


            if (
                !MediaRecorder
                    .isTypeSupported(
                        mimeType
              
