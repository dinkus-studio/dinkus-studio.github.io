document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    const container = document.createElement('div');
    container.id = 'fireflies-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '1000';

    const fireflyCount = 50;

    for (let i = 0; i < fireflyCount; i++) {
      const firefly = document.createElement('div');
      firefly.className = 'firefly';

      firefly.style.opacity = '0';
      firefly.style.left = `${Math.random() * 100}vw`;
      firefly.style.top = `${Math.random() * 100}vh`;

      // Create unique glow animation for each firefly
      const glowDuration = 6 + Math.random() * 8; // 6-14 seconds
      const glowKeyframes = `
        @keyframes glow-${i} {
            0% { opacity: 0.1; }
            25% { opacity: ${0.3 + Math.random() * 0.3}; }
            50% { opacity: ${0.5 + Math.random() * 0.4}; }
            75% { opacity: ${0.3 + Math.random() * 0.3}; }
            100% { opacity: 0.1; }
        }
        `;

      const doesLoop = Math.random() > 0.5;
      const moveKeyframes = doesLoop
        ? `@keyframes float-${i} {
              0% { transform: translate(0, 0); }
              25% { transform: translate(${Math.random() * 100}px, ${
            Math.random() * 100
          }px) rotate(180deg); }
              50% { transform: translate(${Math.random() * 100}px, ${
            Math.random() * -100
          }px) rotate(360deg); }
              75% { transform: translate(${Math.random() * -100}px, ${
            Math.random() * -100
          }px) rotate(540deg); }
              100% { transform: translate(0, 0) rotate(720deg); }
            }`
        : `@keyframes float-${i} {
              0% { transform: translate(0, 0); }
              33% { transform: translate(${Math.random() * 200 - 100}px, ${
            Math.random() * 200 - 100
          }px); }
              66% { transform: translate(${Math.random() * 200 - 100}px, ${
            Math.random() * 200 - 100
          }px); }
              100% { transform: translate(0, 0); }
            }`;

      const style = document.createElement('style');
      style.textContent = glowKeyframes + moveKeyframes;
      document.head.appendChild(style);

      const moveDuration = 15 + Math.random() * 10;
      firefly.style.animation = `
            float-${i} ${moveDuration}s infinite cubic-bezier(0.4, 0, 0.2, 1),
            glow-${i} ${glowDuration}s infinite ease-in-out
          `;
      firefly.style.animationDelay = `${Math.random() * -20}s, ${
        Math.random() * -20
      }s`;

      container.appendChild(firefly);
    }

    document.body.appendChild(container);
  });
});
