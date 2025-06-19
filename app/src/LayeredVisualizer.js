export function LayeredVisualizer() {
  React.useEffect(() => {
    import('./layered.js').then(mod => mod.initLayered());
  }, []);

  const h = React.createElement;
  return h(React.Fragment, null,
    h('div', { className: 'controls' },
      h('button', { id: 'toggleSettings' }, 'Toggle Settings'),
      h('div', { id: 'controlGroup', style: { display: 'none' } },
        h('button', { id: 'addLayer' }, 'Add Layer'),
        h('button', { id: 'removeLayer' }, 'Remove Layer'),
        h('button', { id: 'randomize' }, 'Randomize'),
        h('select', { id: 'presetSelect' }),
        h('button', { id: 'savePreset' }, 'Save'),
        h('button', { id: 'loadPreset' }, 'Load'),
        h('button', { id: 'micToggle' }, 'Enable Mic'),
        h('label', null, 'Audio Boost',
          h('input', { id: 'audioBoost', type: 'range', min: '0', max: '5', step: '0.1', defaultValue: '1' })
        ),
        h('label', null, 'Global Scale X',
          h('input', { id: 'globalScaleX', type: 'range', min: '0.5', max: '4', step: '0.1', defaultValue: '1' })
        ),
        h('label', null, 'Global Scale Y',
          h('input', { id: 'globalScaleY', type: 'range', min: '0.5', max: '4', step: '0.1', defaultValue: '1' })
        )
      )
    ),
    h('div', { id: 'settings', className: 'settings-panel' })
  );
}
