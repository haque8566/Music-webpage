document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // AUDIO
    // =========================

    const audio = document.getElementById("audio");

    const playBtn = document.getElementById("control-play");
    const prevBtn = document.getElementById("control-prev");
    const nextBtn = document.getElementById("control-next");

    const shuffleBtn = document.getElementById("control-shuffle");
    const repeatBtn = document.getElementById("control-repeat");

    const progressBar = document.getElementById("progress-bar");

    const currentTime = document.getElementById("current-time");
    const totalTime = document.getElementById("tot-time");

    const album = document.getElementById("album");

    const cards = document.querySelectorAll(".card");


    // =========================
    // 5 SONGS
    // =========================

    const songs = [
        {
            file: "songs/song1.mp3",
            title: "Song 1",
            artist: "My Music",
            image: "icons/card1img.jpeg"
        },

        {
            file: "songs/song2.mp3",
            title: "Song 2",
            artist: "My Music",
            image: "icons/card2img.jpeg"
        },

        {
            file: "songs/song3.mp3",
            title: "Song 3",
            artist: "My Music",
            image: "icons/card3img.jpeg"
        },

        {
            file: "songs/song4.mp3",
            title: "Song 4",
            artist: "My Music",
            image: "icons/card4img.jpeg"
        },

        {
            file: "songs/song5.mp3",
            title: "Song 5",
            artist: "My Music",
            image: "icons/card5img.jpeg"
        }
    ];


    let currentSong = 0;

    let isShuffle = false;

    let isRepeat = false;


    // =========================
    // LOAD SONG
    // =========================

    function loadSong(index) {

        currentSong = index;

        const song = songs[currentSong];

        audio.src = song.file;

        album.innerHTML = `
            <img src="${song.image}" class="album-art">

            <div class="album-details">

                <span class="album-title">
                    ${song.title}
                </span>

                <span class="album-artist">
                    ${song.artist}
                </span>

            </div>
        `;

        currentTime.textContent = "00:00";

        totalTime.textContent = "00:00";

        progressBar.value = 0;


        // Remove playing class from all cards

        cards.forEach(function (card) {
            card.classList.remove("playing");
        });


        // Add playing class to current card

        if (cards[currentSong]) {
            cards[currentSong].classList.add("playing");
        }
    }


    // =========================
    // PLAY SONG
    // =========================

    function playSong() {

        audio.play()
            .then(function () {

                console.log("Playing:", songs[currentSong].file);

            })
            .catch(function (error) {

                console.log("Song play error:", error);

            });
    }


    // =========================
    // PLAY / PAUSE
    // =========================

    playBtn.addEventListener("click", function () {

        if (audio.paused) {

            playSong();

        } else {

            audio.pause();

        }

    });


    // =========================
    // CARD CLICK
    // =========================

    cards.forEach(function (card, index) {

        card.addEventListener("click", function () {

            // 5 songs repeat for extra cards
            const songIndex = index % songs.length;

            loadSong(songIndex);

            playSong();

        });

    });


    // =========================
    // NEXT
    // =========================

    nextBtn.addEventListener("click", function () {

        if (isShuffle) {

            currentSong =
                Math.floor(Math.random() * songs.length);

        } else {

            currentSong++;

            if (currentSong >= songs.length) {

                currentSong = 0;

            }

        }

        loadSong(currentSong);

        playSong();

    });


    // =========================
    // PREVIOUS
    // =========================

    prevBtn.addEventListener("click", function () {

        currentSong--;

        if (currentSong < 0) {

            currentSong = songs.length - 1;

        }

        loadSong(currentSong);

        playSong();

    });


    // =========================
    // SHUFFLE
    // =========================

    shuffleBtn.addEventListener("click", function () {

        isShuffle = !isShuffle;

        shuffleBtn.classList.toggle(
            "active",
            isShuffle
        );

    });


    // =========================
    // REPEAT
    // =========================

    repeatBtn.addEventListener("click", function () {

        isRepeat = !isRepeat;

        repeatBtn.classList.toggle(
            "active",
            isRepeat
        );

    });


    // =========================
    // SONG LOADED
    // =========================

    audio.addEventListener("loadedmetadata", function () {

        totalTime.textContent =
            formatTime(audio.duration);

    });


    // =========================
    // TIME UPDATE
    // =========================

    audio.addEventListener("timeupdate", function () {

        if (!audio.duration) {
            return;
        }

        const percentage =
            (audio.currentTime / audio.duration) * 100;

        progressBar.value = percentage;

        currentTime.textContent =
            formatTime(audio.currentTime);

    });


    // =========================
    // PROGRESS BAR
    // =========================

    progressBar.addEventListener("input", function () {

        if (!audio.duration) {
            return;
        }

        audio.currentTime =
            (progressBar.value / 100) *
            audio.duration;

    });


    // =========================
    // SONG ENDED
    // =========================

    audio.addEventListener("ended", function () {

        if (isRepeat) {

            audio.currentTime = 0;

            playSong();

        } else {

            nextBtn.click();

        }

    });


    // =========================
    // FORMAT TIME
    // =========================

    function formatTime(seconds) {

        if (isNaN(seconds)) {
            return "00:00";
        }

        const minutes =
            Math.floor(seconds / 60);

        let secondsPart =
            Math.floor(seconds % 60);

        if (secondsPart < 10) {

            secondsPart =
                "0" + secondsPart;

        }

        return minutes + ":" + secondsPart;
    }


    // =========================
    // LOAD FIRST SONG
    // =========================

    loadSong(0);

});


