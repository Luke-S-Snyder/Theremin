function Synthesizer(width, height) { 
    this.width = width;
    this.height = height;
    this.createTheremin();
    this.started = false;
}

Synthesizer.prototype.createTheremin = function() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext || 
        window.mozAudioContext || window.oAudioContext || window.msAudioContext)();

    this.osc = this.audioCtx.createOscillator();
    this.osc.type = 'sine';

    this.gain = this.audioCtx.createGain();
    this.osc.connect(this.gain);
    this.gain.gain.value = 0;
    this.gain.connect(this.audioCtx.destination);
}

Synthesizer.prototype.play = function(x, y, output_elmnt) {
    volume = ~~(x / this.width * 100);
    volume = Math.max(0, Math.min(100, volume));
    freq = ~~((1 - (y / this.height)) * 1000);
    freq = Math.max(0, Math.min(1000, freq));

    this.osc.frequency.value = freq;
    this.gain.gain.value = volume / 100;

    output_elmnt.innerHTML = "Frequency: " + freq + "hz" + ", Volume: " + volume + "%";
    if (!this.started) {
        this.osc.start();
        this.started = true;
    }
}

Synthesizer.prototype.stop = function() {
    this.gain.gain.value = 0;
}
