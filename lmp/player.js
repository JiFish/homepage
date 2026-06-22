(function () {
    const ROM_URL = "leanman-pocket.gb";
    const PRESSED_CLASS = "pressed";
    const PALETTE_STORAGE_KEY = "leanman-pocket-palette";
    const VOLUME_STORAGE_KEY = "leanman-pocket-volume";
    const CLASSIC_PALETTE_CLASS = "palette-classic";
    const DEFAULT_VOLUME = 25;
    const keyState = {
        UP: false,
        RIGHT: false,
        DOWN: false,
        LEFT: false,
        A: false,
        B: false,
        SELECT: false,
        START: false
    };
    const keyMap = {
        ArrowUp: "UP",
        KeyW: "UP",
        ArrowRight: "RIGHT",
        KeyD: "RIGHT",
        ArrowDown: "DOWN",
        KeyS: "DOWN",
        ArrowLeft: "LEFT",
        KeyA: "LEFT",
        KeyZ: "A",
        KeyK: "A",
        KeyX: "B",
        KeyL: "B",
        KeyN: "SELECT",
        Backspace: "SELECT",
        KeyM: "START",
        Enter: "START"
    };

    let started = false;
    let startPromise = null;

    function emulator() {
        return WasmBoy.WasmBoy;
    }

    function setStatus(message) {
        document.getElementById("status").textContent = message;
    }

    function setError(message) {
        const error = document.getElementById("error");
        error.textContent = message;
        error.style.display = "block";
    }

    function syncJoypad() {
        if (started) {
            emulator().setJoypadState(keyState);
        }
    }

    function volumeValue() {
        return Number(document.getElementById("volume-slider").value);
    }

    function applyVolume() {
        if (started) {
            emulator()._getAudioChannels().master._setGain(volumeValue() / 100);
        }
    }

    function setVolume(volume) {
        const slider = document.getElementById("volume-slider");
        const value = document.getElementById("volume-value");

        slider.value = volume;
        value.textContent = volume + "%";
        localStorage.setItem(VOLUME_STORAGE_KEY, String(volume));
        applyVolume();
    }

    function savedVolume() {
        const volume = localStorage.getItem(VOLUME_STORAGE_KEY);
        return volume === null ? DEFAULT_VOLUME : Number(volume);
    }

    function setPalette(palette) {
        const isClassic = palette === "classic";
        document.body.classList.toggle(CLASSIC_PALETTE_CLASS, isClassic);
        document.getElementById("palette-toggle").textContent =
            isClassic ? "Palette: Classic Green" : "Palette: Default";
        localStorage.setItem(PALETTE_STORAGE_KEY, isClassic ? "classic" : "default");
    }

    function togglePalette() {
        setPalette(
            document.body.classList.contains(CLASSIC_PALETTE_CLASS)
                ? "default"
                : "classic"
        );
    }

    async function startPlayer() {
        if (startPromise) return startPromise;

        startPromise = (async function () {
            const canvas = document.getElementById("gameboy");
            const overlay = document.getElementById("start-overlay");
            const gb = emulator();

            setStatus("Loading emulator...");
            await gb.config({
                enableBootROMIfAvailable: false,
                isGbcEnabled: false,
                isGbcColorizationEnabled: false,
                disablePauseOnHidden: true
            }, canvas);

            setStatus("Loading ROM...");
            await gb.loadROM(ROM_URL, { fileName: ROM_URL });
            gb.disableDefaultJoypad();
            await gb.play();
            started = true;
            applyVolume();
            syncJoypad();
            overlay.classList.add(PRESSED_CLASS);
            setStatus("Running");
        })();

        return startPromise.catch(function (error) {
            startPromise = null;
            console.error(error);
            setStatus("Failed");
            setError(error && error.message ? error.message : String(error));
        });
    }

    function handleKey(event, pressed) {
        const button = keyMap[event.code];
        if (!button) return;

        event.preventDefault();
        keyState[button] = pressed;
        if (pressed) {
            startPlayer();
        }
        syncJoypad();
    }

    window.addEventListener("DOMContentLoaded", function () {
        setStatus("Press any mapped key or click to start");
        document.getElementById("start-overlay").addEventListener("click", startPlayer);
        document.getElementById("palette-toggle").addEventListener("click", togglePalette);
        document.getElementById("volume-slider").addEventListener("input", function () {
            setVolume(volumeValue());
        });
        setPalette(localStorage.getItem(PALETTE_STORAGE_KEY) === "classic" ? "classic" : "default");
        setVolume(savedVolume());
        window.addEventListener("keydown", function (event) {
            handleKey(event, true);
        });
        window.addEventListener("keyup", function (event) {
            handleKey(event, false);
        });
    });
})();
