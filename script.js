// Piano Game JS
window.addEventListener("DOMContentLoaded", () => {
    const noteDisplay = document.getElementById("noteDisplay");
    const volumeSlider = document.getElementById("volumeSlider");
    const volumeValue = document.getElementById("volumeValue");
    const pianoKeys = document.querySelectorAll(".piano-key");
    const lyricNotes = document.querySelectorAll(".song-lyrics .note");

    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let gainNode = audioCtx.createGain();
    gainNode.connect(audioCtx.destination);

    // 🎚 Volume Control
    volumeSlider.addEventListener("input", () => {
        gainNode.gain.value = volumeSlider.value;
        volumeValue.textContent = `${Math.round(volumeSlider.value * 100)}%`;
    });

    // 🎵 Play Note
    function playNote(frequency, note) {
        let osc = audioCtx.createOscillator();
        osc.type = "sine"; // can change to 'square', 'triangle', 'sawtooth'
        osc.frequency.value = frequency;
        osc.connect(gainNode);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);

        noteDisplay.textContent = `Playing: ${note}`;
        highlightLyrics(note);
    }

    // 🎹 Highlight Lyrics Notes
    function highlightLyrics(note) {
        lyricNotes.forEach(n => {
            if (n.textContent.trim() === note) {
                n.classList.add("active-note");
                setTimeout(() => n.classList.remove("active-note"), 600);
            }
        });
    }

    // 🎹 Key Click Events
    pianoKeys.forEach(key => {
        key.addEventListener("click", () => {
            const note = key.dataset.note;
            const freq = parseFloat(key.dataset.freq);
            playNote(freq, note);

            key.classList.add("pressed");
            setTimeout(() => key.classList.remove("pressed"), 200);
        });
    });

    // ⌨️ Keyboard Mapping
    const keyMap = {
        "a": "C4",
        "s": "D4",
        "d": "E4",
        "f": "F4",
        "g": "G4",
        "h": "A4",
        "j": "B4",
        "k": "C5",
        "l": "D5",
        ";": "E5",
        "'": "F5"
    };

    document.addEventListener("keydown", (e) => {
        const note = keyMap[e.key.toLowerCase()];
        if (note) {
            const keyElement = [...pianoKeys].find(k => k.dataset.note === note);
            if (keyElement) {
                const freq = parseFloat(keyElement.dataset.freq);
                playNote(freq, note);

                keyElement.classList.add("pressed");
                setTimeout(() => keyElement.classList.remove("pressed"), 200);
            }
        }
    });
});
