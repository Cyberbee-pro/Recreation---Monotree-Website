function marquee() {
            return {
                isPaused: false,
                
                init() {
                    // Initialize any setup here if needed
                }
            }
        }

        function toggleMarquee() {
            const container = document.getElementById('marqueeContainer');
            const btn = document.getElementById('playPauseBtn');
            
            if (container.classList.contains('paused')) {
                container.classList.remove('paused');
                btn.textContent = 'Pause';
            } else {
                container.classList.add('paused');
                btn.textContent = 'Play';
            }
        }

        function changeSpeed(multiplier) {
            const container = document.getElementById('marqueeContainer');
            const currentSpeed = parseFloat(getComputedStyle(container).getPropertyValue('--speed')) || 3.75;
            const newSpeed = currentSpeed / multiplier;
            container.style.setProperty('--speed', newSpeed + 's');
        }

        // Optional: Pause on hover
        document.getElementById('marqueeContainer').addEventListener('mouseenter', function() {
            this.classList.add('paused');
        });

        document.getElementById('marqueeContainer').addEventListener('mouseleave', function() {
            if (document.getElementById('playPauseBtn').textContent === 'Pause') {
                this.classList.remove('paused');
            }
        });
        


        