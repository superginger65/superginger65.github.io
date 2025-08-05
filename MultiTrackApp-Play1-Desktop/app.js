const allTracks = document.querySelectorAll('audio');
const timeline = document.getElementById('timeline');

    allTracks.forEach(track => {
      track.addEventListener('ended', endTracks);
      track.addEventListener('timeupdate', function() {
        timeline.value = this.currentTime;
      });
    });

  // Function to toggle mute on a track
  function toggleMute(trackId) {
    const track = document.getElementById(trackId);
    track.muted = !track.muted;

    const muteButton = document.getElementById(`mute-${trackId}`);
    muteButton.textContent = track.muted ? '🔇' : '🔊';
  }


  // Function to change the playback speed based on the input BPM
  function changeSpeed(bpm) {
    const allTracks = document.querySelectorAll('audio');
    
    const baseBpm = 100;
    const speed = bpm / baseBpm;
    
    // Adjust the playback speed
    allTracks.forEach(track => {
      track.playbackRate = speed;
    });
  }
  

  // Function to play or pause all tracks in sync
  function toggleMasterPlayPause() {
    const allTracks = document.querySelectorAll('audio');
    const masterButton = document.getElementById('master-play-pause');
    const isAnyTrackPlaying = Array.from(allTracks).some(track => !track.paused);

    if (allTracks.length > 0) {
      if (isAnyTrackPlaying) {
        // Pause all tracks
        allTracks.forEach(track => track.pause());
        masterButton.textContent = '⏵︎';
      } else {
        // Sync all tracks to the same time
        const syncTime = allTracks[0].currentTime;
        allTracks.forEach(track => {
          track.currentTime = syncTime;
        });

        // Play all tracks as close together as possible
        // Use Promise to ensure play() is called after currentTime is set
        Promise.all(Array.from(allTracks, track => track.play().catch(() => {})))
          .then(() => {
            masterButton.textContent = '⏸︎';
          });
      }
    }
  }

  function setTrackVolume(trackId, volume) {
    const track = document.getElementById(trackId);
    track.volume = volume;
  }


  function endTracks() {
    const allTracks = document.querySelectorAll('audio');
    const masterButton = document.getElementById('master-play-pause');
    allTracks.forEach(track => {
      track.pause();
      track.currentTime = 0;
    });
    masterButton.textContent = '⏵︎';
  }


  //Function to handle Restarting Tracks
  function restartTracks() {
    const allTracks = document.querySelectorAll('audio');
    allTracks.forEach(track => {
      track.currentTime = 0;
    });
  }


  //Function to handle moving the Time of the Tracks
  function moveTracks(timeInSeconds) {
    const allTracks = document.querySelectorAll('audio');
    allTracks.forEach(track => {
      track.currentTime = track.currentTime + timeInSeconds;
    });
  }

  //Function to handle moving the Time of the Tracks using the slider
  function moveTracksSlider(timeInSeconds) {
    const allTracks = document.querySelectorAll('audio');
    allTracks.forEach(track => {
      track.currentTime = timeInSeconds;
    });
  }


  //Function to Reset the Speed to default

  function resetSpeed() {
    const slider = document.getElementById('speed');
    slider.value = 100; // Reset the slider to 100
    changeSpeed(100); // Reset the speed to default
  }

  function loopHandler() {
    const loopStart = document.getElementById('loop-start');
    const loopEnd = document.getElementById('loop-end');
    if (this.currentTime >= loopEnd.value || this.currentTime < loopStart.value) {
      this.currentTime = loopStart.value;
      this.play();
    }
  }


  function toggleLoop() {
    const loopDiv = document.getElementById('loop-controls');
    const allTracks = document.querySelectorAll('audio');

    if (loopDiv.hidden === true) {

      loopDiv.hidden = false;
      allTracks.forEach(track => {
        track.addEventListener('timeupdate', loopHandler);
      });
    } else {
      loopDiv.hidden = true;
      allTracks.forEach(track => {
        track.removeEventListener('timeupdate', loopHandler);
      });
    }
  }
  