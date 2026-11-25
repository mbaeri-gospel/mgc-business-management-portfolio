// Interactive 3D tube backdrop for the MGC portfolio hero.
// The effect stays inside the hero so page content remains readable and usable.
const canvas = document.getElementById('heroTubesCanvas');

if (canvas) {
  const paletteButton = document.getElementById('tubesPaletteToggle');
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const smallScreenQuery = window.matchMedia('(max-width: 700px)');
  const saveData = Boolean(navigator.connection?.saveData);
  const palettes = {
    light: [
      { tubes: ['#B98243', '#D5B77F', '#56727D'], lights: ['#E7C99A', '#B57C4B', '#78949A', '#F1E4CD'] },
      { tubes: ['#C18B55', '#8D684A', '#718A91'], lights: ['#F0D8B1', '#C18A59', '#8FAEB0', '#D6B88B'] },
      { tubes: ['#A77B52', '#D8C3A0', '#405A70'], lights: ['#D9B47C', '#A56F4D', '#91A6A8', '#E8DCC8'] }
    ],
    dark: [
      { tubes: ['#F0B75E', '#E5D0A8', '#72A8BA'], lights: ['#FFE0A3', '#D68A56', '#79C3D5', '#F4D7B4'] },
      { tubes: ['#E8A45C', '#B9A0E5', '#76C6B0'], lights: ['#FFD18A', '#E58A72', '#A8D7E8', '#D5B6F2'] },
      { tubes: ['#E7C18A', '#8FB9D1', '#D28BAA'], lights: ['#FFE5B8', '#8FCBE0', '#E8A0C1', '#C5B1F0'] }
    ]
  };

  let paletteIndex = 0;
  let tubesApp = null;
  let mounted = true;
  let importStarted = false;
  const currentTheme = () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  const currentPalette = () => palettes[currentTheme()][paletteIndex];

  function setPalette(index) {
    paletteIndex = (index + 3) % 3;
    const palette = currentPalette();
    if (!tubesApp?.tubes) return;
    try {
      tubesApp.tubes.setColors(palette.tubes);
      tubesApp.tubes.setLightsColors(palette.lights);
    } catch (error) {
      console.warn('Could not update the 3D tube palette.', error);
    }
  }

  function applyThemePalette() {
    if (tubesApp?.tubes) setPalette(paletteIndex);
    canvas.dataset.theme = currentTheme();
  }

  async function startTubes() {
    if (importStarted || reducedMotionQuery.matches || saveData || !canvas.isConnected) {
      canvas.classList.add('is-fallback');
      return;
    }
    importStarted = true;
    try {
      // Dynamic import keeps the 3D library out of the initial page payload.
      const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
      if (!mounted || !canvas.isConnected) return;
      const TubesCursor = module.default;
      if (typeof TubesCursor !== 'function') throw new Error('TubesCursor export was not found.');

      tubesApp = TubesCursor(canvas, {
        tubes: {
          colors: currentPalette().tubes,
          lights: {
            intensity: smallScreenQuery.matches ? 95 : 145,
            colors: currentPalette().lights
          }
        }
      });
      canvas.classList.remove('is-fallback');
      canvas.classList.add('is-ready');
      applyThemePalette();
    } catch (error) {
      console.warn('Interactive tube background unavailable; keeping the portfolio fallback.', error);
      canvas.classList.add('is-fallback');
    }
  }

  // Only clicks landing on the canvas itself cycle palettes; buttons and links are untouched.
  const handleCanvasClick = () => setPalette(paletteIndex + 1);
  const handlePaletteButton = () => setPalette(paletteIndex + 1);
  canvas.addEventListener('click', handleCanvasClick);
  paletteButton?.addEventListener('click', handlePaletteButton);
  window.addEventListener('mgc-theme-change', applyThemePalette);
  reducedMotionQuery.addEventListener?.('change', event => {
    if (event.matches) canvas.classList.add('is-fallback');
  });
  window.addEventListener('pagehide', () => {
    mounted = false;
    window.removeEventListener('mgc-theme-change', applyThemePalette);
    canvas.removeEventListener('click', handleCanvasClick);
    paletteButton?.removeEventListener('click', handlePaletteButton);
    // The CDN build does not document a public dispose/destroy API; avoid calling
    // guessed methods. The browser releases the page's WebGL context on navigation.
  }, { once: true });

  startTubes();
}
