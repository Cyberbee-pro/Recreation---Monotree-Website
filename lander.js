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
        


        let currentBrandIndex = 0;
        let isAutoCycling = false;
        let autoCycleInterval = null;
        let selectedBrand = 'tre'; // Initially selected brand

        const brands = [
            { name: 'tre', displayName: '3', image: 'https://via.placeholder.com/600x400/5a9f7e/ffffff?text=3+Brand+App+Interface' },
            { name: 'cofoco', displayName: 'Cofoco', image: 'https://via.placeholder.com/600x400/f5f5f5/1a1a1a?text=Cofoco+App+Interface' },
            { name: 'bones', displayName: 'Bones', image: 'https://via.placeholder.com/600x400/8b4444/ffffff?text=Bones+App+Interface' },
            { name: 'olioli', displayName: 'OLIOLI', image: 'https://via.placeholder.com/600x400/d8ebf5/1a1a1a?text=OLIOLI+App+Interface' },
            { name: 'madklubben', displayName: 'Madklubben', image: 'https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Madklubben+App+Interface' },
            { name: 'farup', displayName: 'Fårup', image: 'https://via.placeholder.com/600x400/4a90b8/ffffff?text=Farup+App+Interface' }
        ];

        function showImage(imageSrc, brandName, isAuto = false) {
            const placeholder = document.querySelector('.div-13-placeholder');
            const previewImage = document.querySelector('.div-13-preview-image');
            const brandLabel = document.querySelector('.div-13-brand-label');
            const autoCycleIndicator = document.querySelector('.div-13-auto-cycle-indicator');

            placeholder.style.display = 'none';
            previewImage.style.display = 'block';
            previewImage.src = imageSrc;
            brandLabel.textContent = brandName;
            
            if (isAuto) {
                autoCycleIndicator.style.display = 'block';
            } else {
                autoCycleIndicator.style.display = 'none';
            }
        }

        function hideImage() {
            const placeholder = document.querySelector('.div-13-placeholder');
            const previewImage = document.querySelector('.div-13-preview-image');
            const autoCycleIndicator = document.querySelector('.div-13-auto-cycle-indicator');

            placeholder.style.display = 'flex';
            previewImage.style.display = 'none';
            autoCycleIndicator.style.display = 'none';
        }

        function selectBrand(element, brandName) {
            // Stop auto cycling when a brand is manually selected
            stopAutoCycle();
            
            // Remove active class from all items
            document.querySelectorAll('.div-13-brand-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            element.classList.add('active');
            
            // Update selected brand
            selectedBrand = brandName;
            
            // Show the brand's image
            const brand = brands.find(b => b.name === brandName);
            if (brand) {
                showImage(brand.image, brand.displayName);
            }
            
            // Start auto cycle after 3 seconds of inactivity
            setTimeout(() => {
                if (selectedBrand === brandName) { // Only start if still on same brand
                    startAutoCycle();
                }
            }, 3000);
            
            console.log('Selected brand:', brandName);
        }

        function startAutoCycle() {
            if (isAutoCycling) return;
            
            isAutoCycling = true;
            currentBrandIndex = brands.findIndex(b => b.name === selectedBrand);
            
            autoCycleInterval = setInterval(() => {
                currentBrandIndex = (currentBrandIndex + 1) % brands.length;
                const currentBrand = brands[currentBrandIndex];
                showImage(currentBrand.image, currentBrand.displayName, true);
            }, 2000);
        }

        function stopAutoCycle() {
            if (autoCycleInterval) {
                clearInterval(autoCycleInterval);
                autoCycleInterval = null;
            }
            isAutoCycling = false;
        }

        // Initialize with the default selected brand (3/tre)
        document.addEventListener('DOMContentLoaded', function() {
            const selectedBrandElement = document.querySelector('.div-13-brand-item.active');
            if (selectedBrandElement) {
                const brand = brands.find(b => b.name === 'tre');
                if (brand) {
                    showImage(brand.image, brand.displayName);
                }
                
                // Start auto cycle after 3 seconds
                setTimeout(() => {
                    startAutoCycle();
                }, 3000);
            }
        });

        // Stop auto cycle when user hovers over the image container
        document.querySelector('.div-13-image-container').addEventListener('mouseenter', stopAutoCycle);
        
        // Restart auto cycle when user leaves the image container (after delay)
        document.querySelector('.div-13-image-container').addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (document.querySelector('.div-13-preview-image').style.display !== 'none') {
                    startAutoCycle();
                }
            }, 1000);
        });