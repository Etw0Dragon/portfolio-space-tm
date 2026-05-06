import React from 'react';

export const RENDER_SCALE_CHANGE_EVENT = 'blackhole-render-scale-change';

export const renderScaleOptions = [
  {
    value: 1,
    label: 'x1',
    title: 'Résolution actuelle',
    description: 'La plus nette, mais aussi la plus gourmande.'
  },
  {
    value: 0.75,
    label: 'x0.75',
    title: 'Équilibré',
    description: 'Bon rendu avec une charge GPU plus légère.'
  },
  {
    value: 0.5,
    label: 'x0.5',
    title: 'Performance',
    description: 'Recommandé sur téléphone ou laptop.'
  },
  {
    value: 0.35,
    label: 'x0.35',
    title: 'Économie',
    description: "Minimum de charge pour garder l'animation fluide."
  }
] as const;

interface RenderResolutionPromptProps {
  placement?: 'fixed' | 'inline' | 'scene';
  onSelect?: (value: number) => void;
}

const RenderResolutionPrompt: React.FC<RenderResolutionPromptProps> = ({ placement = 'fixed', onSelect }) => {
  const selectRenderScale = (value: number) => {
    onSelect?.(value);
    window.dispatchEvent(new CustomEvent(RENDER_SCALE_CHANGE_EVENT, { detail: value }));
  };

  const shellClassName = placement === 'fixed'
    ? 'fixed inset-0 z-[300] flex items-center justify-center bg-[#030014]/25 px-4 py-6 backdrop-blur-[2px]'
    : placement === 'scene'
      ? 'absolute inset-0 z-[120] flex items-center justify-center px-4 py-6'
      : 'relative z-30 flex w-[min(92vw,620px)] items-center justify-center px-3 py-4';

  const panelClassName = placement === 'fixed' || placement === 'scene'
    ? 'relative w-full max-w-xl overflow-hidden rounded-xl border border-cosmic-500/40 bg-cosmic-900/95 p-5 shadow-[0_0_60px_rgba(127,90,240,0.36)] md:p-7'
    : 'relative w-full overflow-hidden rounded-xl border border-cosmic-500/40 bg-cosmic-900/95 p-4 text-left shadow-[0_0_48px_rgba(127,90,240,0.38)] backdrop-blur-xl sm:p-5 md:p-6';

  return (
    <div className={shellClassName}>
      <div className={panelClassName}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cosmic-500 to-transparent" />
        <div className="mb-4 md:mb-5">
          <span className="mb-2 block text-[10px] font-orbitron uppercase tracking-[0.28em] text-cosmic-500">
            Optimisation du rendu
          </span>
          <h2 className="text-xl font-display font-bold text-white md:text-3xl">
            Choisir la résolution du shader
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-gray-300 sm:text-sm">
            La résolution actuelle est la plus haute et donnera le rendu le plus précis, mais elle est aussi la plus gourmande pour le GPU. Tu peux réduire la charge avec un rendu en x0.75, x0.5 ou x0.35.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 md:gap-3">
          {renderScaleOptions.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => selectRenderScale(option.value)}
              className="rounded-lg border border-cosmic-700/70 bg-cosmic-800/70 p-4 text-left transition-colors hover:border-cosmic-500 hover:bg-cosmic-700/60 focus:outline-none focus:ring-2 focus:ring-cosmic-500"
            >
              <span className="mb-2 inline-flex rounded-md border border-cosmic-500/40 bg-cosmic-500/15 px-2 py-1 font-orbitron text-xs text-cosmic-100">
                {option.label}
              </span>
              <span className="block text-sm font-bold text-white">{option.title}</span>
              <span className="mt-1 block text-xs leading-relaxed text-gray-400">{option.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RenderResolutionPrompt;
