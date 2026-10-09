/* ============ ANALÍTICA (Google Analytics 4) ============
   1) Creá la propiedad en analytics.google.com y copiá el "ID de medición" (empieza con G-).
   2) Pegalo acá abajo. Es el ÚNICO lugar donde hay que ponerlo: lo usan la página y todas las apps.
   3) Para NO contar tus propias visitas: entrá una vez a tu sitio con  ?sin-analitica  al final
      (ej: https://evetardio.github.io/?sin-analitica). Para volver a contarlas: ?con-analitica */
const GA_ID = 'G-XWF85DXG5P';

(function(){
  try {
    if (location.search.includes('sin-analitica')) localStorage.setItem('eve:noGA', '1');
    if (location.search.includes('con-analitica')) localStorage.removeItem('eve:noGA');
  } catch (e) {}
  let excluido = false; try { excluido = localStorage.getItem('eve:noGA') === '1'; } catch (e) {}
  const activo = /^G-[A-Z0-9]{6,}$/.test(GA_ID) && GA_ID !== 'G-XXXXXXXXXX' && !excluido;

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  /* track('nombre_evento', {dato: 'valor'}): no hace nada si la analítica no está activa */
  window.track = (nombre, datos) => { if (activo) gtag('event', nombre, Object.assign({transport_type: 'beacon'}, datos || {})); };
  if (!activo) return;
  const s = document.createElement('script'); s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.append(s);
  gtag('js', new Date());
  gtag('config', GA_ID);
})();
