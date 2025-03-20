// Function to toggle mute on a track
function toggleMute(trackId) {
    const track = document.getElementById(trackId);
    track.muted = !track.muted;

    const muteButton = document.getElementById(`mute-${trackId}`);
    muteButton.textContent = track.muted ? '🔇' : '🔊';
  }

  // Function to generate tracks for up to 4 audio files
  function generateTracks(files) {
    const tracksDiv = document.getElementById('Tracks');
    tracksDiv.innerHTML = ''; // Clear existing tracks

    Array.from(files).slice(0, 4).forEach((file, index) => {
      const trackId = `Track: ${index + 1}`;
      
      // Create audio element
      const trackNum = document.createElement('label');
      trackNum.textContent = trackId;
      tracksDiv.appendChild(trackNum);
      const muteTrack = document.createElement('button');
      muteTrack.id = `mute-${trackId}`;
      muteTrack.onclick = () => toggleMute(trackId);
      muteTrack.textContent = '🔊';
      tracksDiv.appendChild(muteTrack);
      const audio = document.createElement('audio');
      audio.id = trackId;
      audio.controls = false;
      audio.src = URL.createObjectURL(file);
      tracksDiv.appendChild(audio);
      tracksDiv.appendChild(document.createElement('br'));
    });
  }


  // Function to change the playback speed based on the input BPM
  function changeSpeed(bpm) {
    const allTracks = document.querySelectorAll('audio');
    
    // Convert BPM to playback rate.
    // Example: assume 120 BPM is the standard, so we calculate the rate as bpm / 120
    const baseBpm = 100;
    const speed = bpm / baseBpm;
    
    // Adjust the playback speed
    allTracks.forEach(track => {
      track.playbackRate = speed;
    });
  }
  

  // Function to play or pause all tracks
  function toggleMasterPlayPause() {
    // Get all audio elements
    const allTracks = document.querySelectorAll('audio');
    const masterButton = document.getElementById('master-play-pause');
    
    // Check if any track is playing
    const isAnyTrackPlaying = Array.from(allTracks).some(track => !track.paused);
  
    if (isAnyTrackPlaying) {
      // Pause all tracks
      allTracks.forEach(track => track.pause());
      masterButton.textContent = '⏵︎';
    } else {
      // Play all tracks
      allTracks.forEach(track => track.play());
      masterButton.textContent = '⏸︎';
    }
  }
  