// ── Piscina municipal — credential export (HTML → image) ──
// Uses html2canvas (loaded in index.html) to rasterise a live pass node.

function passToCanvas(node) {
  return window.html2canvas(node, {
    backgroundColor: null,
    scale: Math.min(3, (window.devicePixelRatio || 1) * 2),
    useCORS: true,
    logging: false,
  });
}

function downloadCredential(node, filename) {
  if (!node || !window.html2canvas) { window.print(); return; }
  passToCanvas(node).then(function (canvas) {
    canvas.toBlob(function (blob) {
      if (!blob) { window.print(); return; }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename || 'credencial-piscina.png';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
    }, 'image/png');
  }).catch(function () { window.print(); });
}
window.downloadCredential = downloadCredential;

function printCredential(node) {
  if (!node || !window.html2canvas) { window.print(); return; }
  passToCanvas(node).then(function (canvas) {
    const data = canvas.toDataURL('image/png');
    const w = window.open('', '_blank', 'width=540,height=860');
    if (!w) { downloadCredential(node); return; }
    w.document.write(
      '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Credencial · Piscina municipal</title>' +
      '<style>@page{margin:14mm} html,body{margin:0;height:100%;background:#F6EED9;' +
      'display:flex;align-items:center;justify-content:center} ' +
      'img{width:330px;max-width:86%;height:auto;border-radius:24px}</style></head>' +
      '<body><img src="' + data + '" alt="Credencial de acceso" ' +
      'onload="setTimeout(function(){window.focus();window.print();},180)"></body></html>'
    );
    w.document.close();
  }).catch(function () { window.print(); });
}
window.printCredential = printCredential;
